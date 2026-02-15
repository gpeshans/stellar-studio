export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-gray-3 mb-3">
      {children}
    </p>
  );
}
