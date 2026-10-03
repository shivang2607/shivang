"use client";

import { nav } from "@/lib/content";
import ThemeToggle from "./theme-toggle";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-background/90 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          Shivang<span className="text-accent"> Khandelwal</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
