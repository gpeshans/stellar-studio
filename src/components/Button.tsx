import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

interface ButtonProps {
  href?: ComponentProps<typeof Link>["href"];
  /** `ghost`: white outline, for dark backgrounds. */
  variant?: "primary" | "secondary" | "inverted" | "ghost";
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  href,
  variant = "primary",
  children,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "inline-block font-body text-[12px] leading-normal font-medium tracking-[0.1em] uppercase cursor-pointer transition-all duration-300";

  const variants = {
    primary:
      "bg-black text-white border-none px-12 py-[15px] hover:bg-gray-1",
    secondary:
      "bg-transparent text-black border border-solid border-black px-9 py-[13px] hover:bg-black hover:text-white",
    inverted:
      "bg-white text-black border-none px-10 py-[15px] hover:bg-gray-5",
    ghost:
      "bg-transparent text-white border border-solid border-white/50 px-9 py-[14px] hover:bg-white hover:text-black hover:border-white",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
