import { sanity, getImageUrl } from "@/lib/sanity";
import { homepageCaseStudiesQuery } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";

export default async function PortfolioSection() {
  let caseStudies = [];
  try {
    caseStudies = await sanity.fetch(homepageCaseStudiesQuery, {}, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
  } catch {
    // Silently fall through — shows empty state
  }

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">
              Selected Work
            </p>
            <h2
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Recent Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-2 group shrink-0"
          >
            View All Work
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Case study rows */}
        {caseStudies.length === 0 ? (
          <PlaceholderRows />
        ) : (
          <div className="flex flex-col gap-1">
            {caseStudies.map((study, i) => {
              const slug = study.slug?.current ?? study.slug ?? "#";
              const imageUrl = study.heroMedia
                ? getImageUrl(study.heroMedia)
                : null;
              return (
                <CaseStudyRow
                  key={study._id}
                  index={i + 1}
                  title={study.title}
                  category={study.industry ?? study.services?.[0] ?? "Project"}
                  description={study.shortDescription}
                  imageUrl={imageUrl}
                  href={`/portfolio/${slug}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CaseStudyRow({ index, title, category, description, imageUrl, href }) {
  return (
    <Link
      href={href}
      className="group relative block border-t border-white/[0.06] last:border-b py-8 sm:py-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-300"
    >
      <div className="flex items-center gap-6 sm:gap-10">
        {/* Number */}
        <span className="text-xs tracking-[0.15em] font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors duration-300 shrink-0 w-8">
          {String(index).padStart(2, "0")}
        </span>

        {/* Title + category */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">{category}</p>
          <h3
            className="font-display font-bold text-white group-hover:text-white/90 transition-colors leading-tight truncate"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2.5rem)" }}
          >
            {title}
          </h3>
        </div>

        {/* Description — hidden on mobile */}
        {description && (
          <p className="hidden lg:block text-sm text-white/30 max-w-xs leading-relaxed shrink-0">
            {description}
          </p>
        )}

        {/* Thumbnail */}
        {imageUrl && (
          <div className="hidden sm:block relative w-20 h-14 lg:w-28 lg:h-20 rounded overflow-hidden bg-white/5 shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 1024px) 80px, 112px"
            />
          </div>
        )}

        {/* Arrow */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0 text-white/20 group-hover:text-[#E8FF47] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        >
          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}

function PlaceholderRows() {
  const placeholders = [
    { title: "E-Commerce Brand Website", category: "Web Design" },
    { title: "AI Workflow Automation", category: "AI Automation" },
    { title: "Local Business SEO Campaign", category: "SEO" },
  ];
  return (
    <div className="flex flex-col gap-1">
      {placeholders.map((p, i) => (
        <CaseStudyRow
          key={i}
          index={i + 1}
          title={p.title}
          category={p.category}
          description={null}
          imageUrl={null}
          href="/portfolio"
        />
      ))}
    </div>
  );
}
