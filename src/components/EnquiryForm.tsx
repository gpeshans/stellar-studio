"use client";

import { useState, type SubmitEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import ChoiceTiles from "./ChoiceTiles";
import SectionLabel from "./SectionLabel";
import {
  Consent,
  Field,
  FIELD_LABEL,
  Honeypot,
  INPUT,
  SentMessage,
  SUBMIT_BUTTON,
} from "./FormFields";
import { CONTACT } from "@/lib/contact";
import {
  EMAIL_SUBJECTS,
  ENQUIRY_TOPICS,
  isEnquiryTopic,
  type EnquiryTopic,
} from "@/lib/enquiry";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { useServiceParam } from "@/lib/use-service-param";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Free-text enquiries for everything without a calculator: the glow-up, the
 * consultations, and anything else. Sent as the existing "contact" form so
 * earlier submissions stay together in Netlify.
 */
export default function EnquiryForm() {
  const t = useTranslations("contact.enquiry");
  const tf = useTranslations("contact.form");
  const ts = useTranslations("data.services");
  const tc = useTranslations("common");
  const locale = useLocale();
  const fromLink = useServiceParam();
  const [topic, setTopic] = useState<EnquiryTopic | null>(null);
  const selected = topic ?? (isEnquiryTopic(fromLink) ? fromLink : null);
  const [status, setStatus] = useState<Status>("idle");

  const topicLabel = (key: EnquiryTopic) =>
    key === "other" ? t("other") : ts(`${key}.title`);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    setStatus("sending");
    const ok = await submitNetlifyForm("contact", {
      subject: `${EMAIL_SUBJECTS[selected ?? "other"]} · ${name}`,
      language: locale,
      topic: selected ? topicLabel(selected) : "",
      name,
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") ? "yes" : null,
      "bot-field": String(data.get("bot-field") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
  }

  return (
    <section id="enquiry" className="scroll-mt-20 border-t border-gray-5 px-[var(--pad)] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        <div>
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.1] tracking-tight">
            {t("title")}
          </h2>
          <p className="font-body text-base font-light text-gray-2 mt-4 max-w-[420px]">
            {t("intro")}
          </p>
        </div>

        {status === "sent" ? (
          <SentMessage title={t("successTitle")} message={t("successMessage")} />
        ) : (
          <form onSubmit={handleSubmit} name="contact" className="flex flex-col gap-8">
            <div role="radiogroup" aria-label={t("topic")}>
              <span className={`${FIELD_LABEL} mb-3`}>{t("topic")}</span>
              <ChoiceTiles
                name="topic"
                type="radio"
                required
                options={ENQUIRY_TOPICS.map((key) => ({ key, label: topicLabel(key) }))}
                selectedKey={selected}
                onSelect={(key) => setTopic(key as EnquiryTopic)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              <Field label={tf("name")}>
                <input name="name" required autoComplete="name" className={INPUT} />
              </Field>
              <Field label={tf("email")}>
                <input type="email" name="email" required autoComplete="email" className={INPUT} />
              </Field>
              <Field label={tf("phoneOptional")}>
                <input type="tel" name="phone" autoComplete="tel" className={INPUT} />
              </Field>
            </div>
            <Field label={t("message")}>
              <textarea
                name="message"
                rows={5}
                required
                className={`${INPUT} resize-y min-h-[120px]`}
              />
            </Field>
            <Consent>{tf("consent")}</Consent>
            <Honeypot />
            <div className="flex flex-col items-start gap-4">
              <button type="submit" disabled={status === "sending"} className={SUBMIT_BUTTON}>
                {status === "sending" ? tc("sending") : tc("sendMessage")}
              </button>
              {status === "error" && (
                <p role="alert" className="font-body text-sm text-red-600">
                  {tf("errorMessage", { email: CONTACT.email })}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
