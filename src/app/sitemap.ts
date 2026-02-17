import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stellar-arch.com";

  function alternates(path: string) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${baseUrl}/${locale}${path}`;
    }
    return { languages };
  }

  const staticPaths = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/studio", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: alternates(page.path),
      });
    }

    for (const project of PROJECTS) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates(`/projects/${project.slug}`),
      });
    }
  }

  return entries;
}
