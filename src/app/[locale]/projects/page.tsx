import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionTitle from "@/components/SectionTitle";
import CategoryNav from "@/components/CategoryNav";
import { breadcrumbJsonLd } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("projectsTitle"),
    description: t("projectsDesc"),
    openGraph: {
      title: `${t("projectsTitle")} | Stellar Architecture Studio`,
      description: t("projectsDesc"),
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  return (
    <div className="pt-16">
      <SectionTitle label={t("label")} title={t("title")} sub={t("sub")} />
      <CategoryNav />
      <div className="h-20" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: t("title"), url: "/projects" },
            ])
          ),
        }}
      />
    </div>
  );
}
