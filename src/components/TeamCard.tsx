import Image from "next/image";
import type { TeamMember } from "@/lib/types";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="group relative overflow-hidden mb-3.5 bg-bg2" style={{ aspectRatio: "3/4" }}>
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>
      <h3 className="font-display text-base font-semibold mb-0.5">
        {member.name}
      </h3>
      <p className="font-body text-[13px] font-light text-gray-3">
        {member.role}
      </p>
    </div>
  );
}
