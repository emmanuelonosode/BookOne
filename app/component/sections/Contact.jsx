import Link from "next/link";

export default function Contact() {
  return (
    <section className="py-28 sm:py-40 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-10">
          Let&apos;s Work Together
        </p>

        <h2
          className="font-display font-black text-white leading-[0.95] tracking-tight mb-14 max-w-4xl"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Ready to start something great?
        </h2>

        {/* Contact options */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-20">
          <a
            href="mailto:hello@bookone.dev"
            className="group inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-200 text-sm tracking-wide"
          >
            <span className="w-px h-4 bg-[#E8FF47] shrink-0" aria-hidden="true" />
            hello@bookone.dev
          </a>
          <a
            href="https://calendar.notion.so/meet/officialbookone/call"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-200 text-sm tracking-wide"
          >
            <span className="w-px h-4 bg-[#E8FF47] shrink-0" aria-hidden="true" />
            Book a free call
          </a>
        </div>

        {/* Primary CTA */}
        <Link
          href="/get-started"
          className="group inline-flex items-center gap-4 text-[#E8FF47] hover:text-white transition-colors duration-300"
        >
          <span
            className="font-display font-bold leading-none"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
          >
            Start a Project
          </span>
          <span className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#E8FF47]/30 group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
