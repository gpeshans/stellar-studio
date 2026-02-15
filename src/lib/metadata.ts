import type { Project } from "./types";

const SITE_URL = "https://stellar-arch.com";
const SITE_NAME = "Stellar Architecture Studio";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-default.jpg`,
    description:
      "Architecture and interior design studio based in Skopje, Macedonia.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Makedonija 12",
      addressLocality: "Skopje",
      postalCode: "1000",
      addressCountry: "MK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@stellar-arch.com",
      telephone: "+389-2-XXX-XXX",
      contactType: "customer service",
    },
    sameAs: [
      "https://instagram.com/stellararch",
      "https://linkedin.com/company/stellararch",
      "https://facebook.com/stellararch",
    ],
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
    telephone: "+389-2-XXX-XXX",
    email: "hello@stellar-arch.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Makedonija 12",
      addressLocality: "Skopje",
      postalCode: "1000",
      addressCountry: "MK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.9973,
      longitude: 21.428,
    },
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "$$$$",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.img,
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
