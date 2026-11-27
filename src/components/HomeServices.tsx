import Image from "next/image";
import { useTranslations } from "next-intl";
import { PROJECT_CATEGORIES, SERVICE_IMAGES } from "@/lib/data";
import { contactHref } from "@/lib/enquiry";
import { padIndex } from "@/lib/utils";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import ArrowLink from "./ArrowLink";
import ServicePreviewGrid from "./ServicePreviewGrid";

/**
 * Architecture and Interiors as large image-and-text blocks, image left then
 * right, each opening its projects; then the other services as cards.
 */
export default function HomeServices() {
  const t = useTranslations("home");
  const ts = useTranslations("data.services");
  const tq = useTranslations("services");

  return (
    <section>
      <SectionTitle label={t("expertise")} title={t("services")} />

      {PROJECT_CATEGORIES.map((key, i) => (
        <div
          key={key}
          className={`grid grid-cols-1 lg:grid-cols-2 border-t border-gray-5 ${i === PROJECT_CATEGORIES.length - 1 ? "border-b" : ""}`}
        >
          {/* Cropped to fit, so the plain image: a cut watermark would look broken. */}
          <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[580px] overflow-hidden bg-bg2 ${i % 2 ? "lg:order-2" : ""}`}>
            <Image
              src={SERVICE_IMAGES[key].plain}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center px-[var(--pad)] py-14 lg:px-[clamp(48px,6vw,104px)]">
            <span className="font-display text-5xl font-bold text-gray-5 leading-none mb-6">
              {padIndex(i)}
            </span>
            <p className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-gray-3 mb-3">
              {ts(`${key}.tagline`)}
            </p>
            <h3 className="font-display text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.1] tracking-tight">
              {ts(`${key}.title`)}
            </h3>
            <p className="mt-5 max-w-[480px] font-body text-[15px] font-light leading-[1.85] text-gray-2">
              {ts(`${key}.summary`)}
            </p>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              <ArrowLink href={{ pathname: "/projects", query: { category: key } }}>
                {t("viewProjects")}
              </ArrowLink>
              <ArrowLink href={contactHref(key)}>{tq("requestQuote")}</ArrowLink>
            </div>
          </div>
        </div>
      ))}

      <div className="px-[var(--pad)] pt-20 pb-6">
        <SectionLabel>{t("moreServices")}</SectionLabel>
      </div>
      <ServicePreviewGrid from={2} />
    </section>
  );
}
