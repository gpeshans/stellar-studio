import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import { getNextProject } from "@/lib/utils";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/metadata";
import ProjectDetailHero from "@/components/ProjectDetailHero";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectGallery from "@/components/ProjectGallery";
import NextProjectCTA from "@/components/NextProjectCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Stellar Architecture Studio`,
      description: project.description,
      images: [{ url: project.img, width: 1200, height: 800 }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject = getNextProject(PROJECTS, slug);

  return (
    <div className="pt-16">
      <ProjectDetailHero image={project.gallery[0]} title={project.title} />
      <ProjectMeta project={project} />

      {/* Description */}
      {/* <div className="px-[clamp(20px,5vw,72px)] pb-16 max-w-[780px]">
        <div className="w-10 h-[1.5px] bg-black mb-6" />
        <p className="font-body text-[17px] font-light leading-[1.85] text-gray-2">
          {project.description}
        </p>
      </div> */}

      <ProjectGallery gallery={project.gallery} title={project.title} />
      <NextProjectCTA project={nextProject} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
              { name: project.title, url: `/projects/${project.slug}` },
            ]),
          ),
        }}
      />
    </div>
  );
}
