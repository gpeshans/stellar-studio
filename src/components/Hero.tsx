"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HERO_PROJECTS } from "@/lib/data";
import { padIndex } from "@/lib/utils";
import Button from "./Button";

/**
 * The home page opening: what the studio does, over a slow crossfade of
 * project photos, with the project on screen named in the corner.
 */
export default function Hero() {
  const [idx, setIdx] = useState(0);
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("services");
  const tp = useTranslations("data.projects");
  const tt = useTranslations("projectTypes");

  const advance = useCallback(() => {
    setIdx((i) => (i + 1) % HERO_PROJECTS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance]);

  const project = HERO_PROJECTS[idx];
  const location = tp.has(`${project.slug}.location`) ? tp(`${project.slug}.location`) : null;

  return (
    // At least a full screen, and taller if the text needs it (short phones),
    // so the text never slides under the header.
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-white">
      {/* Slides */}
      {HERO_PROJECTS.map((h, i) => (
        <div
          key={h.slug}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <Image
            src={h.cover.plain}
            alt={tp(`${h.slug}.title`)}
            fill
            className="object-cover brightness-[0.6]"
            style={{
              animation: i === idx ? "hero-slow 10s ease-out forwards" : "none",
            }}
            sizes="100vw"
            preload={i === 0}
            loading={i === 0 ? undefined : "eager"}
          />
        </div>
      ))}
      {/* A shade behind the text, darkest at the bottom. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      <div className="relative flex flex-col gap-10 px-[var(--pad)] pt-28 pb-[clamp(80px,12vh,140px)] lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[780px] animate-fade-up">
          <h1 className="font-display text-[clamp(34px,5vw,66px)] font-semibold leading-[1.05] tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-[560px] font-body text-[clamp(15px,1.2vw,17px)] font-light leading-[1.7] text-white/75">
            {t("hero.sub")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={{ pathname: "/contact", hash: "quote" }} variant="inverted">
              {ts("requestQuote")}
            </Button>
            <Button href="/projects" variant="ghost">
              {t("viewProjects")}
            </Button>
          </div>
        </div>

        {/* The project on screen, and the slide controls. */}
        <div className="shrink-0 lg:text-right">
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group inline-block animate-fade-in">
            <span className="block font-body text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">
              {padIndex(idx)} / {padIndex(HERO_PROJECTS.length - 1)}
            </span>
            <span className="mt-2 block font-display text-lg font-medium tracking-tight underline-offset-4 decoration-1 group-hover:underline">
              {tp(`${project.slug}.title`)} <span aria-hidden="true">→</span>
            </span>
            <span className="block font-body text-sm font-light text-white/60">
              {tt(project.type)}
              {location && ` · ${location}`}
            </span>
          </Link>
          <div className="mt-4 flex gap-2 lg:justify-end" role="tablist" aria-label={tc("heroSlides")}>
            {HERO_PROJECTS.map((h, i) => (
              <button
                key={h.slug}
                onClick={() => setIdx(i)}
                className="h-[3px] border-none cursor-pointer rounded-sm transition-all duration-500"
                style={{
                  width: i === idx ? 28 : 8,
                  background: i === idx ? "white" : "rgba(255,255,255,0.3)",
                  transitionTimingFunction: "var(--ease-smooth)",
                }}
                role="tab"
                aria-selected={i === idx}
                aria-label={tc("slide", { num: i + 1, title: tp(`${h.slug}.title`) })}
              />
            ))}
          </div>
        </div>
      </div>

      <a
        href="#intro"
        aria-label={t("hero.scroll")}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 p-3 text-white/60 hover:text-white transition-colors duration-300"
      >
        <svg aria-hidden="true" width="30" height="15" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 1l14 13L29 1" />
        </svg>
      </a>
    </section>
  );
}
