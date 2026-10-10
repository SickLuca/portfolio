import ShareButton from "./ShareButton";
import NightSky from "./NightSky";

// Contact section: short intro + call-to-action buttons + contact links, on
// navy. Its constellation is exported as ContactSky and placed by page.js
// behind both this section and the footer, so the sky reaches the page end.
const links = [
  {
    label: "Email",
    value: "lucarepupilli@gmail.com",
    href: "mailto:lucarepupilli@gmail.com",
  },
  {
    label: "Phone",
    value: "+39 331 3237292",
    href: "tel:+393313237292",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/luca-repupilli-700783428",
    href: "https://www.linkedin.com/in/luca-repupilli-700783428",
  },
  {
    label: "GitHub",
    value: "github.com/SickLuca",
    href: "https://github.com/SickLuca",
  },
];

// Constellation (see NightSky.js): x / y in % of the Contact + footer block,
// r = dot radius in px, kept around the edges of the two columns.
const SKY_STARS = [
  { x: 58, y: 9, r: 1.6 },
  { x: 66.5, y: 4.5, r: 1.2 },
  { x: 76, y: 14, r: 2.2, glow: true },
  { x: 85.5, y: 7, r: 1.3 },
  { x: 94, y: 20, r: 1.6 },
  { x: 47, y: 31, r: 1.2 },
  { x: 51.5, y: 53, r: 1.8, glow: true },
  { x: 44, y: 73, r: 1.3 },
  { x: 55, y: 91, r: 1.5 },
  { x: 31, y: 86, r: 1.2 },
  { x: 9, y: 79, r: 2, glow: true },
  { x: 71, y: 95, r: 1.3 },
  { x: 93, y: 80, r: 1.2 },
  { x: 4, y: 12, r: 1.4 },
  { x: 13, y: 5, r: 1.1 },
];

const SKY_LINKS = [
  [1, 0], [0, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [7, 9],
  [9, 10], [8, 11], [11, 12], [13, 14],
];

export function ContactSky() {
  return <NightSky stars={SKY_STARS} links={SKY_LINKS} seed={1729} dust={60} />;
}

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 text-white">
      <div className="wrap relative z-10 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* left: intro + CTAs */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              I graduated in Computer Science and I&apos;m now pursuing an MSc in
              Artificial Intelligence, while looking for a role in AI and software
              engineering. I&apos;m always happy to talk about AI, agents, and
              backend systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:lucarepupilli@gmail.com"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-white/90"
              >
                Email me
              </a>
              <a
                href="/Luca_Repupilli_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/70"
              >
                Download CV
              </a>
              <ShareButton />
            </div>
          </div>

          {/* right: contact links */}
          <div className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 backdrop-blur-[2px]">
            {links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex flex-col gap-1 border-t border-white/10 py-4 first:border-t-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                    {link.label}
                  </span>
                  <span className="text-sm text-white/80 transition-colors group-hover:text-white sm:text-right break-all">
                    {link.value}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
