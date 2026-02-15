import { STATS } from "@/lib/data";

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-gray-5">
      {STATS.map((s, i) => (
        <div
          key={i}
          className="py-12 px-6 text-center border-b md:border-b-0"
          style={{
            borderRight: i < STATS.length - 1 ? "1px solid var(--color-gray-5)" : "none",
          }}
        >
          <p className="font-display text-[clamp(32px,4vw,56px)] font-bold tracking-tight mb-1.5">
            {s.number}
          </p>
          <p className="font-body text-xs font-normal tracking-[0.08em] uppercase text-gray-3">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
