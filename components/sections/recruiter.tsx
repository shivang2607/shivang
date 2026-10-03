import { recruiterFacts } from "@/lib/content";
import { Stagger, StaggerItem } from "../motion";
import { FiMail, FiBriefcase, FiClock, FiCode, FiAward, FiBookOpen, FiSend } from "react-icons/fi";
import type { ComponentType } from "react";

// Recruiter snapshot. Horizontal band with large type and icon markers, no
// rails or hairline borders per item: the section reads as a headline block,
// not a form. Facts stay in a semantic <dl> so recruiting agents extract
// them trivially; everything is in the SSR payload.
const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Experience: FiBriefcase,
  "Current role": FiClock,
  "Open to": FiSend,
  Focus: FiCode,
  "Notable work": FiAward,
  Education: FiBookOpen,
  Contact: FiMail,
};

export default function RecruiterSection() {
  return (
    <section
      id="snapshot"
      aria-label="Recruiter snapshot: key facts"
      className="rule w-full border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
          The short version.
        </h2>

        <Stagger className="mt-12 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {recruiterFacts.map((f) => {
            const Icon = ICONS[f.term];
            return (
              <StaggerItem key={f.term}>
                <div className="flex h-full gap-4">
                  {Icon && (
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon size={17} />
                    </span>
                  )}
                  <div>
                    <dt className="font-display text-lg font-semibold tracking-tight text-ink">
                      {f.term}
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                      {f.detail}
                    </dd>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
