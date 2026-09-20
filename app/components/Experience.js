// Data-driven "Experience" section (timeline: period left, details right).
const jobs = [
  {
    role: "Software Engineering Intern",
    org: "KreaSistemi",
    location: "Corridonia, Italy",
    period: "Oct 2025 - Dec 2025",
    bullets: [
      "Developed and restyled client websites and e-commerce projects (WordPress / NicePage), deployed via Aruba Business.",
      "Built an AI agentic workflow in n8n: an LLM-powered Telegram bot that generates SEO-optimized articles and images and publishes them to clients' WordPress sites (see AutomatedBlogPosting).",
      "Developed LLM + RAG chatbots (n8n) for client websites that answer visitors' questions about the company and assemble quotes to send by email.",
    ],
  },
  {
    role: "Chef de Rang",
    org: "Albergo Ristorante Apollo 17",
    location: "Corridonia, Italy",
    period: "Oct 2017 - Jan 2026",
    bullets: [
      "Coordinated and led the dining-room staff while working full-time and later part-time throughout my studies.",
      "Developed strong teamwork, organization, and customer-facing communication skills under pressure.",
    ],
  },
];

function Entry({ job }) {
  return (
    <div className="grid gap-2 border-t border-line py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:py-10">
      <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">
        {job.period}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-navy md:text-2xl">
          {job.role}
        </h3>
        <p className="mt-1 text-sm text-accent">
          {job.org} · {job.location}
        </p>
        <ul className="mt-4 space-y-3">
          {job.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-ink/80">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/70" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Experience
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Where I&apos;ve worked
        </h2>

        <div className="mt-10">
          {jobs.map((job) => (
            <Entry key={job.role} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
