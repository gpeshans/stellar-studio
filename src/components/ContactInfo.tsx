import { useTranslations } from "next-intl";

const SOCIAL = ["Instagram", "LinkedIn", "Facebook"];

export default function ContactInfo() {
  const t = useTranslations("contact");
  const tf = useTranslations("footer");

  const INFO_BLOCKS = [
    {
      label: t("office"),
      lines: [
        "Stellar Architecture Studio",
        tf("address"),
        tf("city"),
      ],
    },
    { label: t("email"), lines: [tf("email")] },
    { label: t("phone"), lines: [tf("phone")] },
  ];

  return (
    <div>
      {INFO_BLOCKS.map((block, i) => (
        <div key={i} className="mb-9">
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-2.5">
            {block.label}
          </p>
          {block.lines.map((line, j) => (
            <p
              key={j}
              className="font-body text-[15px] font-light text-gray-1 leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
      ))}

      <div className="mb-9">
        <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-2.5">
          {t("follow")}
        </p>
        <div className="flex gap-5">
          {SOCIAL.map((name) => (
            <span
              key={name}
              className="font-body text-sm font-normal text-gray-2 underline underline-offset-[3px] hover:text-black transition-colors duration-300 cursor-pointer"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden bg-bg2 flex items-center justify-center"
        style={{ aspectRatio: "16/9" }}
      >
        <span className="font-body text-xs font-normal text-gray-3 tracking-[0.1em] uppercase">
          {t("mapPlaceholder")}
        </span>
      </div>
    </div>
  );
}
