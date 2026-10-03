import { site, projects, skills, agents } from "./content";

// Schema.org @graph - Person, WebSite, and project entities, all cross-linked
// by @id. Mirrors the visible page content; nothing invented.
const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.role,
      description: site.tagline,
      worksFor: {
        "@type": "Organization",
        name: "Oracle",
        department: "Procurement Cloud",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Indian Institute of Information Technology (IIIT), Surat",
      },
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      knowsAbout: [
        ...skills.flatMap((g) => g.items.map((i) => i.name)),
        "AI agent tooling",
      ],
      sameAs: [
        site.github,
        site.linkedin,
        site.devlensRepo,
        site.devlensNpm,
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.tagline,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
    ...projects.map((p) => ({
      "@type": p.id === "devlens" ? "SoftwareSourceCode" : "SoftwareApplication",
      "@id": `${site.url}/#project-${p.id}`,
      name: p.name,
      description: p.summary,
      url: p.links[0]?.href,
      author: { "@id": personId },
      keywords: p.stack.map((s) => s.name).join(", "),
      ...(p.id === "devlens"
        ? {
            codeRepository: site.devlensRepo,
            programmingLanguage: ["TypeScript", "JavaScript", "Python"],
            runtimePlatform: "Node.js",
            license: "https://www.gnu.org/licenses/agpl-3.0",
          }
        : { applicationCategory: "MultimediaApplication", operatingSystem: "Web" }),
    })),
    {
      "@type": "ItemList",
      "@id": `${site.url}/#agents`,
      name: "AI agents and coding tools used by Shivang Khandelwal",
      itemListElement: agents.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "SoftwareApplication", name: a.name, applicationCategory: "DeveloperApplication" },
      })),
    },
  ],
};
