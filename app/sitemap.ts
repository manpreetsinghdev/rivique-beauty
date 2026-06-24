import type { MetadataRoute } from "next";
import { getServices } from "@/services/services";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/services`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/book`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gallery`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/about`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
