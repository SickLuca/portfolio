"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

// Small round button, fixed bottom-right. Appears only after scrolling down,
// and returns to the top with a smooth scroll (respects "reduce motion").
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-navy text-white shadow-lg transition-all duration-300 hover:bg-accent-strong ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
