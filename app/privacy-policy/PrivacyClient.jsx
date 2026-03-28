"use client";

import Link from "next/link";

const LAST_UPDATED = "July 24, 2025";

const BackArrow = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Bullet = () => <span className="text-[#E8FF47] mt-1 shrink-0 text-xs leading-relaxed">—</span>;

export default function PrivacyClient() {
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
            Privacy Policy
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
              At <strong className="text-white/80 font-semibold">Bookone Studio</strong>, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and share your information when you use our website or services.
            </p>
          </div>
        </section>

        {/* 01 — Information We Collect */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">01</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Information We Collect</h2>
            </div>
            <div className="space-y-3">
              {[
                ["Personal Information", "Your name, email, phone number, and details provided when requesting a quote, signing up for a newsletter, or making a payment."],
                ["Usage Data", "How you access and use the website — IP address, browser type, pages visited, time and date of visit, and other diagnostic data."],
                ["Cookies & Tracking", "We use cookies and similar tracking technologies to hold preferences, run analytics, and personalise your experience."],
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

        {/* 02 — How We Use Your Information */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">02</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>How We Use Your Information</h2>
            </div>
            <div className="space-y-3">
              {[
                "To provide and maintain our services, including web design, AI automation, and SEO projects.",
                "To notify you about changes to our services.",
                "To provide customer support and respond to your inquiries.",
                "To gather analysis so we can improve our services.",
                "To send updates and marketing materials — only with your explicit consent.",
                "To comply with legal obligations and protect against legal liability.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Bullet />
                  <span className="text-base text-white/55 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Sharing Your Information */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">03</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Sharing Your Information</h2>
            </div>
            <div className="space-y-5">
              <p className="text-base text-white/55 leading-relaxed">
                <strong className="text-white/80 font-semibold">We do not sell your personal data.</strong> We only share your information in these circumstances:
              </p>
              <div className="space-y-3">
                {[
                  ["Service Providers", "Third-party companies who process data on our behalf — hosting providers, analytics tools, payment processors."],
                  ["Legal Requirements", "If required by law or in response to valid requests by public authorities (e.g. a court or government agency)."],
                  ["Business Transfers", "If Bookone Studio is involved in a merger, acquisition, or asset sale, your data may be transferred."],
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
          </div>
        </section>

        {/* 04 — Your Rights */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">04</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Your Rights (NDPR)</h2>
            </div>
            <div className="space-y-5">
              <p className="text-base text-white/55 leading-relaxed">
                Under the <strong className="text-white/75 font-semibold">Nigeria Data Protection Regulation (NDPR)</strong>, you have the right to:
              </p>
              <div className="space-y-3">
                {[
                  ["Access", "Request a copy of the personal data we hold about you."],
                  ["Rectification", "Request that we correct inaccurate or incomplete information."],
                  ["Deletion", "Request erasure of your personal data, under certain conditions."],
                  ["Withdraw Consent", "Withdraw your consent to data processing at any time."],
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
          </div>
        </section>

        {/* 05 — Data Security */}
        <section className="border-b border-white/[0.06] py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">05</p>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>Data Security</h2>
            </div>
            <p className="text-base text-white/55 leading-relaxed">
              The security of your data is important to us. No method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
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
              <p className="text-base text-white/55 leading-relaxed">Questions about this Privacy Policy? We&apos;re happy to help.</p>
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
