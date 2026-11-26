import { useTranslations } from "next-intl";
import { STATS } from "@/lib/data";

export default function StatsBar() {
  const t = useTranslations("stats");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-5 border-y border-gray-5">
      {STATS.map(({ key, value }) => (
        <div key={key} className="bg-white py-12 px-6 text-center">
          <p className="font-display text-[clamp(32px,4vw,56px)] font-bold tracking-tight mb-1.5">
            {value}
          </p>
          <p className="font-body text-xs font-normal tracking-[0.08em] uppercase text-gray-3">
            {t(key)}
          </p>
        </div>
      ))}
    </div>
  );
}
