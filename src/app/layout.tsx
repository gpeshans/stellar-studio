import type { Metadata } from "next";
import { Cormorant_Garamond, Urbanist, Outfit } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import { organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stellar-arch.com"),
  title: {
    default: "Stellar Architecture Studio — Skopje, Macedonia",
    template: "%s | Stellar Architecture Studio",
  },
  description:
    "Architecture and interior design studio based in Skopje, Macedonia. Residential, commercial, and cultural projects designed with meticulous attention to context, materiality, and light.",
  openGraph: {
    type: "website",
    locale: "en_US",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${urbanist.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen bg-white text-black font-body">
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
