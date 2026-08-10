"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  Heart,
  Images,
  type LucideIcon,
  MapPin,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

type Update = {
  date: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const UPDATES: Update[] = [
  {
    date: "June 26, 2026",
    title: "Plans are easier to move",
    description:
      "Change the time or place once and everyone sees the latest details. No need to send another message to the group.",
    Icon: CalendarDays,
  },
  {
    date: "June 12, 2026",
    title: "Shared lists feel more personal",
    description:
      "Add a quick reaction to any item and see who added each note. Small details now stay with the list instead of getting lost in chat.",
    Icon: Users,
  },
  {
    date: "May 29, 2026",
    title: "Your recent photos, in one place",
    description:
      "Photos from shared plans are now collected automatically, so everyone can revisit and add to the same set afterward.",
    Icon: Images,
  },
];

/* ─────────────────────────────────────────────────────────
 * PAGE CONTENT STORYBOARD
 *
 * Static header stays visible and interactive.
 *
 *   80ms   eyebrow fades in and rises
 *  170ms   title follows with a soft blur reveal
 *  280ms   introduction settles below the title
 *  420ms   featured release lifts into view
 *  620ms   history heading appears
 *  730ms   previous updates cascade upward
 * 1050ms   entrance completes
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  eyebrow: 80,
  title: 170,
  introduction: 280,
  featured: 420,
  history: 620,
  updates: 730,
  settled: 1050,
} as const;

export type ChangelogSimpleProps = {
  className?: string;
};

export function ChangelogSimple({ className }: ChangelogSimpleProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStage(7);
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), TIMING.eyebrow),
      setTimeout(() => setStage(2), TIMING.title),
      setTimeout(() => setStage(3), TIMING.introduction),
      setTimeout(() => setStage(4), TIMING.featured),
      setTimeout(() => setStage(5), TIMING.history),
      setTimeout(() => setStage(6), TIMING.updates),
      setTimeout(() => setStage(7), TIMING.settled),
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
      <main id="simple-updates-top">
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
            What’s new
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
            className="mt-4 max-w-3xl text-balance font-semibold text-4xl leading-[1.05] tracking-[-0.05em] sm:text-5xl"
          >
            Small changes that make planning feel easier.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: reduce || stage >= 3 ? 1 : 0,
              y: reduce || stage >= 3 ? 0 : 12,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
            className="mt-5 max-w-2xl text-pretty text-muted-foreground leading-7"
          >
            New ways to plan together, keep the details close, and look back on
            the moments you shared.
          </motion.p>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-8 sm:pb-20">
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{
              opacity: reduce || stage >= 4 ? 1 : 0,
              y: reduce || stage >= 4 ? 0 : 20,
            }}
            transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
            className="grid gap-2 rounded-[2rem] bg-muted p-2 md:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="rounded-[1.5rem] bg-background p-5 sm:p-8 lg:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-muted px-3 py-1 font-medium text-xs">
                  Latest update
                </span>
                <p className="text-muted-foreground text-sm">July 8, 2026</p>
              </div>
              <h2 className="mt-4 max-w-xl text-balance font-semibold text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
                Monthly memories are ready when you are
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-muted-foreground leading-7">
                Morrow now gathers the photos and notes from your shared plans
                at the end of each month. Keep them private, make a few edits,
                or share the collection with everyone who was there.
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                {[
                  "Created from the plans you shared",
                  "Private until you decide otherwise",
                  "Easy to revisit and add to later",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid min-h-80 place-items-center rounded-[1.5rem] bg-background p-5 sm:p-8">
              <MemoryPreview />
            </div>
          </motion.article>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-8 sm:pb-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: reduce || stage >= 5 ? 1 : 0,
              y: reduce || stage >= 5 ? 0 : 12,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
            className="flex items-end justify-between gap-6 pb-5"
          >
            <div>
              <p className="text-muted-foreground text-sm">Previously</p>
              <h2 className="mt-1 font-semibold text-2xl tracking-[-0.03em]">
                More useful changes
              </h2>
            </div>
          </motion.div>

          <div className="space-y-2 rounded-[2rem] bg-muted p-2">
            {UPDATES.map((update, index) => (
              <motion.article
                key={update.title}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{
                  opacity: reduce || stage >= 6 ? 1 : 0,
                  y: reduce || stage >= 6 ? 0 : 14,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { ...SPRING_LAYOUT, delay: index * 0.07 }
                }
                className="grid gap-5 rounded-[1.5rem] bg-background p-5 sm:grid-cols-[auto_8rem_1fr] sm:items-start sm:p-6"
              >
                <span className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
                  <update.Icon className="size-4" aria-hidden="true" />
                </span>
                <p className="pt-2 text-muted-foreground text-sm">
                  {update.date}
                </p>
                <div>
                  <h3 className="font-semibold text-xl tracking-[-0.025em]">
                    {update.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-pretty text-muted-foreground text-sm leading-6">
                    {update.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="simple-updates-mail"
          className="px-4 pb-16 sm:px-8 sm:pb-24"
        >
          <div className="mx-auto w-full max-w-5xl rounded-[2rem] bg-muted p-2">
            <div className="flex flex-col items-start justify-between gap-7 rounded-[1.5rem] bg-background p-6 sm:p-9 md:flex-row md:items-center">
              <div>
                <p className="text-muted-foreground text-sm">
                  A note when it matters
                </p>
                <h2 className="mt-2 text-balance font-semibold text-2xl tracking-[-0.03em] sm:text-3xl">
                  Get the next useful update by email.
                </h2>
              </div>
              <ButtonLink href="#simple-updates-top" size="lg">
                Subscribe
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MemoryPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">June, together</p>
          <p className="mt-1 text-muted-foreground text-sm">
            A month worth keeping
          </p>
        </div>
        <Heart className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <span className="grid aspect-[4/3] place-items-center rounded-2xl bg-muted text-muted-foreground">
          <span className="grid size-10 place-items-center rounded-full bg-background">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
        </span>
        <span className="grid aspect-[4/3] place-items-center rounded-2xl bg-muted text-muted-foreground">
          <span className="grid size-10 place-items-center rounded-full bg-background">
            <Users className="size-5" aria-hidden="true" />
          </span>
        </span>
        <span className="col-span-2 grid aspect-[2/0.72] place-items-center rounded-2xl bg-muted text-muted-foreground">
          <span className="grid size-10 place-items-center rounded-full bg-background">
            <Images className="size-5" aria-hidden="true" />
          </span>
        </span>
      </div>
    </div>
  );
}
