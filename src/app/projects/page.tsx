import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CategoryNav from "@/components/CategoryNav";
import { breadcrumbJsonLd } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse our complete portfolio of architectural projects — residential, commercial, cultural, interior, and public spaces across Macedonia.",
  openGraph: {
    title: "Projects | Stellar Architecture Studio",
    description:
      "Browse our complete portfolio of architectural projects across Macedonia.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <SectionTitle
        label="Portfolio"
        title="All Projects"
        sub="Browse our complete body of work by category."
      />
      <CategoryNav />
      <div className="h-20" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
            ])
          ),
        }}
      />
    </div>
  );
}
