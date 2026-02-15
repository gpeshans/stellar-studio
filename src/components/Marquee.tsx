const TEXT = "STELLAR \u2014 ARCHITECTURE \u2014 DESIGN \u2014 SPACE \u2014 FORM \u2014 LIGHT \u2014 ";

export default function Marquee() {
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
            {TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
