import type { SERVICES } from "./data";

type ServiceKey = (typeof SERVICES)[number];

/** Services quoted through a calculator on the Contact page. */
export const QUOTE_SERVICES = ["architecture", "interiors"] as const;
export type QuoteService = (typeof QUOTE_SERVICES)[number];

/** Topics of the general enquiry form: the other services, plus anything else. */
export const ENQUIRY_TOPICS = [
  "glowUp",
  "beforeYouBuy",
  "dayWithArchitect",
  "other",
] as const;
export type EnquiryTopic = (typeof ENQUIRY_TOPICS)[number];

export function isQuoteService(value: unknown): value is QuoteService {
  return QUOTE_SERVICES.includes(value as QuoteService);
}

export function isEnquiryTopic(value: unknown): value is EnquiryTopic {
  return ENQUIRY_TOPICS.includes(value as EnquiryTopic);
}

/**
 * Contact page link for a service: opens its quote calculator, or the enquiry
 * form with the service picked as the topic.
 */
export function contactHref(service: ServiceKey) {
  return {
    pathname: "/contact",
    query: { service },
    hash: isQuoteService(service) ? "quote" : "enquiry",
  };
}

/** Subject lines of the notification emails, kept in one language for the inbox. */
export const EMAIL_SUBJECTS: Record<QuoteService | EnquiryTopic, string> = {
  architecture: "Quote request: Architecture",
  interiors: "Quote request: Interiors",
  glowUp: "Enquiry: Interior glow-up",
  beforeYouBuy: "Enquiry: Before you buy an apartment",
  dayWithArchitect: "Enquiry: A day with an architect",
  other: "Enquiry",
};
