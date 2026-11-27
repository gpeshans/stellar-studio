import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionTitle from "@/components/SectionTitle";
import ProjectBrowser, { ProjectList } from "@/components/ProjectBrowser";
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
      {/* The filter reads the address, which the static page can't know. */}
      <Suspense fallback={<ProjectList category={null} />}>
        <ProjectBrowser />
      </Suspense>
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
