// Data-driven "Education" section (same timeline layout as Experience).
// An entry with `progress` also shows a circular progress ring on the right.
import ProgressRing from "./ProgressRing";

const education = [
  {
    degree: "MSc in Computer Science - Artificial Intelligence (taught in English)",
    org: "University of Camerino (UNICAM)",
    period: "Oct 2026 - present",
    note: "In progress",
    bullets: [
      "Current courses: complex systems design, machine learning, multiagent systems lab, distributed calculus and coordination.",
    ],
    progress: { value: 25, label: "Degree progress" },
  },
  {
    degree: "BSc in Computer Science",
    org: "University of Camerino (UNICAM)",
    period: "Oct 2021 - Jul 2026",
    note: "Grade: 102/110",
    bullets: [
      "Core coursework: algorithms & data structures, software engineering (Java, Spring Boot), advanced programming paradigms (C# / ASP.NET Core), databases (SQL), operating systems, computer networks & security, languages & compilers, probability & statistics.",
      "Bachelor's thesis: LLM-based multi-agent assistant for executing bioinformatics pipelines (Python, LangChain / LangGraph).",
    ],
  },
  {
    degree: "Scientific High School Diploma",
    org: "Liceo Scientifico G. Galilei, Macerata",
    period: "",
    note: "",
    bullets: [],
  },
];

function Entry({ item }) {
  return (
    <div className="grid gap-2 border-t border-line py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:py-10">
      <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">
        {item.period}
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold tracking-tight text-navy md:text-2xl">
            {item.degree}
          </h3>
          <p className="mt-1 text-sm text-accent">
            {item.org}
            {item.note ? ` · ${item.note}` : ""}
          </p>
          {item.bullets.length > 0 && (
            <ul className="mt-4 space-y-3">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-base leading-relaxed text-ink/80">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/70" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {item.progress && (
          <div className="shrink-0">
            <ProgressRing value={item.progress.value} label={item.progress.label} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Education
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Academic background
        </h2>

        <div className="mt-10">
          {education.map((item) => (
            <Entry key={item.degree} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
