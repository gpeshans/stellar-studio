import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types";
import { PROJECTS } from "@/lib/data";

interface ProjectMetaProps {
  project: Project;
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  const t = useTranslations("project");
  const tp = useTranslations("data.projects");
  const idx = PROJECTS.indexOf(project);

  const META_FIELDS = [
    { label: t("location"), value: tp(`${idx}.location`) },
    { label: t("year"), value: project.year },
    { label: t("area"), value: project.area },
    { label: t("category"), value: tp(`${idx}.category`) },
    { label: t("client"), value: tp(`${idx}.client`) },
  ];

  return (
    <div className="px-[clamp(20px,5vw,72px)] pt-12 pb-8">
      <div>
        <Link
          href="/projects"
          className="font-body text-xs font-normal tracking-[0.08em] uppercase text-gray-3 mb-5 block hover:text-black transition-colors duration-300"
        >
          {t("allProjects")}
        </Link>
        <h1 className="font-display text-[clamp(32px,5vw,60px)] font-medium leading-[1.05] tracking-tight">
          {tp(`${idx}.title`)}
        </h1>
      </div>
      <div className="flex gap-10 flex-wrap justify-center pt-8">
        {META_FIELDS.map((m) => (
          <div key={m.label}>
            <p className="font-body text-sm font-medium tracking-[0.15em] uppercase text-gray-3 mb-1">
              {m.label}
            </p>
            <p className="font-body text-lg font-normal text-gray-1">
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
