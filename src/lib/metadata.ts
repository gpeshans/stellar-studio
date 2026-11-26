import type { Project } from "./types";
import { CONTACT } from "./contact";

/** The site's public address, for canonical URLs, the sitemap and structured data. */
export const SITE_URL = "https://stellararchitecture.com";
const SITE_NAME = "Stellar Architecture Studio";

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: CONTACT.address.street,
  addressLocality: CONTACT.address.city,
  postalCode: CONTACT.address.postalCode,
  addressCountry: CONTACT.address.country,
};

export function organizationJsonLd(locale?: string) {
  const url = locale ? `${SITE_URL}/${locale}` : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url,
    logo: `${SITE_URL}/og-default.jpg`,
    description:
      "Architecture and interior design studio based in Skopje, Macedonia.",
    address: POSTAL_ADDRESS,
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      contactType: "customer service",
    },
    sameAs: CONTACT.social.map((s) => s.url),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: `${SITE_URL}/og-default.jpg`,
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      ...CONTACT.geo,
    },
    hasMap: CONTACT.mapsUrl,
    openingHours: CONTACT.openingHours,
    priceRange: "$$$$",
  };
}

export function breadcrumbJsonLd(
  locale: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.url}`,
    })),
  };
}

export function projectJsonLd(project: Project, locale: string, translatedDescription?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: translatedDescription || project.description,
    image: project.img,
    url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    dateCreated: project.year,
    genre: project.category,
  };
}
