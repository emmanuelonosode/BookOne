"use client";

import { useState, useEffect } from "react";

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headingElements = document.querySelectorAll("article h1, article h2, article h3");
    const headingData = Array.from(headingElements).map((el) => ({
      id: el.id,
      text: el.textContent,
      level: parseInt(el.tagName.charAt(1)),
    }));
    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-px">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`w-full text-left py-1.5 text-[11px] tracking-wide transition-colors duration-200 font-mono leading-snug ${
                activeId === heading.id
                  ? "text-[#E8FF47]"
                  : "text-white/25 hover:text-white/60"
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              aria-label={`Jump to ${heading.text}`}
            >
              {activeId === heading.id && (
                <span className="inline-block w-3 mr-1.5 border-t border-[#E8FF47] align-middle" />
              )}
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
