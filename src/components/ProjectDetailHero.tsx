import Image from "next/image";

interface ProjectDetailHeroProps {
  image: string;
  title: string;
}

export default function ProjectDetailHero({ image, title }: ProjectDetailHeroProps) {
  return (
    <div className="w-full h-[75vh] overflow-hidden animate-scale-in relative">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </div>
  );
}
