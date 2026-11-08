// Status block for projects still in the works: a hammer striking hot iron on
// an anvil, above a small "Under construction" pill. The motion is CSS only
// (.forge-* in globals.css, a handful of small transform / opacity animations)
// and stops with prefers-reduced-motion. Centered on phones, aligned with the
// rest of the left column from md up.

// Sparks thrown from the point of impact: start position and how far they fly.
const SPARKS = [
  { cx: 86, r: 2, x: -22, y: -14 },
  { cx: 88, r: 1.6, x: -14, y: -24 },
  { cx: 100, r: 2, x: 22, y: -20 },
  { cx: 102, r: 1.6, x: 30, y: -8 },
  { cx: 84, r: 1.5, x: -30, y: -4 },
];

export default function UnderConstruction() {
  return (
    <div className="mt-[1.6rem] flex flex-col items-center gap-1.5 md:inline-flex md:pl-8">
      <svg
        viewBox="0 -12 160 102"
        className="block w-36"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M26 82h108" stroke="#1f3350" strokeWidth="3" strokeLinecap="round" />
        <g className="forge-anvil">
          <path
            d="M24 44c10 2 22 2 30 2h62v10c-8 2-16 4-20 10v6h14v8H56v-8h14v-6c-4-6-12-8-16-8-8 0-20-6-30-14z"
            fill="#1f3350"
          />
          <rect x="74" y="40" width="34" height="6" rx="2" fill="#ffd166" />
          <rect className="forge-heat" x="74" y="40" width="34" height="6" rx="2" fill="#ef6f6c" />
        </g>
        <g fill="#e8a93a">
          {SPARKS.map((s) => (
            <circle
              key={s.cx}
              className="forge-spark"
              cx={s.cx}
              cy="39"
              r={s.r}
              style={{ "--spark-x": `${s.x}px`, "--spark-y": `${s.y}px` }}
            />
          ))}
        </g>
        <g className="forge-hammer" strokeLinecap="round">
          <path d="M93 28 140 35" stroke="#6a7382" strokeWidth="5" />
          <rect
            x="83"
            y="14"
            width="20"
            height="26"
            rx="3"
            fill="#2f5d8a"
            stroke="#1f3350"
            strokeWidth="2.5"
          />
        </g>
      </svg>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e8862e]" aria-hidden="true" />
        Under construction
      </span>
    </div>
  );
}
