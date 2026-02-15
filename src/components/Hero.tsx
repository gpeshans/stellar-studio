"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { STOCK } from "@/lib/images";
import { padIndex } from "@/lib/utils";

const HEROES = [
  { img: STOCK.hero1, project: PROJECTS[0] },
  { img: STOCK.hero2, project: PROJECTS[1] },
  { img: STOCK.hero3, project: PROJECTS[2] },
  { img: STOCK.hero4, project: PROJECTS[3] },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  const advance = useCallback(() => {
    setIdx((i) => (i + 1) % HEROES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(advance, 6000);
    return () => clearInterval(t);
  }, [advance]);

  const { project } = HEROES[idx];

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Slides */}
      {HEROES.map((h, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <Image
            src={h.img}
            alt={h.project.title}
            fill
            className="object-cover brightness-[0.65]"
            style={{
              animation: i === idx ? "hero-slow 10s ease-out forwards" : "none",
            }}
            sizes="100vw"
            priority={i === 0}
            loading={i === 0 ? undefined : "eager"}
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute text-white" style={{ bottom: "clamp(48px, 10vh, 140px)", left: "var(--pad)", right: "var(--pad)" }}>
        <p className="font-body text-[11px] font-medium tracking-[0.2em] uppercase opacity-50 mb-5">
          {padIndex(idx)} / {padIndex(HEROES.length - 1)}
        </p>
        <h1
          key={idx}
          className="font-display text-[clamp(28px,5vw,60px)] font-medium leading-none tracking-tight max-w-[750px] animate-fade-up"
        >
          {project.title}
        </h1>
        <p
          key={`${idx}-loc`}
          className="font-body text-sm font-light tracking-[0.03em] opacity-50 mt-3.5 mb-9 animate-fade-up"
          style={{ animationDelay: "0.08s" }}
        >
          {project.location} — {project.category}
        </p>

        <div className="flex items-center gap-8">
          <Link
            href={`/projects/${project.slug}`}
            className="bg-white text-black px-10 py-[15px] font-body text-[12px] leading-normal font-medium tracking-[0.1em] uppercase hover:bg-gray-5 transition-colors duration-300 cursor-pointer"
          >
            View Project
          </Link>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Hero slides">
            {HEROES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="h-[3px] border-none cursor-pointer rounded-sm transition-all duration-500"
                style={{
                  width: i === idx ? 28 : 8,
                  background:
                    i === idx ? "white" : "rgba(255,255,255,0.3)",
                  transitionTimingFunction: "var(--ease-smooth)",
                }}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Slide ${i + 1}: ${HEROES[i].project.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
