"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PROJECT_CATEGORIES, PROJECTS } from "@/lib/data";
import type { ProjectCategory } from "@/lib/types";
import ProjectTile from "./ProjectTile";

function parseCategory(value: string | null) {
  return PROJECT_CATEGORIES.find((category) => category === value) ?? null;
}

/**
 * The Projects page filter, kept in the address (?category=interiors) so
 * other pages can link to it.
 */
export default function ProjectBrowser() {
  const category = parseCategory(useSearchParams().get("category"));
  return <ProjectList category={category} />;
}

/**
 * Filter tabs and the grid of projects. Rendered unfiltered as the static
 * fallback, so the page's HTML lists every project.
 */
export function ProjectList({ category }: { category: ProjectCategory | null }) {
  const t = useTranslations("projects");
  const tc = useTranslations("categories");

  const tabs = [
    { key: "all", category: null, count: PROJECTS.length },
    ...PROJECT_CATEGORIES.map((c) => ({
      key: c,
      category: c,
      count: PROJECTS.filter((project) => project.category === c).length,
    })),
  ];
  const shown = category ? PROJECTS.filter((project) => project.category === category) : PROJECTS;

  return (
    <>
      <nav
        aria-label={t("filterLabel")}
        className="flex gap-6 sm:gap-9 border-b border-gray-5 mx-[var(--pad)] mb-10"
      >
        {tabs.map((tab) => {
          const active = tab.category === category;
          return (
            <Link
              key={tab.key}
              href={tab.category ? { pathname: "/projects", query: { category: tab.category } } : "/projects"}
              scroll={false}
              aria-current={active ? "page" : undefined}
              aria-label={`${tc(tab.key)} (${tab.count})`}
              className={`-mb-px border-b pb-3.5 font-body text-sm transition-colors duration-300 ${
                active ? "border-black text-black" : "border-transparent text-gray-3 hover:text-black"
              }`}
            >
              {tc(tab.key)}
              <sup aria-hidden="true" className="ml-1 text-[10px] text-gray-3">
                {tab.count}
              </sup>
            </Link>
          );
        })}
      </nav>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-5 mx-[var(--pad)] mb-24">
        {shown.map((project) => (
          <li key={project.slug} className="border-r border-b border-gray-5">
            <ProjectTile project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
