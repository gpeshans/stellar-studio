import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { padIndex } from "@/lib/utils";
import type { Service } from "@/lib/types";

interface ServiceRowProps {
  /** Anchor, so other pages can link straight to this service. */
  id: string;
  service: Service;
  index: number;
  /** Link to the Contact page with this service picked. */
  cta: { label: string; href: ComponentProps<typeof Link>["href"] };
}

export default function ServiceRow({ id, service, index, cta }: ServiceRowProps) {
  // The anchor sits on a wrapper that doesn't move. The row fades up from 24px
  // lower, so the browser would scroll to where the row is mid-animation, and
  // the row would end up partly under the header.
  return (
    <div id={id} className="scroll-mt-16">
      <div
        className="group grid grid-cols-[32px_1fr] md:grid-cols-[48px_1fr_2fr] gap-x-6 gap-y-5 py-10 border-b border-gray-5 items-baseline animate-fade-up transition-[padding-left] duration-400 hover:pl-3"
        style={{
          animationDelay: `${index * 0.06}s`,
          transitionTimingFunction: "var(--ease-smooth)",
        }}
      >
        <span className="font-display text-[13px] font-semibold text-gray-4">
          {padIndex(index)}
        </span>
        <div>
          <h3 className="font-display text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight">
            {service.title}
          </h3>
          <p className="font-body text-[13px] tracking-[0.04em] text-gray-3 mt-2">
            {service.tagline}
          </p>
        </div>
        <div className="col-span-full md:col-span-1">
          <p className="font-body text-[15px] leading-[1.75] text-black">
            {service.audience}
          </p>
          <p className="font-body text-[15px] font-light leading-[1.75] text-gray-2 mt-3">
            {service.desc}
          </p>
          {service.points && (
            <ul className="mt-5 flex flex-col gap-2">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 font-body text-sm font-light leading-[1.6] text-gray-2 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-gray-3"
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
          {service.options && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-5 border border-gray-5">
              {service.options.map((option) => (
                <div key={option.title} className="bg-white p-5">
                  <h4 className="font-display text-[15px] font-semibold tracking-tight mb-1.5">
                    {option.title}
                  </h4>
                  <p className="font-body text-sm font-light leading-[1.65] text-gray-2">
                    {option.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
          <Link
            href={cta.href}
            className="group/cta mt-7 inline-flex items-center gap-2.5 border-b border-black pb-1 font-body text-xs font-medium tracking-[0.1em] uppercase text-black"
          >
            {cta.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
