import type { Metadata } from "next";
import { SERVICES } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import ServiceRow from "@/components/ServiceRow";
import Button from "@/components/Button";
import { breadcrumbJsonLd } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end architectural services from Stellar Architecture Studio — architecture, interior design, urban planning, renovation, landscape, and consultation.",
  openGraph: {
    title: "Services | Stellar Architecture Studio",
    description:
      "End-to-end architectural services, from concept to handover.",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <SectionTitle
        label="Expertise"
        title="What We Do"
        sub="End-to-end architectural services, from concept to handover."
      />

      <div className="px-[clamp(20px,5vw,72px)] pb-20">
        {SERVICES.map((s, i) => (
          <ServiceRow key={i} service={s} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-20 px-6 bg-black text-white">
        <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold tracking-tight mb-4">
          Have a project in mind?
        </h2>
        <p className="font-body text-[15px] font-light text-gray-3 mb-9">
          We&apos;d love to hear about it.
        </p>
        <Button href="/contact" variant="inverted">
          Get in Touch
        </Button>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
            ])
          ),
        }}
      />
    </div>
  );
}
