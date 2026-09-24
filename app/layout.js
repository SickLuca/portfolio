import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { faqs } from "./faqData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://lucarepupilli.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luca Repupilli - Software Engineer",
    template: "%s | Luca Repupilli",
  },
  description:
    "Luca Repupilli is a Computer Science graduate and aspiring AI engineer building multi-agent LLM systems (LangChain, LangGraph, RAG) and RESTful backends.",
  keywords: [
    "Luca Repupilli",
    "AI engineer",
    "software engineer",
    "LLM",
    "multi-agent",
    "LangChain",
    "LangGraph",
    "RAG",
    "Spring Boot",
    "ASP.NET Core",
    "backend developer",
    "Python",
    "Java",
    "C#",
    "portfolio",
  ],
  authors: [{ name: "Luca Repupilli", url: SITE_URL }],
  creator: "Luca Repupilli",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Luca Repupilli",
    title: "Luca Repupilli - Software Engineer",
    description:
      "Multi-agent LLM systems and RESTful backends. Selected projects, skills and experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Repupilli - Software Engineer",
    description: "Multi-agent LLM systems and RESTful backends.",
  },
};

// schema.org structured data (JSON-LD): helps search engines AND generative
// engines (ChatGPT, Perplexity, Gemini, Claude, Copilot) understand who Luca
// is, what he built, and how the entities relate. Nodes are linked by @id so
// an engine can resolve the Person, the page about him, the site, and his
// works into a single knowledge graph. Kept in sync with the visible sections
// and the CV; update here when those change. See also /llms.txt.
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Notable works, modeled as citable entities authored by Luca. Public repos
// carry a codeRepository URL; private ones are described without a link.
const works = [
  {
    type: "SoftwareSourceCode",
    name: "BdsLab Multi-Agent Assistant",
    description:
      "Conversational multi-agent assistant (bachelor's thesis) that drives six RNA-analysis command-line tools through natural language, with a LangGraph supervisor-worker architecture and a RAG layer over a ChromaDB documentation knowledge base.",
    programmingLanguage: "Python",
    keywords: "LangChain, LangGraph, RAG, ChromaDB, multi-agent, Streamlit, Docker, pytest",
  },
  {
    type: "CreativeWork",
    name: "AutomatedBlogPosting",
    description:
      "LLM content-automation workflow (built during the KreaSistemi internship) that turns a short Telegram chat into a publish-ready, SEO-optimized WordPress article plus a FLUX-generated cover image, with a human-in-the-loop review step.",
    keywords: "n8n, LLM agents, Telegram Bot, FLUX, WordPress, RAG",
  },
  {
    type: "SoftwareSourceCode",
    name: "HackHub2026",
    description:
      "RESTful backend covering the full hackathon lifecycle (events, teams, submissions, evaluations, reports) with a layered architecture, stateless JWT authentication, role-based access and OpenAPI / Swagger documentation.",
    programmingLanguage: "Java",
    codeRepository: "https://github.com/SickLuca/HackHub2026",
    keywords: "Spring Boot, JWT, JPA/Hibernate, OpenAPI, JUnit, Mockito",
  },
  {
    type: "SoftwareSourceCode",
    name: "Library Catalog Web API",
    description:
      "Web API with JWT-secured operations for books, categories and users, plus filtered, paginated search over a layered, multi-project solution.",
    programmingLanguage: "C#",
    codeRepository: "https://github.com/SickLuca/Unicam.Progetto.Libreria",
    keywords: "ASP.NET Core, Entity Framework Core, SQL, Swagger, JWT",
  },
  {
    type: "SoftwareSourceCode",
    name: "jbudget",
    description:
      "Desktop application for personal budget management with a JavaFX interface and a JPA / Hibernate + embedded H2 persistence layer.",
    programmingLanguage: "Java",
    codeRepository: "https://github.com/SickLuca/jbudget",
    keywords: "JavaFX, JPA/Hibernate, H2, Gradle",
  },
  {
    type: "SoftwareSourceCode",
    name: "ArduinoAlarmControlUnit",
    description:
      "Embedded alarm control unit built with a finite-state-machine architecture and interrupt-driven programming with direct register manipulation (simulated on Wokwi).",
    programmingLanguage: "C++",
    codeRepository: "https://github.com/SickLuca/ArduinoAlarmControlUnit",
    keywords: "Arduino, embedded C++, finite-state machine, Wokwi",
  },
];

const workNodes = works.map((w) => ({
  "@type": w.type,
  name: w.name,
  description: w.description,
  ...(w.programmingLanguage ? { programmingLanguage: w.programmingLanguage } : {}),
  ...(w.codeRepository ? { codeRepository: w.codeRepository, url: w.codeRepository } : {}),
  keywords: w.keywords,
  author: { "@id": PERSON_ID },
  creator: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Luca Repupilli - Software Engineer",
      inLanguage: "en",
      dateModified: "2026-09-22",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      primaryImageOfPage: `${SITE_URL}/luca.png`,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Luca Repupilli",
      description:
        "Portfolio of Luca Repupilli, software engineer and aspiring AI engineer building multi-agent LLM systems and RESTful backends.",
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      copyrightHolder: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Luca Repupilli",
      givenName: "Luca",
      familyName: "Repupilli",
      jobTitle: "Software Engineer",
      description:
        "Computer Science graduate and aspiring AI engineer building multi-agent LLM systems (LangChain, LangGraph, RAG) and RESTful backends in Java / Spring Boot and C# / ASP.NET Core. Open to AI and software engineering roles.",
      url: SITE_URL,
      mainEntityOfPage: `${SITE_URL}/#profilepage`,
      image: `${SITE_URL}/luca.png`,
      email: "mailto:lucarepupilli@gmail.com",
      telephone: "+39 331 3237292",
      nationality: "Italian",
      knowsLanguage: [
        { "@type": "Language", name: "Italian", alternateName: "it" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      sameAs: [
        "https://www.linkedin.com/in/luca-repupilli-700783428",
        "https://github.com/SickLuca",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Camerino (UNICAM)",
        sameAs: "https://www.unicam.it",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "Bachelor's degree",
        name: "BSc in Computer Science",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "University of Camerino (UNICAM)",
        },
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationalCategory: "15-1252.00 Software Developers",
        skills:
          "LangChain, LangGraph, multi-agent orchestration, Retrieval-Augmented Generation (RAG), prompt engineering, n8n, Python, Java, C#, Spring Boot, ASP.NET Core, REST API design, JWT authentication",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Macerata",
        addressRegion: "Marche",
        addressCountry: "IT",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "LLM agents",
        "Multi-agent systems",
        "Agentic AI",
        "LangChain",
        "LangGraph",
        "Retrieval-Augmented Generation (RAG)",
        "Prompt engineering",
        "n8n",
        "Spring Boot",
        "ASP.NET Core",
        "Entity Framework Core",
        "JPA / Hibernate",
        "REST API design",
        "OpenAPI / Swagger",
        "JWT authentication",
        "ChromaDB",
        "Python",
        "Java",
        "C#",
        "C++",
        "SQL",
        "Docker",
      ],
    },
    ...workNodes,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
