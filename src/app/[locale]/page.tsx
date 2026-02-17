import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProjectGrid from "@/components/ProjectGrid";
import AboutTeaser from "@/components/AboutTeaser";
import ServicePreviewGrid from "@/components/ServicePreviewGrid";
import Button from "@/components/Button";
import { PROJECTS } from "@/lib/data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <div>
      <Hero />

      <SectionTitle
        label={t("selectedWork")}
        title={t("recentProjects")}
        sub={t("recentProjectsSub")}
      />
      <ProjectGrid projects={PROJECTS.slice(0, 6)} />

      <div className="flex justify-center py-12 pb-20">
        <Button href="/projects">{tc("allProjects")}</Button>
      </div>

      <AboutTeaser />

      <SectionTitle label={t("expertise")} title={t("services")} align="center" />
      <ServicePreviewGrid />
    </div>
  );
}
