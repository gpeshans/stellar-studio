import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SERVICES, serviceAnchor, type ServiceKey } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import ServiceRow from "@/components/ServiceRow";
import ContactCTA from "@/components/ContactCTA";
import { breadcrumbJsonLd } from "@/lib/metadata";
import { contactHref, isQuoteService } from "@/lib/enquiry";
import type { Service } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("servicesTitle"),
    description: t("servicesDesc"),
    openGraph: {
      title: `${t("servicesTitle")} | Stellar Architecture Studio`,
      description: t("servicesDesc"),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const ts = await getTranslations("data.services");

  const service = (key: ServiceKey): Service => ({
    title: ts(`${key}.title`),
    tagline: ts(`${key}.tagline`),
    audience: ts(`${key}.audience`),
    desc: ts(`${key}.desc`),
    points: ts.has(`${key}.points`) ? ts.raw(`${key}.points`) : undefined,
    options: ts.has(`${key}.options`) ? ts.raw(`${key}.options`) : undefined,
  });

  return (
    <div className="pt-16">
      <SectionTitle label={t("label")} title={t("title")} sub={t("sub")} />

      <div className="px-[clamp(20px,5vw,72px)] pb-20">
        {SERVICES.map((key, i) => (
          <ServiceRow
            key={key}
            id={serviceAnchor(key)}
            service={service(key)}
            index={i}
            cta={{
              label: t(isQuoteService(key) ? "requestQuote" : "sendEnquiry"),
              href: contactHref(key),
            }}
          />
        ))}
      </div>

      <ContactCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: t("title"), url: "/services" },
            ])
          ),
        }}
      />
    </div>
  );
}
