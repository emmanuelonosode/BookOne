"use client";
import Link from "next/link";

const LINKS = {
  Services: [
    { label: "Web Design", href: "/services" },
    { label: "AI Automation", href: "/services" },
    { label: "SEO", href: "/services" },
    { label: "Websites for Sale", href: "/websites" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blogs" },
    { label: "Authors", href: "/authors" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
    { label: "Cookies", href: "/cookies-policy" },
  ],
};

const SOCIALS = [
  { label: "IG", href: "https://instagram.com/officialbookone" },
  { label: "X", href: "https://twitter.com/bookonedev" },
  { label: "LI", href: "https://linkedin.com/company/bookone" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#080808]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
          <Link
            href="/"
            className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight hover:text-[#E8FF47] transition-colors duration-300 leading-none"
          >
            BOOKONE STUDIO
          </Link>
          <p className="text-xs text-white/30 max-w-xs leading-relaxed">
            Web design, AI automation & SEO for ambitious businesses.<br />
            Lagos, Nigeria · Serving clients worldwide.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-14">
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase mb-5">{group}</p>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {year} Bookone Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.15em] text-white/25 hover:text-white transition-colors duration-200 font-mono"
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
