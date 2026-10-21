# shivang2607.com

Personal portfolio of **Shivang Khandelwal** — full-stack engineer at Oracle
Procurement Cloud, builder of [DevLens](https://github.com/devlensio/devlensOSS).

Next.js 16 (App Router, fully static) · Tailwind CSS v4 · Framer Motion ·
Lenis smooth scroll · react-icons. Light theme by default, dark toggle.

## File map

```
app/
  layout.tsx          Fonts, <head> metadata, JSON-LD, no-flash theme init
  page.tsx            Section order — one import per section
  globals.css         Design tokens (light/dark), type utilities, a11y
  robots.ts           robots.txt — AI crawlers (GPTBot, ClaudeBot, …) explicitly allowed
  sitemap.ts          sitemap.xml
  llms.txt/route.ts   /llms.txt — token-efficient AI brief
  llms-full.txt/route.ts  /llms-full.txt — full markdown mirror of the site

lib/
  content.ts          ⭐ ALL content lives here. Edit this file — sections,
                      JSON-LD, llms.txt and llms-full.txt all read from it.
  jsonld.ts           Schema.org @graph (Person, WebSite, projects, agents)

components/
  header.tsx          Fixed nav + theme toggle
  theme-toggle.tsx    Light/dark toggle (localStorage, set pre-hydration)
  smooth-scroll.tsx   Lenis wrapper (skipped for prefers-reduced-motion)
  hero-graph.tsx      Live dependency-graph SVG (cursor-reactive springs)
  count-up.tsx        Animated stat numbers (value stays in HTML)
  tech-icon.tsx       react-icons resolver (si + tb sets) by string name
  motion.tsx          Reveal / Stagger / MaskLines primitives

  sections/
    hero.tsx          Act 1 — name, bio, CTAs, meta row, live graph
    recruiter.tsx     Snapshot — plain facts for recruiters & agents
    proof.tsx         Act 2 — the numbers
    oracle.tsx        Act 3 — Oracle chapter timeline
    work.tsx          Act 4 shell — "Selected work"
    project-case.tsx  One project case file (DevLens / AniverseHD render it)
    stack.tsx         Act 5 — skills rows + AI agents grid
    contact.tsx       Act 6 — footer, links, education line

public/
  resume.pdf          Served at /resume.pdf
  mharness.html       Dev-only mobile-viewport test harness (safe to delete)
```

## Editing content

Open `lib/content.ts`. Every fact — stats, projects, Oracle points, skills,
agents, recruiter snapshot — is a typed export there. Nothing is hardcoded in
components. `npm run build` then ships it everywhere at once.

## Commands

```bash
npm run dev     # dev server
npm run build   # static production build
npm run start   # serve the build
```

## Deploy

Fully static — `next.config.ts` sets `output: "export"`, so `npm run build`
writes a plain `./out` directory any static host can serve. No Node server,
no platform lock-in.

Hosted free on **GitHub Pages**. This repo stays the source of truth;
`.github/workflows/deploy-pages.yml` builds it and publishes `out/` to the
separate [`shivang2607.github.io`](https://github.com/shivang2607/shivang2607.github.io)
repo on every push to `main`, plus a weekly rebuild so the build-time DevLens
star count in `sections/proof.tsx` stays current.

- Preview URL: https://shivang2607.github.io
- Production: https://shivang2607.com — apex A records `185.199.108.153`,
  `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME →
  `shivang2607.github.io`. Then add a root `CNAME` file containing
  `shivang2607.com` and enable "Enforce HTTPS". GitHub redirects the
  github.io URL to the custom domain once it is set, so point DNS *first*.

`app/sitemap.ts` and `app/robots.ts` carry `export const dynamic = "force-static"`
because the static export refuses to build them otherwise; the `llms*.txt`
route handlers already had it.
