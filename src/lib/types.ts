/** The two groups on the Projects page, one per quote calculator. */
export type ProjectCategory = "architecture" | "interiors";

/** What was designed, e.g. an apartment. Labels: messages projectTypes.<type>. */
export type ProjectType =
  | "house"
  | "weekendHouse"
  | "petrolStation"
  | "boutique"
  | "apartment"
  | "kidsRoom";

/** A web image made by `npm run images`, with its size in pixels. */
export interface ProjectImage {
  /** Watermarked, for showing whole. */
  src: string;
  /** Without the watermark and smaller, for places that crop it. */
  plain: string;
  width: number;
  height: number;
}

/**
 * A project. Its title, description, location and client are in
 * messages/*.json under data.projects.<slug>; location and client are left
 * out where we don't know them.
 */
export interface Project {
  slug: string;
  category: ProjectCategory;
  type: ProjectType;
  year?: string;
  area?: string;
  /** The image on cards and when shared. */
  cover: ProjectImage;
  /** Every image of the project, cover first. */
  images: ProjectImage[];
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
