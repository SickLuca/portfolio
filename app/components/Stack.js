import Reveal from "./Reveal";
import OrbitingCircles from "./OrbitingCircles";

// Data-driven "Stack" (technical skills) section.
// Grouped by area; edit the arrays to update the pills.
const groups = [
  {
    label: "AI & Agentic",
    items: [
      "LangChain",
      "LangGraph",
      "Multi-agent orchestration",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt engineering",
      "n8n",
    ],
  },
  {
    label: "Languages",
    items: ["Python", "Java", "C#", "C++", "SQL"],
  },
  {
    label: "Backend & APIs",
    items: [
      "Spring Boot",
      "ASP.NET Core",
      "Entity Framework Core",
      "JPA / Hibernate",
      "REST API design",
      "OpenAPI / Swagger",
      "JWT authentication",
    ],
  },
  {
    label: "Data & Persistence",
    items: ["Relational databases (SQL)", "H2", "ChromaDB", "Data modeling"],
  },
  {
    label: "Testing & Tooling",
    items: ["pytest", "JUnit", "Mockito", "Pydantic", "Docker", "Gradle", "Git / GitHub"],
  },
  {
    label: "Other",
    items: [
      "Streamlit",
      "JavaFX",
      "Arduino / embedded C++",
      "WordPress",
      "Visual Paradigm",
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Stack
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
            Technical skills
          </h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            The languages, frameworks and tools I reach for, grouped by area.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-12 md:mt-16">
            <OrbitingCircles />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal
              key={group.label}
              delay={Math.min(index, 4) * 0.07}
              y={28}
              blur={0}
              duration={0.6}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {group.label}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
