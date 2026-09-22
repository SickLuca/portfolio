// Decorative "night sky" constellation for the FAQ "still curious?" card.
// Ties into the site's "per aspera ad astra" motif. Pure inline SVG animated
// with CSS (twinkling stars + a slow group drift); the keyframes and the
// reduce-motion opt-out live in globals.css (.constellation-*). No JS or
// canvas, so it is cheap and needs no client boundary.

// Star positions in a 300 x 380 viewBox. `r` is the dot radius; a couple of
// larger stars also get a soft glow halo.
const STARS = [
  { x: 44, y: 52, r: 1.6 },
  { x: 104, y: 36, r: 1.1 },
  { x: 158, y: 70, r: 2.6, glow: true },
  { x: 216, y: 46, r: 1.4 },
  { x: 264, y: 92, r: 1.6 },
  { x: 72, y: 116, r: 1.2 },
  { x: 128, y: 138, r: 1.8 },
  { x: 198, y: 120, r: 1.3 },
  { x: 250, y: 158, r: 1.5 },
  { x: 42, y: 196, r: 1.3 },
  { x: 110, y: 226, r: 2.4, glow: true },
  { x: 178, y: 206, r: 1.4 },
  { x: 240, y: 242, r: 1.2 },
  { x: 78, y: 292, r: 1.6 },
  { x: 150, y: 314, r: 1.9 },
  { x: 216, y: 298, r: 1.3 },
  { x: 120, y: 356, r: 1.2 },
];

// Edges (by star index) that trace the constellation.
const LINKS = [
  [1, 2], [2, 3], [3, 4], [2, 6], [6, 7], [7, 8], [0, 5], [5, 6],
  [6, 10], [10, 11], [11, 12], [10, 13], [13, 14], [14, 15], [11, 15],
  [9, 10], [14, 16],
];

export default function Constellation() {
  return (
    <svg
      viewBox="0 0 300 380"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g className="constellation-drift" fill="#ffffff" stroke="#ffffff">
        {LINKS.map(([a, b], i) => (
          <line
            key={`l-${i}`}
            x1={STARS[a].x}
            y1={STARS[a].y}
            x2={STARS[b].x}
            y2={STARS[b].y}
            strokeWidth="0.6"
            strokeOpacity="0.12"
          />
        ))}
        {STARS.map((s, i) => {
          // Deterministic (SSR-safe) twinkle timing so no two stars pulse alike.
          const dur = 3 + ((i * 7) % 5) * 0.6; // 3s .. 5.4s
          const delay = ((i * 13) % 40) / 10; // 0s .. 3.9s
          const min = 0.22 + ((i * 5) % 3) * 0.09; // 0.22 .. 0.40
          return (
            <g key={`s-${i}`}>
              {s.glow ? (
                <circle cx={s.x} cy={s.y} r={s.r * 3.4} fill="#ffffff" opacity="0.1" />
              ) : null}
              <circle
                className="constellation-star"
                cx={s.x}
                cy={s.y}
                r={s.r}
                stroke="none"
                style={{ "--tw-dur": `${dur}s`, "--tw-delay": `${delay}s`, "--tw-min": min }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
