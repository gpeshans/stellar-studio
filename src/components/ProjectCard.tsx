import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  ratio: string;
  index: number;
}

export default function ProjectCard({ project, ratio, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden block animate-fade-up cursor-pointer"
      style={{ animationDelay: `${Math.min(index * 0.06, 0.4)}s` }}
    >
      <div className="relative overflow-hidden bg-bg2" style={{ aspectRatio: ratio }}>
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end text-white"
        style={{ padding: "clamp(16px, 2.5vw, 36px)", transitionTimingFunction: "var(--ease-smooth)" }}
      >
        <p className="font-body text-xs font-medium tracking-[0.15em] uppercase opacity-50 mb-2">
          {project.category} — {project.year}
        </p>
        <h3 className="font-display text-[clamp(18px,2.2vw,30px)] font-medium tracking-tight mb-1.5">
          {project.title}
        </h3>
        <p className="font-body text-sm font-light opacity-60">
          {project.location}
        </p>
      </div>
    </Link>
  );
}
