"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { ArrowRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <span
          className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--color-oxblood)" }}
        >
          <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
          You&rsquo;re on the list
          <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
        </span>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#9a8d7d" }}>
          First letter goes out Sunday. Check your inbox for a welcome note.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          className="flex-1 px-4 py-3 text-sm bg-transparent border outline-none transition-colors placeholder:text-[#3a312b] disabled:opacity-50"
          style={{
            borderColor: "#3a312b",
            color: "var(--color-bone)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#9a8d7d")}
          onBlur={(e) => (e.target.style.borderColor = "#3a312b")}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === "loading"}
          className="rounded-none whitespace-nowrap h-full"
          rightIcon={
            status !== "loading" ? (
              <ArrowRight className="h-4 w-4" />
            ) : undefined
          }
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      {status === "error" && message ? (
        <p className="mt-3 text-xs text-center" style={{ color: "#c0392b" }}>
          {message}
        </p>
      ) : null}

      <p
        className="mt-4 text-xs text-center leading-relaxed"
        style={{ color: "#3a312b" }}
      >
        No spam. Unsubscribe any time.
      </p>
    </form>
  );
}
