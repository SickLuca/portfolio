// Single source of truth for the FAQ.
// Rendered as the visible FAQ section (app/components/Faq.js) AND emitted as
// FAQPage structured data in app/layout.js. Keep answers as plain strings so
// the visible text and the schema stay identical (required for FAQ schema)
// and easy for generative engines to quote. All answers are grounded in
// content visible elsewhere on the page (hero, stack, projects, contact).
export const faqs = [
  {
    q: "Who is Luca Repupilli?",
    a: "Luca Repupilli is a Computer Science graduate (BSc, University of Camerino, 102/110) and aspiring AI engineer based in Macerata, Italy. He builds multi-agent LLM systems and RESTful backends, and is open to relocation.",
  },
  {
    q: "What does he focus on?",
    a: "AI and agentic systems: multi-agent orchestration, LLM tool-execution pipelines, Retrieval-Augmented Generation (RAG) and prompt engineering, alongside backend engineering with REST APIs in Java / Spring Boot and C# / ASP.NET Core.",
  },
  {
    q: "What technologies does he work with?",
    a: "Python, Java, C#, C++ and SQL; LangChain, LangGraph, RAG and n8n on the AI side; Spring Boot, ASP.NET Core, Entity Framework Core, JPA / Hibernate, JWT and OpenAPI / Swagger on the backend; plus ChromaDB, Docker, pytest and JUnit.",
  },
  {
    q: "What has he built?",
    a: "A conversational multi-agent LLM assistant (LangChain / LangGraph with a RAG layer) as his bachelor's thesis, an n8n content-automation workflow during an internship, and several REST backends. See the Selected Work section for details.",
  },
  {
    q: "Is he available for hire?",
    a: "Yes. He recently graduated and is looking for a role in AI and software engineering, and he is open to relocation.",
  },
  {
    q: "How can you get in touch?",
    a: "By email at lucarepupilli@gmail.com, or through LinkedIn and GitHub. His CV can be downloaded from the top of the page or the Contact section.",
  },
];
