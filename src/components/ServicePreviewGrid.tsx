import { SERVICES } from "@/lib/data";
import { padIndex } from "@/lib/utils";

export default function ServicePreviewGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-5 border border-gray-5 mx-[var(--pad)] mb-20">
      {SERVICES.slice(0, 3).map((s, i) => (
        <div
          key={i}
          className="bg-white hover:bg-bg2 transition-colors duration-400"
          style={{ padding: "clamp(24px, 3vw, 48px)" }}
        >
          <span className="font-display text-5xl font-bold text-gray-5 block mb-4 leading-none">
            {padIndex(i)}
          </span>
          <h3 className="font-display text-lg font-semibold mb-2.5 tracking-tight">
            {s.title}
          </h3>
          <p className="font-body text-sm font-light leading-[1.7] text-gray-2">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
