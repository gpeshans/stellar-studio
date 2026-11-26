import Image from "next/image";
import { COLLABORATORS } from "@/lib/data";
import type { Collaborator } from "@/lib/types";

// Logos come in very different shapes, so each gets the same area rather than
// the same height: long wordmarks sit lower, compact marks taller.
const LOGO_AREA = 5600; // px², e.g. 150 × 37

function logoSize({ width, height, scale = 1 }: Collaborator["logo"]) {
  const h = Math.sqrt((LOGO_AREA * height) / width) * scale;
  return { width: Math.round((h * width) / height), height: Math.round(h) };
}

/** The firms we work with, as a wall of black logos linking to their sites. */
export default function CollaboratorGrid() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-5 border border-gray-5 mx-[var(--pad)] mb-24">
      {COLLABORATORS.map(({ name, url, logo }) => {
        const size = logoSize(logo);
        return (
          <li key={name} className="bg-white">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-[clamp(128px,13vw,184px)] px-8 hover:bg-bg2 transition-colors duration-400"
            >
              <Image
                src={logo.src}
                alt={name}
                width={size.width}
                height={size.height}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-400"
              />
              <span
                aria-hidden="true"
                className="absolute top-4 right-5 font-body text-xs text-gray-4 group-hover:text-black transition-colors duration-400"
              >
                ↗
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
