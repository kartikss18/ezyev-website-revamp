import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/product", "/what-we-do", "/careers", "/contact", "/privacy", "/terms"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.8,
  }));
}
