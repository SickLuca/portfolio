import ShareButton from "./ShareButton";

// Contact section: short intro + call-to-action buttons + contact links.
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

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* left: intro + CTAs */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-md text-ink/70">
              I recently graduated in Computer Science and I&apos;m looking for a
              role in AI and software engineering. I&apos;m always happy to talk
              about AI, agents, and backend systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:lucarepupilli@gmail.com"
                className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                Email me
              </a>
              <a
                href="/Luca_Repupilli_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-navy/50"
              >
                Download CV
              </a>
              <ShareButton />
            </div>
          </div>

          {/* right: contact links */}
          <div className="rounded-2xl border border-line bg-surface px-5">
            {links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex flex-col gap-1 border-t border-line py-4 first:border-t-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {link.label}
                  </span>
                  <span className="text-sm text-ink/80 transition-colors group-hover:text-accent sm:text-right break-all">
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
