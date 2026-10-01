"use client";

import { useRef } from "react";

// Easter egg: a small "Hungry?" button on the Chef de Rang entry (Experience)
// opens a restaurant-style menu where the dishes are Luca's stack. Uses the
// native <dialog> (focus handling, Esc to close and the backdrop come for
// free); clicking the backdrop also closes it. Styles: .chefs-menu in
// globals.css.

// "Prices" are Big-O complexities. Keep the dishes in sync with Stack.js.
const COURSES = [
  {
    course: "Starters",
    dishes: [
      {
        name: "Pydantic Toast",
        desc: "Python on toasted bread, every topping validated. Zero type errors guaranteed.",
        price: "O(1)",
      },
    ],
  },
  {
    course: "First Courses",
    dishes: [
      {
        name: "LangGraph Noodles in RAG Sauce",
        desc: "Hand-rolled multi-agent pasta, tossed in context freshly retrieved from ChromaDB.",
        price: "O(n)",
      },
    ],
  },
  {
    course: "Main Courses",
    dishes: [
      {
        name: "Spring Boot Fillet",
        desc: "Slow-cooked Java with Hibernate jus and a side of PostgreSQL.",
        price: "O(log n)",
      },
      {
        name: "Grilled ASP.NET Core",
        desc: "Flame-cooked C#, served with a JWT on the side. Ask the waiter for your token.",
        price: "O(log n)",
      },
    ],
  },
  {
    course: "Desserts",
    dishes: [
      {
        name: "Layered Docker Cake",
        desc: "Stacked like a container image. Tastes the same on every machine.",
        price: "O(1)",
      },
    ],
  },
  {
    course: "Coffee",
    dishes: [
      {
        name: "Java Coffee",
        desc: "The original. Strong, verbose, keeps you up all night.",
        price: "O(1)",
      },
    ],
  },
];

function ForkKnife({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

export default function ChefsMenu() {
  const dialogRef = useRef(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // A click on the <dialog> element itself (not its content) is a backdrop click.
  const onDialogClick = (e) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group mt-5 inline-flex items-center gap-2 rounded-full border border-accent/25 px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
      >
        <ForkKnife className="transition-transform group-hover:-rotate-12" />
        Hungry?
      </button>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        aria-labelledby="chefs-menu-title"
        className="chefs-menu"
      >
        <div className="relative px-5 py-8 sm:px-10 sm:py-9">
          <button
            type="button"
            onClick={close}
            aria-label="Close the menu"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          <header className="pt-4 text-center sm:pt-0">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent sm:tracking-[0.3em]">
              Chef de Rang 2017 - 2026
            </p>
            <h2
              id="chefs-menu-title"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl"
            >
              Luca&apos;s Kitchen
            </h2>
            <p className="mt-1 text-sm italic text-muted">Now serving code</p>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-accent/60" aria-hidden="true">
              <span className="h-px w-12 bg-current" />
              <ForkKnife />
              <span className="h-px w-12 bg-current" />
            </div>
          </header>

          <div className="mt-6 space-y-6">
            {COURSES.map((c) => (
              <section key={c.course}>
                <h3 className="text-center font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  {c.course}
                </h3>
                <ul className="mt-3 space-y-3">
                  {c.dishes.map((d) => (
                    <li key={d.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-base font-semibold text-navy">
                          {d.name}
                        </span>
                        <span
                          className="hidden min-w-4 flex-1 translate-y-[-0.2em] border-b border-dotted border-muted/50 sm:block"
                          aria-hidden="true"
                        />
                        <span className="shrink-0 font-mono text-xs text-accent">{d.price}</span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-ink/70">{d.desc}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <footer className="mt-8 border-t border-line pt-5 text-center">
            <p className="font-mono text-xs text-muted">
              Cover charge: <span className="text-navy">git push</span> · always free
            </p>
            <p className="mt-2 text-xs italic text-muted">
              Allergens: may contain traces of bugs.
            </p>
          </footer>
        </div>
      </dialog>
    </>
  );
}
