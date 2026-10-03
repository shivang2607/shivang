import { site, projects, skills, agents, heroStats, oracle, education } from "@/lib/content";

// llms-full.txt, complete markdown mirror of the site's content for AI
// extraction. Same facts as the rendered page, zero JS required.

export const dynamic = "force-static";

function GET() {
  const skillList = skills
    .map((g) => `### ${g.group}\n${g.items.map((i) => i.name).join(", ")}`)
    .join("\n\n");
  const projectBlock = projects
    .map(
      (p) => `## ${p.name}, ${p.kind} (${p.period})

${p.summary}

${p.highlights.map((h) => `- ${h}`).join("\n")}

**Stack:** ${p.stack.map((s) => s.name).join(", ")}
**Links:** ${p.links.map((l) => `[${l.label}](${l.href})`).join(" · ")}
**Status:** ${p.status ?? ","}`
    )
    .join("\n\n---\n\n");

  const body = `# ${site.name}, ${site.role}

${site.tagline}

- Email: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Location: ${site.location}
- Status: ${site.availability}

## Results at a glance

${heroStats.map((s) => `- **${s.value}**, ${s.label}`).join("\n")}

## Experience, ${oracle.company} ${oracle.team}

${oracle.role} · ${oracle.period}

${oracle.intro}

${oracle.points.map((p) => `- **${p.title}**, ${p.body}`).join("\n")}

## Skills

${skillList}

## AI agents worked with

${agents.map((a) => `- **${a.name}**${a.note ? `, ${a.note}` : ""}`).join("\n")}

## Projects

${projectBlock}

## Education

${education.degree}, ${education.school}, ${education.period} (${education.note})

---

Content mirror of ${site.url}. All figures from Shivang's resume and the public DevLens OSS benchmark (github.com/devlensio/devlensOSS).`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export { GET };
