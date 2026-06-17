"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../ui/Magnetic.jsx";
import LogoStack from "../ui/LogoStack.jsx";

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
        scrolled ? "border-b border-[#1C1917]/[0.08] bg-[#F4F1EA]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo: layered-stack mark + wordmark */}
          <Link
            href="/"
            aria-label="Bookone Studio Home"
            className="group flex items-center gap-2.5 text-[#1C1917] hover:text-[#15803D] transition-colors duration-300"
          >
            <LogoStack className="h-7 w-7 shrink-0" />
            <span className="font-display font-black text-xl tracking-tight">BOOKONE STUDIO</span>
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
                className={`link-underline text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-200 ${
                  pathname === href ? "text-[#1C1917]" : "text-[#6F6A62] hover:text-[#1C1917]"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-5">
            <Magnetic strength={14} className="hidden sm:inline-block">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 bg-[#15803D] text-white hover:bg-[#166534] transition-colors duration-200 text-[11px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 rounded-full"
              >
                Get a quote
              </Link>
            </Magnetic>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5 group"
            >
              <span
                className={`block h-px bg-[#1C1917] transition-all duration-300 origin-right ${
                  menuOpen ? "w-6 rotate-[-45deg] translate-y-[4px]" : "w-6"
                }`}
              />
              <span
                className={`block h-px bg-[#1C1917] transition-all duration-300 ${
                  menuOpen ? "w-6 opacity-0" : "w-4 group-hover:w-6"
                }`}
              />
              <span
                className={`block h-px bg-[#1C1917] transition-all duration-300 origin-right ${
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
              className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#F4F1EA] border-l border-[#1C1917]/[0.08] z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close */}
              <div className="flex items-center justify-between px-8 h-16 lg:h-20 border-b border-[#1C1917]/[0.08]">
                <span className="font-display font-black text-[#1C1917] text-lg">BOOKONE STUDIO</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-[#6F6A62] hover:text-[#1C1917] transition-colors">
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
                      className="block py-4 border-b border-[#1C1917]/[0.08] font-display font-bold text-3xl text-[#3A352F] hover:text-[#1C1917] transition-colors duration-200"
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
                  className="block text-center bg-[#15803D] text-white hover:bg-[#166534] transition-colors duration-200 text-xs tracking-[0.15em] uppercase font-semibold px-6 py-4 rounded-full"
                >
                  Get a quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
