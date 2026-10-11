"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import NightSky from "./NightSky";

// "At a glance" stats band between the hero and Selected Work.
// Layout adapted from the "Stats Bento" component by UI Layouts (MIT,
// ui-layouts.com), recoloured for the navy night sky shared with Stack and
// Contact. The four cards are, in order: the big white card, the wide card
// with the bar chart, the small card and the card with the round icon. Edit the array to change the numbers;
// they count up the first time the band scrolls into view.
const stats = [
  {
    value: 6,
    label: "Projects built",
    text: "From a multi-agent LLM thesis and an n8n automation workflow to REST backends, a desktop app and an embedded system.",
  },
  {
    value: 240,
    prefix: "+",
    suffix: "%",
    label: "Personal growth",
    text: "Last 12 months · peer review pending",
  },
  { value: 24, suffix: "+", label: "Technologies in my stack" },
  { value: 4, label: "main languages", text: "Python, Java, C#, C++" },
];

// Constellation behind the band (see NightSky.js): x / y in % of the section,
// r = dot radius in px. Mostly in the side margins and the top / bottom
// padding, so the glass cards only let a few lines show through.
const SKY_STARS = [
  // left margin
  { x: 3, y: 12, r: 1.4 },
  { x: 7.5, y: 24, r: 2.1, glow: true },
  { x: 4, y: 41, r: 1.2 },
  { x: 9, y: 58, r: 1.7 },
  { x: 5.5, y: 79, r: 2.3, glow: true },
  // across the top and bottom padding
  { x: 24, y: 7, r: 1.3 },
  { x: 41, y: 4.5, r: 1.8, glow: true },
  { x: 58, y: 9, r: 1.2 },
  { x: 33, y: 93, r: 1.5 },
  { x: 52, y: 96, r: 1.2 },
  { x: 70, y: 91, r: 2, glow: true },
  // right margin
  { x: 95, y: 15, r: 1.9, glow: true },
  { x: 91.5, y: 33, r: 1.3 },
  { x: 97, y: 50, r: 1.6 },
  { x: 92.5, y: 68, r: 1.2 },
  { x: 96, y: 86, r: 2.1, glow: true },
];

const SKY_LINKS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6], [6, 7],
  [4, 8], [8, 9], [9, 10], [10, 15],
  [11, 12], [12, 13], [13, 14], [14, 15], [7, 11],
];

// Bar heights (%) of the little growth chart in the wide card.
const BARS = [10, 20, 40, 30, 60, 50, 80, 70, 90, 100, 110];

const DURATION = 1400;

// `run`: null = show the final value (server render, reduce-motion),
// false = 0 while waiting to scroll into view, true = count up.
function Count({ stat, run }) {
  const [t, setT] = useState(null);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  const n =
    run === null ? stat.value : run && t !== null ? Math.round(stat.value * (1 - Math.pow(1 - t, 3))) : 0;

  return (
    <span className="tabular-nums">
      {stat.prefix}
      {n}
      {stat.suffix}
    </span>
  );
}

const noop = () => () => {};

export default function Stats() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // false while the server HTML is hydrated, so it keeps the final values.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [inView, setInView] = useState(false);
  const run = !hydrated || reduce ? null : inView;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setInView(true);
      },
      { threshold: 0.35 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const [projects, growth, tech, langs] = stats;
  const cardIn = (i) => ({ y: 28, blur: 0, duration: 0.6, delay: i * 0.07 });

  return (
    <section aria-label="At a glance" className="relative overflow-hidden bg-navy text-white">
      <NightSky stars={SKY_STARS} links={SKY_LINKS} seed={42} dust={50} />
      <div
        ref={ref}
        className="wrap relative z-10 grid grid-cols-2 gap-4 py-16 md:grid-cols-6 md:grid-rows-2 md:py-24"
      >
        {/* big white card */}
        <Reveal {...cardIn(0)} className="col-span-2 md:col-span-3 md:row-span-2">
          <div className="relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl bg-surface p-7 md:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #1f3350 0px 1px, transparent 1px 10px)",
                maskImage:
                  "radial-gradient(ellipse 80% 50% at 100% 0%, #000 70%, transparent 110%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 50% at 100% 0%, #000 70%, transparent 110%)",
              }}
            />
            <div className="relative">
              <span className="inline-block rounded-full bg-navy/[0.07] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/70">
                {projects.label}
              </span>
              <p className="mt-6 font-display text-6xl font-semibold leading-none tracking-tighter text-navy md:text-7xl">
                <Count stat={projects} run={run} />
              </p>
            </div>
            <p className="relative max-w-sm text-sm leading-relaxed text-ink/70">
              {projects.text}
            </p>
          </div>
        </Reveal>

        {/* wide card with the growth chart */}
        <Reveal {...cardIn(1)} className="col-span-2 md:col-span-3">
          <div className="flex h-full items-center justify-between gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-6 md:p-7">
            <div>
              <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 md:text-xs md:tracking-[0.2em]">
                {growth.label}
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                <Count stat={growth} run={run} />
              </p>
              <p className="mt-1 text-xs text-white/55">{growth.text}</p>
            </div>
            <div className="flex h-9 shrink-0 items-end gap-[3px] md:gap-1" aria-hidden="true">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="w-1 origin-bottom rounded-full md:w-1.5 bg-white transition-transform duration-700 ease-out"
                  style={{
                    height: `${h}%`,
                    transform: run === false ? "scaleY(0)" : "scaleY(1)",
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* small card */}
        <Reveal {...cardIn(2)} className="md:col-span-1">
          <div className="flex h-full flex-col justify-center rounded-3xl border border-white/15 p-5 text-center">
            <p className="font-display text-3xl font-semibold tracking-tight text-white">
              <Count stat={tech} run={run} />
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
              {tech.label}
            </p>
          </div>
        </Reveal>

        {/* card with the round icon */}
        <Reveal {...cardIn(3)} className="md:col-span-2">
          <div className="flex h-full flex-col gap-3 rounded-3xl border border-white/15 bg-white/[0.06] p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5 md:p-6">
            <div
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-navy"
            >
              {/* code brackets: < / > */}
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
              </svg>
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-none tracking-tight text-white md:text-xl">
                <Count stat={langs} run={run} /> {langs.label}
              </p>
              <p className="mt-1.5 text-xs text-white/55">{langs.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
