// ── Single source of truth for all site content ─────────────────────────────
// Facts sourced from: Shivang Resume AE.pdf (Oct 2026), DevLens OSS README,
// github.com/shivang2607. Update here → every section + JSON-LD + llms.txt follows.

export const site = {
  url: "https://shivang2607.com",
  name: "Shivang Khandelwal",
  role: "Full-Stack Engineer",
  tagline:
    "Full-stack engineer with 2+ years of experience at Oracle Procurement Cloud. Solo builder of DevLens, codebase intelligence for AI agents. Open to full-time roles, remote or Bangalore.",
  email: "shivangkh26@gmail.com",
  location: "India · open to remote & Bangalore",
  availability: "Open to opportunities",
  github: "https://github.com/shivang2607",
  linkedin: "https://www.linkedin.com/in/shivang-khandelwal",
  devlensRepo: "https://github.com/devlensio/devlensOSS",
  devlensNpm: "https://www.npmjs.com/package/@devlensio/cli",
  devlensSite: "https://devlens.io",
  devlensDemo: "https://youtu.be/6OMsk8lNv4c",
  resumePdf: "/resume.pdf",
} as const;

export type HeroStat = {
  id: string;
  value: string;
  label: string;
};

// "devlens-stars" is refreshed live from the GitHub API at build time
// (see components/sections/proof.tsx); "50+" is the fallback value.
export const heroStats: HeroStat[] = [
  { id: "oracle-issues", value: "120+", label: "production issues diagnosed & resolved at Oracle" },
  { id: "devlens-stars", value: "50+", label: "GitHub stars on DevLens, my open-source code-graph engine" },
  { id: "aniversehd-visitors", value: "20,000+", label: "daily visitors scaled & run on AniverseHD" },
  { id: "devlens-tests", value: "500+", label: "tests in DevLens' multi-language parsing engine" },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: { name: string; icon: string }[];
  links: { label: string; href: string }[];
  status?: string;
};

export const projects: Project[] = [
  {
    id: "devlens",
    index: "01",
    name: "DevLens",
    kind: "Open source · Codebase intelligence for AI agents",
    period: "Jan 2026 – Present",
    summary:
      "Analyze your repo once. Your AI agent then queries a precomputed code graph through MCP, with ranked files, call flow, impact, and security, instead of re-reading your codebase file by file.",
    highlights: [
      "50+ GitHub stars and an active community. Maintainer of devlensio/devlensOSS (AGPL-3.0), with @devlensio/cli published on npm.",
      "Ranked first of nine tools on every quality measure (correctness, F1, recall, precision) in a public benchmark of 2,394 agent runs against Graphify, codegraph, serena, semble, and codebase-memory.",
      "67 ms per MCP call; response packets 6.7× smaller than the closest graph competitor, never exceeding a configurable token budget.",
      "Designed and shipped the full stack solo: multi-language parsing engine (JavaScript, TypeScript, Python, Java, Go, Rust) with 500+ tests, graph query layer, React frontend, and the @devlensio/cli npm package.",
      "Building DevLens Cloud on Next.js, Supabase, and Postgres: the hosted layer bringing precomputed code graphs to teams.",
      "LLM-powered features on the code graph: RAG-based Q&A, embeddings, and automated PR-review workflows built for both developers and agents.",
      "Blast-radius analysis before you change a symbol, PR review packets, and per-node security analysis.",
    ],
    stack: [
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "React", icon: "SiReact" },
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Bun", icon: "SiBun" },
      { name: "MCP", icon: "SiModelcontextprotocol" },
      { name: "OpenAI", icon: "TbBrandOpenai" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Supabase", icon: "SiSupabase" },
      { name: "Postgres", icon: "SiPostgresql" },
    ],
    links: [
      { label: "GitHub", href: site.devlensRepo },
      { label: "npm", href: site.devlensNpm },
      { label: "devlens.io", href: site.devlensSite },
      { label: "Demo", href: site.devlensDemo },
    ],
    status: "Actively maintained · AGPL-3.0",
  },
  {
    id: "aniversehd",
    index: "02",
    name: "AniverseHD",
    kind: "Founder · Anime streaming platform",
    period: "Aug 2023 – Jul 2025",
    summary:
      "Founded and led the product end-to-end, covering idea, architecture, and roughly 80% of the build. Scaled a streaming platform to 20,000+ daily visitors before archiving it at peak to focus on DevLens.",
    highlights: [
      "Scaled to 20,000+ daily visitors and 6,000+ signed-in users with 16-minute average sessions and under 40% bounce rate.",
      "Owned streaming infrastructure at peak load: production monitoring, performance tuning, Cloudflare Workers/D1, Firebase Auth.",
      "Maintained a 27,000+ title catalog through automated Python/shell ingestion pipelines.",
      "Built a Qdrant vector-search recommendation engine on 700-dimensional embeddings for personalized suggestions.",
      "Shipped a Discord community bot with anime search, hourly news RSS, and interactive commands.",
    ],
    stack: [
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Python", icon: "SiPython" },
      { name: "Qdrant", icon: "SiQdrant" },
      { name: "Redis", icon: "SiRedis" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "Cloudflare", icon: "SiCloudflare" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/shivang2607" }],
    status: "Archived at peak, 2025",
  },
];

// Platform metrics shown as the visual panel for AniverseHD's case file.
export const aniversehdMetrics = [
  { value: "20,000+", label: "daily visitors" },
  { value: "27,000+", label: "titles in catalog" },
  { value: "6,000+", label: "signed-in users" },
  { value: "16 min", label: "avg. session" },
] as const;

export const oracle = {
  company: "Oracle",
  team: "Procurement Cloud · Fusion SCM Self-Service Procurement",
  role: "Application Software Engineer",
  period: "Jul 2024 – Present",
  intro:
    "End-to-end ownership of enterprise procurement software on UI, REST API, and database layers, serving Fortune 500 clients.",
  points: [
    {
      title: "Query performance: 70× faster",
      body: "Optimized SQL on high-traffic procurement views, cutting page load times from over 70 seconds to under one second.",
    },
    {
      title: "Debugging tooling adopted org-wide",
      body: "Built an internal Fusion debugging tool adopted by multiple Oracle teams, turning tribal-knowledge debugging into a repeatable workflow with roughly 50% better triage and 20% faster resolution.",
    },
    {
      title: "Position Sync re-engineering",
      body: "Re-engineered the Position Synchronization job to roughly 70% fewer data updates and roughly 40% faster execution.",
    },
    {
      title: "120+ production escalations",
      body: "Technical point of contact for enterprise escalations, diagnosing and resolving 120+ production issues across UI, API, workflow, and database layers.",
    },
    {
      title: "Redwood UI modernization",
      body: "Led the Redwood (VBCS) UI modernization for Procurement Cloud, profiling bottlenecks and shipping responsive components.",
    },
  ],
} as const;

export type SkillGroup = {
  group: string;
  items: { name: string; icon: string }[];
};

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "Python", icon: "SiPython" },
      { name: "SQL", icon: "SiMysql" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "HTML", icon: "SiHtml5" },
      { name: "CSS", icon: "SiCss" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React.js", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "Zustand", icon: "" },
    ],
  },
  {
    group: "Backend & Cloud",
    items: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Cloudflare Workers/D1", icon: "SiCloudflare" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "Supabase", icon: "SiSupabase" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Redis", icon: "SiRedis" },
    ],
  },
  {
    group: "AI & Data",
    items: [
      { name: "Qdrant", icon: "SiQdrant" },
      { name: "RAG pipelines", icon: "TbBrandOpenai" },
      { name: "Embeddings", icon: "SiHuggingface" },
      { name: "MCP", icon: "SiModelcontextprotocol" },
    ],
  },
];

export type Agent = { name: string; icon: string; note: string };

// The four AI agents Shivang actually works with, and what each is for.
export const agents: Agent[] = [
  { name: "Claude Code", icon: "SiClaude", note: "agentic coding & refactors" },
  { name: "Hermes", icon: "", note: "UI design & frontend" },
  { name: "OpenAI Codex", icon: "TbBrandOpenai", note: "office work & review" },
  { name: "Pi.DEV", icon: "", note: "backend work" },
];

export const education = {
  school: "Indian Institute of Information Technology (IIIT), Surat",
  degree: "B.Tech, Electronics and Communication Engineering",
  period: "2020 – 2024",
  note: "CGPA 8.70",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Oracle", href: "#oracle" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

// Recruiter snapshot - the plain facts recruiting agents and humans scan for
// first. Rendered as a semantic <dl> near the top; mirrored in llms-full.txt.
export const recruiterFacts: { term: string; detail: string }[] = [
  { term: "Experience", detail: "2+ years of professional software engineering" },
  { term: "Current role", detail: "Application Software Engineer at Oracle, Procurement Cloud (Jul 2024 – Present)" },
  { term: "Open to", detail: "Full-time roles, remote or Bangalore, India" },
  { term: "Focus", detail: "Full-stack engineering · AI agents & MCP tooling · SQL & systems performance" },
  { term: "Notable work", detail: "DevLens (open source, 50+ GitHub stars) · AniverseHD (20,000+ daily visitors) · Oracle Fusion SCM for Fortune 500 clients" },
  { term: "Education", detail: "B.Tech, IIIT Surat (2020 – 2024), CGPA 8.70" },
  { term: "Contact", detail: "shivangkh26@gmail.com · replies fast, no phone inquiries please" },
];
