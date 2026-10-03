"use client";

// Hero artifact: a live terminal window running a DevLens MCP query. This is
// the portfolio's demonstration, not decoration: an agent asks DevLens where
// authentication is handled, and the ranked packet streams back with latency
// and token-budget lines. Command types out, response lines land one by one,
// hold, then loop. Frozen at the final state under prefers-reduced-motion.
// Decorative (aria-hidden) - real copy lives in the SSR payload around it.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const COMMAND = 'devlens ask "where is payment auth handled?"';

const RESPONSE_LINES = [
  "● devlens · graph query · 67ms · 1,940 tokens",
  "",
  "  1  src/billing/auth.ts       verifySession()      0.94",
  "  2  src/billing/gateway.ts    chargeWithRetry()    0.81",
  "  3  src/mcp/tools.ts          askTool()            0.76",
  "",
  "  3 files ranked · budget 8k tokens · never exceeded",
] as const;

type Phase = "typing" | "responding" | "holding";

export default function HeroTerminal() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? COMMAND : "");
  const [shown, setShown] = useState<string[]>(reduce ? [...RESPONSE_LINES] : []);
  const [phase, setPhase] = useState<Phase>(reduce ? "holding" : "typing");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduce) return;
    const later = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    const run = () => {
      setTyped("");
      setShown([]);
      setPhase("typing");
      let t = 600;
      // type the command, ~34ms per char with slight jitter
      for (let i = 1; i <= COMMAND.length; i++) {
        const snap = i;
        later(() => setTyped(COMMAND.slice(0, snap)), t);
        t += 26 + (snap % 5) * 9;
      }
      // response lines land
      t += 500;
      setPhase("responding");
      RESPONSE_LINES.forEach((line, li) => {
        later(() => setShown((s) => [...s, line]), t);
        t += li === 0 ? 350 : 190;
      });
      // hold, then loop
      t += 3200;
      later(run, t);
    };

    run();
    return () => timers.current.forEach(clearTimeout);
  }, [reduce]);

  return (
    <div aria-hidden className="relative">
      <span className="sr-only">
        Terminal demo: a DevLens MCP query returning ranked files for an AI agent.
      </span>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-2 font-mono text-[0.65rem] tracking-wider text-muted">
            agent · mcp
          </span>
        </div>

        {/* terminal body */}
        <div className="h-[248px] px-5 py-4 font-mono text-[0.78rem] leading-[1.7] sm:text-[0.8rem]">
          <p className="break-all text-ink">
            <span className="mr-2 text-accent">$</span>
            {typed}
            {phase === "typing" && (
              <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-accent" />
            )}
          </p>
          <div className="mt-1">
            {shown.map((line, i) => (
              <p
                key={i}
                className={
                  line === ""
                    ? "h-3"
                    : i === 0
                      ? "text-muted"
                      : "text-ink/85"
                }
              >
                {line}
              </p>
            ))}
            {phase === "responding" && (
              <span className="inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-accent" />
            )}
          </div>
        </div>
      </div>

      <p className="mt-2 text-right font-mono text-[0.6rem] tracking-wider text-muted opacity-70">
        fig. 01 - what DevLens returns to an agent
      </p>
    </div>
  );
}
