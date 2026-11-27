import { useTranslations } from "next-intl";
import Button from "./Button";

/** The black band that closes the home and Services pages. */
export default function ContactCTA() {
  const t = useTranslations("services");

  return (
    <section className="text-center py-20 px-6 bg-black text-white">
      <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold tracking-tight mb-4">
        {t("ctaHeading")}
      </h2>
      <p className="font-body text-[15px] font-light text-gray-3 max-w-[560px] mx-auto mb-9">
        {t("ctaSub")}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href={{ pathname: "/contact", hash: "quote" }} variant="inverted">
          {t("requestQuote")}
        </Button>
        <Button href={{ pathname: "/contact", hash: "enquiry" }} variant="ghost">
          {t("sendEnquiry")}
        </Button>
      </div>
    </section>
  );
}
