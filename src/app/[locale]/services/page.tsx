import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SERVICES } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import ServiceRow from "@/components/ServiceRow";
import Button from "@/components/Button";
import { breadcrumbJsonLd } from "@/lib/metadata";

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

  return (
    <div className="pt-16">
      <SectionTitle label={t("label")} title={t("title")} sub={t("sub")} />

      <div className="px-[clamp(20px,5vw,72px)] pb-20">
        {SERVICES.map((s, i) => (
          <ServiceRow
            key={i}
            service={{ title: ts(`${i}.title`), desc: ts(`${i}.desc`) }}
            index={i}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-20 px-6 bg-black text-white">
        <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold tracking-tight mb-4">
          {t("ctaHeading")}
        </h2>
        <p className="font-body text-[15px] font-light text-gray-3 mb-9">
          {t("ctaSub")}
        </p>
        <Button href="/contact" variant="inverted">
          {t("ctaButton")}
        </Button>
      </div>

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
