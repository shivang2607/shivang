import { heroStats } from "@/lib/content";
import CountUp from "../count-up";
import { Stagger, StaggerItem } from "../motion";

// Live GitHub stars for DevLens, fetched at build time (static output).
// Falls back to the "50+" copy in content.ts if the API is unreachable.
async function getDevLensStars(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/devlensio/devlensOSS",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

// Act 2 - the proof. Numbers ARE the copy. The DevLens star count is live
// from the GitHub API; CountUp animates digits while the real value stays
// in the HTML payload for crawlers.
export default async function ProofSection() {
  const stars = await getDevLensStars();

  const stats = heroStats.map((s) =>
    s.id === "devlens-stars" && stars !== null
      ? { ...s, value: `${stars}+` }
      : s
  );

  return (
    <section
      id="proof"
      aria-label="Results in numbers"
      className="rule w-full border-line"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="kicker mb-12">The proof, in numbers</p>
        <Stagger className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.id}>
              <div className="border-t-2 border-accent pt-5">
                <CountUp
                  value={stat.value}
                  className="block font-display text-4xl font-semibold tracking-tight text-ink md:text-[2.6rem]"
                />
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
