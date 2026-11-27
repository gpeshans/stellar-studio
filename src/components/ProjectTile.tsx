import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types";

/** A project on the Projects page: its cover, then type, name and place below. */
export default function ProjectTile({ project }: { project: Project }) {
  const tp = useTranslations("data.projects");
  const tt = useTranslations("projectTypes");
  const location = tp.has(`${project.slug}.location`) ? tp(`${project.slug}.location`) : null;

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg2">
        {/* The name is right below, so the image needs no text of its own. */}
        <Image
          src={project.cover.plain}
          alt=""
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
        />
      </div>
      <div className="px-5 pt-5 pb-6">
        <p className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-2">
          {tt(project.type)}
          {project.year && ` · ${project.year}`}
        </p>
        <h3 className="font-display text-lg font-semibold tracking-tight underline-offset-4 decoration-1 group-hover:underline">
          {tp(`${project.slug}.title`)}
        </h3>
        {location && (
          <p className="font-body text-sm font-light text-gray-2 mt-1">{location}</p>
        )}
      </div>
    </Link>
  );
}
