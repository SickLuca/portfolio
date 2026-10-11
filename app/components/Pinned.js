"use client";

import { useEffect, useRef } from "react";

// Pins a section once its bottom reaches the bottom of the viewport, so the
// next sibling (a <Sheet>) slides up over it instead of pushing it away.
// While it is being covered it shrinks a little and dims, as if it were
// sinking into the page. Sticky only lasts until the end of the parent
// element, so wrap the pinned section and the one covering it together.
// Once fully covered it is released back to normal flow (off screen above),
// so hidden sections do not stay stuck in the viewport and their own
// animations (shader, globe) can pause; it pins again when uncovered.
// Reduce-motion keeps the pinning but skips the shrink and dim.
export default function Pinned({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Large viewport height, so the mobile URL bar showing / hiding does not
    // make the pinned section jump.
    const measure = () => {
      el.style.top = `min(0px, calc(100lvh - ${el.offsetHeight}px))`;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();

    // In-page links (nav, hero buttons) to a section inside this one: while it
    // is pinned the browser would scroll to its stuck position, so jump to
    // its natural position instead (unpinned and unscaled). The measurement
    // happens in the same task, so nothing is ever painted that way.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      const id = link && decodeURIComponent(link.getAttribute("href").slice(1));
      const target = id && document.getElementById(id);
      if (!target || !el.contains(target)) return;
      e.preventDefault();
      const inner = el.firstElementChild;
      const { position } = el.style;
      const { transform } = inner.style;
      el.style.position = "static";
      inner.style.transform = "none";
      const top = target.getBoundingClientRect().top + window.scrollY;
      el.style.position = position;
      inner.style.transform = transform;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    // The shrink and dim are written straight to the two layers (not through
    // an inherited custom property, which would restyle the whole section on
    // every frame), and only when the value actually changes. The shrinking
    // layer stays promoted (will-change), so starting / ending a cover does not
    // make the phone re-rasterize the whole section.
    const inner = el.firstElementChild;
    const shade = el.lastElementChild;
    if (!reduce) inner.style.willChange = "transform";
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const next = el.nextElementSibling;
      if (!next) return;
      const nextTop = next.getBoundingClientRect().top;
      el.style.position = nextTop <= 0 ? "static" : "";
      if (reduce) return;
      const p = Math.round(Math.min(Math.max(1 - nextTop / window.innerHeight, 0), 1) * 1000) / 1000;
      if (p === last) return;
      last = p;
      inner.style.transform = p ? `scale(${1 - p * 0.06})` : "";
      shade.style.opacity = p * 0.35;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="sticky z-0">
      <div style={{ transformOrigin: "50% calc(100% - 50lvh)" }}>{children}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
