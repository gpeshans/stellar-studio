import { useLocale, useTranslations } from "next-intl";
import SectionLabel from "./SectionLabel";
import { CONTACT, mapEmbedUrl } from "@/lib/contact";

const LABEL =
  "font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-2.5";
const LINE = "font-body text-[15px] font-light text-gray-1 leading-relaxed";
const HOVER = "hover:text-black transition-colors duration-300";

/** The studio's details beside a large map of its pin. */
export default function StudioDetails() {
  const t = useTranslations("contact.studio");
  const tf = useTranslations("footer");
  const locale = useLocale();

  return (
    <section id="studio" className="scroll-mt-20 border-t border-gray-5 px-[var(--pad)] py-24">
      <SectionLabel>{t("label")}</SectionLabel>
      <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.1] tracking-tight">
        {t("title")}
      </h2>
      <p className="font-body text-base font-light text-gray-2 mt-4 mb-12 max-w-[420px]">
        {t("note")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-9 content-start">
          <div>
            <p className={LABEL}>{t("address")}</p>
            <address className={`${LINE} not-italic`}>
              Stellar Architecture Studio
              <br />
              {tf("address")}
              <br />
              {tf("city")}
            </address>
          </div>
          <div>
            <p className={LABEL}>{t("hours")}</p>
            <p className={LINE}>{tf("hours")}</p>
          </div>
          <div>
            <p className={LABEL}>{t("email")}</p>
            <p className={LINE}>
              <a href={`mailto:${CONTACT.email}`} className={HOVER}>
                {CONTACT.email}
              </a>
            </p>
          </div>
          <div>
            <p className={LABEL}>{t("phone")}</p>
            <p className={LINE}>
              <a href={`tel:${CONTACT.phoneE164}`} className={HOVER}>
                {CONTACT.phone}
              </a>
            </p>
          </div>
          <div>
            <p className={LABEL}>{t("follow")}</p>
            <div className="flex gap-5">
              {CONTACT.social.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-body text-sm text-gray-2 underline underline-offset-[3px] ${HOVER}`}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-bg2 aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
          <iframe
            src={mapEmbedUrl(locale)}
            title={t("mapTitle")}
            className="absolute inset-0 h-full w-full border-0 grayscale hover:grayscale-0 transition-[filter] duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
