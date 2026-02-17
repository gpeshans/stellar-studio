import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionTitle from "@/components/SectionTitle";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/metadata";

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
      <SectionTitle label={t("label")} title={t("title")} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-20 md:gap-20 px-[clamp(20px,5vw,72px)] pb-24">
        <ContactInfo />
        <ContactForm />
      </div>

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
              { name: t("title"), url: "/contact" },
            ])
          ),
        }}
      />
    </div>
  );
}
