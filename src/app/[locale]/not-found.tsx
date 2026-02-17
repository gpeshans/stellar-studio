import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-16">
      <p className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-gray-3 mb-4">
        {t("code")}
      </p>
      <h1 className="font-display text-[clamp(32px,5vw,56px)] font-bold tracking-tight mb-4">
        {t("title")}
      </h1>
      <p className="font-body text-[15px] font-light text-gray-2 mb-10 max-w-[400px]">
        {t("description")}
      </p>
      <Link
        href="/"
        className="bg-black text-white px-12 py-[15px] font-body text-xs font-medium tracking-[0.1em] uppercase hover:bg-gray-1 transition-colors duration-300"
      >
        {t("button")}
      </Link>
    </div>
  );
}
