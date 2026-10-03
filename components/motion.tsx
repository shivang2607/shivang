"use client";

// Motion primitives. Every animated element keeps its content in the DOM at
// all times - we animate opacity/transform only, so crawlers and screen
// readers always see the full text. prefers-reduced-motion disables all of it.

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : staggerParent}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : staggerChild}
    >
      {children}
    </motion.div>
  );
}

// Line-by-line masked reveal for big display headings. Text stays selectable
// and crawlable - mask is on the wrapper, not the text node. The whileInView
// observer sits on the OUTER (unclipped) wrapper: a span translated 110% into
// an overflow-hidden mask has zero intersection and would never trigger.
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };
  return (
    <motion.span
      className={className}
      variants={reduce ? undefined : parent}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={reduce ? undefined : child}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
