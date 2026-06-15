import { sanity, getImageUrl } from "@/lib/sanity";
import { homepageCaseStudiesQuery } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../ui/Reveal.jsx";

export default async function PortfolioSection() {
  let caseStudies = [];
  try {
    caseStudies = await sanity.fetch(homepageCaseStudiesQuery, {}, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
  } catch {
    // Silently fall through — shows placeholder gallery
  }

  const items =
    caseStudies.length > 0
      ? caseStudies.slice(0, 4).map((study) => {
          const slug = study.slug?.current ?? study.slug ?? "#";
          return {
            title: study.title,
            meta: [study.client, study.services?.[0], study.industry]
              .filter(Boolean)
              .join(" · ") || "Case study",
            imageUrl: study.heroMedia ? getImageUrl(study.heroMedia) : null,
            href: `/portfolio/${slug}`,
          };
        })
      : PLACEHOLDERS;

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#1C1917]/[0.08]">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <Reveal className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#C98A2B] font-semibold uppercase mb-4">
              Selected work
            </p>
            <h2
              className="font-display font-medium text-[#1C1917] leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
            >
              Work that <span className="italic text-[#C98A2B]">works.</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="press inline-flex items-center gap-2 rounded-full border border-[#1C1917]/20 px-6 py-3 text-sm font-semibold text-[#1C1917] hover:border-[#1C1917]/40 hover:bg-[#1C1917]/[0.03] transition-colors shrink-0"
          >
            View all work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>

        {/* Gallery grid */}
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-14">
          {items.map((item, i) => (
            <Reveal key={item.href + i} delay={(i % 2) * 0.08}>
              <Link href={item.href} className="group block">
                <div className="media-zoom relative aspect-[4/3] rounded-2xl bg-[#EFE9DC] border border-[#1C1917]/[0.06]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-[#9C968C] text-sm">
                      Preview coming soon
                    </div>
                  )}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3
                    className="font-display font-medium text-[#1C1917] leading-tight tracking-[-0.01em] group-hover:text-[#C98A2B] transition-colors duration-300"
                    style={{ fontSize: "clamp(1.35rem, 2.4vw, 2rem)" }}
                  >
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-[#C98A2B] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#6F6A62]">{item.meta}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLACEHOLDERS = [
  { title: "E-commerce brand website", meta: "Retail · Web Design · Brand", imageUrl: null, href: "/portfolio" },
  { title: "AI workflow automation", meta: "SaaS · AI Automation", imageUrl: null, href: "/portfolio" },
  { title: "Local business SEO campaign", meta: "Services · SEO", imageUrl: null, href: "/portfolio" },
  { title: "Conversion-focused redesign", meta: "Tech · Web Design", imageUrl: null, href: "/portfolio" },
];
