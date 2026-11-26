// Studio contact details that are the same in every language. The postal
// address is written differently per language, so its display lines live in
// messages/*.json (footer.address, footer.city); the parts here feed links
// and structured data.
export const CONTACT = {
  email: "info@stellararchitecture.com",
  phone: "+389 77 516 992",
  /** The phone number in E.164 form, for tel: links and structured data. */
  phoneE164: "+38977516992",
  address: {
    street: "Bulevar Partizanski Odredi 106/1-42",
    city: "Skopje",
    postalCode: "1000",
    country: "MK",
  },
  /** Opening hours in schema.org form; the display text is footer.hours. */
  openingHours: "Mo-Fr 08:00-16:00",
  /** The studio's pin on Google Maps. */
  geo: { latitude: 42.0037492, longitude: 21.3948013 },
  mapsUrl: "https://maps.google.com/?cid=11500397634677258090",
  social: [
    { name: "Instagram", url: "https://www.instagram.com/stellar.architecture/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/brankicaad/" },
  ],
} as const;

/**
 * Google Maps embed of the studio's place pin, with map labels in the page's
 * language. Uses the format Google Maps' "Share → Embed a map" generates (no
 * API key), built from the place's feature ID and coordinates.
 */
export function mapEmbedUrl(locale: string) {
  const { latitude, longitude } = CONTACT.geo;
  return (
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200" +
    `!2d${longitude}!3d${latitude}` +
    "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1" +
    "!3m3!1m2!1s0x4defa398fbbdfc7%3A0x9f999eb78eae376a!2sStellar.Architecture" +
    `!5e0!3m2!1s${locale}!2smk!5m2!1s${locale}!2smk`
  );
}
