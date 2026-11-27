import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionLabel from "./SectionLabel";
import ArrowLink from "./ArrowLink";

/** The studio in a few lines, beside Brankica's portrait. */
export default function HomeIntro() {
  const t = useTranslations("home.intro");
  const tf = useTranslations("studio.founder");

  return (
    <section
      id="intro"
      className="scroll-mt-16 grid grid-cols-1 lg:grid-cols-[clamp(240px,30vw,460px)_minmax(0,1fr)] items-center gap-x-[clamp(32px,7vw,112px)] gap-y-12 px-[var(--pad)] py-[clamp(72px,9vw,128px)]"
    >
      <div className="relative aspect-[4/5] w-full max-w-[420px] lg:max-w-none overflow-hidden bg-bg2">
        <Image
          src="/images/studio/brankica.jpg"
          alt={tf("photoAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 420px, 30vw"
        />
      </div>

      <div className="max-w-[600px]">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.15] tracking-tight">
          {t("heading")}
        </h2>
        <p className="mt-6 font-body text-[15px] font-light leading-[1.85] text-gray-2">
          {t("paragraph")}
        </p>
        {/* Her name in the logo's serif, as on the Studio page. */}
        <p className="mt-8 flex items-center gap-4">
          <span aria-hidden="true" className="w-10 h-[1.5px] bg-black" />
          <span>
            <span className="block font-logo text-[26px] font-medium leading-none">{tf("name")}</span>
            <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-gray-3 mt-2">
              {tf("role")}
            </span>
          </span>
        </p>
        <ArrowLink href="/studio" className="mt-10">
          {t("link")}
        </ArrowLink>
      </div>
    </section>
  );
}
