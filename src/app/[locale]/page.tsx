import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import StatsBar from "@/components/StatsBar";
import SectionTitle from "@/components/SectionTitle";
import ProjectGrid from "@/components/ProjectGrid";
import HomeServices from "@/components/HomeServices";
import ContactCTA from "@/components/ContactCTA";
import Button from "@/components/Button";
import { FEATURED_PROJECTS } from "@/lib/data";

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
      <HomeIntro />
      <StatsBar />

      <SectionTitle
        label={t("selectedWork")}
        title={t("featuredProjects")}
        sub={t("featuredProjectsSub")}
      />
      <ProjectGrid projects={FEATURED_PROJECTS} />
      <div className="flex justify-center py-12 pb-20">
        <Button href="/projects">{tc("allProjects")}</Button>
      </div>

      <HomeServices />
      <ContactCTA />
    </div>
  );
}
