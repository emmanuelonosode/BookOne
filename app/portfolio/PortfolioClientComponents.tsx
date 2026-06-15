"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

export interface WorkItem {
  id: string;
  title: string;
  href: string;
  imageUrl: string | null;
  client?: string | null;
  services: string[];
  industry?: string | null;
}

const ALL = "All";

function Chips({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs tracking-[0.18em] uppercase text-[#9C968C] mr-1">{label}</span>
      {[ALL, ...options].map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`press rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
              isActive
                ? "border-[#C98A2B] bg-[#C98A2B] text-white"
                : "border-[#1C1917]/15 text-[#3A352F] hover:border-[#1C1917]/35"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  const reduce = useReducedMotion();
  const [deliverable, setDeliverable] = useState(ALL);
  const [industry, setIndustry] = useState(ALL);

  const deliverables = useMemo(
    () => Array.from(new Set(items.flatMap((i) => i.services))).filter(Boolean).sort(),
    [items]
  );
  const industries = useMemo(
    () => (Array.from(new Set(items.map((i) => i.industry))).filter(Boolean) as string[]).sort(),
    [items]
  );

  const filtered = items.filter(
    (i) =>
      (deliverable === ALL || i.services.includes(deliverable)) &&
      (industry === ALL || i.industry === industry)
  );

  return (
    <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 py-10 border-b border-[#1C1917]/[0.08]">
        <Chips label="Deliverable" options={deliverables} active={deliverable} onChange={setDeliverable} />
        <Chips label="Industry" options={industries} active={industry} onChange={setIndustry} />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-24 text-[#9C968C] text-sm">No projects match those filters yet.</p>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 gap-x-8 gap-y-14 pt-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const meta =
                [item.client, item.services?.[0], item.industry].filter(Boolean).join(" · ") ||
                "Case study";
              return (
                <motion.div
                  key={item.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : (i % 2) * 0.05, ease: EASE }}
                >
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
                      <h2
                        className="font-display font-medium text-[#1C1917] leading-tight tracking-[-0.01em] group-hover:text-[#C98A2B] transition-colors duration-300"
                        style={{ fontSize: "clamp(1.35rem, 2.4vw, 2rem)" }}
                      >
                        {item.title}
                      </h2>
                      <span className="shrink-0 text-[#C98A2B] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#6F6A62]">{meta}</p>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
