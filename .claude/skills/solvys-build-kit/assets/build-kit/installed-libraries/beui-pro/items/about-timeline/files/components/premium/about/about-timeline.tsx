"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";
import { type Stat, StatsBand } from "../stats";
import { type TeamPanelMember, TeamPanels } from "../team";

const MILESTONES = [
  {
    year: "2018",
    title: "Two people, one repo",
    body: "Started as a side project — a handful of motion components we kept copying between client builds.",
  },
  {
    year: "2020",
    title: "Open-sourced the core",
    body: "Released the free library. It hit the front page and the issues started pouring in — in a good way.",
  },
  {
    year: "2023",
    title: "Went premium",
    body: "Launched the private registry so teams could install polished blocks and templates the same day.",
  },
  {
    year: "2026",
    title: "A platform, not a package",
    body: "Now thousands of teams ship with our blocks, templates, and agent primitives across nine time zones.",
  },
];

const ABOUT_STATS: Stat[] = [
  { value: 14, suffix: "k+", label: "Teams building", sub: "worldwide" },
  { value: 92, suffix: "+", label: "Countries reached", sub: "and counting" },
  { value: 60, suffix: "", label: "Teammates", sub: "nine time zones" },
  { value: 8, suffix: "yrs", label: "Shipping since 2018", sub: "in the open" },
];

const LEADERS: TeamPanelMember[] = [
  {
    name: "Priya Nair",
    role: "Co-founder & CEO",
    bio: "Sets the vision and keeps the bar absurdly high. Ex-design systems lead.",
    seed: "Priya",
  },
  {
    name: "Marcus Vale",
    role: "Co-founder & CTO",
    bio: "Owns the registry and runtime. Believes motion is a feature, not a finish.",
    seed: "Marcus",
  },
  {
    name: "Lena Ortiz",
    role: "Head of Design",
    bio: "Crafts every spring and easing curve until it feels physical.",
    seed: "Lena",
  },
  {
    name: "Theo Park",
    role: "Head of Engineering",
    bio: "Performance obsessive — ships 60fps or doesn't ship at all.",
    seed: "Theo",
  },
];

export type AboutTimelineProps = {
  brand?: string;
  className?: string;
};

export function AboutTimeline({
  brand = "beUI",
  className,
}: AboutTimelineProps) {
  const reduce = useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <div className={cn("w-full", className)}>
      <section className="w-full px-4 pt-20 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: header + timeline. */}
          <div>
            <motion.span
              {...rise()}
              className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 font-medium text-muted-foreground text-xs"
            >
              Our story
            </motion.span>
            <motion.h1
              {...rise(0.06)}
              className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] sm:text-5xl"
            >
              From a shared repo to the motion layer for modern teams.
            </motion.h1>
            <motion.p
              {...rise(0.12)}
              className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground leading-8"
            >
              {brand} has always been about one thing — making premium motion
              something any team can ship, not a luxury reserved for the few.
            </motion.p>

            {/* Timeline. */}
            <div className="relative mt-14 pl-8 sm:pl-10">
              <span className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[9px]" />
              <div className="flex flex-col gap-10">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    {...rise(i * 0.05)}
                    className="relative"
                  >
                    {/* Node. */}
                    <span className="absolute top-1.5 left-[-30px] grid place-items-center sm:left-[-38px]">
                      <span className="size-4 rounded-full border-2 border-background bg-accent ring-1 ring-border" />
                    </span>
                    <p className="font-medium font-mono text-accent text-sm">
                      {m.year}
                    </p>
                    <h3 className="mt-1 font-serif text-foreground text-xl">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-pretty text-muted-foreground leading-7">
                      {m.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: sticky animated visual. */}
          <div className="hidden lg:block">
            <motion.div
              {...rise(0.16)}
              className="sticky top-24 h-[34rem] overflow-hidden rounded-3xl border border-border"
            >
              <StoryVisual reduce={reduce} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Composed from our own premium blocks. */}
      <StatsBand
        eyebrow="By the numbers"
        title="Trusted by teams who care about craft."
        stats={ABOUT_STATS}
      />

      <TeamPanels
        eyebrow="Leadership"
        title="The people behind it."
        subtext="Hover a panel to meet the crew building in the open."
        members={LEADERS}
      />

      {/* CTA. */}
      <section className="w-full px-4 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            {...rise()}
            className="flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-border p-10 sm:flex-row sm:items-center sm:p-12"
          >
            <h2 className="max-w-md text-balance font-serif text-2xl text-foreground sm:text-3xl">
              We're hiring across design and engineering.
            </h2>
            <ButtonLink href="#" size="lg" className="shrink-0 rounded-full">
              See open roles
              <ArrowRight className="size-4" />
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const FEED = [
  { year: "2018", label: "First commit pushed" },
  { year: "2020", label: "Open-sourced the core" },
  { year: "2023", label: "Premium registry launched" },
  { year: "2026", label: "10k+ teams shipping" },
];

function useReplay(still: boolean, duration: number) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setCycle((c) => c + 1), duration);
    return () => clearInterval(id);
  }, [still, duration]);
  return cycle;
}

function StoryVisual({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const still = !!reduce || !inView;
  const cycle = useReplay(still, 5200);

  return (
    <div ref={ref} className="relative grid h-full place-items-center p-7">
      <Grainient
        className="absolute inset-0"
        color1="#cfe0fb"
        color2="#5b8def"
        color3="#2f5fb0"
        grainAmount={0.09}
        contrast={1.15}
        zoom={0.85}
      />

      {/* Frosted glass "shipping in the open" feed — replays on a loop. */}
      <div className="relative w-full max-w-[19rem] rounded-2xl border border-white/10 bg-neutral-950/85 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="font-medium font-mono text-white text-xs">
            shipping in the open
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            live
          </span>
        </div>

        <motion.div key={cycle} className="mt-3.5 flex flex-col gap-3">
          {FEED.map((item, i) => (
            <motion.div
              key={item.year}
              {...(still
                ? {}
                : {
                    initial: { opacity: 0, y: 6 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.3,
                      ease: EASE_OUT,
                      delay: 0.2 + i * 0.55,
                    },
                  })}
              className="flex items-center gap-2.5"
            >
              <motion.span
                {...(still
                  ? {}
                  : {
                      initial: { scale: 0.5, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      transition: { ...SPRING_BOUNCE, delay: 0.35 + i * 0.55 },
                    })}
                className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-neutral-900"
              >
                <Check className="size-3" />
              </motion.span>
              <span className="font-mono text-[11px] text-sky-300">
                {item.year}
              </span>
              <span className="truncate text-white/85 text-xs">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Caption. */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="flex -space-x-2.5">
          {LEADERS.map((m) => (
            // biome-ignore lint/performance/noImgElement: small remote SVG avatar
            <img
              key={m.seed}
              src={`https://api.dicebear.com/10.x/notionists/svg?seed=${m.seed}`}
              alt=""
              aria-hidden
              className="size-8 rounded-full bg-white/40 ring-2 ring-white/60"
            />
          ))}
        </div>
        <p className="mt-3 font-serif text-2xl text-white drop-shadow-sm">
          Building in the open
        </p>
        <p className="mt-1 max-w-xs text-sm text-white/80">
          A senior team across nine time zones, since 2018.
        </p>
      </div>
    </div>
  );
}
