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

export interface Service {
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}
