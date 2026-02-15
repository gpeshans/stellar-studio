import type { Metadata } from "next";
import Image from "next/image";
import { STOCK } from "@/lib/images";
import SectionTitle from "@/components/SectionTitle";
import StatsBar from "@/components/StatsBar";
import TeamGrid from "@/components/TeamGrid";
import { breadcrumbJsonLd } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Learn about Stellar Architecture Studio — a multidisciplinary design practice founded in Skopje, Macedonia. Meet our team of architects and designers.",
  openGraph: {
    title: "Studio | Stellar Architecture Studio",
    description:
      "A multidisciplinary design practice founded in Skopje, Macedonia.",
  },
};

export default function StudioPage() {
  return (
    <div className="pt-16">
      <SectionTitle label="About" title="The Studio" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-[clamp(20px,5vw,72px)] pb-20 items-center">
        <div>
          <div className="w-10 h-[1.5px] bg-black mb-7" />
          <p className="font-display text-[clamp(20px,2.5vw,30px)] font-semibold leading-[1.35] tracking-tight mb-7">
            Great architecture is born from listening — to the site, to the
            light, and above all, to the people.
          </p>
          <p className="font-body text-[15px] font-light leading-[1.85] text-gray-2 mb-5">
            Stellar was founded with a simple conviction: every project,
            regardless of scale, deserves the same depth of thought and care.
            From private residences to public institutions, we approach each
            commission as an opportunity to create spaces that elevate everyday
            life.
          </p>
          <p className="font-body text-[15px] font-light leading-[1.85] text-gray-2">
            Our studio combines rigorous technical expertise with a deep
            sensitivity to context, materiality, and human experience. We work
            collaboratively with clients, engineers, and craftspeople to realize
            designs that are both ambitious and enduring.
          </p>
        </div>
        <div className="overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
          <Image
            src={STOCK.studio1}
            alt="Stellar Architecture Studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <StatsBar />

      <SectionTitle label="People" title="Our Team" />
      <TeamGrid />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Studio", url: "/studio" },
            ])
          ),
        }}
      />
    </div>
  );
}
