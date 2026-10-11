"use client";

import { useEffect, useRef } from "react";

// "Tip for a coffee" button in the footer: while it is pressed it throws
// spinning coins out of the pointer. Particle physics adapted from the
// "Cool Mode" component by Magic UI (MIT, magicui.design); unlike the
// original, the animation loop only runs while there are coins on screen,
// and coins move with transforms only. Keyboard presses throw a small burst
// from the button. Reduce-motion keeps the button but skips the coins.
const SIZES = [18, 22, 26, 30, 34];
const LIMIT = 45; // max coins on screen
const EVERY = 30; // ms between coins while pressed
const SVG_NS = "http://www.w3.org/2000/svg";

function coinSvg(size) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 32 32");
  svg.innerHTML =
    '<circle cx="16" cy="16" r="15" fill="#e8b931" stroke="#b8860b" stroke-width="2"/>' +
    '<circle cx="16" cy="16" r="10.5" fill="none" stroke="#f7d774" stroke-width="1.5"/>' +
    '<text x="16" y="21.5" text-anchor="middle" font-size="15" font-weight="700" ' +
    'font-family="system-ui, sans-serif" fill="#9a6f08">€</text>';
  return svg;
}

function getLayer() {
  let layer = document.getElementById("coin-tip-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "coin-tip-layer";
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText =
      "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:2147483647";
    document.body.appendChild(layer);
  }
  return layer;
}

export default function CoinTip() {
  const ref = useRef(null);

  useEffect(() => {
    const button = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let coins = [];
    let pressed = false;
    let x = 0;
    let y = 0;
    let last = 0;
    let raf = 0;

    const spawn = (px, py) => {
      const size = SIZES[Math.floor(Math.random() * SIZES.length)];
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;left:0;top:0;will-change:transform";
      el.appendChild(coinSvg(size));
      getLayer().appendChild(el);
      coins.push({
        el,
        size,
        left: px - size / 2,
        top: py - size / 2,
        dir: Math.random() <= 0.5 ? -1 : 1,
        speedHorz: Math.random() * 10,
        speedUp: Math.random() * 25,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: 0.15 + Math.random() * 0.25,
      });
    };

    const frame = (now) => {
      raf = 0;
      if (pressed && coins.length < LIMIT && now - last > EVERY) {
        spawn(x, y);
        last = now;
      }
      const bottom = window.innerHeight;
      coins = coins.filter((c) => {
        c.left -= c.speedHorz * c.dir;
        c.top -= c.speedUp;
        c.speedUp = Math.min(c.size, c.speedUp - 1);
        c.spin += c.spinSpeed;
        if (c.top > bottom + c.size) {
          c.el.remove();
          return false;
        }
        // scaleX(cos) makes the coin look like it is flipping in the air.
        c.el.style.transform = `translate3d(${c.left}px, ${c.top}px, 0) scaleX(${Math.cos(c.spin).toFixed(3)})`;
        return true;
      });
      if (pressed || coins.length) raf = requestAnimationFrame(frame);
    };
    const run = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onDown = (e) => {
      if (reduce.matches) return;
      x = e.clientX;
      y = e.clientY;
      pressed = true;
      run();
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    const onUp = () => {
      pressed = false;
    };
    const onKey = (e) => {
      if (reduce.matches || e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
      const r = button.getBoundingClientRect();
      for (let i = 0; i < 12; i++) spawn(r.left + r.width / 2, r.top + r.height / 2);
      run();
    };

    button.addEventListener("pointerdown", onDown);
    button.addEventListener("pointermove", onMove, { passive: true });
    button.addEventListener("pointerup", onUp);
    button.addEventListener("pointerleave", onUp);
    button.addEventListener("pointercancel", onUp);
    button.addEventListener("keydown", onKey);
    return () => {
      button.removeEventListener("pointerdown", onDown);
      button.removeEventListener("pointermove", onMove);
      button.removeEventListener("pointerup", onUp);
      button.removeEventListener("pointerleave", onUp);
      button.removeEventListener("pointercancel", onUp);
      button.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      coins.forEach((c) => c.el.remove());
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className="inline-flex touch-none select-none items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/70 active:scale-[0.97]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
        <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
        <path d="M8 3c0 1.2 1 1.5 1 2.7M12 3c0 1.2 1 1.5 1 2.7" />
      </svg>
      Tip for a coffee
    </button>
  );
}
