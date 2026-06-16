"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionImage = { src: string; alt: string };

type CaseStudySection = {
  title: string;
  description: string;
  tags?: string[];
  images?: SectionImage[];
  layout?: "single" | "grid-2x2";
};

type CaseStudy = {
  date?: string;
  title: string;
  lead?: string;
  metadata?: {
    services?: string;
    category?: string;
    client?: string;
    link?: string;
  };
  heroImage?: string;
  sections?: CaseStudySection[];
  testimonial?: {
    quote?: string;
    author?: string;
    role?: string;
    image?: string;
  };
};

// ─── Arrow ────────────────────────────────────────────────────────────────────

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ClientCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <main className="bg-[#F4F1EA] min-h-screen">

      {/* HERO */}
      <section className="pt-32 pb-16 border-b border-[#1C1917]/[0.08]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Back */}
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#6F6A62] hover:text-[#1C1917] transition-colors duration-200 font-mono mb-12">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Work
          </Link>

          {/* Meta + title */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-end">
            <div>
              {caseStudy.date && (
                <p className="text-[10px] tracking-[0.25em] text-[#6F6A62] uppercase font-mono mb-4">
                  {caseStudy.date}
                </p>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-medium text-[#1C1917] leading-[1.03] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                {caseStudy.title}
              </motion.h1>
              {caseStudy.lead && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-6 text-lg text-[#6F6A62] leading-relaxed max-w-xl"
                >
                  {caseStudy.lead}
                </motion.p>
              )}
            </div>

            {/* Metadata column */}
            {caseStudy.metadata && (
              <div className="space-y-5">
                {caseStudy.metadata.client && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6F6A62] font-mono mb-1">Client</p>
                    <p className="text-sm text-[#6F6A62]">{caseStudy.metadata.client}</p>
                  </div>
                )}
                {caseStudy.metadata.services && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6F6A62] font-mono mb-1">Services</p>
                    <p className="text-sm text-[#6F6A62]">{caseStudy.metadata.services}</p>
                  </div>
                )}
                {caseStudy.metadata.category && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6F6A62] font-mono mb-1">Category</p>
                    <p className="text-sm text-[#6F6A62]">{caseStudy.metadata.category}</p>
                  </div>
                )}
                {caseStudy.metadata.link && (
                  <a
                    href={caseStudy.metadata.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#15803D] hover:text-[#1C1917] transition-colors duration-200 font-mono"
                  >
                    Visit Live Site
                    <Arrow className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      {caseStudy.heroImage && (
        <div className="border-b border-[#1C1917]/[0.08]">
          <div className="max-w-[1600px] mx-auto">
            <div className="media-zoom relative w-full aspect-[21/9]">
              <Image
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* CONTENT SECTIONS */}
      {caseStudy.sections?.map((section, index) => (
        <section key={index} className="border-b border-[#1C1917]/[0.08] py-20 sm:py-28">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

              {/* Sticky label */}
              <div className="lg:sticky lg:top-28">
                <p className="text-[10px] tracking-[0.15em] font-mono text-[#6F6A62] mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2
                  className="font-display font-bold text-[#1C1917] leading-none"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <p className="text-lg text-[#6F6A62] leading-relaxed whitespace-pre-wrap max-w-2xl">
                  {section.description}
                </p>

                {section.tags && section.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {section.tags.map((tag, i) => (
                      <span key={i}
                        className="px-3 py-1 border border-[#1C1917]/[0.08] text-[10px] tracking-[0.12em] uppercase font-mono text-[#6F6A62]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {section.images && section.images.length > 0 && (
                  <div className={section.layout === "grid-2x2" && section.images.length > 1
                    ? "grid grid-cols-2 gap-px bg-[#1C1917]/[0.04]"
                    : ""}>
                    {section.layout === "single" ? (
                      <div className="relative aspect-video overflow-hidden bg-white/[0.03]">
                        <Image
                          src={section.images[0].src}
                          alt={section.images[0].alt}
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                    ) : (
                      section.images.map((img, i) => (
                        <div key={i} className="relative aspect-square overflow-hidden bg-white/[0.03]">
                          <Image src={img.src} alt={img.alt} fill className="object-cover opacity-80" />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* TESTIMONIAL */}
      {caseStudy.testimonial && (
        <section className="border-b border-[#1C1917]/[0.08] py-20 sm:py-28">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="font-display font-bold italic text-[#1C1917] leading-tight mb-8"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
              >
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-5">
                {caseStudy.testimonial.image && (
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1C1917]/[0.04] shrink-0 ring-1 ring-white/10">
                    <Image
                      src={caseStudy.testimonial.image}
                      alt={caseStudy.testimonial.author ?? ""}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-[#3A352F] font-medium">{caseStudy.testimonial.author}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-[#6F6A62]">{caseStudy.testimonial.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-xs tracking-[0.2em] text-[#15803D] font-semibold uppercase mb-6">
            Start a project
          </p>
          <h2
            className="font-display font-medium text-[#1C1917] leading-[1.03] tracking-[-0.02em] mb-10 max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Ready to start your <span className="italic text-[#15803D]">next project?</span>
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/get-started" className="btn-primary text-sm sm:text-base">
              Get a free quote
              <Arrow />
            </Link>
            <Link
              href="/portfolio"
              className="press inline-flex items-center gap-2 rounded-full border border-[#1C1917]/20 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#1C1917] hover:border-[#1C1917]/40 hover:bg-[#1C1917]/[0.03] transition-colors"
            >
              View all work
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
