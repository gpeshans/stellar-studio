import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PROJECTS } from "@/lib/data";
import { getNextProject } from "@/lib/utils";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/metadata";
import ProjectDetailHero from "@/components/ProjectDetailHero";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectGallery from "@/components/ProjectGallery";
import NextProjectCTA from "@/components/NextProjectCTA";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "data.projects" });
  const description = t(`${project.slug}.description`);

  return {
    title: t(`${project.slug}.title`),
    description,
    openGraph: {
      title: `${t(`${project.slug}.title`)} | Stellar Architecture Studio`,
      description,
      images: [{ url: project.img, width: 1200, height: 800 }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject = getNextProject(PROJECTS, slug);

  const t = await getTranslations("data.projects");

  return (
    <div className="pt-16">
      <ProjectDetailHero image={project.gallery[0]} title={t(`${project.slug}.title`)} />
      <ProjectMeta project={project} />

      <ProjectGallery gallery={project.gallery} title={t(`${project.slug}.title`)} />
      <NextProjectCTA project={nextProject} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project, locale, t(`${project.slug}.description`))),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
              { name: t(`${project.slug}.title`), url: `/projects/${project.slug}` },
            ])
          ),
        }}
      />
    </div>
  );
}
