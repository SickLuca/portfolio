"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently being read.
  // A section becomes active once its top passes an activation line ~35% down
  // the viewport. Two edge cases are handled explicitly: above the first
  // section (the hero) nothing is highlighted, and once the page is scrolled
  // to the bottom the last section wins even if it is too short to reach the
  // line.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));

    const update = () => {
      const scrollY = window.scrollY;
      const atBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      const line = scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= line) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-navy"
        >
          lucarepupilli.com
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-medium text-accent"
                    : "text-ink/80 hover:text-accent"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="/Luca_Repupilli_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-navy/20 px-4 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Download CV
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur md:hidden">
          <div className="wrap flex flex-col py-3">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`py-2 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-accent"
                      : "text-ink/80 hover:text-accent"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <a
              href="/Luca_Repupilli_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit rounded-full border border-navy/20 px-4 py-1.5 text-sm font-medium text-navy"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
