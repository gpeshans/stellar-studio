"use client";

import { useState, type SubmitEvent } from "react";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          formData as unknown as Record<string, string>,
        ).toString(),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("Failed to send message. Please try again later.");
      }
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsPending(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-fade-up">
        <div className="w-[52px] h-[52px] rounded-full border-2 border-black flex items-center justify-center text-[22px] mb-5">
          &#10003;
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">Message Sent</h3>
        <p className="font-body text-[15px] font-light text-gray-2">
          We&apos;ll respond within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-body text-[15px] font-light leading-[1.75] text-gray-2 mb-10">
        Whether you&apos;re planning a new build, a renovation, or just
        exploring ideas — tell us about your vision and we&apos;ll take it from
        there.
      </p>

      <form
        onSubmit={handleSubmit}
        name="contact"
        className="flex flex-col gap-1.5"
      >
        <input type="hidden" name="form-name" value="contact" />
        {[
          { name: "name", placeholder: "Your Name", type: "text" },
          { name: "email", placeholder: "Email Address", type: "email" },
          { name: "subject", placeholder: "Subject", type: "text" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required
            className="w-full bg-transparent border-0 border-b border-gray-5 py-3.5 font-body text-[15px] font-light text-black outline-none focus:border-black transition-colors duration-300 placeholder:text-gray-3"
          />
        ))}
        <textarea
          name="message"
          placeholder="Tell us about your project..."
          rows={5}
          required
          className="w-full bg-transparent border-0 border-b border-gray-5 py-3.5 mt-1 font-body text-[15px] font-light text-black outline-none focus:border-black transition-colors duration-300 resize-y min-h-[100px] placeholder:text-gray-3"
        />

        {error && (
          <p className="font-body text-sm text-red-600 mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-7 self-start bg-black text-white border-none px-12 py-[15px] font-body text-xs font-medium tracking-[0.1em] uppercase cursor-pointer hover:bg-gray-1 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
