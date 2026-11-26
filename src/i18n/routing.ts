import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "mk"],
  defaultLocale: "mk",
  localePrefix: "always",
  // The bare domain always opens in Macedonian, whatever the browser's
  // language. English is one click away in the header.
  localeDetection: false,
});
