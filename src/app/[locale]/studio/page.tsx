import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionTitle from "@/components/SectionTitle";
import FounderNote from "@/components/FounderNote";
import StatsBar from "@/components/StatsBar";
import CollaboratorGrid from "@/components/CollaboratorGrid";
import { breadcrumbJsonLd } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("studioTitle"),
    description: t("studioDesc"),
    openGraph: {
      title: `${t("studioTitle")} | Stellar Architecture Studio`,
      description: t("studioDesc"),
    },
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("studio");

  return (
    <div className="pt-16">
      <SectionTitle label={t("label")} title={t("title")} />

      <FounderNote />

      <StatsBar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 px-[var(--pad)] pt-[clamp(64px,7vw,104px)]">
        <div>
          <div className="w-10 h-[1.5px] bg-black mb-7" />
          <p className="font-display text-[clamp(20px,2.5vw,30px)] font-semibold leading-[1.35] tracking-tight max-w-[560px]">
            {t("tagline")}
          </p>
        </div>
        <div className="md:pt-[calc(1.5px+28px)] max-w-[560px]">
          <p className="font-body text-[15px] font-light leading-[1.85] text-gray-2 mb-5">
            {t("paragraph1")}
          </p>
          <p className="font-body text-[15px] font-light leading-[1.85] text-gray-2">
            {t("paragraph2")}
          </p>
        </div>
      </div>

      <SectionTitle
        label={t("collaborators.label")}
        title={t("collaborators.title")}
        sub={t("collaborators.sub")}
      />
      <CollaboratorGrid />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: t("title"), url: "/studio" },
            ])
          ),
        }}
      />
    </div>
  );
}
