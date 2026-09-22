const SITE_URL = "https://lucarepupilli.com";

// AI / generative-engine crawlers we explicitly welcome, so the site can be
// read and cited by ChatGPT, Perplexity, Gemini, Claude, Copilot, etc.
// (GEO). These are allowed by the "*" rule already; listing them makes the
// intent explicit and keeps it in place if "*" is ever tightened later.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI - training
  "OAI-SearchBot", // OpenAI - ChatGPT Search index
  "ChatGPT-User", // OpenAI - live browsing on user request
  "ClaudeBot", // Anthropic - crawler
  "Claude-User", // Anthropic - live browsing on user request
  "Claude-SearchBot", // Anthropic - search index
  "anthropic-ai", // Anthropic - legacy agent
  "PerplexityBot", // Perplexity - index
  "Perplexity-User", // Perplexity - live fetch on user request
  "Google-Extended", // Google - Gemini / Vertex grounding & training
  "Applebot-Extended", // Apple - Apple Intelligence
  "Amazonbot", // Amazon
  "meta-externalagent", // Meta AI
  "CCBot", // Common Crawl (feeds many LLMs)
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
