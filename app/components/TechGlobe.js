"use client";

import { useState, useRef, useEffect } from "react";

// Skills globe: tech logos spread over a draggable 3D sphere, around a
// geodesic wireframe. No 3D library: points are rotated with a 3x3 matrix and
// projected by hand every frame, then written straight to the DOM (no React
// re-render per frame). Logos live locally in /public/logos; missing ones fall
// back to a short label. Spins slowly on its own, pauses on hover, keeps some
// inertia after a drag, and stays still under reduce-motion (drag still works).
// Styled for the navy Stack section (white wireframe and labels).
const TECHS = [
  { label: "Python", src: "/logos/python.svg" },
  { label: "Java", src: "/logos/java.svg" },
  { label: "C#", src: "/logos/csharp.svg" },
  { label: "C++", src: "/logos/cplusplus.svg" },
  { label: "Spring", src: "/logos/spring.svg" },
  { label: ".NET", src: "/logos/dotnet.svg" },
  { label: "Docker", src: "/logos/docker.svg" },
  { label: "PostgreSQL", src: "/logos/postgresql.svg" },
  { label: "LangChain", src: "/logos/langchain.png", size: "94%" },
  { label: "Git", src: "/logos/git.svg" },
  { label: "Gradle", src: "/logos/gradle.svg" },
  { label: "Pydantic", src: "/logos/pydantic.svg" },
  { label: "Swagger", src: "/logos/swagger.svg" },
  { label: "n8n", src: "/logos/n8n.svg" },
  { label: "GitHub", src: "/logos/github.svg" },
  { label: "JUnit", src: "/logos/junit.svg" },
  { label: "Hibernate", src: "/logos/hibernate.svg" },
  { label: "Streamlit", src: "/logos/streamlit.svg" },
  { label: "WordPress", src: "/logos/wordpress.svg" },
  { label: "Arduino", src: "/logos/arduino.svg" },
  { label: "LangGraph", src: "/logos/langgraph.png", abbrev: "LG", size: "94%" },
  { label: "ChromaDB", src: "/logos/chromadb.png", abbrev: "DB" },
  { label: "JWT", src: "/logos/jwt.svg" },
  { label: "JavaFX", src: "/logos/javafx.png", abbrev: "FX", size: "94%" },
];

const WIRE_R = 0.3; // wireframe radius, as a fraction of the container width
const LOGO_R = 1.2; // logo shell radius, relative to the wireframe
const CAMERA = 4; // camera distance, in wireframe radii (lower = stronger perspective)
const AUTO_SPIN = 0.00012; // idle rotation, rad/ms (~50s per turn)
const DRAG_SENS = 2.6; // radians per container width dragged

// Geodesic sphere: icosahedron with each face split `freq` times, pushed onto
// the unit sphere. Returns unique vertices and edges.
function geodesic(freq) {
  const t = (1 + Math.sqrt(5)) / 2;
  const ico = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const verts = [];
  const seen = new Map();
  const edges = new Map();

  const vertex = (p) => {
    const len = Math.hypot(p[0], p[1], p[2]);
    const v = [p[0] / len, p[1] / len, p[2] / len];
    const key = v.map((c) => Math.round(c * 1e4)).join(",");
    if (!seen.has(key)) {
      seen.set(key, verts.length);
      verts.push(v);
    }
    return seen.get(key);
  };
  const edge = (a, b) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (!edges.has(key)) edges.set(key, [a, b]);
  };

  for (const [ia, ib, ic] of faces) {
    const [a, b, c] = [ico[ia], ico[ib], ico[ic]];
    const grid = [];
    for (let i = 0; i <= freq; i++) {
      grid[i] = [];
      for (let j = 0; j <= freq - i; j++) {
        const u = i / freq;
        const w = j / freq;
        const k = 1 - u - w;
        grid[i][j] = vertex([
          a[0] * k + b[0] * u + c[0] * w,
          a[1] * k + b[1] * u + c[1] * w,
          a[2] * k + b[2] * u + c[2] * w,
        ]);
      }
    }
    for (let i = 0; i < freq; i++) {
      for (let j = 0; j < freq - i; j++) {
        edge(grid[i][j], grid[i + 1][j]);
        edge(grid[i][j], grid[i][j + 1]);
        edge(grid[i + 1][j], grid[i][j + 1]);
      }
    }
  }
  return { verts, edges: [...edges.values()] };
}

// Evenly spread n points on the unit sphere (golden-angle spiral).
function fibonacciSphere(n) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r];
  });
}

const WIRE = geodesic(3);
const POINTS = fibonacciSphere(TECHS.length);

// Row-major 3x3 helpers. Screen space: x right, y down, z towards the viewer.
const mul = (a, b) => {
  const out = new Array(9);
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++)
      out[r * 3 + c] = a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c];
  return out;
};
const rotY = (t) => [Math.cos(t), 0, Math.sin(t), 0, 1, 0, -Math.sin(t), 0, Math.cos(t)];
const rotX = (t) => [1, 0, 0, 0, Math.cos(t), Math.sin(t), 0, -Math.sin(t), Math.cos(t)];

// Gram-Schmidt on the rows, so float drift never skews the sphere.
function orthonormalize(m) {
  const a = [m[0], m[1], m[2]];
  let len = Math.hypot(...a);
  a.forEach((_, i) => (a[i] /= len));
  const d = a[0] * m[3] + a[1] * m[4] + a[2] * m[5];
  const b = [m[3] - d * a[0], m[4] - d * a[1], m[5] - d * a[2]];
  len = Math.hypot(...b);
  b.forEach((_, i) => (b[i] /= len));
  const c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  return [...a, ...b, ...c];
}

function Logo({ item }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  // Catch a 404 that fired before hydration attached onError.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (item.src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src={item.src}
        alt={item.label}
        draggable={false}
        onError={() => setFailed(true)}
        className="pointer-events-none select-none object-contain"
        style={{ width: item.size || "62%", height: item.size || "62%" }}
      />
    );
  }

  return (
    <span
      className="font-mono font-medium text-muted"
      style={{ fontSize: "clamp(9px, 2.4cqi, 12px)", lineHeight: 1 }}
    >
      {item.abbrev || item.label}
    </span>
  );
}

export default function TechGlobe() {
  const rootRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const itemRefs = useRef([]);
  const api = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const s = {
      m: mul(rotX(-0.35), rotY(0.4)),
      size: root.clientWidth,
      vel: { x: AUTO_SPIN, y: 0 },
      dragging: false,
      hovered: false,
      focus: -1,
      dirty: true,
      steps: 0,
    };

    const rotate = (ax, ay) => {
      s.m = mul(mul(rotX(ay), rotY(ax)), s.m);
      if (++s.steps % 60 === 0) s.m = orthonormalize(s.m);
      s.dirty = true;
    };
    api.current = {
      setHovered: (v) => (s.hovered = v),
      nudge: (ax, ay) => {
        s.vel = { x: 0, y: 0 };
        rotate(ax, ay);
      },
    };

    const project = (v, radius) => {
      const { m } = s;
      const x = (m[0] * v[0] + m[1] * v[1] + m[2] * v[2]) * radius;
      const y = (m[3] * v[0] + m[4] * v[1] + m[5] * v[2]) * radius;
      const z = (m[6] * v[0] + m[7] * v[1] + m[8] * v[2]) * radius;
      const p = CAMERA / (CAMERA - z);
      return [x * p, y * p, z];
    };

    const render = () => {
      const half = s.size / 2;
      const r = s.size * WIRE_R;

      const pts = WIRE.verts.map((v) => project(v, 1));
      let front = "";
      let back = "";
      for (const [a, b] of WIRE.edges) {
        const pa = pts[a];
        const pb = pts[b];
        const seg = `M${(half + pa[0] * r).toFixed(1)} ${(half + pa[1] * r).toFixed(1)}L${(half + pb[0] * r).toFixed(1)} ${(half + pb[1] * r).toFixed(1)}`;
        if (pa[2] + pb[2] >= 0) front += seg;
        else back += seg;
      }
      frontRef.current?.setAttribute("d", front);
      backRef.current?.setAttribute("d", back);

      let best = -1;
      let bestZ = -Infinity;
      POINTS.forEach((v, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const [x, y, z] = project(v, LOGO_R);
        const depth = (z / LOGO_R + 1) / 2; // 0 = far side, 1 = facing us
        const scale = 0.55 + 0.55 * depth;
        el.style.transform = `translate3d(${(half + x * r).toFixed(1)}px, ${(half + y * r).toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.zIndex = String(z > 0 ? 200 + Math.round(depth * 100) : Math.round(depth * 100));
        el.style.setProperty("--o", (0.16 + 0.84 * depth ** 1.6).toFixed(3));
        el.style.setProperty("--lo", Math.min(Math.max((depth - 0.62) / 0.25, 0), 1).toFixed(3));
        if (z > bestZ) {
          bestZ = z;
          best = i;
        }
      });

      if (best !== s.focus) {
        if (s.focus >= 0) itemRefs.current[s.focus]?.removeAttribute("data-focus");
        itemRefs.current[best]?.setAttribute("data-focus", "true");
        s.focus = best;
      }
      s.dirty = false;
    };

    // Frame loop, only while the globe is on screen. On touch screens the
    // idle spin also holds still while the page is being scrolled (and for a
    // moment after), so the phone does not redraw the globe and scroll at once.
    let raf = 0;
    let last = 0;
    let scrollHold = 0;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const onScroll = () => {
      scrollHold = performance.now() + 200;
    };
    if (touch) window.addEventListener("scroll", onScroll, { passive: true });
    const frame = (now) => {
      const dt = Math.min(now - (last || now), 50);
      last = now;
      if (!s.dragging && now > scrollHold) {
        if (reduce.matches) {
          s.vel = { x: 0, y: 0 };
        } else {
          // Ease back from drag inertia to the idle spin (or to rest on hover).
          const k = 1 - Math.exp(-dt / 700);
          s.vel.x += ((s.hovered ? 0 : AUTO_SPIN) - s.vel.x) * k;
          s.vel.y += (0 - s.vel.y) * k;
        }
        if (Math.abs(s.vel.x) + Math.abs(s.vel.y) > 1e-7) rotate(s.vel.x * dt, s.vel.y * dt);
      }
      if (s.dirty) render();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop()
    );
    io.observe(root);

    const ro = new ResizeObserver(() => {
      s.size = root.clientWidth;
      s.dirty = true;
      render();
    });
    ro.observe(root);

    // Drag: rotate under the pointer, then hand the last velocity to inertia.
    let lx = 0;
    let ly = 0;
    let lt = 0;
    const onDown = (e) => {
      if (e.button !== 0) return;
      s.dragging = true;
      s.vel = { x: 0, y: 0 };
      lx = e.clientX;
      ly = e.clientY;
      lt = e.timeStamp;
      root.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!s.dragging) return;
      const k = DRAG_SENS / s.size;
      const ax = (e.clientX - lx) * k;
      const ay = (e.clientY - ly) * k;
      const dt = Math.max(e.timeStamp - lt, 1);
      rotate(ax, ay);
      s.vel = { x: s.vel.x * 0.3 + (ax / dt) * 0.7, y: s.vel.y * 0.3 + (ay / dt) * 0.7 };
      lx = e.clientX;
      ly = e.clientY;
      lt = e.timeStamp;
    };
    const onUp = (e) => {
      if (!s.dragging) return;
      s.dragging = false;
      // Released after holding still: no fling.
      if (e.timeStamp - lt > 80) s.vel = { x: 0, y: 0 };
    };
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      api.current = null;
    };
  }, []);

  const onKeyDown = (e) => {
    const step = 0.2;
    const moves = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const mv = moves[e.key];
    if (!mv || !api.current) return;
    e.preventDefault();
    api.current.nudge(mv[0], mv[1]);
  };

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div
        ref={rootRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="img"
        aria-label={`Interactive 3D globe of technologies I work with: ${TECHS.map((t) => t.label).join(", ")}. Drag or use the arrow keys to rotate it.`}
        className="relative aspect-square w-full cursor-grab touch-pan-y select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:cursor-grabbing"
        style={{ containerType: "inline-size" }}
      >
        {/* soft shaded body behind the wireframe */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${WIRE_R * 206}%`,
            height: `${WIRE_R * 206}%`,
            background:
              "radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05) 60%, rgb(255 255 255 / 0.02))",
          }}
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-white"
          style={{ zIndex: 150 }}
        >
          <path ref={backRef} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
          <path ref={frontRef} fill="none" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
        </svg>

        {TECHS.map((it, i) => (
          <div
            key={it.label}
            ref={(el) => (itemRefs.current[i] = el)}
            className="group absolute left-0 top-0 opacity-[var(--o)] hover:opacity-100"
            style={{
              "--o": 0,
              "--lo": 0,
              width: "clamp(36px, 10cqi, 56px)",
              height: "clamp(36px, 10cqi, 56px)",
              willChange: "transform",
            }}
            onPointerEnter={() => api.current?.setHovered(true)}
            onPointerLeave={() => api.current?.setHovered(false)}
          >
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/20 bg-surface shadow-[0_8px_22px_-10px_rgb(0_0_0/0.5)] transition-colors group-hover:border-white group-data-[focus=true]:border-white/70">
              <Logo item={it} />
            </div>
            <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-white/60 opacity-[var(--lo)] group-hover:opacity-100 group-data-[focus=true]:font-semibold group-data-[focus=true]:text-white">
              {it.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-white/60">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />
        </svg>
        Drag to explore
      </p>
    </div>
  );
}
