import type { ReactNode } from "react";

export const FIELD_LABEL =
  "block font-body text-[10px] font-medium tracking-[0.15em] uppercase text-gray-3 mb-1";

export const INPUT =
  "w-full bg-transparent border-0 border-b border-gray-5 py-3.5 font-body text-[15px] font-light text-black outline-none focus:border-black transition-colors duration-300 placeholder:text-gray-3";

/** A small-caps label above its control, with an optional hint below. */
export function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={FIELD_LABEL}>{label}</span>
      {children}
      {hint && (
        <span className="mt-2 block font-body text-xs font-light text-gray-3">
          {hint}
        </span>
      )}
    </label>
  );
}

/** A number input in square metres, with the unit shown after it. */
export function AreaInput({
  name,
  required,
  placeholder,
}: {
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <span className="flex items-baseline gap-3 border-b border-gray-5 focus-within:border-black transition-colors duration-300">
      <input
        type="number"
        name={name}
        required={required}
        min={1}
        step="any"
        inputMode="decimal"
        placeholder={placeholder}
        className="w-full bg-transparent border-0 py-3.5 font-body text-[15px] font-light text-black outline-none placeholder:text-gray-3 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="font-body text-sm font-light text-gray-3">m²</span>
    </span>
  );
}

export function Consent({ children }: { children: ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        name="consent"
        value="yes"
        required
        className="mt-1 size-4 shrink-0 accent-black cursor-pointer"
      />
      <span className="font-body text-sm font-light leading-[1.6] text-gray-2">
        {children}
      </span>
    </label>
  );
}

/** Netlify's honeypot: hidden from people, so anything typed here is a bot. */
export function Honeypot() {
  return (
    <p className="hidden" aria-hidden="true">
      <label>
        Leave this empty
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  );
}

/** Shown in place of a form once it has been sent. */
export function SentMessage({ title, message }: { title: string; message: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-start py-12 animate-fade-up"
    >
      <div className="w-[52px] h-[52px] rounded-full border-2 border-black flex items-center justify-center text-[22px] mb-5">
        &#10003;
      </div>
      <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
      <p className="font-body text-[15px] font-light text-gray-2 max-w-[460px]">
        {message}
      </p>
    </div>
  );
}

export const SUBMIT_BUTTON =
  "bg-black text-white border-none px-12 py-[15px] font-body text-xs font-medium tracking-[0.1em] uppercase cursor-pointer hover:bg-gray-1 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
