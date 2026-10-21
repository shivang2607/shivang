"use client";

// Résumé - promoted to sit directly under the hero, because it is the one
// artifact a hiring loop actually asks for. The sheet is a raster of the real
// PDF (public/resume-page*.webp), so the preview can never disagree with the
// file people download: it tilts with the pointer, follows it with an accent
// sheen, and opens into a full-page view. All copy comes from lib/content.ts.

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { resume, site } from "@/lib/content";
import { MaskLines, Reveal } from "../motion";
import {
  FiArrowUpRight,
  FiDownload,
  FiFileText,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

const TILT = { stiffness: 150, damping: 18, mass: 0.5 };
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function ResumeSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="resume"
      aria-label="Résumé"
      className="rule w-full scroll-mt-20 border-line"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        {/* ── copy ─────────────────────────────────────────────────────── */}
        <div>
          <Reveal y={12}>
            <p className="kicker mb-6 flex items-center gap-2">
              <FiFileText size={13} className="text-accent" />
              {resume.kicker}
            </p>
          </Reveal>

          <h2 className="font-display text-[clamp(2.1rem,5.6vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            <MaskLines lines={[...resume.heading]} />
          </h2>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              {resume.lede}
            </p>
          </Reveal>

          <dl className="mt-9 border-t border-line">
            {resume.meta.map((m, i) => (
              <Reveal key={m.term} y={10} delay={0.12 + i * 0.06}>
                <div className="flex gap-5 border-b border-line py-3">
                  <dt className="w-[4.5rem] shrink-0 pt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    {m.term}
                  </dt>
                  <dd className="text-sm text-ink">{m.detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal y={14} delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={site.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
              >
                Open résumé
                <FiArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={site.resumePdf}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <FiDownload size={14} /> Download
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── the sheet ────────────────────────────────────────────────── */}
        <ResumeSheet onOpen={() => setOpen(true)} />
      </div>

      <AnimatePresence>
        {open && <ResumePreview onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

// The document itself. Pointer position drives a spring-damped rotateX/rotateY
// on the sheet and a radial sheen inside it; both are transform/opacity only,
// and both are skipped entirely under prefers-reduced-motion. Nothing is drawn
// over the page itself - the affordance lives in the card footer so the record
// stays readable while you hover it.
function ResumeSheet({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  const sheet = useRef<HTMLButtonElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [6.5, -6.5]), TILT);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), TILT);
  const sheenX = useTransform(px, (v) => `${v * 100}%`);
  const sheenY = useTransform(py, (v) => `${v * 100}%`);
  // NB: shape must precede size - "260px circle" is invalid and renders nothing.
  const sheen = useMotionTemplate`radial-gradient(circle 320px at ${sheenX} ${sheenY}, color-mix(in srgb, var(--accent) 34%, transparent), transparent 78%)`;

  function track(e: React.PointerEvent<HTMLButtonElement>) {
    if (reduce || e.pointerType === "touch") return;
    const r = sheet.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function rest() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="resume-stack group/sheet relative mx-auto w-full max-w-[360px] [perspective:1500px]">
      {/* the pile: edges extend past the card, so it reads as sheets not a shadow.
          The overhang is held back below md - a rotated box is wider than its
          layout width, and at 320-414px it would otherwise push the page sideways. */}
      <span
        aria-hidden
        className="absolute inset-x-2 top-6 -bottom-3 -rotate-[2.2deg] rounded-lg border border-line bg-surface shadow-[0_8px_20px_-14px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover/sheet:-translate-y-0.5 group-hover/sheet:-rotate-[3.8deg] md:-inset-x-3"
      />
      <span
        aria-hidden
        className="absolute inset-x-1 top-3 -bottom-1.5 rotate-[1.4deg] rounded-lg border border-line bg-surface shadow-[0_10px_22px_-16px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover/sheet:-translate-y-0.5 group-hover/sheet:rotate-[2.8deg] md:-inset-x-1.5"
      />

      <motion.button
        ref={sheet}
        type="button"
        onClick={onOpen}
        onPointerMove={track}
        onPointerEnter={track}
        onPointerLeave={rest}
        aria-label="Open the full résumé preview"
        style={
          reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        initial={reduce ? false : { opacity: 0, y: 52 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={reduce ? undefined : { y: -8 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.05 }}
        className="relative block w-full cursor-pointer overflow-hidden rounded-lg border border-line bg-surface p-2 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05),0_26px_52px_-30px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:border-accent/60"
      >
        <span className="flex items-center justify-between border-b border-line px-2 pb-2 font-mono text-[0.65rem] tracking-[0.06em] text-muted">
          <span className="flex items-center gap-1.5">
            <FiFileText size={11} className="text-accent" /> resume.pdf
          </span>
          <span>A4 · 1 page</span>
        </span>

        <span className="relative mt-2 block overflow-hidden rounded-[4px] bg-white ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.resumePreview}
            srcSet={`${site.resumePreview} 780w, ${site.resumePreviewFull} 1600w`}
            sizes="(min-width: 768px) 340px, 82vw"
            width={780}
            height={1103}
            loading="lazy"
            decoding="async"
            alt="First page of Shivang Khandelwal's résumé: summary, Oracle experience, DevLens and AniverseHD projects, technical skills, and education."
            className="resume-page block w-full"
          />

          {!reduce && (
            <motion.span
              aria-hidden
              style={{ backgroundImage: sheen }}
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/sheet:opacity-100"
            />
          )}

          {/* one-off light sweep as the sheet lands */}
          {!reduce && (
            <motion.span
              aria-hidden
              initial={{ x: "-140%" }}
              whileInView={{ x: "140%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.15, delay: 0.5, ease: EASE_OUT }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
          )}
        </span>

        <span className="mt-2 flex items-center justify-between border-t border-line px-2 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.1em]">
          <span className="text-muted">fig. 02</span>
          <span className="flex items-center gap-1.5 text-accent">
            <FiMaximize2 size={11} />
            Expand
          </span>
        </span>
      </motion.button>
    </div>
  );
}

// Full-page view. The rendered page is the preview body (a PDF iframe is
// inconsistent across mobile browsers), with the real file one tap away.
function ResumePreview({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close résumé preview"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-ink/40 backdrop-blur-[3px]"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Résumé preview"
        initial={reduce ? false : { opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ type: "spring", stiffness: 210, damping: 24 }}
        className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="font-mono text-[0.65rem] tracking-[0.06em] text-muted">
            resume.pdf · A4 · 1 page
          </span>
          <div className="flex items-center gap-1.5">
            <a
              href={site.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent sm:inline-flex"
            >
              Open in new tab <FiArrowUpRight size={12} />
            </a>
            <a
              href={site.resumePdf}
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FiDownload size={12} /> Download
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close résumé preview"
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <FiX size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto overscroll-contain bg-background p-4 md:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.resumePreviewFull}
            width={1600}
            height={2263}
            decoding="async"
            alt="Shivang Khandelwal's résumé, full page."
            className="resume-page mx-auto block w-full max-w-2xl rounded border border-line bg-white"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}