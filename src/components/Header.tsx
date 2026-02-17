"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_KEYS = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/studio", key: "studio" },
  { href: "/services", key: "services" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const dark = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const showWhite = dark && !scrolled && !menuOpen;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-100 h-16 flex items-center justify-between transition-all duration-400"
        style={{
          paddingInline: "var(--pad)",
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-gray-5)"
            : "1px solid transparent",
          transitionTimingFunction: "var(--ease-smooth)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none cursor-pointer">
          <span
            className="font-logo text-[30px] font-medium tracking-[0.04em] lowercase transition-colors duration-300"
            style={{ color: showWhite ? "white" : "black" }}
          >
            stellar
          </span>
          <span
            className="font-body text-[9.5px] font-normal tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300"
            style={{
              color: showWhite ? "rgba(255,255,255,0.6)" : "var(--color-gray-3)",
            }}
          >
            Architecture
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex gap-8 items-center"
          aria-label="Main navigation"
        >
          {NAV_KEYS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative font-body text-[13px] font-normal tracking-[0.04em] py-1 transition-colors duration-300 cursor-pointer"
              style={{
                color: isActive(item.href)
                  ? scrolled
                    ? "black"
                    : showWhite
                      ? "white"
                      : "black"
                  : scrolled
                    ? "var(--color-gray-3)"
                    : showWhite
                      ? "rgba(255,255,255,0.6)"
                      : "var(--color-gray-3)",
              }}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-sm transition-colors duration-300"
                  style={{
                    background: scrolled
                      ? "black"
                      : showWhite
                        ? "white"
                        : "black",
                  }}
                />
              )}
            </Link>
          ))}
          <LanguageSwitcher scrolled={scrolled} showWhite={showWhite} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden font-body text-[13px] font-medium tracking-[0.08em] uppercase p-2 bg-transparent border-none cursor-pointer transition-colors duration-300"
          style={{
            color: scrolled ? "black" : showWhite ? "white" : "black",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t("close") : t("menu")}
        >
          {menuOpen ? t("close") : t("menu")}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-99 bg-white flex flex-col items-center justify-center gap-7 animate-fade-in">
          {NAV_KEYS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[32px] font-bold animate-fade-up"
              style={{
                color: isActive(item.href)
                  ? "black"
                  : "var(--color-gray-3)",
                animationDelay: `${i * 0.06}s`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <LanguageSwitcher scrolled={true} showWhite={false} />
          </div>
        </div>
      )}
    </>
  );
}
