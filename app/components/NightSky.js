// Decorative night sky for the navy sections (Stack, Contact): one large
// constellation (`stars` + `links`, defined by each section so it can weave
// around that section's content) plus a faint dust of background stars from a
// fixed `seed`. Same language as the FAQ card's Constellation.js (white on
// navy). Positions are in % of the box, so it stretches to any height; the
// lines live in a 0-100 SVG with non-scaling strokes so they stay hairline
// thin. Twinkle and drift reuse the .constellation-* keyframes in globals.css
// (reduce-motion turns them off). Pure markup, no client JS.

// Background dust, deterministic so server and client markup match.
function makeDust(seed, count) {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    r: 0.6 + rnd() * 0.8,
  }));
}

function Star({ x, y, r, i, min }) {
  // Deterministic twinkle timing so no two stars pulse alike.
  const dur = 3 + ((i * 7) % 5) * 0.6; // 3s .. 5.4s
  const delay = ((i * 13) % 40) / 10; // 0s .. 3.9s
  return (
    <span
      className="constellation-star absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: r * 2.6,
        height: r * 2.6,
        "--tw-dur": `${dur}s`,
        "--tw-delay": `${delay}s`,
        "--tw-min": min,
      }}
    />
  );
}

// `stars`: [{ x, y, r, glow? }] with x / y in % and r = dot radius in px;
// `links`: [[a, b]] pairs of star indexes traced as lines.
export default function NightSky({ stars, links, seed = 1, dust = 90 }) {
  const specks = makeDust(seed, dust);
  // Faded out towards the top and bottom edges of the section.
  const fade = "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)";
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      aria-hidden="true"
    >
      <div className="constellation-drift absolute inset-0 text-white">
        <div className="absolute inset-0 opacity-45">
          {specks.map((s, i) => (
            <Star key={`d-${i}`} {...s} i={i} min={0.2} />
          ))}
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          focusable="false"
        >
          {links.map(([a, b], i) => (
            <line
              key={`l-${i}`}
              x1={stars[a].x}
              y1={stars[a].y}
              x2={stars[b].x}
              y2={stars[b].y}
              stroke="currentColor"
              strokeOpacity="0.16"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {stars.map((s, i) =>
          s.glow ? (
            <span
              key={`g-${i}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.r * 12,
                height: s.r * 12,
                background: "radial-gradient(circle, rgb(255 255 255 / 0.16), transparent 70%)",
              }}
            />
          ) : null
        )}
        {stars.map((s, i) => (
          <Star key={`s-${i}`} {...s} i={i} min={0.4} />
        ))}
      </div>
    </div>
  );
}
