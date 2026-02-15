import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";

const PATTERNS = [
  { col: "col-span-12 sm:col-span-1 md:col-span-8", ratio: "16/10" },
  { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
  { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
  { col: "col-span-12 sm:col-span-1 md:col-span-8", ratio: "16/10" },
  { col: "col-span-12 sm:col-span-1 md:col-span-6", ratio: "4/3" },
  { col: "col-span-12 sm:col-span-1 md:col-span-6", ratio: "4/3" },
  { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
  { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "1/1" },
  { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
  { col: "col-span-12 md:col-span-12", ratio: "21/9" },
];

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="px-[var(--pad)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
        {projects.map((project, i) => {
          const pattern = PATTERNS[i % PATTERNS.length];
          return (
            <div key={project.id} className={pattern.col}>
              <ProjectCard project={project} ratio={pattern.ratio} index={i} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
