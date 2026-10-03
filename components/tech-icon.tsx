"use client";

import type { ComponentType } from "react";
import * as Si from "react-icons/si";
import * as Tb from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";

// Renders a react-icons icon by name from content.ts (simple-icons `si` +
// tabler brands `tb` merged). Empty or unknown names render nothing, so a
// bad string can never crash the page or show a broken glyph.
const registry: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  ...Si,
  ...Tb,
} as unknown as Record<
  string,
  ComponentType<{ size?: number; className?: string }>
>;

export function TechIcon({
  name,
  size = 18,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = registry[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} aria-hidden />;
}

export { FiArrowUpRight };
