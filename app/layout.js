import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
    "Luca Repupilli is a Computer Science graduate and aspiring AI engineer building multi-agent LLM systems (LangChain, LangGraph, RAG) and RESTful backends in Java / Spring Boot and C# / ASP.NET Core.",
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

// schema.org Person structured data: helps search engines and AI understand who you are.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luca Repupilli",
  jobTitle: "Software Engineer",
  description:
    "Computer Science graduate and aspiring AI engineer building multi-agent LLM systems and RESTful backends.",
  url: SITE_URL,
  email: "mailto:lucarepupilli@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/luca-repupilli-700783428",
    "https://github.com/SickLuca",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Camerino (UNICAM)",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Macerata",
    addressCountry: "IT",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "LLM agents",
    "Multi-agent systems",
    "LangChain",
    "LangGraph",
    "Retrieval-Augmented Generation",
    "Spring Boot",
    "ASP.NET Core",
    "REST APIs",
    "Python",
    "Java",
    "C#",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
