interface ChoiceOption {
  key: string;
  label: string;
  description?: string;
}

interface ChoiceTilesProps {
  name: string;
  type: "radio" | "checkbox";
  options: ChoiceOption[];
  required?: boolean;
  /** Initially checked options, when the inputs manage their own state. */
  defaultKeys?: readonly string[];
  /** Checked option, when the parent controls the choice (radio only). */
  selectedKey?: string | null;
  onSelect?: (key: string) => void;
}

// Static class names so Tailwind can see them.
const COLUMNS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
  5: "sm:grid-cols-3 xl:grid-cols-5",
};

/**
 * Radio buttons or checkboxes shown as hairline tiles that turn black when
 * picked. The real inputs stay in place, invisible over each tile, so the
 * keyboard, screen readers and required-field checks work as usual.
 */
export default function ChoiceTiles({
  name,
  type,
  options,
  required,
  defaultKeys,
  selectedKey,
  onSelect,
}: ChoiceTilesProps) {
  const controlled = onSelect !== undefined;

  return (
    <div
      className={`grid grid-cols-1 gap-px bg-gray-5 border border-gray-5 ${COLUMNS[options.length] ?? COLUMNS[4]}`}
    >
      {options.map((option) => (
        <label
          key={option.key}
          className="group relative flex gap-3 bg-white p-4 cursor-pointer transition-colors duration-300 hover:bg-bg2 has-[:checked]:bg-black has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-black"
        >
          <input
            type={type}
            name={name}
            value={option.label}
            required={required}
            {...(controlled
              ? {
                  checked: selectedKey === option.key,
                  onChange: () => onSelect(option.key),
                }
              : { defaultChecked: defaultKeys?.includes(option.key) })}
            className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
          />
          <span
            aria-hidden="true"
            className={`mt-[5px] size-2.5 shrink-0 border border-gray-3 transition-colors duration-300 peer-checked:border-white peer-checked:bg-white ${type === "radio" ? "rounded-full" : ""}`}
          />
          <span className="flex flex-col gap-1">
            <span className="font-body text-sm leading-snug">{option.label}</span>
            {option.description && (
              <span className="font-body text-[13px] font-light leading-[1.6] text-gray-2 group-has-[:checked]:text-white/70">
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}
