import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES, serviceAnchor } from "@/lib/data";
import { padIndex } from "@/lib/utils";

/** The first three services, each linking to its row on the Services page. */
export default function ServicePreviewGrid() {
  const t = useTranslations("data.services");
  const th = useTranslations("home");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-5 border border-gray-5 mx-[var(--pad)] mb-20">
      {SERVICES.slice(0, 3).map((key, i) => (
        <Link
          key={key}
          href={{ pathname: "/services", hash: serviceAnchor(key) }}
          className="group flex flex-col bg-white hover:bg-bg2 transition-colors duration-400"
          style={{ padding: "clamp(24px, 3vw, 48px)" }}
        >
          <span className="font-display text-5xl font-bold text-gray-5 block mb-4 leading-none">
            {padIndex(i)}
          </span>
          <h3 className="font-display text-lg font-semibold mb-2.5 tracking-tight">
            {t(`${key}.title`)}
          </h3>
          <p className="font-body text-sm font-light leading-[1.7] text-gray-2">
            {t(`${key}.summary`)}
          </p>
          {/* Same look as the links on the Services page; the whole card is the link. */}
          <span className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2.5 border-b border-black pb-1 font-body text-xs font-medium tracking-[0.1em] uppercase text-black">
              {th("serviceLink")}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
