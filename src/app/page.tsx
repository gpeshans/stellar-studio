import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProjectGrid from "@/components/ProjectGrid";
// import Marquee from "@/components/Marquee";
import AboutTeaser from "@/components/AboutTeaser";
import ServicePreviewGrid from "@/components/ServicePreviewGrid";
import Button from "@/components/Button";
import { PROJECTS } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      <Hero />

      <SectionTitle
        label="Selected Work"
        title="Recent Projects"
        sub="A curated selection of our latest residential, cultural, and commercial work."
      />
      <ProjectGrid projects={PROJECTS.slice(0, 6)} />

      <div className="flex justify-center py-12 pb-20">
        <Button href="/projects">All Projects</Button>
      </div>

      {/* <Marquee /> */}
      <AboutTeaser />

      <SectionTitle label="Expertise" title="Services" align="center" />
      <ServicePreviewGrid />
    </div>
  );
}
