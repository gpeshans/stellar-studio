import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "mk", "sq"],
  defaultLocale: "en",
  localePrefix: "always",
});
