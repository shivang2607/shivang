"use client";

// Hero. The name is the artifact; a live DevLens MCP terminal sits on the
// right as the demonstration, and a BASE/FOCUS/INDEX meta row anchors the
// viewport base. All copy stays in the SSR payload.

import { site } from "@/lib/content";
import HeroTerminal from "../hero-terminal";
import { MaskLines, Stagger, StaggerItem } from "../motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-5 pt-4 pb-20 md:px-8"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="kicker mb-6 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {site.availability}
          </p>
          <h1 className="font-display text-[clamp(2.9rem,8.5vw,5.6rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
            <MaskLines
              lines={["Shivang", "Khandelwal."]}
              lineClassName="text-ink"
            />
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Full-stack engineer with{" "}
            <strong className="font-medium text-ink">2+ years</strong> at{" "}
            <strong className="font-medium text-ink">Oracle</strong>{" "}
            Procurement Cloud, and the solo builder of{" "}
            <a
              href="#project-devlens"
              className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
            >
              DevLens
            </a>
            , codebase intelligence for AI agents. I make enterprise systems
            faster and give agents better ways to read code.
          </p>
          <Stagger className="mt-9 flex flex-wrap items-center gap-4">
            <StaggerItem>
              <a
                href="#work"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
              >
                View work
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {site.email} <FiArrowUpRight size={14} />
              </a>
            </StaggerItem>
          </Stagger>
        </div>

        <div className="hidden md:block" aria-hidden>
          <HeroTerminal />
        </div>
      </div>

      {/* Print-annual meta row: identity in a dozen words at the viewport base */}
      <div className="absolute inset-x-5 bottom-8 md:inset-x-8">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          <span>Base: India</span>
          <span className="hidden sm:inline">Focus: Full-stack · AI agents</span>
          <span className="hidden md:inline">Index: Portfolio 2026</span>
          <a
            href="#snapshot"
            aria-label="Scroll to the story"
            className="group flex items-center gap-2 transition-colors hover:text-accent"
          >
            Scroll
            <span className="block transition-transform duration-300 ease-out group-hover:translate-y-1">
              <FiArrowDown size={13} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
