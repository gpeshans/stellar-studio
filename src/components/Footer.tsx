import Link from "next/link";

const PAGE_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = ["Instagram", "LinkedIn", "Facebook", "Pinterest"];

export default function Footer() {
  return (
    <footer className="border-t border-gray-5 pt-12 pb-8 px-[var(--pad)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
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
            Architecture studio based in Skopje, Macedonia. Designing spaces
            that inspire.
          </p>
        </div>

        {/* Pages */}
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-4">
            Pages
          </p>
          {PAGE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-body text-sm font-light text-gray-2 mb-2.5 hover:text-black transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-4">
            Social
          </p>
          {SOCIAL_LINKS.map((name) => (
            <p
              key={name}
              className="font-body text-sm font-light text-gray-2 mb-2.5"
            >
              {name}
            </p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-4">
            Contact
          </p>
          <p className="font-body text-sm font-light text-gray-2 leading-[1.7]">
            hello@stellar-arch.com
            <br />
            +389 2 XXX XXX
            <br />
            <br />
            ul. Makedonija 12
            <br />
            1000 Skopje, Macedonia
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-5 border-t border-gray-5 flex-wrap gap-2">
        <p className="font-body text-xs font-light text-gray-3">
          &copy; 2025 Stellar Architecture Studio
        </p>
        <p className="font-body text-xs font-light text-gray-3">
          Privacy &middot; Terms
        </p>
      </div>
    </footer>
  );
}
