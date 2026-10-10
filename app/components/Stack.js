import Reveal from "./Reveal";
import TechGlobe from "./TechGlobe";
import NightSky from "./NightSky";

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

// Constellation behind the section (see NightSky.js): x / y in % of the
// section, r = dot radius in px. Kept irregular on purpose, and threaded
// through the margins and the gaps between the skill groups.
const SKY_STARS = [
  // right of the title and the globe
  { x: 83, y: 5, r: 2.1, glow: true },
  { x: 91.5, y: 9.5, r: 1.3 },
  { x: 87, y: 17, r: 1.7 },
  { x: 96, y: 26.5, r: 1.2 },
  { x: 79, y: 29, r: 2.5, glow: true },
  { x: 89, y: 36, r: 1.5 },
  { x: 82.5, y: 47, r: 1.9 },
  { x: 94, y: 53.5, r: 1.2 },
  // left of the globe
  { x: 11, y: 15, r: 1.4 },
  { x: 4.5, y: 23, r: 2.1, glow: true },
  { x: 17, y: 31.5, r: 1.3 },
  { x: 8, y: 40, r: 1.7 },
  { x: 21, y: 47.5, r: 2.3, glow: true },
  { x: 3, y: 55, r: 1.2 },
  // scattered through the skill groups
  { x: 30, y: 58.5, r: 1.3 },
  { x: 44, y: 66, r: 1.6 },
  { x: 38, y: 77, r: 1.2 },
  { x: 57, y: 73.5, r: 2.1, glow: true },
  { x: 71, y: 63, r: 1.4 },
  { x: 66, y: 86, r: 1.5 },
  { x: 27, y: 90, r: 1.8 },
  { x: 49, y: 95.5, r: 1.3 },
  { x: 88, y: 78, r: 1.2 },
  { x: 12, y: 74, r: 1.5, glow: true },
];

const SKY_LINKS = [
  [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [6, 7],
  [8, 9], [9, 10], [10, 11], [11, 12], [11, 13],
  [12, 14], [14, 15], [15, 17], [17, 18], [18, 6], [15, 16], [16, 20],
  [20, 23], [17, 19], [19, 21], [19, 22],
];

export default function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden text-white">
      <NightSky stars={SKY_STARS} links={SKY_LINKS} seed={20261010} />
      <div className="wrap relative z-10 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
            Stack
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Technical skills
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            The languages, frameworks and tools I reach for, grouped by area.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-12 md:mt-16">
            <TechGlobe />
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
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                {group.label}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-white/85"
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
