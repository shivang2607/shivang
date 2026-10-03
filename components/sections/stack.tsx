import { skills, agents } from "@/lib/content";
import { TechIcon } from "../tech-icon";
import { Reveal } from "../motion";

// Act 5 - the stack. Typeset like a spec sheet: hairline-ruled rows, icons
// in place of language names. Below it, the AI agents section - the daily
// bench of coding agents this site itself was partly built with.
export default function StackSection() {
  return (
    <section id="stack" aria-label="Skills and tools" className="rule w-full border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="kicker mb-5">The stack</p>
        <h2 className="mb-14 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Tools I reach for, organized by where they sit.
        </h2>

        <div className="flex flex-col">
          {skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.04}>
              <div className="grid gap-4 border-t border-line py-7 md:grid-cols-[180px_1fr] md:gap-8">
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-x-7 gap-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex items-center gap-2.5 text-[0.95rem] text-ink/85 transition-colors hover:text-accent"
                    >
                      <TechIcon
                        name={item.icon}
                        size={19}
                        className="text-muted transition-colors group-hover:text-accent"
                      />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* AI agents bench */}
        <div className="mt-20">
          <p className="kicker mb-3">Working with AI agents, daily</p>
          <p className="mb-10 max-w-2xl leading-relaxed text-muted">
            My workflow is agent-native - I build with coding agents the way
            DevLens serves them: structured context in, focused work out.
            This site was built with them too.
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {agents.map((a, i) => (
              <Reveal key={a.name} delay={Math.min(i * 0.03, 0.3)} y={14}>
                <li className="flex h-full items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent">
                  <TechIcon name={a.icon} size={18} className="shrink-0 text-accent" />
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {a.name}
                    </span>
                    {a.note && (
                      <span className="block text-xs text-muted">{a.note}</span>
                    )}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
