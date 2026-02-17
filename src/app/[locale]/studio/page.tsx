import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { STOCK } from "@/lib/images";
import SectionTitle from "@/components/SectionTitle";
import StatsBar from "@/components/StatsBar";
import TeamGrid from "@/components/TeamGrid";
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-[clamp(20px,5vw,72px)] pb-20 items-center">
        <div>
          <div className="w-10 h-[1.5px] bg-black mb-7" />
          <p className="font-display text-[clamp(20px,2.5vw,30px)] font-semibold leading-[1.35] tracking-tight mb-7">
            {t("tagline")}
          </p>
          <p className="font-body text-[15px] font-light leading-[1.85] text-gray-2 mb-5">
            {t("paragraph1")}
          </p>
          <p className="font-body text-[15px] font-light leading-[1.85] text-gray-2">
            {t("paragraph2")}
          </p>
        </div>
        <div
          className="overflow-hidden relative"
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src={STOCK.studio1}
            alt="Stellar Architecture Studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <StatsBar />

      <SectionTitle label={t("teamLabel")} title={t("teamTitle")} />
      <TeamGrid />

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
