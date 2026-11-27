"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { ProjectImage } from "@/lib/types";

const isWide = (image: ProjectImage) => image.width / image.height >= 1.2;

/**
 * Lays the images out in rows: wide ones alone, upright ones in pairs. An
 * upright image waiting for a partner may move past wide ones.
 */
function toRows(images: ProjectImage[]) {
  const rows: ProjectImage[][] = [];
  let waiting: ProjectImage | null = null;
  for (const image of images) {
    if (isWide(image)) {
      rows.push([image]);
    } else if (waiting) {
      rows.push([waiting, image]);
      waiting = null;
    } else {
      waiting = image;
    }
  }
  if (waiting) rows.push([waiting]);
  return rows;
}

const FULL_WIDTH = "(min-width: 1024px) 62vw, 100vw";
const HALF_WIDTH = "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw";

interface ShotProps {
  image: ProjectImage;
  title: string;
  /** Position among all images, from 1. */
  number: number;
  count: number;
  sizes: string;
  onOpen: () => void;
}

/**
 * One image, whole (never cropped, so its watermark stays intact), filling
 * its share of the row. Opens full screen.
 */
function Shot({ image, title, number, count, sizes, onOpen }: ShotProps) {
  const t = useTranslations("project");
  const ratio = image.width / image.height;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t("openImage", { number, count })}
      className="gallery-trigger relative block w-full overflow-hidden bg-bg2 sm:[flex:var(--shape)_1_0%]"
      style={{ aspectRatio: ratio, "--shape": ratio } as React.CSSProperties}
    >
      <Image
        src={image.src}
        alt={t("imageAlt", { title, number })}
        fill
        preload={number === 1}
        className="object-cover"
        sizes={sizes}
      />
    </button>
  );
}

interface ProjectViewProps {
  title: string;
  /** Cover first. */
  images: ProjectImage[];
  /** The text column (ProjectInfo). */
  children: React.ReactNode;
}

/**
 * A project page's layout. On wide screens the text stays pinned on the left
 * while the images scroll past on the right; on narrow ones the cover comes
 * first, then the text, then the images. Any image opens full screen.
 */
export default function ProjectView({ title, images, children }: ProjectViewProps) {
  const t = useTranslations("project");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // The text column pins near the top while the images scroll. When it's
  // taller than the window, it scrolls along until its end is in view and
  // pins there instead, so nothing in it is ever out of reach. Its height
  // feeds the `top` below.
  const info = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = info.current;
    if (!el) return;
    const observer = new ResizeObserver(() =>
      el.style.setProperty("--info-height", `${el.offsetHeight}px`)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [cover, ...rest] = images;
  const rows = toRows(rest);
  // The order people see them in, which the full-screen view follows.
  const ordered = [cover, ...rows.flat()];
  const shot = (image: ProjectImage, sizes: string) => {
    const i = ordered.indexOf(image);
    return (
      <Shot
        key={image.src}
        image={image}
        title={title}
        number={i + 1}
        count={ordered.length}
        sizes={sizes}
        onOpen={() => {
          setIndex(i);
          setOpen(true);
        }}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 gap-y-10 px-[var(--pad)] pt-8 pb-[clamp(64px,8vw,112px)] [grid-template-areas:'cover'_'info'_'rest'] lg:grid-cols-[minmax(300px,2fr)_minmax(0,3fr)] xl:grid-cols-[minmax(300px,1fr)_minmax(0,2fr)] lg:gap-x-[clamp(40px,5vw,88px)] lg:gap-y-2 lg:pt-12 lg:[grid-template-areas:'info_cover'_'info_rest']">
      <div className="[grid-area:cover]">{shot(cover, FULL_WIDTH)}</div>

      <aside
        ref={info}
        className="[grid-area:info] lg:sticky lg:self-start lg:top-[min(6rem,calc(100svh_-_var(--info-height,0px)_-_2rem))]"
      >
        {children}
      </aside>

      {rows.length > 0 && (
        <div className="[grid-area:rest] flex flex-col gap-2">
          {rows.map((row) => {
            const lone = row.length === 1 && !isWide(row[0]);
            return (
              <div
                key={row[0].src}
                className={`flex flex-col sm:flex-row gap-2 ${lone ? "sm:w-1/2 sm:self-center" : ""}`}
              >
                {row.map((image) => shot(image, row.length === 1 && !lone ? FULL_WIDTH : HALF_WIDTH))}
              </div>
            );
          })}
        </div>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={ordered.map((image, i) => ({
          src: image.src,
          width: image.width,
          height: image.height,
          alt: t("imageAlt", { title, number: i + 1 }),
        }))}
        plugins={[Zoom]}
        on={{ view: ({ index: i }) => setIndex(i) }}
        animation={{ fade: 300, swipe: 400 }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ imageFit: "contain" }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.92)" } }}
      />
    </div>
  );
}
