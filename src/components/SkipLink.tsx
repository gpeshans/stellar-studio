import { useTranslations } from "next-intl";

export default function SkipLink() {
  const t = useTranslations("common");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:text-sm font-body"
    >
      {t("skipToMain")}
    </a>
  );
}
