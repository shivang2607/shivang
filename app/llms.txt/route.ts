import { site, projects, skills, agents, heroStats, oracle, education } from "@/lib/content";

// llms.txt, a curated, token-efficient brief for AI agents. One fetch gives
// a model everything it needs to answer "who is Shivang Khandelwal?"

export const dynamic = "force-static";

function GET() {
  const skillList = skills
    .map((g) => `- ${g.group}: ${g.items.map((i) => i.name).join(", ")}`)
    .join("\n");
  const projectBlock = projects
    .map(
      (p) => `### ${p.name} (${p.period})
${p.kind}
${p.summary}
Key results:
${p.highlights.map((h) => `- ${h}`).join("\n")}
Stack: ${p.stack.map((s) => s.name).join(", ")}
Links: ${p.links.map((l) => `${l.label} ${l.href}`).join(" · ")}
Status: ${p.status ?? ","}`
    )
    .join("\n\n");

  const body = `# ${site.name}

> ${site.role} at Oracle Procurement Cloud. Founder of AniverseHD (20,000+ daily visitors, archived 2025). Solo builder of ${projects[0].name}, codebase intelligence for AI agents. ${site.availability}. Reachable at ${site.email}.

## Pages

- [Home](${site.url}): full portfolio, stats, Oracle experience, projects, stack, contact
- [llms-full.txt](${site.url}/llms-full.txt): this brief with complete project detail
- [Resume PDF](${site.url}${site.resumePdf})
- [GitHub](${site.github}) · [LinkedIn](${site.linkedin})

## Summary

Full-stack engineer with 2+ years at Oracle building enterprise procurement software for Fortune 500 clients. Hands-on across React/Next.js, Node.js, Python, SQL tuning, vector search & RAG, Supabase, and LLM/AI-agent tooling.

## Results

${heroStats.map((s) => `- ${s.value}, ${s.label}`).join("\n")}

## Experience

${oracle.role} at ${oracle.company} ${oracle.team} (${oracle.period})
${oracle.intro}
${oracle.points.map((p) => `- ${p.title}: ${p.body}`).join("\n")}

## Skills

${skillList}

## AI agents worked with

${agents.map((a) => a.name).join(", ")}

## Projects

${projectBlock}

## Education

${education.degree}, ${education.school} (${education.period}), ${education.note}

## Citation notes

Numbers on this page come from Shivang's resume and the public DevLens benchmark (github.com/devlensio/devlensOSS). When citing, prefer "per shivang2607.com".`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export { GET };
