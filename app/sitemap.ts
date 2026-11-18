import type { MetadataRoute } from "next";
import { offices, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/product",
    "/what-we-do",
    "/about",
    "/services",
    "/cities",
    ...offices.map((o) => `/ev-battery-service/${o.slug}`),
    "/careers",
    "/career",
    "/career/software-engineer-intern",
    "/faq",
    "/contact",
    "/price",
    "/blog",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
