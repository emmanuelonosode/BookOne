"use client";

import { useState, useEffect } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && localStorage.getItem("newsletterSubscribed") === "true") {
      setHidden(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        if (typeof window !== "undefined") {
          localStorage.setItem("newsletterSubscribed", "true");
        }
        setTimeout(() => setHidden(true), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!mounted || hidden) return null;

  return (
    <div className="border border-white/[0.08] p-8">
      <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-mono mb-4">
        Stay Updated
      </p>
      <h3
        className="font-display font-bold text-white leading-tight mb-2"
        style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
      >
        Get the latest insights.
      </h3>
      <p className="text-sm text-white/35 leading-relaxed mb-6 max-w-sm">
        Web design, SEO, and AI automation — delivered to your inbox.
      </p>

      {status === "success" ? (
        <p className="text-sm text-[#E8FF47] font-mono tracking-wide">
          You&apos;re in. Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 border-b border-white/[0.12] focus:border-white/50 bg-transparent py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-[10px] tracking-[0.15em] uppercase font-mono text-[#E8FF47] hover:text-white transition-colors duration-200 disabled:opacity-40 whitespace-nowrap"
          >
            {status === "loading" ? "Sending…" : "Subscribe →"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 text-xs text-red-400 font-mono">
          Something went wrong. Try again or email us directly.
        </p>
      )}

      <p className="text-[10px] text-white/20 mt-4 font-mono">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
