import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PROJECTS, getProject, nextProject } from "@/lib/data";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/metadata";
import ProjectView from "@/components/ProjectView";
import ProjectInfo from "@/components/ProjectInfo";
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
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "data.projects" });
  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Stellar Architecture Studio`,
      description,
      // The plain cover: link previews crop it, which would cut the watermark.
      images: [{ url: project.cover.plain }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("data.projects");
  const tt = await getTranslations("projectTypes");
  const title = t(`${slug}.title`);

  return (
    <div className="pt-16">
      <ProjectView title={title} images={project.images}>
        <ProjectInfo project={project} />
      </ProjectView>
      <NextProjectCTA project={nextProject(slug)} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd(project, locale, {
              title,
              description: t(`${slug}.description`),
              type: tt(project.type),
              location: t.has(`${slug}.location`) ? t(`${slug}.location`) : undefined,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
              { name: title, url: `/projects/${slug}` },
            ])
          ),
        }}
      />
    </div>
  );
}
