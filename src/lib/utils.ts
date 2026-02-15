import type { Project } from "./types";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function padIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export function getNextProject(
  projects: Project[],
  currentSlug: string
): Project {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  return projects[(idx + 1) % projects.length];
}
