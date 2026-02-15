import { padIndex } from "@/lib/utils";
import type { Service } from "@/lib/types";

interface ServiceRowProps {
  service: Service;
  index: number;
}

export default function ServiceRow({ service, index }: ServiceRowProps) {
  return (
    <div
      className="group grid grid-cols-[32px_1fr] md:grid-cols-[48px_1fr_2fr] gap-6 py-9 border-b border-gray-5 items-baseline animate-fade-up transition-[padding-left] duration-400 hover:pl-3"
      style={{
        animationDelay: `${index * 0.06}s`,
        transitionTimingFunction: "var(--ease-smooth)",
      }}
    >
      <span className="font-display text-[13px] font-semibold text-gray-4">
        {padIndex(index)}
      </span>
      <h3 className="font-display text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight">
        {service.title}
      </h3>
      <p className="font-body text-[15px] font-light leading-[1.75] text-gray-2 col-span-full md:col-span-1">
        {service.desc}
      </p>
    </div>
  );
}
