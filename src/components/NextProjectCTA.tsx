import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types";
import { PROJECTS } from "@/lib/data";

interface NextProjectCTAProps {
  project: Project;
}

export default function NextProjectCTA({ project }: NextProjectCTAProps) {
  const t = useTranslations("project");
  const tp = useTranslations("data.projects");
  const idx = PROJECTS.indexOf(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block h-[50vh] overflow-hidden"
    >
      <Image
        src={project.img}
        alt={tp(`${idx}.title`)}
        fill
        className="object-cover brightness-50 transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ transitionTimingFunction: "var(--ease-smooth)" }}
        sizes="100vw"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <p className="font-body text-[11px] font-medium tracking-[0.2em] uppercase opacity-40 mb-4">
          {t("nextProject")}
        </p>
        <h2 className="font-display text-[clamp(28px,5vw,52px)] font-medium tracking-tight">
          {tp(`${idx}.title`)}
        </h2>
        <p className="font-body text-sm font-light opacity-50 mt-2">
          {tp(`${idx}.location`)}
        </p>
      </div>
    </Link>
  );
}
