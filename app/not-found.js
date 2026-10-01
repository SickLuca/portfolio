import Link from "next/link";

// Custom 404 ("lost in space"): handles every unmatched URL. Ties into the
// site's "per aspera ad astra" motif: a navy night sky with twinkling stars
// (reuses the .constellation-star keyframes from globals.css) and a floating
// astronaut (.astronaut-float). Next.js adds noindex to 404 pages by itself.

export const metadata = {
  title: "Lost in space",
};

// Deterministic (SSR-safe) pseudo-random starfield in a 1000 x 600 viewBox.
// Integer hash (mulberry32-style) so the stars scatter instead of lining up.
function hash(seed) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const STARS = Array.from({ length: 70 }, (_, i) => {
  const rand = (n) => hash(i * 7 + n);
  return {
    x: Math.round(rand(1) * 1000),
    y: Math.round(rand(2) * 600),
    r: 0.6 + rand(3) * 1.4,
    dur: 3 + rand(4) * 3,
    delay: rand(5) * 4,
    min: 0.15 + rand(6) * 0.3,
  };
});

function Starfield() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#ffffff">
        {STARS.map((s, i) => (
          <circle
            key={i}
            className="constellation-star"
            cx={s.x}
            cy={s.y}
            r={s.r}
            style={{ "--tw-dur": `${s.dur}s`, "--tw-delay": `${s.delay}s`, "--tw-min": s.min }}
          />
        ))}
      </g>
    </svg>
  );
}

function Astronaut({ className }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true" focusable="false">
      {/* tether drifting off into space */}
      <path
        d="M66 120 C 20 130, 30 190, -40 205"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      {/* backpack */}
      <rect x="58" y="82" width="84" height="74" rx="16" fill="#b9c6d8" />
      {/* arms */}
      <rect x="40" y="96" width="24" height="52" rx="12" fill="#e8edf4" transform="rotate(28 52 100)" />
      <rect x="136" y="96" width="24" height="52" rx="12" fill="#e8edf4" transform="rotate(-38 148 100)" />
      <circle cx="33" cy="140" r="10" fill="#b9c6d8" />
      <circle cx="176" cy="134" r="10" fill="#b9c6d8" />
      {/* legs + boots */}
      <rect x="74" y="140" width="22" height="48" rx="11" fill="#e8edf4" />
      <rect x="104" y="140" width="22" height="48" rx="11" fill="#e8edf4" />
      <rect x="71" y="180" width="28" height="16" rx="8" fill="#b9c6d8" />
      <rect x="101" y="180" width="28" height="16" rx="8" fill="#b9c6d8" />
      {/* torso */}
      <rect x="66" y="88" width="68" height="70" rx="22" fill="#ffffff" />
      {/* chest panel */}
      <rect x="84" y="112" width="32" height="22" rx="5" fill="#2f5d8a" />
      <circle cx="92" cy="123" r="3" fill="#7fd1ff" />
      <circle cx="100" cy="123" r="3" fill="#ffd166" />
      <circle cx="108" cy="123" r="3" fill="#ef6f6c" />
      {/* helmet */}
      <circle cx="100" cy="62" r="40" fill="#ffffff" />
      <circle cx="100" cy="62" r="40" fill="none" stroke="#d5deea" strokeWidth="3" />
      {/* visor */}
      <rect x="72" y="44" width="56" height="38" rx="19" fill="#1f3350" />
      <path d="M82 54 q 8 -6 18 -4" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <circle cx="116" cy="70" r="2.5" fill="#ffffff" fillOpacity="0.5" />
      {/* "LR" mission patch */}
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#1f3350"
      >
        LR
      </text>
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center bg-navy text-white">
      <Starfield />

      <div className="wrap relative grid items-center gap-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-16 md:py-16">
        <div className="order-2 md:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#7fd1ff]">
            Error 404 · Lost in space
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            This page drifted out of orbit.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            The page you are looking for doesn&apos;t exist, or it floated away somewhere
            between here and the stars. Let&apos;s get you back on solid ground.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-[#dbe7f5]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Earth
            </Link>
            <Link
              href="/#projects"
              className="text-sm text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              or explore my projects
            </Link>
          </div>

          <p className="mt-12 font-mono text-xs italic text-white/45">Per aspera ad astra.</p>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <Astronaut className="astronaut-float w-32 md:w-72" />
        </div>
      </div>
    </main>
  );
}
