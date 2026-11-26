export interface Project {
  id: number;
  title: string;
  slug: string;
  location: string;
  category: Category;
  year: string;
  area?: string;
  client?: string;
  img: string;
  gallery: string[];
  description: string;
}

export type Category =
  | "All"
  | "Residential"
  | "Cultural"
  | "Commercial"
  | "Interior"
  | "Public";

export interface CategoryItem {
  key: Category;
  label: string;
  img: string;
  count: number;
}

/** A service as shown on the Services page, already translated. */
export interface Service {
  title: string;
  /** Short line under the title: the scope, or a consultation's length. */
  tagline: string;
  /** Who the service is for. */
  audience: string;
  desc: string;
  /** What's included, as a short list. */
  points?: string[];
  /** Ways to take the service, e.g. design project or turnkey. */
  options?: { title: string; desc: string }[];
}

/** A studio or firm we work with, shown by its logo on the Studio page. */
export interface Collaborator {
  name: string;
  url: string;
  /**
   * Black on transparent, trimmed to the artwork; size in pixels. `scale`
   * nudges a logo that still looks too small (or large) next to the others.
   */
  logo: { src: string; width: number; height: number; scale?: number };
}
