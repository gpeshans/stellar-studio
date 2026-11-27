import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contactHref } from "@/lib/enquiry";
import ArrowLink from "./ArrowLink";
import type { Project } from "@/lib/types";

const FACT = "py-3 border-b border-gray-5";
const FACT_LABEL = `${FACT} pr-8 font-body text-[11px] font-medium tracking-[0.15em] uppercase text-gray-3`;
const FACT_VALUE = `${FACT} font-body text-sm text-gray-1`;

/** The text side of a project page: name, description, facts and a way to get in touch. */
export default function ProjectInfo({ project }: { project: Project }) {
  const t = useTranslations("project");
  const tp = useTranslations("data.projects");
  const tt = useTranslations("projectTypes");
  const tc = useTranslations("categories");
  const text = (key: string) =>
    tp.has(`${project.slug}.${key}`) ? tp(`${project.slug}.${key}`) : undefined;

  // Facts we don't know yet are left out rather than shown as blanks.
  const facts = [
    { label: t("location"), value: text("location") },
    { label: t("year"), value: project.year },
    { label: t("area"), value: project.area },
    { label: t("client"), value: text("client") },
  ].filter((fact) => fact.value);

  return (
    <div>
      <Link
        href="/projects"
        className="font-body text-xs tracking-[0.08em] uppercase text-gray-3 hover:text-black transition-colors duration-300"
      >
        {t("allProjects")}
      </Link>

      <p className="mt-10 font-body text-[11px] font-medium tracking-[0.18em] uppercase text-gray-3">
        {tt(project.type)}
      </p>
      <h1 className="mt-3 font-display text-[clamp(30px,3.2vw,46px)] font-medium leading-[1.08] tracking-tight">
        {tp(`${project.slug}.title`)}
      </h1>
      <p className="mt-6 font-body text-[15px] font-light leading-[1.8] text-gray-2">
        {tp(`${project.slug}.description`)}
      </p>

      <dl className="mt-8 grid grid-cols-[auto_1fr] border-t border-gray-5">
        {facts.map(({ label, value }) => (
          <Fragment key={label}>
            <dt className={FACT_LABEL}>{label}</dt>
            <dd className={FACT_VALUE}>{value}</dd>
          </Fragment>
        ))}
        <dt className={FACT_LABEL}>{t("category")}</dt>
        <dd className={FACT_VALUE}>
          <Link
            href={{ pathname: "/projects", query: { category: project.category } }}
            className="underline underline-offset-4 decoration-gray-4 hover:decoration-black transition-colors duration-300"
          >
            {tc(project.category)}
          </Link>
        </dd>
      </dl>

      <div className="mt-10">
        <p className="font-display text-lg font-semibold tracking-tight">{t("similarHeading")}</p>
        <ArrowLink href={contactHref(project.category)} className="mt-3">
          {t("requestQuote")}
        </ArrowLink>
      </div>
    </div>
  );
}
