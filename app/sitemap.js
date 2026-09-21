const SITE_URL = "https://lucarepupilli.com";

// Single-page portfolio: the homepage is the only indexable route.
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
