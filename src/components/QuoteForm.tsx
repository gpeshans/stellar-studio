"use client";

import { useState, type SubmitEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import ChoiceTiles from "./ChoiceTiles";
import {
  AreaInput,
  Consent,
  Field,
  FIELD_LABEL,
  Honeypot,
  INPUT,
  SentMessage,
  SUBMIT_BUTTON,
} from "./FormFields";
import { CONTACT } from "@/lib/contact";
import { EMAIL_SUBJECTS, type QuoteService } from "@/lib/enquiry";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { MAX_ATTACHMENT_BYTES, QUOTE_FORMS, type QuoteField } from "@/lib/quote";
import { padIndex } from "@/lib/utils";

// Same rhythm as the rows on the Services page.
const STEP_ROW =
  "grid grid-cols-[32px_1fr] md:grid-cols-[48px_1fr_2fr] gap-x-6 gap-y-6 py-10 border-b border-gray-5 items-baseline";
const STEP_INDEX = "font-display text-[13px] font-semibold text-gray-4";
const STEP_TITLE = "font-display text-[clamp(18px,2vw,24px)] font-bold tracking-tight";
const STEP_BODY = "col-span-full md:col-span-1";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm({ service }: { service: QuoteService }) {
  const t = useTranslations(`contact.quote.${service}`);
  const tq = useTranslations("contact.quote");
  const tf = useTranslations("contact.form");
  const tc = useTranslations("common");
  const locale = useLocale();
  const { formName, steps } = QUOTE_FORMS[service];
  const [status, setStatus] = useState<Status>("idle");
  const [fileTooLarge, setFileTooLarge] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const file = data.get("attachment");
    const tooLarge = file instanceof File && file.size > MAX_ATTACHMENT_BYTES;
    setFileTooLarge(tooLarge);
    if (tooLarge) return;
    setStatus("sending");

    // Answers go as the wording the visitor picked, so the email reads naturally.
    const answers: Record<string, string> = {};
    for (const field of steps.flatMap((step) => step.fields)) {
      const values = data.getAll(field.name).map(String).filter(Boolean);
      answers[field.name] =
        field.kind === "area" && values[0] ? `${values[0]} m²` : values.join(", ");
    }
    const name = String(data.get("name") ?? "").trim();

    const ok = await submitNetlifyForm(formName, {
      subject: `${EMAIL_SUBJECTS[service]} · ${name}`,
      language: locale,
      ...answers,
      name,
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      attachment: file instanceof File ? file : null,
      consent: data.get("consent") ? "yes" : null,
      "bot-field": String(data.get("bot-field") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
  }

  if (status === "sent") {
    return <SentMessage title={tq("successTitle")} message={tq("successMessage")} />;
  }

  function renderField(field: QuoteField, showLabel: boolean) {
    const key = `fields.${field.name}`;
    const label = t(`${key}.label`);
    const hint = t.has(`${key}.hint`) ? t(`${key}.hint`) : undefined;

    if (field.kind === "text") {
      return (
        <Field key={field.name} label={label} hint={hint}>
          <input
            type="text"
            name={field.name}
            required={field.required}
            placeholder={t.has(`${key}.placeholder`) ? t(`${key}.placeholder`) : undefined}
            className={INPUT}
          />
        </Field>
      );
    }
    if (field.kind === "area") {
      return (
        <Field key={field.name} label={label} hint={hint}>
          <AreaInput name={field.name} required={field.required} />
        </Field>
      );
    }

    const options = field.options.map((option) => ({
      key: option,
      label: t(`${key}.options.${option}`),
      description:
        field.kind === "choice" && field.described
          ? t(`${key}.descriptions.${option}`)
          : undefined,
    }));
    return (
      <div
        key={field.name}
        role={field.kind === "choice" ? "radiogroup" : "group"}
        aria-label={label}
      >
        {showLabel && <span className={`${FIELD_LABEL} mb-3`}>{label}</span>}
        <ChoiceTiles
          name={field.name}
          type={field.kind === "choice" ? "radio" : "checkbox"}
          options={options}
          required={field.kind === "choice" && field.required}
          defaultKeys={field.kind === "multi" ? field.preselected : undefined}
        />
        {hint && (
          <span className="mt-3 block font-body text-xs font-light text-gray-3">{hint}</span>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} name={formName}>
      {steps.map((step, i) => {
        const titleId = `${formName}-${step.key}`;
        return (
          <div key={step.key} role="group" aria-labelledby={titleId} className={STEP_ROW}>
            <span className={STEP_INDEX}>{padIndex(i)}</span>
            <h3 id={titleId} className={STEP_TITLE}>
              {t(`steps.${step.key}`)}
            </h3>
            <div className={`${STEP_BODY} flex flex-col gap-8`}>
              {step.fields.map((field) => renderField(field, step.fields.length > 1))}
            </div>
          </div>
        );
      })}

      <div role="group" aria-labelledby={`${formName}-details`} className={STEP_ROW}>
        <span className={STEP_INDEX}>{padIndex(steps.length)}</span>
        <h3 id={`${formName}-details`} className={STEP_TITLE}>
          {tq("details")}
        </h3>
        <div className={`${STEP_BODY} grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7`}>
          <Field label={tf("name")}>
            <input name="name" required autoComplete="name" className={INPUT} />
          </Field>
          <Field label={tf("email")}>
            <input type="email" name="email" required autoComplete="email" className={INPUT} />
          </Field>
          <Field label={tf("phone")}>
            <input type="tel" name="phone" required autoComplete="tel" className={INPUT} />
          </Field>
          <Field label={tq("attachment")} hint={tq("attachmentHint")}>
            {/* Own button and file name, because the browser labels its native
                picker in its own UI language rather than the page's. */}
            <span className="flex items-center gap-4 pt-3">
              <input
                type="file"
                name="attachment"
                accept="application/pdf,image/*"
                onChange={(e) => {
                  setFileName(e.target.files?.[0]?.name ?? null);
                  setFileTooLarge(false);
                }}
                className="peer sr-only"
              />
              <span className="shrink-0 cursor-pointer border border-black px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors duration-300 hover:bg-black hover:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black">
                {tq("chooseFile")}
              </span>
              <span className="min-w-0 truncate font-body text-sm font-light text-gray-2">
                {fileName ?? tq("noFile")}
              </span>
            </span>
            {fileTooLarge && (
              <span role="alert" className="mt-2 block font-body text-sm text-red-600">
                {tf("fileTooLarge")}
              </span>
            )}
          </Field>
          <Field label={tf("message")} className="sm:col-span-2">
            <textarea
              name="message"
              rows={4}
              className={`${INPUT} resize-y min-h-[100px]`}
            />
          </Field>
          <div className="sm:col-span-2">
            <Consent>{tf("consent")}</Consent>
          </div>
          <Honeypot />
        </div>
      </div>

      <div className="grid md:grid-cols-[48px_1fr_2fr] gap-x-6 pt-10">
        <div className="md:col-start-3 flex flex-col items-start gap-4">
          <button type="submit" disabled={status === "sending"} className={SUBMIT_BUTTON}>
            {status === "sending" ? tc("sending") : tq("submit")}
          </button>
          <p className="font-body text-sm font-light text-gray-2">{tq("note")}</p>
          {status === "error" && (
            <p role="alert" className="font-body text-sm text-red-600">
              {tf("errorMessage", { email: CONTACT.email })}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
