"use client";

import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { CHANGELOG_RELEASES } from "./changelog-data";

const FILTERS = ["All", "Product", "Workflow", "Connections"] as const;
type Filter = (typeof FILTERS)[number];

/* ─────────────────────────────────────────────────────────
 * PAGE CONTENT STORYBOARD
 *
 * Static header stays visible and interactive.
 *
 *   80ms   eyebrow fades in and rises
 *  160ms   title follows with a soft blur reveal
 *  270ms   supporting copy and cadence appear
 *  390ms   pill filters settle into place
 *  500ms   release cards cascade upward
 *  820ms   entrance completes; filters use quick updates
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  eyebrow: 80,
  title: 160,
  context: 270,
  filters: 390,
  releases: 500,
  settled: 820,
} as const;

export type ChangelogLedgerProps = {
  className?: string;
};

export function ChangelogLedger({ className }: ChangelogLedgerProps) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [stage, setStage] = useState(0);
  const releases = useMemo(
    () =>
      filter === "All"
        ? CHANGELOG_RELEASES
        : CHANGELOG_RELEASES.filter((release) => release.category === filter),
    [filter],
  );

  useEffect(() => {
    if (reduce) {
      setStage(6);
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), TIMING.eyebrow),
      setTimeout(() => setStage(2), TIMING.title),
      setTimeout(() => setStage(3), TIMING.context),
      setTimeout(() => setStage(4), TIMING.filters),
      setTimeout(() => setStage(5), TIMING.releases),
      setTimeout(() => setStage(6), TIMING.settled),
    ];

    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background font-sans text-foreground",
        className,
      )}
    >
      <main id="updates-top">
        <section className="mx-auto w-full max-w-5xl px-4 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{
              opacity: reduce || stage >= 1 ? 1 : 0,
              y: reduce || stage >= 1 ? 0 : 10,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
            className="font-medium text-muted-foreground text-sm"
          >
            Product updates
          </motion.p>
          <motion.h1
            initial={
              reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }
            }
            animate={{
              opacity: reduce || stage >= 2 ? 1 : 0,
              y: reduce || stage >= 2 ? 0 : 14,
              filter: reduce || stage >= 2 ? "blur(0px)" : "blur(4px)",
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
            className="mt-4 max-w-3xl text-balance font-semibold text-4xl leading-[1.04] tracking-[-0.05em] sm:text-5xl"
          >
            What’s new, and why you’ll notice.
          </motion.h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: reduce || stage >= 3 ? 1 : 0,
              y: reduce || stage >= 3 ? 0 : 12,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
          >
            <p className="mt-5 max-w-2xl text-pretty text-muted-foreground leading-7">
              A clear look at the improvements making Northstar easier, calmer,
              and more useful for everyday work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
              <span>Updated June 24</span>
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              <span>New notes every few weeks</span>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-8 sm:pb-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{
              opacity: reduce || stage >= 4 ? 1 : 0,
              y: reduce || stage >= 4 ? 0 : 10,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
          >
            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as Filter)}
              variant="pill"
              className="overflow-x-auto"
            >
              <TabsList
                className="min-w-max"
                aria-label="Filter product updates"
              >
                {FILTERS.map((item) => (
                  <TabsTrigger key={item} value={item} className="min-h-8">
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          <div className="mt-7 space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {releases.map((release, index) => (
                <motion.article
                  layout
                  key={release.version}
                  id={`release-${release.version}`}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{
                    opacity: reduce || stage >= 5 ? 1 : 0,
                    y: reduce || stage >= 5 ? 0 : 16,
                  }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          ...SPRING_LAYOUT,
                          delay: stage < 6 ? index * 0.06 : 0,
                        }
                  }
                  className="rounded-2xl bg-muted p-2"
                >
                  <div className="pt-1 px-1 flex flex-wrap">
                    <h2 className="max-w-2xl text-balance font-medium text-lg leading-tight tracking-[-0.035em] sm:text-xl">
                      {release.title}
                    </h2>
                    {index === 0 && filter === "All" ? (
                      <span className="ml-auto inline-flex rounded-full bg-[linear-gradient(110deg,#ff6b6b,#ffd166,#67c587,#5ca8ff,#c986e8,#ff6b9d)] p-[1.5px]">
                        <span className="rounded-full bg-background px-3 py-1 font-medium text-foreground text-xs">
                          Latest
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <div className="bg-background mt-2 rounded-2xl p-3">
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                      <span>{release.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{release.category}</span>
                    </div>

                    <p className="mt-4 max-w-3xl text-pretty text-muted-foreground leading-7">
                      {release.summary}
                    </p>

                    <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                      {release.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm leading-6"
                        >
                          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section id="updates-subscribe" className="px-4 pb-16 sm:px-8 sm:pb-24">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-7 rounded-2xl border border-border/60 bg-background p-6 sm:p-9 md:flex-row md:items-center">
            <div>
              <p className="text-muted-foreground text-sm">
                A short monthly note
              </p>
              <h2 className="mt-2 max-w-xl text-balance font-semibold text-2xl tracking-[-0.035em] sm:text-3xl">
                Keep up with the changes worth knowing about.
              </h2>
            </div>
            <ButtonLink href="#updates-top" size="lg">
              Subscribe
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </section>
      </main>
    </div>
  );
}
