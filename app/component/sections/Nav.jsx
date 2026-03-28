"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Work", href: "/portfolio" },
  { name: "Websites", href: "/websites" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blogs" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo wordmark */}
          <Link
            href="/"
            aria-label="Bookone Studio Home"
            className="text-white font-display font-black text-xl tracking-tight hover:text-[#E8FF47] transition-colors duration-300"
          >
            BOOKONE STUDIO
          </Link>

          {/* Desktop nav links */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-200 ${
                  pathname === href ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-5">
            <Link
              href="/get-started"
              className="hidden sm:inline-flex items-center gap-2 border border-[#E8FF47]/60 text-[#E8FF47] hover:bg-[#E8FF47] hover:text-[#080808] transition-all duration-300 text-[11px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 rounded-full"
            >
              Get Started
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5 group"
            >
              <span
                className={`block h-px bg-white transition-all duration-300 origin-right ${
                  menuOpen ? "w-6 rotate-[-45deg] translate-y-[4px]" : "w-6"
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  menuOpen ? "w-6 opacity-0" : "w-4 group-hover:w-6"
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 origin-right ${
                  menuOpen ? "w-6 rotate-[45deg] translate-y-[-4px]" : "w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#080808] border-l border-white/[0.06] z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close */}
              <div className="flex items-center justify-between px-8 h-16 lg:h-20 border-b border-white/[0.06]">
                <span className="font-display font-black text-white text-lg">BOOKONE STUDIO</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-white/40 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                {NAV_LINKS.map(({ name, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={href}
                      className="block py-4 border-b border-white/[0.06] font-display font-bold text-3xl text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-8 pb-10">
                <Link
                  href="/get-started"
                  className="block text-center border border-[#E8FF47]/60 text-[#E8FF47] hover:bg-[#E8FF47] hover:text-[#080808] transition-all duration-300 text-xs tracking-[0.15em] uppercase font-semibold px-6 py-4 rounded-full"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
