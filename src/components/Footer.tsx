import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";

const NAV_KEYS = ["projects", "studio", "services", "contact"] as const;
const HOVER = "hover:text-black transition-colors duration-300";

export default function Footer() {
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");

  return (
    <footer className="border-t border-gray-5 pt-12 pb-8 px-[var(--pad)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="mb-3">
            <p className="font-logo text-[28px] font-medium tracking-[0.04em] lowercase">
              stellar
            </p>
            <p className="font-body text-[9px] font-normal tracking-[0.28em] uppercase text-gray-3 mt-0.5">
              Architecture
            </p>
          </div>
          <p className="font-body text-sm font-light text-gray-2 leading-[1.7] max-w-[280px]">
            {tf("tagline")}
          </p>
        </div>

        {/* Pages */}
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-4">
            {tf("pages")}
          </p>
          {NAV_KEYS.map((key) => (
            <Link
              key={key}
              href={`/${key === "studio" ? "studio" : key}`}
              className="block font-body text-sm font-light text-gray-2 mb-2.5 hover:text-black transition-colors duration-300 cursor-pointer"
            >
              {tn(key)}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-4">
            {tf("social")}
          </p>
          {CONTACT.social.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block font-body text-sm font-light text-gray-2 mb-2.5 ${HOVER}`}
            >
              {name}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-4">
            {tf("contact")}
          </p>
          <address className="not-italic font-body text-sm font-light text-gray-2 leading-[1.7]">
            {tf("address")}
            <br />
            {tf("city")}
            <br />
            {tf("hours")}
          </address>
          <p className="mt-4 font-body text-sm leading-[1.9]">
            <a href={`tel:${CONTACT.phoneE164}`} className={`block text-gray-1 ${HOVER}`}>
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={`block text-gray-1 ${HOVER}`}>
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-5 border-t border-gray-5 flex-wrap gap-2">
        <p className="font-body text-xs font-light text-gray-3">
          {tf("copyright")}
        </p>
        <p className="font-body text-xs font-light text-gray-3">
          {tf("legal")}
        </p>
      </div>
    </footer>
  );
}
