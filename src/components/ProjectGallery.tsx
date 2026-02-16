"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ProjectGalleryProps {
  gallery: string[];
  title: string;
}

export default function ProjectGallery({
  gallery,
  title,
}: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const galleryImages = gallery.slice(1);

  const slides = galleryImages.map((src, i) => ({
    src,
    alt: `${title} - gallery image ${i + 1}`,
  }));

  return (
    <>
      <div className="flex flex-col items-center gap-2 pb-16">
        <div className="w-[90vw] sm:w-[85vw] lg:w-[80vw] flex flex-col gap-2">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="gallery-trigger relative block w-full border-0 p-0 bg-transparent"
              aria-label={`View ${title} - gallery image ${i + 1} in fullscreen`}
            >
              <Image
                src={src}
                alt={`${title} - gallery image ${i + 1}`}
                width={0}
                height={0}
                className="w-full h-auto"
                sizes="50vw"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
        on={{ view: ({ index: i }) => setIndex(i) }}
        animation={{ fade: 300, swipe: 400 }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ imageFit: "contain" }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.92)" } }}
      />
    </>
  );
}
