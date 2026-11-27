"use client";

import { useEffect, useRef } from "react";

const INSET = 3; // px between the bar and the top and bottom of the window
const MIN_HEIGHT = 40; // px, so it stays easy to see on long pages
const HIDE_AFTER = 800; // ms after the last scroll

/**
 * A thin bar on the right edge that shows where you are on the page, only
 * while it scrolls. It stands in for the browser's scrollbar, which
 * globals.css hides on computers; touch screens keep their own, which
 * already behaves this way.
 */
export default function ScrollIndicator() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let frame = 0;
    let timer = 0;

    const update = () => {
      frame = 0;
      const { clientHeight: view, scrollHeight: full } = document.documentElement;
      const max = full - view;
      if (max <= 0) return;
      const track = view - 2 * INSET;
      const height = Math.max(MIN_HEIGHT, (track * view) / full);
      // Clamped because Safari's bounce at either end overshoots.
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      el.style.height = `${height}px`;
      el.style.transform = `translateY(${INSET + (track - height) * progress}px)`;
      el.setAttribute("data-active", "");
      clearTimeout(timer);
      timer = window.setTimeout(() => el.removeAttribute("data-active"), HIDE_AFTER);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  // Translucent black with a faint white edge, so it shows on white sections
  // and dark photos alike. Above the header, which would cut off its top.
  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-[3px] z-101 hidden w-1 rounded-full bg-black/40 ring-1 ring-white/40 opacity-0 transition-opacity duration-700 data-active:opacity-100 data-active:duration-150 pointer-fine:block"
    />
  );
}
