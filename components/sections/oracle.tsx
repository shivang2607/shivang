import { oracle } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "../motion";

// Act 3 - the Oracle chapter. A timeline whose spine draws as you scroll
// (CSS transform scaleY driven by Framer's useScroll), entries sliding in.
export default function OracleSection() {
  return (
    <section id="oracle" aria-label="Experience" className="rule w-full border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="kicker mb-5">Chapter - Oracle</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {oracle.company}{" "}
              <span className="text-muted">Procurement Cloud</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-muted">
              {oracle.role} · {oracle.period}
            </p>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              {oracle.intro}
            </p>
          </div>

          <ol className="relative ml-2 border-l border-line pl-8 md:ml-0">
            {oracle.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background"
                />
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
