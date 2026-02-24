"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  mk: "MK",
};

interface LanguageSwitcherProps {
  scrolled: boolean;
  showWhite: boolean;
}

export default function LanguageSwitcher({ scrolled, showWhite }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-1.5 items-center">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            className="font-body text-[11px] font-medium tracking-[0.06em] uppercase px-1.5 py-0.5 border-none bg-transparent cursor-pointer transition-colors duration-300"
            style={{
              color: active
                ? scrolled
                  ? "black"
                  : showWhite
                    ? "white"
                    : "black"
                : scrolled
                  ? "var(--color-gray-4)"
                  : showWhite
                    ? "rgba(255,255,255,0.4)"
                    : "var(--color-gray-4)",
              textDecoration: active ? "underline" : "none",
              textUnderlineOffset: "3px",
            }}
          >
            {LOCALE_LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}
