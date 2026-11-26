import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionTitle from "@/components/SectionTitle";
import QuoteCalculator from "@/components/QuoteCalculator";
import EnquiryForm from "@/components/EnquiryForm";
import StudioDetails from "@/components/StudioDetails";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/metadata";

const SECTIONS = ["quote", "enquiry", "studio"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("contactTitle"),
    description: t("contactDesc"),
    openGraph: {
      title: `${t("contactTitle")} | Stellar Architecture Studio`,
      description: t("contactDesc"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <div className="pt-16">
      <SectionTitle label={t("label")} title={t("title")} sub={t("intro")} />

      <nav
        aria-label={t("jump.label")}
        className="flex flex-wrap gap-x-8 gap-y-3 px-[var(--pad)] -mt-4 pb-16"
      >
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.1em] uppercase text-gray-2 hover:text-black transition-colors duration-300"
          >
            {t(`jump.${id}`)}
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>

      <QuoteCalculator />
      <EnquiryForm />
      <StudioDetails />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: t("label"), url: "/contact" },
            ])
          ),
        }}
      />
    </div>
  );
}
