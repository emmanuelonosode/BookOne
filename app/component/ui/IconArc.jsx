"use client";
import React from "react";

// Icon tiles strung along a downward-opening dotted arc (Grain & Mortar–inspired).
const ARC_TILES = [
  { src: "tile-cart.svg",   left: 4,  top: 188, size: 70,  rot: -8, delay: 0.0 },
  { src: "tile-search.svg", left: 19, top: 104, size: 80,  rot: 6,  delay: 0.6 },
  { src: "tile-web.svg",    left: 34, top: 48,  size: 90,  rot: -5, delay: 1.2 },
  { src: "tile-stack.svg",  left: 50, top: 26,  size: 112, rot: 0,  delay: 0.3 },
  { src: "tile-ai.svg",     left: 66, top: 48,  size: 90,  rot: 5,  delay: 0.9 },
  { src: "tile-toggle.svg", left: 81, top: 104, size: 80,  rot: -6, delay: 1.5 },
  { src: "tile-chat.svg",   left: 96, top: 188, size: 70,  rot: 8,  delay: 0.45, hideSm: true },
];

export default function IconArc() {
  return (
    <div className="bk-arc" aria-hidden="true">
      <svg className="bk-arc-path" viewBox="0 0 1000 320" preserveAspectRatio="none" fill="none">
        <path
          d="M20 296 C 200 120, 380 56, 500 56 C 620 56, 800 120, 980 296"
          stroke="#1C1917"
          strokeOpacity="0.22"
          strokeWidth="2.5"
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
      </svg>

      {ARC_TILES.map((t, i) => (
        <span
          key={i}
          className={"bk-tile" + (t.hideSm ? " bk-tile--sm-hide" : "")}
          style={{
            left: t.left + "%",
            top: t.top + "px",
            width: t.size,
            height: t.size,
            "--rot": t.rot + "deg",
            "--delay": t.delay + "s",
          }}
        >
          <span className="bk-tile__inner">
            <img src={"/illustrations/" + t.src} alt="" draggable="false" />
          </span>
        </span>
      ))}

      <img className="bk-arc-cursor" src="/illustrations/cursor-pixel.svg" alt="" />
    </div>
  );
}
