"use client";

import Link from "next/link";

const LAST_UPDATED = "August 14, 2025";

const BackArrow = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Bullet = () => <span className="text-[#E8FF47] mt-1 shrink-0 text-xs leading-relaxed">—</span>;

export default function CookiesClient() {
  return (
    <main className="bg-[#080808] min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-200 font-mono mb-12">
          <BackArrow /> Home
        </Link>

        {/* Page header */}
        <div className="border-b border-white/[0.06] pb-16 mb-0">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-4">Legal</p>
          <h1 className="font-display font-black text-white leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Cookie Policy
          </h1>
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/25">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* 00 — Overview */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">00</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Overview</h2>
            </div>
            <p className="text-base text-white/55 leading-relaxed">
              Bookone Studio uses cookies and similar tracking technologies on{" "}
              <strong className="text-white/75 font-semibold">bookone.dev</strong> to improve your browsing experience, deliver personalised content, analyse site traffic, and provide relevant advertising. By using our website, you agree to the use of cookies in accordance with this policy.
            </p>
          </div>
        </section>

        {/* 01 — What Are Cookies */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">01</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>What Are Cookies?</h2>
            </div>
            <div className="space-y-4">
              <p className="text-base text-white/55 leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve functionality.
              </p>
              <div className="space-y-3">
                {[
                  ["Session cookies", "Deleted when you close your browser."],
                  ["Persistent cookies", "Remain until they expire or are manually deleted."],
                ].map(([label, text]) => (
                  <div key={label} className="flex items-start gap-3">
                    <Bullet />
                    <span className="text-base text-white/55 leading-relaxed">
                      <strong className="text-white/75 font-semibold">{label}</strong> — {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Types of Cookies */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">02</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Types We Use</h2>
            </div>
            <div className="space-y-3">
              {[
                ["Essential Cookies", "Required for the website to function — session management and security tokens."],
                ["Performance & Analytics", "Used with tools like Google Analytics to understand visitor interaction and improve performance."],
                ["Functional Cookies", "Remember your preferences (e.g. language, theme) for a personalised experience."],
                ["Advertising & Marketing", "Used for ad targeting through tools like Facebook Pixel or Google Ads, based on browsing activity."],
              ].map(([label, text]) => (
                <div key={label} className="flex items-start gap-3">
                  <Bullet />
                  <span className="text-base text-white/55 leading-relaxed">
                    <strong className="text-white/75 font-semibold">{label}:</strong> {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Third-Party Cookies */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">03</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Third-Party Cookies</h2>
            </div>
            <div className="space-y-4">
              <p className="text-base text-white/55 leading-relaxed">Some cookies come from third-party services we use:</p>
              <div className="space-y-3">
                {[
                  "Google Analytics — traffic analysis",
                  "Facebook Pixel — ad targeting",
                  "Sanity.io CDN — content delivery and caching",
                  "Cloudflare — security and performance optimisation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Bullet />
                    <span className="text-base text-white/55 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 — How to Control */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">04</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>How to Control Cookies</h2>
            </div>
            <div className="space-y-4">
              <p className="text-base text-white/55 leading-relaxed">You can manage or delete cookies through your browser settings:</p>
              <div className="space-y-3">
                {[
                  ["Google Chrome", "https://support.google.com/chrome/answer/95647"],
                  ["Mozilla Firefox", "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies"],
                  ["Microsoft Edge", "https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies"],
                  ["Safari", "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"],
                ].map(([browser, url]) => (
                  <div key={browser} className="flex items-start gap-3">
                    <Bullet />
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-white/55 hover:text-[#E8FF47] transition-colors duration-200"
                    >
                      {browser}
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-base text-white/55 leading-relaxed">
                You can opt out of Google Analytics tracking{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#E8FF47] hover:text-white transition-colors duration-200">
                  here
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* 05 — Changes */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">05</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Changes to This Policy</h2>
            </div>
            <p className="text-base text-white/55 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect technology changes, legal updates, or our business practices. The date at the top of this page indicates the most recent revision.
            </p>
          </div>
        </section>

        {/* 06 — Contact */}
        <section className="pt-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">06</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Contact Us</h2>
            </div>
            <div className="space-y-5">
              <p className="text-base text-white/55 leading-relaxed">Questions about this Cookie Policy? Reach out.</p>
              <div>
                {[
                  { label: "EM", value: "hello@bookone.dev", href: "mailto:hello@bookone.dev" },
                  { label: "PH", value: "+234 807 708 0903", href: "tel:+2348077080903" },
                  { label: "LO", value: "Allen Avenue, Lagos, Nigeria", href: null },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 border-t border-white/[0.06] py-4">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/20 w-8 pt-px shrink-0">{label}</span>
                    {href ? (
                      <a href={href} className="text-sm text-white/50 hover:text-[#E8FF47] transition-colors duration-200">{value}</a>
                    ) : (
                      <p className="text-sm text-white/50">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
