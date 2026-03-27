import { sanity } from "@/lib/sanity";
import { allTestimoniaQuery } from "@/lib/queries";

export default async function Testimonia() {
  let testimonia = [];
  try {
    testimonia = await sanity.fetch(allTestimoniaQuery, {}, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
  } catch {
    // Fall through to placeholders
  }

  const items = testimonia.length > 0 ? testimonia.slice(0, 4) : PLACEHOLDERS;

  // Featured = first; rest in 2-col grid
  const [featured, ...rest] = items;

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Label */}
        <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-16">
          Client Voices
        </p>

        {/* Featured testimonial — full width */}
        <blockquote className="mb-16 pb-16 border-b border-white/[0.06]">
          <p
            className="font-display font-bold italic text-white/90 leading-[1.15] mb-8"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)" }}
          >
            &ldquo;{featured.desc}&rdquo;
          </p>
          <footer className="flex items-center gap-4">
            <div className="w-px h-6 bg-[#E8FF47]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-white">{featured.name}</p>
              <p className="text-xs text-white/30 tracking-wide uppercase mt-0.5">
                {featured.position}{featured.tag ? ` · ${featured.tag}` : ""}
              </p>
            </div>
          </footer>
        </blockquote>

        {/* Grid — remaining testimonials */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {rest.map((item, i) => (
              <div key={i} className="bg-[#080808] p-8">
                <span className="font-display text-6xl text-white/[0.06] leading-none block mb-4" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed italic mb-6">
                  {item.desc}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-px h-4 bg-[#E8FF47] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-white">{item.name}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
                      {item.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const PLACEHOLDERS = [
  {
    name: "Sarah Okonkwo",
    position: "Founder, StyleHouse Lagos",
    tag: "Web Design",
    desc: "BookOne rebuilt our entire online store in three weeks. Revenue from organic search doubled in the first quarter after launch. The attention to detail is unlike anything I've seen from an agency.",
  },
  {
    name: "Daniel Adeyemi",
    position: "CEO, SwiftLogistics NG",
    tag: "AI Automation",
    desc: "They automated our entire lead intake process. We went from spending 20 hours a week on manual follow-up to basically zero. The ROI paid for the project in the first month.",
  },
  {
    name: "Amara Nwosu",
    position: "Director, PrimeCare Clinic",
    tag: "SEO",
    desc: "Our Google rankings went from page 4 to position 1 for our top keywords within five months. New patient enquiries are up 63%.",
  },
  {
    name: "Tunde Fasanya",
    position: "Co-Founder, BuildRight",
    tag: "Web Design",
    desc: "We've worked with three agencies before BookOne. None of them communicated like this team does. Fast, clear, and the work actually looks premium.",
  },
];
