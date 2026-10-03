"use client";

// Live GitHub repo card for the DevLens case file, in the site's own design
// language. Stars are fetched from the GitHub API on mount (the number also
// exists statically in the case-file copy, so crawlers always see it); the
// card links through to the repo. Replaces GitHub's OG-image preview, which
// rate-limits (HTTP 429) and breaks in production.

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiStar, FiGitBranch, FiArrowUpRight } from "react-icons/fi";

export default function RepoCard({ fallbackStars }: { fallbackStars: string }) {
  const [stars, setStars] = useState<string | null>(null);
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    fetch("https://api.github.com/repos/devlensio/devlensOSS")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { stargazers_count?: number } | null) => {
        if (alive && d && typeof d.stargazers_count === "number") {
          setStars(d.stargazers_count.toLocaleString("en-US"));
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [inView]);

  return (
    <a
      ref={ref}
      href="https://github.com/devlensio/devlensOSS"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open DevLens on GitHub (opens in a new tab)"
      className="group block rounded-xl border border-line bg-surface transition-colors duration-200 hover:border-accent"
    >
      {/* header row */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="flex items-center gap-2.5 font-mono text-[0.8rem] text-ink">
          <FiGithub size={15} className="text-muted transition-colors group-hover:text-accent" />
          devlensio<span className="text-muted">/</span>devlensOSS
        </span>
        <FiArrowUpRight
          size={15}
          className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      {/* repo one-liner, in the README's own voice */}
      <p className="px-5 pt-4 text-sm leading-relaxed text-muted">
        Codebase Intelligence for AI agents and Developers. Analyze your repo
        once; your agent queries a precomputed code graph through MCP instead
        of re-reading your codebase file by file.
      </p>

      {/* stat row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pb-4 pt-3.5 font-mono text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <FiStar
            size={13}
            className="text-accent transition-transform duration-200 group-hover:scale-110"
          />
          <span className="font-medium text-ink tabular-nums">
            {stars ?? fallbackStars}
          </span>
          stars
        </span>
        <span className="flex items-center gap-1.5">
          <FiGitBranch size={13} className="text-muted" />
          TypeScript
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          AGPL-3.0
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-[#3178c6]" />
          Next.js
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-[#3fb950]" />
          Bun
        </span>
      </div>
    </a>
  );
}
