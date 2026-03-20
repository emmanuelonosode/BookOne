"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ============================================================================
// TYPES
// ============================================================================

type SectionImage = {
  src: string;
  alt: string;
};

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

// ============================================================================
// Background decorations (kept here so client can animate)
// ============================================================================

function BackgroundDecorations({
  pointer,
}: {
  pointer: { x: number; y: number } | null;
}) {
  const baseTransition = { duration: 0.9, ease: "easeInOut" } as const;

  const calc = (mult: number) => ({
    x: pointer ? pointer.x / mult : 0,
    y: pointer ? pointer.y / mult : 0,
  });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-1/2 top-1/3 -translate-x-1/2"
      >
        <motion.div
          animate={calc(40)}
          transition={baseTransition}
          className="w-[520px] h-[520px] rounded-full bg-linear-to-br from-[#6b46c1]/20 to-[#6b46c1]/8 blur-3xl opacity-80"
        />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute right-10 top-1/4"
      >
        <motion.div
          animate={calc(60)}
          transition={{ ...baseTransition, duration: 1.1 }}
          className="w-[360px] h-[360px] rounded-full bg-[#6b46c1]/10 blur-2xl opacity-70"
        />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute left-6 bottom-20"
      >
        <motion.div
          animate={calc(100)}
          transition={{ ...baseTransition, duration: 1.3 }}
          className="w-[260px] h-[260px] rounded-full bg-linear-to-tr from-[#6b46c1]/6 to-[#6b46c1]/20 blur-2xl opacity-60"
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// UI Components (Header, Hero, Metadata, Sticky Section, Testimonial, Footer)
// These mirror the previous implementation but accept props to render fetched data.
// ============================================================================

function HeaderSection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="mb-16 md:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm md:text-base font-mono text-[#A78BFA] font-semibold tracking-wide mb-6"
      >
        {caseStudy.date}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
      >
        {caseStudy.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-light"
      >
        {caseStudy.lead}
      </motion.p>
    </div>
  );
}

function MetadataGrid({ metadata }: { metadata?: CaseStudy["metadata"] }) {
  if (!metadata) return null;
  return (
    <div className="border-t border-b border-white/10 py-8 md:py-12 bg-[#1A1A24]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="group relative bg-[#1A1A24]/60 p-6 rounded-2xl border border-white/5 hover:border-[#6b46c1]/40 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A78BFA] mb-3">
              Services
            </p>
            <p className="text-base md:text-lg font-bold text-slate-200">
              {metadata.services}
            </p>
          </div>
          <div className="group relative bg-[#1A1A24]/60 p-6 rounded-2xl border border-white/5 hover:border-[#6b46c1]/40 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A78BFA] mb-3">
              Category
            </p>
            <p className="text-base md:text-lg font-bold text-slate-200">
              {metadata.category}
            </p>
          </div>
          <div className="group relative bg-[#1A1A24]/60 p-6 rounded-2xl border border-white/5 hover:border-[#6b46c1]/40 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A78BFA] mb-3">
              Client
            </p>
            <p className="text-base md:text-lg font-bold text-slate-200">
              {metadata.client}
            </p>
          </div>
          <div className="flex items-end">
            <a
              href={metadata.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#6b46c1]/20 text-[#A78BFA] font-semibold rounded-full border border-[#6b46c1]/40 hover:bg-[#6b46c1] hover:text-white hover:shadow-[0_0_15px_rgba(107,70,193,0.5)] transition-all duration-300"
            >
              Visit Site <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ caseStudy }: { caseStudy: CaseStudy }) {
  if (!caseStudy.heroImage) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative aspect-video md:aspect-video rounded-4xl overflow-hidden bg-slate-100"
    >
      <Image
        src={caseStudy.heroImage}
        alt={caseStudy.title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
    </motion.div>
  );
}

function StickySectionComponent({
  section,
  index,
}: {
  section: CaseStudySection;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6b46c1]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20 ${index % 2 !== 0 ? "md:grid-cols-[2fr_1fr]" : ""}`}>
          <div className={`md:sticky md:top-32 md:h-fit relative z-10 ${index % 2 !== 0 ? "md:order-last md:text-right" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={
                isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
              }
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                {section.title}
              </h2>
              <div className={`h-[2px] w-24 bg-gradient-to-r from-[#6b46c1] to-[#A78BFA] rounded-full shadow-[0_0_15px_rgba(107,70,193,0.6)] ${index % 2 !== 0 ? "ml-auto" : ""}`}></div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="space-y-8"
          >
            <div className="prose prose-lg max-w-none prose-invert">
              <p className="text-slate-400 leading-relaxed whitespace-pre-wrap font-light">
                {section.description}
              </p>
            </div>

            {section.tags && section.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {section.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      isVisible
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.9 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: index * 0.15 + i * 0.05,
                    }}
                    className="inline-block px-4 py-2 bg-[#6b46c1]/10 text-[#A78BFA] rounded-full text-sm font-medium border border-[#6b46c1]/30 hover:bg-[#6b46c1]/20 hover:border-[#6b46c1] hover:shadow-[0_0_15px_rgba(107,70,193,0.3)] transition-all cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}

            {section.images && section.images.length > 0 && (
              <div className="mt-12">
                {section.layout === "single" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={
                      isVisible
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.95 }
                    }
                    transition={{
                      duration: 0.7,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative aspect-video rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={section.images[0].src}
                      alt={section.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-700 will-change-transform"
                    />
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {section.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={
                          isVisible
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.95 }
                        }
                        transition={{
                          duration: 0.7,
                          delay: index * 0.2 + i * 0.08,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.03 }}
                        className="group relative aspect-square rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-700 will-change-transform"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({
  testimonial,
}: {
  testimonial?: CaseStudy["testimonial"];
}) {
  if (!testimonial) return null;
  return (
    <section className="py-24 md:py-32 bg-[#0B0B0E] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#6B46C1_0%,transparent_50%)] opacity-5 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-br from-[#1A1A24] to-[#0B0B0E] rounded-2xl p-8 md:p-12 border border-white/10 shadow-[0_0_30px_rgba(107,70,193,0.1)] hover:shadow-[0_0_40px_rgba(107,70,193,0.2)] hover:border-[#6b46c1]/40 transition-all duration-500"
        >
          <div className="text-4xl text-[#6b46c1]/40 mb-4 font-serif drop-shadow-[0_0_8px_rgba(107,70,193,0.5)]">&quot;</div>
          <p className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-relaxed font-light">
            {testimonial.quote}
          </p>
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            {testimonial.image && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#6b46c1]/30">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-bold text-white tracking-wide">{testimonial.author}</p>
              <p className="text-[#A78BFA] text-sm">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NextProjectSection() {
  return (
    <section className="py-24 md:py-32 bg-[#050508] border-t border-[#8B5CF6]/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#6B46C1_0%,transparent_60%)] opacity-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to start your next project?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Let&apos;s create something extraordinary together. Every project is a
            unique opportunity to deliver exceptional results.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b46c1] text-white font-semibold rounded-full hover:bg-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-1 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CLIENT WRAPPER
// ============================================================================

export default function ClientCaseStudy({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (typeof window === "undefined") return;
    setPointer({
      x: e.clientX - window.innerWidth / 2,
      y: e.clientY - window.innerHeight / 2,
    });
  }

  function handleMouseLeave() {
    setPointer(null);
  }

  const heroParallax = pointer
    ? { x: pointer.x / 40, y: pointer.y / 80 }
    : { x: 0, y: 0 };

  return (
    <main
      className="bg-[#0B0B0E] min-h-screen text-slate-300 selection:bg-[#6b46c1] selection:text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BackgroundDecorations pointer={pointer} />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6 relative z-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-[#A78BFA] transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <HeaderSection caseStudy={caseStudy} />
      </div>

      <div className="relative z-10">
        <MetadataGrid metadata={caseStudy.metadata} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        <motion.div
          animate={heroParallax}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <HeroSection caseStudy={caseStudy} />
        </motion.div>
      </div>

      <div className="bg-transparent relative z-10">
        {caseStudy.sections?.map((section, index) => (
          <StickySectionComponent key={index} section={section} index={index} />
        ))}
      </div>

      <div className="relative z-10">
        <TestimonialSection testimonial={caseStudy.testimonial} />
      </div>

      <div className="relative z-10">
        <NextProjectSection />
      </div>
    </main>
  );
}
