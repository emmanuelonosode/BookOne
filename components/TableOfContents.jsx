"use client";

import { useState, useEffect } from "react";

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const headingElements = document.querySelectorAll("h1, h2, h3");
      const headingData = Array.from(headingElements).map((element, index) => ({
        id: element.id,
        text: element.textContent,
        level: parseInt(element.tagName.charAt(1)),
        element: element,
      }));
      setHeadings(headingData);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-20% 0px -35% 0px" }
      );

      headingElements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }
  }, [content]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg md:p-6 p-3 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        Table of Contents
      </h3>

      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`w-full text-left md:px-2 py-2 rounded-lg transition-all duration-200 text-sm ${
              activeId === heading.id
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
            aria-label={`Jump to ${heading.text}`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
