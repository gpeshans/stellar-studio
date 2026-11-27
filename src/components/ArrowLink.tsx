import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

interface ArrowLinkProps {
  href: ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
}

/** An underlined, upper-case text link with an arrow that nudges on hover. */
export default function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 border-b border-black pb-1 font-body text-xs font-medium tracking-[0.1em] uppercase text-black ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
