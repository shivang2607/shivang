import { site, education } from "@/lib/content";
import { MaskLines, Reveal } from "../motion";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

// Act 6 - the close. Big type, direct channels, and the one-line education
// note (kept small by design - recruiters come for company, skills, projects).
export default function ContactSection() {
  return (
    <footer id="contact" className="rule w-full border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="kicker mb-6">Contact</p>
        <h2 className="font-display text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          <MaskLines lines={["Let's build", "something."]} />
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          {site.availability} - full-stack and AI-tooling work, remote or
          Bangalore. The fastest way to reach me is email.
        </p>

        <Reveal y={16}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
            >
              <FiMail size={16} /> {site.email}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line px-7 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FiGithub size={16} /> GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line px-7 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FiLinkedin size={16} /> LinkedIn
            </a>
            <a
              href={site.resumePdf}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Résumé <FiArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {site.name} · shivang2607.com
          </p>
          <p className="font-mono text-xs text-muted">
            {education.degree} · {education.school} · {education.period} ·{" "}
            {education.note}
          </p>
        </div>
      </div>
    </footer>
  );
}
