import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectMetaProps {
  project: Project;
}

const META_FIELDS: { label: string; key: keyof Project }[] = [
  { label: "Location", key: "location" },
  { label: "Year", key: "year" },
  { label: "Area", key: "area" },
  { label: "Category", key: "category" },
  { label: "Client", key: "client" },
];

export default function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="px-[clamp(20px,5vw,72px)] pt-12 pb-8">
      <div>
        <Link
          href="/projects"
          className="font-body text-xs font-normal tracking-[0.08em] uppercase text-gray-3 mb-5 block hover:text-black transition-colors duration-300"
        >
          &larr; All Projects
        </Link>
        <h1 className="font-display text-[clamp(32px,5vw,60px)] font-medium leading-[1.05] tracking-tight">
          {project.title}
        </h1>
      </div>
      <div className="flex gap-10 flex-wrap justify-center pt-8">
        {META_FIELDS.map((m) => (
          <div key={m.label}>
            <p className="font-body text-sm font-medium tracking-[0.15em] uppercase text-gray-3 mb-1">
              {m.label}
            </p>
            <p className="font-body text-lg font-normal text-gray-1">
              {String(project[m.key])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
