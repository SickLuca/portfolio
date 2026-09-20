// Data-driven "Selected Work" section.
// To add or edit a project, just change this array — the layout updates itself.
const projects = [
  {
    title: "BdsLab Multi-Agent Assistant",
    context: "Bachelor's Thesis · University of Camerino",
    bullets: [
      "Built a conversational multi-agent assistant that lets researchers drive six heterogeneous RNA-analysis command-line tools through plain natural language, removing the need to learn each tool's formats and options.",
      "Designed a supervisor-worker architecture in LangGraph that interprets a request, routes it to the right specialized agent, and chains tools into multi-step pipelines when a task depends on previous output.",
      "Implemented a RAG layer over a documentation knowledge base (ChromaDB + embeddings) to answer questions about the tools and the PhyloRNA taxonomy database.",
      "Made the system declaratively extensible (a new tool takes four localized steps, no changes to the graph or shared state), packaged it with Docker, and wrote a pytest suite with LLM calls mocked for deterministic tests.",
    ],
    tags: ["Python", "LangChain", "LangGraph", "ChromaDB", "Streamlit", "Pydantic", "pytest", "Docker"],
    href: null,
    note: "Private repository (available on request)",
  },
  {
    title: "AutomatedBlogPosting",
    context: "LLM Content-Automation Workflow · KreaSistemi Internship",
    bullets: [
      "Built an agentic workflow that turns a short Telegram chat into a publish-ready blog article: SEO-optimized, human-sounding copy plus a matching cover image generated with FLUX.",
      "Added a human-in-the-loop review over Telegram before publishing content as a WordPress draft.",
    ],
    tags: ["n8n", "LLM agents", "Telegram Bot", "FLUX", "WordPress"],
    href: null,
    note: "n8n workflow (demo available on request)",
  },
  {
    title: "HackHub2026",
    context: "Hackathon Management REST Backend · Team Project, UNICAM",
    bullets: [
      "Developed a RESTful backend covering the full hackathon lifecycle (events, teams, submissions, evaluations, reports, support requests) with a layered architecture (7 REST controllers), stateless JWT authentication, role-based access, and OpenAPI / Swagger documentation.",
      "Applied classic design patterns (Adapter, Builder, Strategy, Unit of Work) and covered business logic with JUnit / Mockito tests.",
      "Delivered as a team project: designed all UML diagrams (Visual Paradigm) and implemented the core modules and functionality, collaborating closely with teammates to keep the codebase consistent.",
    ],
    tags: ["Java 21", "Spring Boot", "JWT", "OpenAPI/Swagger", "JPA/Hibernate", "JUnit", "Mockito", "Gradle", "Visual Paradigm"],
    href: "https://github.com/SickLuca/HackHub2026",
    note: null,
  },
  {
    title: "Library Catalog Web API",
    context: "University Project · UNICAM",
    bullets: [
      "Built a Web API with JWT-secured operations for books, categories, and users, and filtered, paginated search (by category, title, author, publication date) over a layered, multi-project solution.",
    ],
    tags: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL", "Swagger", "JWT"],
    href: "https://github.com/SickLuca/Unicam.Progetto.Libreria",
    note: null,
  },
  {
    title: "jbudget",
    context: "Personal Budget Desktop App · UNICAM",
    bullets: [
      "Built a desktop application for personal budget management with a JavaFX interface and a JPA / Hibernate + embedded H2 persistence layer.",
    ],
    tags: ["Java", "JavaFX", "JPA / Hibernate", "H2", "Gradle", "Lombok"],
    href: "https://github.com/SickLuca/jbudget",
    note: null,
  },
  {
    title: "ArduinoAlarmControlUnit",
    context: "Embedded Alarm System · UNICAM",
    bullets: [
      "Designed an alarm control unit using a finite-state-machine architecture and interrupt-driven programming with direct register manipulation for low-level hardware control (simulated on the Wokwi platform).",
    ],
    tags: ["Arduino", "C++", "Wokwi"],
    href: "https://github.com/SickLuca/ArduinoAlarmControlUnit",
    note: null,
  },
];

function ProjectRow({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className="border-t border-line py-10 md:py-12">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-12">
        {/* left: number, title, context, link */}
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-accent">{number}</span>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
              {project.title}
            </h3>
          </div>
          <p className="mt-2 pl-8 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {project.context}
          </p>
          <div className="mt-4 pl-8">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </a>
            ) : (
              <span className="text-sm text-muted">{project.note}</span>
            )}
          </div>
        </div>

        {/* right: bullets + tags */}
        <div>
          <ul className="space-y-3">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-ink/80">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/70" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-sm text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Selected Work
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Projects
        </h2>
        <p className="mt-3 max-w-2xl text-ink/70">
          A selection of projects, from a multi-agent LLM thesis to REST backends
          and automation workflows.
        </p>

        <div className="mt-10">
          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
