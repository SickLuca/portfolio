"use client";

import { useState, useRef, useEffect } from "react";

// Skills constellation: tech logos orbiting a central hub.
// Logos live locally in /public/logos. Missing ones (not yet supplied) fall
// back to a short label until their SVG is dropped in. Rotation is pure CSS
// (see .orbit-* in globals.css) and pauses on hover; respects reduce-motion.
const RINGS = [
  {
    rFrac: 0.19,
    chip: 11,
    dur: "46s",
    dir: "normal",
    items: [
      { label: "Python", src: "/logos/python.svg" },
      { label: "Java", src: "/logos/java.svg" },
      { label: "C#", src: "/logos/csharp.svg" },
      { label: "C++", src: "/logos/cplusplus.svg" },
      { label: "Spring", src: "/logos/spring.svg" },
      { label: ".NET", src: "/logos/dotnet.svg" },
    ],
  },
  {
    rFrac: 0.32,
    chip: 10,
    dur: "62s",
    dir: "reverse",
    items: [
      { label: "Docker", src: "/logos/docker.svg" },
      { label: "PostgreSQL", src: "/logos/postgresql.svg" },
      { label: "LangChain", src: "/logos/langchain.png", size: "94%" },
      { label: "Git", src: "/logos/git.svg" },
      { label: "Gradle", src: "/logos/gradle.svg" },
      { label: "Pydantic", src: "/logos/pydantic.svg" },
      { label: "Swagger", src: "/logos/swagger.svg" },
      { label: "n8n", src: "/logos/n8n.svg" },
    ],
  },
  {
    rFrac: 0.45,
    chip: 9,
    dur: "80s",
    dir: "normal",
    items: [
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
    ],
  },
];

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
        onError={() => setFailed(true)}
        className="pointer-events-none select-none object-contain transition-transform duration-200 group-hover:scale-110"
        style={{ width: item.size || "60%", height: item.size || "60%" }}
      />
    );
  }

  return (
    <span
      className="font-mono font-medium text-muted"
      style={{ fontSize: "clamp(9px, 2.6cqi, 12px)", lineHeight: 1 }}
    >
      {item.abbrev || item.label}
    </span>
  );
}

export default function OrbitingCircles() {
  const [hover, setHover] = useState(null);

  return (
    <div
      className="orbit-scope relative mx-auto aspect-square w-full max-w-[560px]"
      data-paused={hover ? "true" : "false"}
      role="img"
      aria-label="Constellation of technologies I work with, orbiting a central hub"
    >
      {RINGS.map((r, ri) => (
        <div
          key={`track-${ri}`}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/10"
          style={{ width: `${r.rFrac * 200}%`, height: `${r.rFrac * 200}%` }}
        />
      ))}

      {RINGS.map((r, ri) => {
        const counter = r.dir === "normal" ? "reverse" : "normal";
        return (
          <div
            key={`ring-${ri}`}
            className="orbit-spin pointer-events-none absolute inset-0"
            style={{ "--orbit-dur": r.dur, "--orbit-dir": r.dir }}
          >
            {r.items.map((it, i) => {
              const a = (i / r.items.length) * 2 * Math.PI - Math.PI / 2;
              const left = 50 + r.rFrac * 100 * Math.cos(a);
              const top = 50 + r.rFrac * 100 * Math.sin(a);
              return (
                <div
                  key={it.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${r.chip}cqi`,
                    height: `${r.chip}cqi`,
                  }}
                >
                  <div
                    className="orbit-spin group pointer-events-auto flex h-full w-full items-center justify-center rounded-full border border-line bg-surface transition-colors hover:border-accent"
                    style={{ "--orbit-dur": r.dur, "--orbit-dir": counter }}
                    onMouseEnter={() => setHover(it.label)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <Logo item={it} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy px-3 text-center"
        style={{ width: "22cqi", height: "22cqi" }}
      >
        <span
          className="font-display font-medium leading-tight text-white"
          style={{ fontSize: "clamp(13px, 3.4cqi, 17px)" }}
        >
          {hover || "LR"}
        </span>
        {!hover && (
          <span
            className="text-white/70"
            style={{ fontSize: "clamp(9px, 2.4cqi, 12px)" }}
          >
            my stack
          </span>
        )}
      </div>
    </div>
  );
}
