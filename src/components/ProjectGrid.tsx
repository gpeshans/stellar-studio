import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";

type Pattern = { col: string; ratio: string };

const ROW_TEMPLATES: Pattern[][] = [
  // A: wide + tall (8+4)
  [
    { col: "col-span-12 sm:col-span-1 md:col-span-8", ratio: "16/10" },
    { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
  ],
  // B: tall + wide (4+8)
  [
    { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
    { col: "col-span-12 sm:col-span-1 md:col-span-8", ratio: "16/10" },
  ],
  // C: equal halves (6+6)
  [
    { col: "col-span-12 sm:col-span-1 md:col-span-6", ratio: "4/3" },
    { col: "col-span-12 sm:col-span-1 md:col-span-6", ratio: "4/3" },
  ],
  // D: thirds (4+4+4)
  [
    { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
    { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
    { col: "col-span-12 sm:col-span-1 md:col-span-4", ratio: "4/5" },
  ],
  // E: panoramic (12)
  [{ col: "col-span-12 md:col-span-12", ratio: "21/9" }],
];

const CYCLE = [0, 1, 2, 3, 4]; // A, B, C, D, E

const REMAINDER_ROWS: number[][] = [
  [],        // 0
  [4],       // 1 → E
  [2],       // 2 → C
  [3],       // 3 → D
  [0, 2],    // 4 → A, C
  [2, 3],    // 5 → C, D
  [0, 1, 2], // 6 → A, B, C
  [0, 1, 3], // 7 → A, B, D
  [0, 1, 3, 4], // 8 → A, B, D, E
  [0, 1, 2, 3], // 9 → A, B, C, D
];

function buildPatterns(count: number): Pattern[] {
  const cycleLength = CYCLE.reduce((sum, i) => sum + ROW_TEMPLATES[i].length, 0);
  const fullCycles = Math.floor(count / cycleLength);
  const remainder = count % cycleLength;

  const patterns: Pattern[] = [];
  for (let c = 0; c < fullCycles; c++) {
    for (const rowIdx of CYCLE) {
      patterns.push(...ROW_TEMPLATES[rowIdx]);
    }
  }
  for (const rowIdx of REMAINDER_ROWS[remainder]) {
    patterns.push(...ROW_TEMPLATES[rowIdx]);
  }
  return patterns;
}

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const patterns = buildPatterns(projects.length);

  return (
    <section className="px-[var(--pad)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
        {projects.map((project, i) => {
          const pattern = patterns[i];
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
