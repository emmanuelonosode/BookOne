"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = [
  "We", "don't", "do", "average.", "We", "build", "digital", "work",
  "that", "earns", "attention,", "drives", "revenue,", "and", "outlasts", "trends."
];

export default function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="py-28 sm:py-40 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-12"
        >
          Our Ethos
        </motion.p>

        {/* Word-by-word reveal */}
        <p
          ref={ref}
          className="font-display font-bold text-white leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
          aria-label="We don't do average. We build digital work that earns attention, drives revenue, and outlasts trends."
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
