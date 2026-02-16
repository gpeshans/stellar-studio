import { STOCK } from "./images";
import { slugify } from "./utils";
import type { Project, CategoryItem, Service, TeamMember } from "./types";

export const CATEGORIES: CategoryItem[] = [
  { key: "All", label: "All Projects", img: STOCK.hero1, count: 10 },
  {
    key: "Residential",
    label: "Residential",
    img: STOCK.catResidential,
    count: 3,
  },
  { key: "Cultural", label: "Cultural", img: STOCK.catCultural, count: 2 },
  {
    key: "Commercial",
    label: "Commercial",
    img: STOCK.catCommercial,
    count: 2,
  },
  { key: "Interior", label: "Interior", img: STOCK.catInterior, count: 2 },
  { key: "Public", label: "Public", img: STOCK.catPublic, count: 1 },
];

const RAW_PROJECTS: Omit<Project, "slug">[] = [
  {
    id: 1,
    title: "Brash Fashion",
    location: "Shtip, Macedonia",
    category: "Commercial",
    year: "2022",
    area: "150 m²",
    client: "Private",
    img: "/images/projects/commercial/brash-fashion-scms/projects-bfscm-001.jpg",
    gallery: [
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-001.jpg",
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-001.jpg",
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-002.jpg",
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-003.jpg",
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-004.jpg",
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-005.jpg",
      "/images/projects/commercial/brash-fashion-scms/projects-bfscm-006.jpg",
    ],
    description:
      "A contemporary fashion boutique designed around clarity, symmetry, and refined minimalism. The space features a clean grid layout with central display islands and perimeter shelving, creating intuitive circulation and strong visual balance. Neutral tones, soft integrated lighting, and natural wood accents highlight the merchandise while maintaining a calm, gallery-like atmosphere. The result is a modern retail environment that enhances product visibility and elevates the shopping experience.",
  },
  {
    id: 2,
    title: "Mosaic Arts Center",
    location: "Skopje, Macedonia",
    category: "Cultural",
    year: "2024",
    area: "3,200 m²",
    client: "Municipality of Skopje",
    img: STOCK.p2,
    gallery: [STOCK.p2, STOCK.d3, STOCK.d1, STOCK.p8, STOCK.hero2],
    description:
      "An undulating roofline of perforated copper panels creates ever-changing light patterns across the gallery floors. The building is organized around a central atrium that serves as both circulation spine and exhibition space, encouraging spontaneous encounters between visitors and art.",
  },
  {
    id: 3,
    title: "Vertex Tower",
    location: "Skopje, Macedonia",
    category: "Commercial",
    year: "2025",
    area: "12,800 m²",
    client: "Vertex Group",
    img: STOCK.p3,
    gallery: [STOCK.p3, STOCK.hero3, STOCK.d4, STOCK.d1, STOCK.p9],
    description:
      "A 16-story commercial tower with a distinctive twisted geometry that optimizes daylight penetration and reduces wind load. The façade system of ceramic louvers responds to solar orientation, creating a dynamic skin that shifts in appearance throughout the day.",
  },
  {
    id: 4,
    title: "Stone Garden Villa",
    location: "Bitola, Macedonia",
    category: "Residential",
    year: "2024",
    area: "620 m²",
    client: "Private",
    img: STOCK.p4,
    gallery: [STOCK.p4, STOCK.d5, STOCK.d2, STOCK.d4, STOCK.hero4],
    description:
      "Nestled into a hillside, this residence is composed of three interlocking stone volumes connected by glass bridges. Each volume frames a specific landscape view — the mountain, the garden, and the sky — creating a sequence of curated natural experiences.",
  },
  {
    id: 5,
    title: "The Workshop",
    location: "Tetovo, Macedonia",
    category: "Interior",
    year: "2025",
    area: "340 m²",
    client: "CreativeLab",
    img: STOCK.p5,
    gallery: [STOCK.p5, STOCK.d3, STOCK.d1, STOCK.d5, STOCK.studio1],
    description:
      "A former textile warehouse transformed into a co-working space that celebrates its industrial heritage. Exposed brick walls and steel trusses contrast with refined insertions of white oak and brass. A double-height library anchors the social heart of the space.",
  },
  {
    id: 6,
    title: "Riverbank Promenade",
    location: "Skopje, Macedonia",
    category: "Public",
    year: "2024",
    area: "8,500 m²",
    client: "City of Skopje",
    img: STOCK.p6,
    gallery: [STOCK.p6, STOCK.d2, STOCK.d4, STOCK.d5, STOCK.hero1],
    description:
      "A 1.2km urban intervention that reconnects the city with its river. Stepped terraces of local travertine descend to the waterline, creating flexible social spaces that accommodate everything from morning joggers to evening concerts.",
  },
  {
    id: 7,
    title: "Horizon House",
    location: "Mavrovo, Macedonia",
    category: "Residential",
    year: "2023",
    area: "380 m²",
    client: "Private",
    img: STOCK.p7,
    gallery: [STOCK.p7, STOCK.d1, STOCK.d3, STOCK.d5, STOCK.hero4],
    description:
      "A mountain retreat designed as a single horizontal gesture in the landscape. The elongated plan maximizes views across the valley while a green roof seamlessly merges the building with the alpine meadow above. Rammed earth walls provide thermal mass and a connection to the terrain.",
  },
  {
    id: 8,
    title: "Gallery M",
    location: "Skopje, Macedonia",
    category: "Cultural",
    year: "2025",
    area: "1,800 m²",
    client: "Foundation M",
    img: STOCK.p8,
    gallery: [STOCK.p8, STOCK.d3, STOCK.d2, STOCK.p2, STOCK.hero2],
    description:
      "A private art gallery conceived as a sequence of rooms with precisely calibrated proportions and light conditions. Each gallery is tailored to a specific medium — painting, sculpture, photography — while a rooftop terrace offers views across the old bazaar.",
  },
  {
    id: 9,
    title: "Cedar Office Park",
    location: "Skopje, Macedonia",
    category: "Commercial",
    year: "2024",
    area: "6,400 m²",
    client: "Cedar Investments",
    img: STOCK.p9,
    gallery: [STOCK.p9, STOCK.d4, STOCK.d1, STOCK.d5, STOCK.hero3],
    description:
      "Three low-rise office buildings organized around a shared courtyard garden. The complex prioritizes biophilic design with planted façades, natural ventilation, and daylit interiors. An underground parking structure preserves the green campus above.",
  },
  {
    id: 10,
    title: "Loft Residence",
    location: "Skopje, Macedonia",
    category: "Interior",
    year: "2025",
    area: "220 m²",
    client: "Private",
    img: STOCK.p10,
    gallery: [STOCK.p10, STOCK.d5, STOCK.d3, STOCK.d2, STOCK.studio1],
    description:
      "A penthouse apartment where raw concrete ceilings and polished terrazzo floors create a refined industrial canvas. Custom walnut joinery defines living zones without partitions. A sculptural steel staircase connects to a private rooftop garden.",
  },
];

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({
  ...p,
  slug: slugify(p.title),
}));

export const SERVICES: Service[] = [
  {
    title: "Architecture",
    desc: "From concept to completion — residential, commercial, and public buildings designed with meticulous attention to context, materiality, and light.",
  },
  {
    title: "Interior Design",
    desc: "Spatial experiences that balance function and atmosphere. We craft interiors that feel both inevitable and surprising.",
  },
  {
    title: "Urban Planning",
    desc: "Masterplans and urban interventions that create vibrant, walkable neighborhoods and reclaim underused public spaces.",
  },
  {
    title: "Renovation",
    desc: "Sensitive transformations of existing structures that honor their history while meeting contemporary needs.",
  },
  {
    title: "Landscape",
    desc: "Outdoor spaces designed as extensions of architecture — gardens, courtyards, and public landscapes that evolve with the seasons.",
  },
  {
    title: "Consultation",
    desc: "Expert guidance on feasibility, regulations, materials, and sustainability for projects at any stage of development.",
  },
];

export const TEAM: TeamMember[] = [
  { name: "Ana Petrović", role: "Founding Partner", img: STOCK.team1 },
  { name: "Marko Dimitrov", role: "Design Director", img: STOCK.team2 },
  { name: "Elena Stojanova", role: "Lead Architect", img: STOCK.team3 },
  { name: "Stefan Iliev", role: "Project Manager", img: STOCK.team4 },
];

export const STATS = [
  { number: "45+", label: "Projects" },
  { number: "12", label: "Years" },
  { number: "8", label: "Team Members" },
  { number: "6", label: "Countries" },
];
