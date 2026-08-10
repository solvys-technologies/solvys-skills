"use client";

import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_IN, SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { CHANGELOG_RELEASES } from "./changelog-data";

const FILTERS = ["All", "Product", "Workflow", "Connections"] as const;
type Filter = (typeof FILTERS)[number];

/* ─────────────────────────────────────────────────────────
 * PAGE CONTENT STORYBOARD
 *
 * The left navigation stays visible and interactive.
 *
 *   80ms   hero label fades in
 *  170ms   title rises through a soft blur
 *  290ms   supporting copy and cadence appear
 *  430ms   release feed cascades upward
 *  780ms   entrance completes; tab changes stay quick
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  eyebrow: 80,
  title: 170,
  context: 290,
  releases: 430,
  settled: 780,
} as const;

export type ChangelogSidebarProps = {
  className?: string;
};

export function ChangelogSidebar({ className }: ChangelogSidebarProps) {
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
      setStage(5);
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), TIMING.eyebrow),
      setTimeout(() => setStage(2), TIMING.title),
      setTimeout(() => setStage(3), TIMING.context),
      setTimeout(() => setStage(4), TIMING.releases),
      setTimeout(() => setStage(5), TIMING.settled),
    ];

    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <main
      className={cn(
        "min-h-screen w-full bg-background px-4 py-12 font-sans text-foreground sm:px-8 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10 sm:py-18 lg:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-[-8%] h-72 w-4/5 rotate-[-7deg] bg-[linear-gradient(105deg,#f27777,#efc65b,#62c899,#58a9df,#f27777)] opacity-40 blur-3xl"
          />
          <div className="relative">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{
                opacity: reduce || stage >= 1 ? 1 : 0,
                y: reduce || stage >= 1 ? 0 : 8,
              }}
              transition={reduce ? { duration: 0 } : SPRING_PANEL}
              className="font-medium text-muted-foreground text-sm"
            >
              Notes from the team
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
              className="mt-4 max-w-2xl text-balance font-semibold text-4xl leading-[1.04] tracking-[-0.05em] sm:text-5xl"
            >
              Better work, explained simply.
            </motion.h1>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{
                opacity: reduce || stage >= 3 ? 1 : 0,
                y: reduce || stage >= 3 ? 0 : 12,
              }}
              transition={reduce ? { duration: 0 } : SPRING_PANEL}
            >
              <p className="mt-5 max-w-xl text-pretty text-muted-foreground leading-7">
                The thoughtful changes making everyday projects feel clearer,
                quicker, and easier to share.
              </p>
              <p className="mt-7 text-muted-foreground text-sm">
                Updated June 24 · New notes every few weeks
              </p>
            </motion.div>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="mb-5 hidden lg:block">
              <p className="font-semibold tracking-[-0.025em]">Release notes</p>
              <p className="mt-1 text-muted-foreground text-sm">
                Browse by area
              </p>
            </div>

            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as Filter)}
              variant="pill"
              className="overflow-x-auto lg:overflow-visible"
            >
              <TabsList
                className="min-w-max lg:w-full lg:min-w-0 lg:flex-col lg:items-stretch lg:bg-transparent lg:p-0"
                aria-label="Filter release notes"
              >
                {FILTERS.map((item) => {
                  const count =
                    item === "All"
                      ? CHANGELOG_RELEASES.length
                      : CHANGELOG_RELEASES.filter(
                          (release) => release.category === item,
                        ).length;

                  return (
                    <TabsTrigger
                      key={item}
                      value={item}
                      className="min-h-10 gap-6 lg:w-full lg:justify-between lg:px-4"
                    >
                      <span>{item}</span>
                      <span className="text-xs tabular-nums opacity-65">
                        {count.toString().padStart(2, "0")}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </aside>

          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.section
                key={filter}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{
                  opacity: reduce || stage >= 4 ? 1 : 0,
                  y: reduce || stage >= 4 ? 0 : 8,
                }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : stage < 5
                      ? SPRING_LAYOUT
                      : { duration: 0.16, ease: EASE_IN }
                }
                className="space-y-3"
                aria-live="polite"
              >
                {releases.map((release, index) => (
                  <motion.article
                    key={release.version}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            ...SPRING_LAYOUT,
                            delay: stage < 5 ? index * 0.06 : 0,
                          }
                    }
                    className="rounded-2xl border border-border/60 bg-background p-5 sm:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                      <span>{release.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{release.category}</span>
                      {index === 0 && filter === "All" ? (
                        <span className="ml-auto inline-flex rounded-full bg-[linear-gradient(105deg,#f27777,#efc65b,#62c899,#58a9df,#f27777)] p-px">
                          <span className="rounded-full bg-background px-2.5 py-1 font-medium text-foreground text-xs">
                            Latest
                          </span>
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-4 max-w-2xl text-balance font-semibold text-2xl tracking-[-0.035em]">
                      {release.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-pretty text-muted-foreground leading-7">
                      {release.summary}
                    </p>

                    <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                      {release.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm leading-6"
                        >
                          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-muted">
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </motion.section>
            </AnimatePresence>

            <section className="mt-5 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/60 bg-background p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-muted-foreground text-sm">
                  A calm monthly recap
                </p>
                <h2 className="mt-2 max-w-lg text-balance font-semibold text-2xl tracking-[-0.035em]">
                  Get the changes worth knowing about.
                </h2>
              </div>
              <ButtonLink href="#" size="lg">
                Subscribe
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
