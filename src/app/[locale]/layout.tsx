import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import { organizationJsonLd } from "@/lib/metadata";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const localeMap: Record<string, string> = {
    en: "en_US",
    mk: "mk_MK",
    sq: "sq_AL",
  };

  return {
    metadataBase: new URL("https://stellar-arch.com"),
    title: {
      default: t("defaultTitle"),
      template: `%s | Stellar Architecture Studio`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: localeMap[locale] || "en_US",
      siteName: "Stellar Architecture Studio",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
    alternates: {
      languages: {
        en: "/en",
        mk: "/mk",
        sq: "/sq",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${manrope.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-white text-black font-body">
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(locale)),
          }}
        />
      </body>
    </html>
  );
}
