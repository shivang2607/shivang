"use client";

// Hero artifact: a shell session about Shivang - whoami, his focus, his
// projects, his stack. Deliberately NOT a fabricated tool transcript: every
// line is one of the facts in lib/content.ts (recruiterFacts), typed out.
// Each command types itself, its output lands, then the session moves on and
// loops. Frozen at the finished state under prefers-reduced-motion.
// Decorative (aria-hidden) - the real copy lives in the SSR payload around it.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { terminal } from "@/lib/content";

type Line = { kind: "cmd" | "out"; text: string };

const SCRIPT = terminal.script;

const ALL_LINES: Line[] = SCRIPT.flatMap((entry) => [
  { kind: "cmd" as const, text: entry.cmd },
  ...entry.out.map((o) => ({ kind: "out" as const, text: o })),
]);

export default function HeroTerminal() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>(reduce ? ALL_LINES : []);
  const [typing, setTyping] = useState(reduce ? "" : "");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduce) return;
    const later = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    const run = () => {
      setLines([]);
      setTyping("");
      let t = 500;

      SCRIPT.forEach((entry, i) => {
        // type the command, ~27ms per char with slight jitter
        for (let c = 1; c <= entry.cmd.length; c++) {
          const snap = c;
          later(() => setTyping(entry.cmd.slice(0, snap)), t);
          t += 24 + (snap % 4) * 7;
        }
        // commit the command as a line and clear the input
        later(() => {
          setLines((prev) => [...prev, { kind: "cmd", text: entry.cmd }]);
          setTyping("");
        }, t);
        t += 260;
        // its output lands
        entry.out.forEach((o) => {
          later(() => setLines((prev) => [...prev, { kind: "out", text: o }]), t);
          t += 210;
        });
        t += i === SCRIPT.length - 1 ? 0 : 260;
      });

      // hold on the finished session, then loop
      t += 3400;
      later(run, t);
    };

    run();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [reduce]);

  return (
    <div aria-hidden className="relative">
      <span className="sr-only">
        Terminal session: who Shivang is, what he focuses on, the projects he
        built, and the stack he works in.
      </span>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-2 font-mono text-[0.65rem] tracking-wider text-muted">
            {terminal.host}
          </span>
        </div>

        {/* terminal body */}
        <div className="h-[288px] overflow-hidden px-5 py-4 font-mono text-[0.78rem] leading-[1.7] sm:text-[0.8rem]">
          {lines.map((line, i) => (
            <p
              key={i}
              className={line.kind === "cmd" ? "text-ink" : "text-muted"}
            >
              {line.kind === "cmd" && (
                <span className="mr-2 text-accent">{terminal.prompt}</span>
              )}
              {line.kind === "out" ? (
                <span className="pl-[2.4rem]">{line.text}</span>
              ) : (
                line.text
              )}
            </p>
          ))}

          {/* the live prompt, always at the bottom */}
          <p className="break-all text-ink">
            <span className="mr-2 text-accent">{terminal.prompt}</span>
            {typing}
            <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-accent" />
          </p>
        </div>
      </div>

      <p className="mt-2 text-right font-mono text-[0.6rem] tracking-wider text-muted opacity-70">
        {terminal.caption}
      </p>
    </div>
  );
}