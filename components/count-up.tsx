"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Count-up number that renders its final value server-side in the HTML
// (crawlable), then animates the visible digits on scroll-in. Numeric prefix
// + suffix parsed from strings like "20,000+" or "70s → <1s" (the latter is
// displayed statically - it's a story, not a count).

export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Parse: number, optional thousands commas, trailing suffix.
  const m = value.match(/^([\d,]+)(.*)$/);
  const numeric = m ? m[1] : null;
  const suffix = m ? m[2] : value;
  const target = numeric ? parseInt(numeric.replace(/,/g, ""), 10) : null;

  const [display, setDisplay] = useState(numeric ?? value);

  useEffect(() => {
    if (!inView || reduce || target === null) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(target * eased).toLocaleString("en-US"));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  // Non-numeric or multi-part values render as-is.
  if (target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
