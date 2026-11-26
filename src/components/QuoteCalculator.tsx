"use client";

import { useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import QuoteForm from "./QuoteForm";
import SectionLabel from "./SectionLabel";
import { QUOTE_SERVICES, isQuoteService, type QuoteService } from "@/lib/enquiry";
import { useServiceParam } from "@/lib/use-service-param";

/**
 * Tabs for the quote calculators. A link from the Services page picks the
 * tab with ?service=…; after that, the visitor's choice wins. Both forms stay
 * mounted, so switching tabs keeps what was already filled in.
 */
export default function QuoteCalculator() {
  const t = useTranslations("contact.quote");
  const fromLink = useServiceParam();
  const [chosen, setChosen] = useState<QuoteService | null>(null);
  const active: QuoteService =
    chosen ?? (isQuoteService(fromLink) ? fromLink : QUOTE_SERVICES[0]);

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const step = e.key === "ArrowRight" ? 1 : QUOTE_SERVICES.length - 1;
    const next =
      QUOTE_SERVICES[(QUOTE_SERVICES.indexOf(active) + step) % QUOTE_SERVICES.length];
    setChosen(next);
    document.getElementById(`quote-tab-${next}`)?.focus();
  }

  return (
    <section id="quote" className="scroll-mt-20 px-[var(--pad)] pb-24">
      <SectionLabel>{t("label")}</SectionLabel>
      <div role="tablist" aria-label={t("label")} className="flex gap-10 border-b border-gray-5">
        {QUOTE_SERVICES.map((service) => {
          const selected = service === active;
          return (
            <button
              key={service}
              type="button"
              role="tab"
              id={`quote-tab-${service}`}
              aria-selected={selected}
              aria-controls={`quote-panel-${service}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setChosen(service)}
              onKeyDown={onTabKeyDown}
              className={`-mb-px border-b-2 pb-4 font-display text-[clamp(24px,3vw,40px)] font-bold tracking-tight transition-colors duration-300 ${
                selected
                  ? "border-black text-black"
                  : "border-transparent text-gray-4 hover:text-gray-2"
              }`}
            >
              {t(`tabs.${service}`)}
            </button>
          );
        })}
      </div>

      {QUOTE_SERVICES.map((service) => (
        <div
          key={service}
          role="tabpanel"
          id={`quote-panel-${service}`}
          aria-labelledby={`quote-tab-${service}`}
          hidden={service !== active}
        >
          <p className="font-body text-base font-light text-gray-2 pt-8 max-w-[640px]">
            {t(`${service}.intro`)}
          </p>
          <QuoteForm service={service} />
        </div>
      ))}
    </section>
  );
}
