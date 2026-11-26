import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionLabel from "./SectionLabel";

/** Brankica's portrait and words, which open the Studio page. */
export default function FounderNote() {
  const t = useTranslations("studio.founder");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[clamp(240px,34vw,540px)_minmax(0,1fr)] items-center gap-x-[clamp(32px,7vw,112px)] gap-y-12 px-[var(--pad)] pb-[clamp(64px,7vw,104px)]">
      <div className="relative aspect-[4/5] w-full max-w-[460px] lg:max-w-none overflow-hidden bg-bg2">
        <Image
          src="/images/studio/brankica.jpg"
          alt={t("photoAlt")}
          fill
          preload
          className="object-cover"
          sizes="(max-width: 1023px) 460px, 34vw"
        />
      </div>

      <div className="max-w-[620px] animate-fade-up">
        <SectionLabel>{t("role")}</SectionLabel>
        {/* Her name in the serif of the logo: the one personal note on the site. */}
        <h3 className="font-logo text-[clamp(44px,5vw,72px)] font-medium leading-none tracking-[-0.01em]">
          {t("name")}
        </h3>
        <div aria-hidden="true" className="w-10 h-[1.5px] bg-black my-8" />

        <div className="max-w-[540px] space-y-5 font-body text-[15px] font-light leading-[1.85] text-gray-2">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
      </div>
    </section>
  );
}
