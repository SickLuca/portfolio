import Reveal from "./Reveal";
import Constellation from "./Constellation";
import { faqs } from "../faqData";

// Visible FAQ section. Uses native <details> so every answer stays in the DOM
// (good for search and generative engines) and the accordion works without
// client JS. The Q&A is shared with the FAQPage JSON-LD via ../faqData.
// On desktop the questions sit in the left column and a sticky "still curious?"
// card (navy night sky + contact CTA) fills the right; on mobile they stack.
export default function Faq() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 lg:items-start">
          {/* left: heading + questions */}
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                FAQ
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 max-w-2xl text-ink/70">
                Short, direct answers to the questions I get asked most.
              </p>
            </Reveal>

            <div className="mt-10">
              {faqs.map((item, index) => (
                <Reveal
                  key={item.q}
                  delay={Math.min(index, 4) * 0.07}
                  y={28}
                  blur={0}
                  duration={0.6}
                >
                  <details className="group border-t border-line py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <h3 className="min-w-0 font-display text-lg font-semibold tracking-tight text-navy transition-colors group-hover:text-accent md:text-xl">
                        {item.q}
                      </h3>
                      <span
                        className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/80">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: sticky "still curious?" card with animated constellation */}
          <aside className="lg:sticky lg:top-28">
            <Reveal y={28} blur={0}>
              <div className="relative overflow-hidden rounded-2xl bg-navy p-8 text-white md:p-9">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <Constellation />
                </div>
                <div className="relative">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
                    Still curious?
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-snug">
                    Have a question that isn&apos;t here?
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/75">
                    Whether it&apos;s an opportunity, a collaboration, or just a
                    good problem to dig into, I&apos;d genuinely love to hear
                    about it. Ask me anything.
                  </p>
                  <div className="mt-7 flex flex-col gap-3">
                    <a
                      href="mailto:lucarepupilli@gmail.com"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-white/90"
                    >
                      Email me
                    </a>
                    <a
                      href="https://www.linkedin.com/in/luca-repupilli-700783428"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                      or connect on LinkedIn{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
