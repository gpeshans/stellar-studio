import projectImages from "./project-images.json";
import type { Collaborator, Project, ProjectCategory, ProjectImage } from "./types";

/** Filters on the Projects page, in order. */
export const PROJECT_CATEGORIES: ProjectCategory[] = ["architecture", "interiors"];

type ProjectEntry = Omit<Project, "cover" | "images"> & {
  /** File name of the cover in public/images/projects/<slug>/. */
  cover: string;
};

// Projects in display order: the first four are featured on the home page.
// Images come from originals/projects/<slug>/ via `npm run images`; text is in
// messages/*.json under data.projects.<slug>.
const ENTRIES: ProjectEntry[] = [
  { slug: "gia-house", category: "architecture", type: "house", year: "2020", area: "500 m²", cover: "4.jpg" },
  { slug: "brash-fashion", category: "interiors", type: "boutique", year: "2022", area: "100 m²", cover: "4.jpg" },
  { slug: "alb-petrol", category: "architecture", type: "petrolStation", year: "2022", cover: "1.jpg" },
  { slug: "sv-weekend-house", category: "architecture", type: "weekendHouse", year: "2021", area: "100 m²", cover: "3.jpg" },
  // Interiors added 2026-11-27; their year, area and location are still to come.
  { slug: "gp-apartment", category: "interiors", type: "apartment", cover: "10.jpg" },
  { slug: "spk-apartment", category: "interiors", type: "apartment", cover: "1sp.jpg" },
  { slug: "mds-apartment", category: "interiors", type: "apartment", cover: "1mds.jpg" },
  { slug: "ae-kids-room", category: "interiors", type: "kidsRoom", cover: "2.jpg" },
  { slug: "dkk-apartment", category: "interiors", type: "apartment", cover: "1dk.jpg" },
  { slug: "js-kids-room", category: "interiors", type: "kidsRoom", cover: "1j.jpg" },
  { slug: "kei-apartment", category: "interiors", type: "apartment", cover: "1kei.jpg" },
];

const IMAGES: Record<string, ProjectImage[]> = projectImages;

export const PROJECTS: Project[] = ENTRIES.map(({ cover: coverFile, ...entry }) => {
  const all = IMAGES[entry.slug] ?? [];
  const cover = all.find((image) => image.src.endsWith(`/${coverFile}`));
  if (!cover) {
    throw new Error(`${entry.slug}: no image ${coverFile}; run npm run images?`);
  }
  return { ...entry, cover, images: [cover, ...all.filter((image) => image !== cover)] };
});

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

/** The project after this one, wrapping around: the "Next project" link. */
export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

// Services in display order. Copy lives in messages/*.json under
// data.services.<key>, keyed by name so the languages can't drift out of order.
export const SERVICES = [
  "architecture",
  "interiors",
  "dayWithArchitect",
  "glowUp",
  "beforeYouBuy",
] as const;
export type ServiceKey = (typeof SERVICES)[number];

/** A service's anchor on the Services page, e.g. "day-with-architect". */
export function serviceAnchor(key: ServiceKey) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

// The figures on the Studio page. Labels live in messages/*.json under
// stats.<key>.
export const STATS = [
  { key: "established", value: "2021" },
  { key: "projects", value: "40+" },
  { key: "countries", value: "6" },
  { key: "collaborators", value: "10+" },
] as const;

// Logos are black on transparent, trimmed to the artwork, with their pixel
// size, so the Studio page can scale them all to the same visual weight.
export const COLLABORATORS: Collaborator[] = [
  {
    name: "Lesnina Mi",
    url: "https://lesninami.com.mk/",
    logo: { src: "/images/collaborators/lesninami.png", width: 519, height: 144 },
  },
  {
    name: "Stamboliski Engineering",
    url: "https://www.instagram.com/stamboliski_engineering/",
    // The wordmark is small next to the column, so it needs a little more room.
    logo: { src: "/images/collaborators/stamboliski.png", width: 664, height: 205, scale: 1.12 },
  },
  {
    name: "FORU Studio",
    url: "https://www.forustudio.com/",
    logo: { src: "/images/collaborators/foru.png", width: 510, height: 96 },
  },
];
