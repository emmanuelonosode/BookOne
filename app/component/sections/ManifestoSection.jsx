"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = [
  "A", "good", "website", "isn't", "decoration.", "It", "should", "bring",
  "you", "real", "customers", "—", "every", "single", "day."
];

export default function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="py-28 sm:py-40 px-6 sm:px-10 lg:px-16 border-t border-[#1C1917]/[0.08]">
      <div className="max-w-[1600px] mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.2em] text-[#15803D] font-semibold uppercase mb-12"
        >
          Why it matters
        </motion.p>

        {/* Word-by-word reveal */}
        <p
          ref={ref}
          className="font-display font-bold text-[#1C1917] leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
          aria-label="A good website isn't decoration. It should bring you real customers — every single day."
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em] overflow-hidden"
              aria-hidden="true"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 0.65,
                  delay: i * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
