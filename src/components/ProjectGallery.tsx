import Image from "next/image";

interface ProjectGalleryProps {
  gallery: string[];
  title: string;
}

export default function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  return (
    <div className="px-[clamp(20px,5vw,72px)] pb-16 flex flex-col gap-2">
      {/* Full-width image */}
      <div className="overflow-hidden relative" style={{ aspectRatio: "21/9" }}>
        <Image
          src={gallery[1]}
          alt={`${title} - gallery image 1`}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <Image
            src={gallery[2]}
            alt={`${title} - gallery image 2`}
            fill
            className="object-cover"
            sizes="(max-width: 520px) 100vw, 50vw"
          />
        </div>
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <Image
            src={gallery[3]}
            alt={`${title} - gallery image 3`}
            fill
            className="object-cover"
            sizes="(max-width: 520px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Full-width closing */}
      <div className="overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
        <Image
          src={gallery[4]}
          alt={`${title} - gallery image 4`}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
