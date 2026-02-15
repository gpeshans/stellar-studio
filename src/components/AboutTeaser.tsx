import Image from "next/image";
import { STOCK } from "@/lib/images";
import SectionLabel from "./SectionLabel";
import Button from "./Button";

export default function AboutTeaser() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center" style={{ padding: "clamp(48px, 8vw, 120px)", paddingInline: "var(--pad)" }}>
        <SectionLabel>About Us</SectionLabel>
        <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight mb-6">
          Architecture should serve the people who inhabit it
        </h2>
        <p className="font-body text-[15px] font-light leading-[1.8] text-gray-2 max-w-[440px] mb-9">
          Founded in Skopje, Stellar is a multidisciplinary studio driven by a
          commitment to thoughtful design, material honesty, and lasting
          relationships with our clients and communities.
        </p>
        <Button href="/studio" variant="secondary" className="self-start">
          The Studio
        </Button>
      </div>
      <div className="overflow-hidden min-h-[400px] relative">
        <Image
          src={STOCK.studio1}
          alt="Stellar Architecture Studio workspace"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
