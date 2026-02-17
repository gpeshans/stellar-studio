import { useTranslations } from "next-intl";
import { TEAM } from "@/lib/data";
import TeamCard from "./TeamCard";

export default function TeamGrid() {
  const t = useTranslations("data.team");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-[clamp(20px,5vw,72px)] pb-24">
      {TEAM.map((member, i) => (
        <TeamCard key={i} member={member} role={t(`${i}.role`)} index={i} />
      ))}
    </div>
  );
}
