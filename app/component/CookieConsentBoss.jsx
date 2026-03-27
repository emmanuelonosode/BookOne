"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "bookoneConsent";

export default function ClientCookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      // localStorage unavailable (private browsing, SSR guard)
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  }

  function handleDecline() {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9990] border-t border-white/[0.08] bg-[#0D0D0D]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between gap-6 flex-wrap">
            <p className="text-[11px] font-mono text-white/40 leading-relaxed">
              We use cookies to improve your experience.{" "}
              <Link
                href="/cookies-policy"
                className="text-[#E8FF47] hover:text-white transition-colors duration-200"
              >
                Learn more
              </Link>
              .
            </p>
            <div className="flex items-center gap-5 shrink-0">
              <button
                onClick={handleDecline}
                className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 hover:text-white transition-colors duration-200"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="text-[10px] font-mono uppercase tracking-[0.15em] border border-[#E8FF47]/40 text-[#E8FF47] hover:bg-[#E8FF47] hover:text-[#080808] px-4 py-2 transition-all duration-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
