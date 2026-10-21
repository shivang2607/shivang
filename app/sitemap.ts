import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Required for `output: "export"` — emit sitemap.xml as a static file at build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
