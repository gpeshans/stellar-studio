"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORIES, PROJECTS } from "@/lib/data";
import ProjectGrid from "./ProjectGrid";
import type { Category } from "@/lib/types";

export default function CategoryNav() {
  const [filter, setFilter] = useState<Category>("All");
  const t = useTranslations("projects");
  const tc = useTranslations("categories");

  const cats = CATEGORIES.filter((c) => c.key !== "All");
  const hasFilter = filter !== "All";
  const filtered = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <>
      <section className="px-[clamp(20px,5vw,72px)]">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div />
          {filter !== "All" && (
            <button
              onClick={() => setFilter("All")}
              className="bg-transparent border border-gray-5 px-5 py-2 font-body text-xs font-normal tracking-[0.06em] cursor-pointer text-gray-2 hover:border-black hover:text-black transition-all duration-300"
            >
              &larr; {t("showAll")}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-14">
          {cats.map((cat) => {
            const active = filter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(active ? "All" : cat.key)}
                className="group relative cursor-pointer overflow-hidden text-left border-none p-0 bg-transparent"
                style={{
                  aspectRatio: "3/4",
                  outline: active ? "2px solid black" : "none",
                  outlineOffset: -2,
                }}
              >
                <Image
                  src={cat.img}
                  alt={tc(cat.key)}
                  fill
                  className="object-cover transition-all duration-500 group-hover:brightness-[0.4] group-hover:grayscale-0 group-hover:scale-[1.04]"
                  style={{
                    filter: active
                      ? "brightness(0.5)"
                      : hasFilter
                        ? "brightness(0.7) grayscale(0.5)"
                        : "brightness(0.55) grayscale(0.3)",
                    transitionTimingFunction: "var(--ease-smooth)",
                  }}
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
                <div className={`absolute inset-0 flex flex-col justify-end p-[clamp(12px,2vw,24px)] transition-opacity duration-500 ${!active && hasFilter ? "opacity-40" : ""}`}>
                  <p className="font-display text-[clamp(14px,1.6vw,20px)] font-bold text-white tracking-tight">
                    {tc(cat.key)}
                  </p>
                  <p className="font-body text-[11px] font-normal text-white/50 mt-1">
                    {t("projectCount", { count: cat.count })}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <ProjectGrid projects={filtered} />
    </>
  );
}
