"use client";

import { useEffect, useRef, useState } from "react";

const R = 34;
const CIRC = 2 * Math.PI * R;

// Circular progress badge (e.g. how far along a degree is). The ring fills and
// the number counts up the first time it scrolls into view; under reduce-motion
// it just shows the final value.
export default function ProgressRing({ value, label }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduce) {
          setShown(value);
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / 1400, 1);
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <figure
      ref={ref}
      role="img"
      aria-label={`${label}: ${value}%`}
      className="flex items-center gap-3 md:flex-col md:gap-2"
    >
      <div className="relative h-20 w-20 md:h-24 md:w-24">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="40" cy="40" r={R} fill="none" stroke="currentColor" strokeWidth="6" className="text-line" />
          <circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - shown / 100)}
            className="text-accent"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-semibold text-navy md:text-xl">
          {Math.round(shown)}%
        </span>
      </div>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </figcaption>
    </figure>
  );
}
