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
        className="text-sm md:text-base font-mono text-[#6b46c1] font-semibold tracking-wide mb-6"
      >
        {caseStudy.date}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]"
      >
        {caseStudy.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed"
      >
        {caseStudy.lead}
      </motion.p>
    </div>
  );
}

function MetadataGrid({ metadata }: { metadata?: CaseStudy["metadata"] }) {
  if (!metadata) return null;
  return (
    <div className="border-t border-b border-gray-200 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Services
            </p>
            <p className="text-base md:text-lg font-bold text-slate-900">
              {metadata.services}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Category
            </p>
            <p className="text-base md:text-lg font-bold text-slate-900">
              {metadata.category}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Client
            </p>
            <p className="text-base md:text-lg font-bold text-slate-900">
              {metadata.client}
            </p>
          </div>
          <div className="flex items-end">
            <a
              href={metadata.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#6b46c1] text-white font-semibold rounded-full hover:bg-[#5a37a6] transition-colors duration-300"
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
    <section ref={containerRef} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div className="md:sticky md:top-24 md:h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
                {section.title}
              </h2>
              <div className="h-1 w-16 bg-[#6b46c1] rounded-full"></div>
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
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
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
                    className="inline-block px-4 py-2 bg-[#6b46c1]/10 text-[#6b46c1] rounded-full text-sm font-medium border border-[#6b46c1]/20 hover:border-[#6b46c1] transition-all"
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
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-linear-to-br from-slate-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl text-[#6b46c1]/20 mb-4 font-serif">&quot;</div>
          <p className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8 leading-relaxed">
            {testimonial.quote}
          </p>
          <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
            {testimonial.image && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-bold text-slate-900">{testimonial.author}</p>
              <p className="text-slate-600 text-sm">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NextProjectSection() {
  return (
    <section className="py-24 md:py-32 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Ready to start your next project?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together. Every project is a
            unique opportunity to deliver exceptional results.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b46c1] text-white font-semibold rounded-full hover:bg-[#5a37a6] transition-all duration-300 hover:gap-4 group"
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
      className="bg-white min-h-screen"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BackgroundDecorations pointer={pointer} />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-[#6b46c1] transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <HeaderSection caseStudy={caseStudy} />
      </div>

      <MetadataGrid metadata={caseStudy.metadata} />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          animate={heroParallax}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <HeroSection caseStudy={caseStudy} />
        </motion.div>
      </div>

      <div className="bg-white">
        {caseStudy.sections?.map((section, index) => (
          <StickySectionComponent key={index} section={section} index={index} />
        ))}
      </div>

      <TestimonialSection testimonial={caseStudy.testimonial} />

      <NextProjectSection />
    </main>
  );
}
