"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const INSET = 3; // % side inset while the sheet is entering
const RADIUS = 40; // px top corner radius at the same moment

// A section that slides up over the <Pinned> one before it, like a sheet of
// paper: it starts as an inset card with rounded top corners and widens to
// full width as its top travels up the viewport. Give it an opaque
// background (className), since whatever is pinned underneath shows through.
// Reduce-motion renders it as a plain full-width block.
export default function Sheet({ className = "", children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // No clip at all once the sheet is fully in: a leftover clip-path on a
  // section this tall keeps the browser masking it on every frame.
  const clipPath = useTransform(scrollYProgress, (p) => {
    if (p >= 1) return "none";
    const r = RADIUS * (1 - p);
    return `inset(0 ${INSET * (1 - p)}% round ${r}px ${r}px 0 0)`;
  });

  return (
    <motion.div
      ref={ref}
      className={`relative z-10 ${className}`}
      style={reduce ? undefined : { clipPath }}
    >
      {children}
    </motion.div>
  );
}
