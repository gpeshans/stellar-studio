import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Stellar Architecture Studio. Located at ul. Makedonija 12, 1000 Skopje, Macedonia. We'd love to hear about your project.",
  openGraph: {
    title: "Contact | Stellar Architecture Studio",
    description:
      "Get in touch with Stellar Architecture Studio in Skopje, Macedonia.",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <SectionTitle label="Get in Touch" title="Contact" />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-20 md:gap-20 px-[clamp(20px,5vw,72px)] pb-24">
        <ContactInfo />
        <ContactForm />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Contact", url: "/contact" },
            ])
          ),
        }}
      />
    </div>
  );
}
