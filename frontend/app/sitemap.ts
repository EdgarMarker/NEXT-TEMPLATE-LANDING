import type { MetadataRoute } from "next";
import { getAllHomePageSlugs } from "./_domain/services/home-page.services";

const DOMAIN_URL = "https://www.example.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllHomePageSlugs();

  const homeRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${DOMAIN_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  return [...homeRoutes];
}
