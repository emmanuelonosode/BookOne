import Link from "next/link";

export default function Contact() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#1C1917]/[0.08]">
      <div className="max-w-[1100px] mx-auto">
        <div className="rounded-3xl bg-[#15803D] px-8 py-14 sm:px-16 sm:py-20 text-center">
          <p className="text-sm font-medium text-[#DCFCE7] mb-5">
            Let&apos;s work together
          </p>

          <h2
            className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Ready to get more customers from your website?
          </h2>

          <p className="text-base text-[#DCFCE7] leading-relaxed max-w-xl mx-auto mb-10">
            Tell us what you need and we&apos;ll send you a free, no-pressure quote
            within 24 hours. No jargon — just a clear plan and a clear price.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="press inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm sm:text-base font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors"
            >
              Get a free quote
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="mailto:hello@bookone.dev"
              className="press inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Or email us
            </a>
          </div>

          <p className="mt-8 text-sm text-[#DCFCE7]">
            hello@bookone.dev · +234 807 708 0903
          </p>
        </div>
      </div>
    </section>
  );
}
