import { projects } from "@/lib/content";
import { MaskLines } from "../motion";
import ProjectCase from "./project-case";

// Act 4 - projects as case files. Each project lives in its own file
// (project-case.tsx); this is just the section shell + heading.
export default function WorkSection() {
  return (
    <section id="work" aria-label="Projects" className="rule w-full border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="kicker mb-5">Selected work</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
              <MaskLines lines={["Built & shipped."]} />
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-muted md:block">
            {String(projects.length).padStart(2, "0")} case files
          </span>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((p, pi) => (
            <ProjectCase key={p.id} project={p} flip={pi % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
