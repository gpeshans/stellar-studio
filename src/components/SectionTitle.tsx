import SectionLabel from "./SectionLabel";

interface SectionTitleProps {
  label: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  label,
  title,
  sub,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className="py-20 pb-12 px-[var(--pad)]"
      style={{ textAlign: align }}
    >
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display text-[clamp(28px,4.2vw,56px)] font-bold leading-[1.1] tracking-tight">
        {title}
      </h2>
      {sub && (
        <p
          className="font-body text-base font-light text-gray-2 mt-4 max-w-[520px]"
          style={align === "center" ? { margin: "16px auto 0" } : undefined}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
