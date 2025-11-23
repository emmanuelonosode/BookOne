import React from "react";

/**
 * TextReveal — simple wrapper that reveals text left->right using a clipping mask
 * Props:
 * - children: ReactNode — the text or elements to reveal
 * - duration: number — animation duration in ms (default 800)
 * - delay: number — animation delay in ms (default 0)
 * - className: string — additional class names to apply to the outer wrapper
 */
export default function TextReveal({
  children,
  duration = 800,
  delay = 0,
  className = "",
}) {
  const style = {
    ["--reveal-duration"]: `${duration}ms`,
    ["--reveal-delay"]: `${delay}ms`,
  };

  return (
    <span className={`reveal ${className}`} style={style}>
      <span className="reveal-inner">{children}</span>
    </span>
  );
}
