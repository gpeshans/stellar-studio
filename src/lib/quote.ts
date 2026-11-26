import type { QuoteService } from "./enquiry";

/**
 * One question in a quote calculator. Its wording lives in messages/*.json
 * under contact.quote.<service>.fields.<name>; each `name` must also exist on
 * the matching form in public/__forms.html, or Netlify drops the value.
 */
export type QuoteField =
  | {
      kind: "choice";
      name: string;
      options: readonly string[];
      required?: boolean;
      /** Show each option's description (fields.<name>.descriptions.<option>). */
      described?: boolean;
    }
  | {
      kind: "multi";
      name: string;
      options: readonly string[];
      preselected?: readonly string[];
    }
  | { kind: "text"; name: string; required?: boolean }
  | { kind: "area"; name: string; required?: boolean };

export interface QuoteStep {
  /** Step title key: contact.quote.<service>.steps.<key>. */
  key: string;
  fields: readonly QuoteField[];
}

/** Each calculator's Netlify form name and its steps, in order. */
export const QUOTE_FORMS: Record<
  QuoteService,
  { formName: string; steps: readonly QuoteStep[] }
> = {
  architecture: {
    formName: "quote-architecture",
    steps: [
      {
        key: "planning",
        fields: [
          {
            kind: "choice",
            name: "project_type",
            options: ["house", "residentialBuilding", "commercialBuilding", "other"],
            required: true,
          },
        ],
      },
      {
        key: "site",
        fields: [
          { kind: "text", name: "location", required: true },
          { kind: "area", name: "floor_area", required: true },
          { kind: "area", name: "plot_area" },
        ],
      },
      {
        key: "stage",
        fields: [
          {
            kind: "choice",
            name: "stage",
            options: ["lookingForPlot", "havePlot", "plotWithPlan"],
            required: true,
          },
        ],
      },
      {
        key: "scope",
        fields: [
          {
            kind: "multi",
            name: "scope",
            options: ["permitDesign", "coordination", "interiors"],
            preselected: ["permitDesign", "coordination"],
          },
        ],
      },
      {
        key: "timing",
        fields: [
          {
            kind: "choice",
            name: "start",
            options: ["asap", "within3", "in3to6", "later"],
            required: true,
          },
        ],
      },
    ],
  },
  interiors: {
    formName: "quote-interiors",
    steps: [
      {
        key: "space",
        fields: [
          {
            kind: "choice",
            name: "space_type",
            options: ["apartment", "house", "office", "retail"],
            required: true,
          },
        ],
      },
      {
        key: "site",
        fields: [
          { kind: "text", name: "location", required: true },
          { kind: "area", name: "area", required: true },
        ],
      },
      {
        key: "stage",
        fields: [
          {
            kind: "choice",
            name: "stage",
            options: ["construction", "ready", "renovation"],
            required: true,
          },
        ],
      },
      {
        key: "engagement",
        fields: [
          {
            kind: "choice",
            name: "engagement",
            options: ["design", "turnkey"],
            required: true,
            described: true,
          },
        ],
      },
      {
        key: "timing",
        fields: [
          {
            kind: "choice",
            name: "timing",
            options: ["within3", "in3to6", "in6to12", "unsure"],
            required: true,
          },
          {
            kind: "choice",
            name: "budget",
            options: ["under15", "from15to40", "from40to100", "over100", "unsure"],
          },
        ],
      },
    ],
  },
};

/** Netlify accepts requests up to 8 MB; keep the file safely under that. */
export const MAX_ATTACHMENT_BYTES = 7 * 1024 * 1024;
