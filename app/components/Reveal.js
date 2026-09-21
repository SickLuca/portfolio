"use client";

import { motion, useReducedMotion } from "motion/react";

// Fades + gently rises its children the first time they scroll into view.
// Respects the user's "reduce motion" system setting.
// Defaults match the original section reveal; pass lighter values
// (smaller y, blur 0, shorter duration) plus an incremental `delay`
// to build a sober staggered cascade for lists of elements.
export default function Reveal({
  children,
  delay = 0,
  y = 64,
  blur = 8,
  duration = 0.8,
  className,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return className ? <div className={className}>{children}</div> : children;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
