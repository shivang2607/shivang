import { projects, aniversehdMetrics, type Project } from "@/lib/content";
import { TechIcon } from "../tech-icon";
import RepoCard from "../repo-card";
import { Reveal } from "../motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

// Visual band rendered above each case file's highlights. DevLens shows a
// live GitHub repo card in the site's design language; AniverseHD shows its
// platform metrics as a spec panel.
function ProjectVisual({ project }: { project: Project }) {
  if (project.id === "devlens") {
    return <RepoCard fallbackStars="50+" />;
  }

  return (
    <div
      aria-label={`${project.name} platform metrics`}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
    >
      {aniversehdMetrics.map((m) => (
        <div key={m.label} className="bg-surface px-5 py-6">
          <span className="block font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.7rem]">
            {m.value}
          </span>
          <span className="mt-1 block text-xs leading-snug text-muted">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// One case file - a single project rendered as an asymmetric editorial
// article: index rail, visual band, body with highlights, stack panel.
export default function ProjectCase({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article
      id={`project-${project.id}`}
      aria-label={`${project.name} - case study`}
      className="grid gap-8 md:grid-cols-12 md:gap-12"
    >
      {/* Index rail */}
      <Reveal className={`md:col-span-2 ${flip ? "md:order-3 md:text-right" : ""}`} y={16}>
        <span className="font-mono text-sm text-accent">{project.index}</span>
        <p className="mt-2 font-mono text-[0.65rem] leading-relaxed text-muted">
          {project.period}
        </p>
      </Reveal>

      {/* Body */}
      <div className="md:col-span-7">
        <Reveal y={20}>
          <p className="kicker mb-3">{project.kind}</p>
          <h3 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-ink/90">{project.summary}</p>
        </Reveal>

        {/* Visual band: live repo preview or platform metrics */}
        <Reveal y={22} delay={0.06}>
          <div className="mt-8">
            <ProjectVisual project={project} />
          </div>
        </Reveal>

        <ul className="mt-8 space-y-3.5">
          {project.highlights.map((h, hi) => (
            <Reveal as="li" key={hi} delay={0.04 * hi} y={16}>
              <span className="flex gap-3 leading-relaxed text-muted">
                <span aria-hidden className="mt-[0.55rem] h-1 w-3 shrink-0 bg-accent" />
                <span>{h}</span>
              </span>
            </Reveal>
          ))}
        </ul>
        <Reveal y={14} delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {l.label === "GitHub" && <FiGithub size={14} />}
                {l.label}
                {l.label !== "GitHub" && <FiArrowUpRight size={13} />}
              </a>
            ))}
          </div>
          {project.status && (
            <p className="mt-5 font-mono text-xs text-muted">
              <span className="text-accent">●</span> {project.status}
            </p>
          )}
        </Reveal>
      </div>

      {/* Stack rail */}
      <Reveal className="md:col-span-3" y={16} delay={0.1}>
        <div className="rounded-xl border border-line bg-surface p-5 md:sticky md:top-24">
          <p className="kicker mb-4">Stack</p>
          <ul className="space-y-3">
            {project.stack.map((s) => (
              <li key={s.name} className="flex items-center gap-2.5 text-sm text-muted">
                <TechIcon name={s.icon} size={17} className="shrink-0 text-ink" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </article>
  );
}

export { projects };
