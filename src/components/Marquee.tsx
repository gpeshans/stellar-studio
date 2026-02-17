import { useTranslations } from "next-intl";

export default function Marquee() {
  const t = useTranslations("marquee");

  return (
    <div
      className="overflow-hidden py-9 border-t border-b border-gray-5 bg-white"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="font-display text-[clamp(24px,4vw,48px)] font-bold text-gray-5 tracking-[0.04em]"
          >
            {t("text")}
          </span>
        ))}
      </div>
    </div>
  );
}
