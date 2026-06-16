import Reveal from "../ui/Reveal.jsx";
import Counter from "../ui/Counter.jsx";

const STATS = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 3.2, decimals: 1, suffix: "×", label: "Average traffic growth" },
  { value: 24, suffix: "h", label: "Typical response time" },
  { value: 15, suffix: "+", label: "Industries served" },
];

export default function Numbers() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#1C1917]/[0.08]">
      <div className="max-w-[1600px] mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs tracking-[0.2em] text-[#15803D] font-semibold uppercase mb-4">
            By the numbers
          </p>
          <h2
            className="font-display font-medium text-[#1C1917] leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Results we&apos;re <span className="italic text-[#15803D]">proud of.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="border-t border-[#1C1917]/15 pt-6"
            >
              <p
                className="font-display font-medium text-[#15803D] leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
              >
                <Counter value={s.value} decimals={s.decimals || 0} />
                {s.suffix}
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#6F6A62]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
