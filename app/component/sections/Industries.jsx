import Reveal from "../ui/Reveal.jsx";

const INDUSTRIES = [
  "Retail & E-commerce",
  "Professional Services",
  "Real Estate & Development",
  "Hospitality & Food",
  "Nonprofit & Education",
  "Health & Wellness",
  "Tech & SaaS",
  "Creators & Personal Brands",
];

export default function Industries() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#1C1917]/[0.08] bg-[#EFE9DC]">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <Reveal>
          <p className="text-xs tracking-[0.2em] text-[#C98A2B] font-semibold uppercase mb-4">
            Who we work with
          </p>
          <h2
            className="font-display font-medium text-[#1C1917] leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Built for businesses that want to <span className="italic text-[#C98A2B]">grow.</span>
          </h2>
          <p className="mt-6 text-base text-[#6F6A62] leading-relaxed max-w-md">
            From first-time founders to established brands — if you need a website that
            earns its keep, you&apos;re in the right place.
          </p>
        </Reveal>

        <ul className="grid sm:grid-cols-2 self-center">
          {INDUSTRIES.map((name, i) => (
            <Reveal
              as="li"
              key={name}
              delay={(i % 2) * 0.06}
              className="flex items-center gap-4 py-4 border-b border-[#1C1917]/[0.08]"
            >
              <span className="text-xs font-mono text-[#9C968C] w-7">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-display text-[#1C1917] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)" }}
              >
                {name}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
