import type { MetadataRoute } from "next";

const DOMAIN_URL = "https://www.example.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rutas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  return [...staticRoutes];
}
