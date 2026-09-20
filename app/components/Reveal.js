"use client";

import { motion, useReducedMotion } from "motion/react";

// Fades + gently rises its children the first time they scroll into view.
// Respects the user's "reduce motion" system setting.
export default function Reveal({ children, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 64, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
