"use client";

import {
  ArrowUpRight,
  Compass,
  Globe2,
  HeartHandshake,
  Layers,
  MapPin,
  Timer,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentType } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { CtaSplit } from "../cta-sections";
import { Grainient } from "../feature-sections/grainient";
import { TeamMarquee, type TeamMarqueeMember } from "../team";

type Value = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const VALUES: Value[] = [
  {
    icon: Compass,
    title: "Craft over noise",
    body: "We sweat the details others skip — the timing, the spring, the pixel that makes it feel alive.",
  },
  {
    icon: HeartHandshake,
    title: "Own your work",
    body: "Small team, big surface. You'll own whole features end to end, not tickets in a queue.",
  },
  {
    icon: Timer,
    title: "Async by default",
    body: "Deep work beats standups. We write things down and protect long, uninterrupted focus.",
  },
];

type Perk = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  wide?: boolean;
};

const PERKS: Perk[] = [
  {
    icon: Globe2,
    title: "Fully remote",
    body: "Work from anywhere across nine time zones. No relocation, no office mandate.",
    wide: true,
  },
  {
    icon: Wallet,
    title: "Top-of-market pay",
    body: "Senior comp with real equity.",
  },
  {
    icon: Timer,
    title: "4-week recharge",
    body: "Paid, every single year.",
  },
  {
    icon: Layers,
    title: "Best-in-class gear",
    body: "Whatever setup makes you fastest, on us — refreshed on your schedule.",
    wide: true,
  },
];

const TEAM: TeamMarqueeMember[] = [
  {
    name: "Priya Nair",
    role: "Co-founder & CEO",
    bio: "Shipped design systems at scale before going all-in on motion.",
    seed: "Priya",
  },
  {
    name: "Marcus Vale",
    role: "Co-founder & CTO",
    bio: "Lives in the spring physics so you don't have to.",
    seed: "Marcus",
  },
  {
    name: "Lena Ortiz",
    role: "Head of Design",
    bio: "Believes premium is a feeling, and feelings are made of timing.",
    seed: "Lena",
  },
  {
    name: "Theo Park",
    role: "Head of Engineering",
    bio: "Turns polished mocks into resilient, accessible source.",
    seed: "Theo",
  },
  {
    name: "Noa Berger",
    role: "Frontend Engineer",
    bio: "Obsessed with 60fps and transform-only interactions.",
    seed: "Noa",
  },
  {
    name: "Ravi Menon",
    role: "Platform Engineer",
    bio: "Keeps the registry fast, typed, and boring to install.",
    seed: "Ravi",
  },
];

export type CareersCultureProps = {
  brand?: string;
  className?: string;
};

export function CareersCulture({
  brand = "beUI",
  className,
}: CareersCultureProps) {
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
      {/* Editorial hero. */}
      <section className="w-full px-4 pt-24 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <motion.span
              {...rise()}
              className="inline-flex items-center rounded-full bg-card px-3.5 py-1.5 font-medium text-[11px] text-muted-foreground uppercase tracking-[0.14em] shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)]"
            >
              We're hiring
            </motion.span>

            <TextReveal
              as="h1"
              text={["Come make premium", "the default."]}
              split="word"
              blur={10}
              className="mt-7 text-balance font-sans font-semibold text-5xl text-foreground leading-[1.02] tracking-[-0.03em] sm:text-6xl"
            />

            <motion.p
              {...rise(0.12)}
              className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground leading-8"
            >
              {brand} is a small, senior team building the motion layer modern
              products ship with. We hire for craft, give real ownership, and
              protect the focus it takes to do great work.
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-8">
              <ButtonLink href="#roles" size="lg" className="rounded-full">
                See open roles
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </motion.div>
          </div>

          {/* Culture banner. */}
          <motion.div
            {...rise(0.1)}
            className="relative mt-16 overflow-hidden rounded-[2rem] border border-border/60"
          >
            <Grainient
              className="absolute inset-0"
              color1="#dfe9a6"
              color2="#6fb389"
              color3="#cf9a5c"
              grainAmount={0.09}
              contrast={1.15}
              zoom={0.8}
            />
            <div className="relative flex min-h-56 flex-col justify-end p-8 sm:p-12">
              <p className="max-w-lg font-sans font-semibold text-2xl text-white tracking-[-0.02em] drop-shadow-sm sm:text-3xl">
                Remote-first, craft-obsessed, async by default.
              </p>
              <p className="mt-2 max-w-md text-sm text-white/85">
                Nine time zones, one senior team, shipping premium motion in the
                open.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values — editorial split. */}
      <section className="w-full px-4 py-20 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.span
              {...rise()}
              className="font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]"
            >
              How we work
            </motion.span>
            <motion.h2
              {...rise(0.05)}
              className="mt-4 max-w-md text-balance font-sans font-semibold text-3xl text-foreground leading-tight tracking-[-0.02em] sm:text-4xl"
            >
              Three principles we don't compromise on.
            </motion.h2>
          </div>

          <div className="flex flex-col">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                {...rise(i * 0.08)}
                className="flex gap-5 border-border/60 border-t py-7 first:border-t-0 first:pt-0"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-foreground ring-1 ring-border">
                  <value.icon className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium text-foreground text-lg">
                      {value.title}
                    </h3>
                    <span className="font-mono text-muted-foreground/50 text-xs tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-pretty text-muted-foreground leading-7">
                    {value.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks — gapless bento. */}
      <section className="w-full px-4 pb-20 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            {...rise()}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2 className="max-w-xl text-balance font-sans font-semibold text-3xl text-foreground leading-tight tracking-[-0.02em] sm:text-4xl">
              The good stuff.
            </h2>
            <p className="max-w-sm text-pretty text-muted-foreground text-sm leading-7">
              The benefits that let you do the best work of your career, without
              burning out.
            </p>
          </motion.div>

          <motion.div
            {...rise(0.08)}
            className="grid gap-px overflow-hidden rounded-[2rem] border border-border/60 bg-border/60 sm:auto-rows-fr sm:grid-cols-3"
          >
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className={cn(
                  "flex min-h-44 flex-col justify-between gap-6 bg-background p-7",
                  perk.wide ? "sm:col-span-2" : null,
                )}
              >
                <span className="grid size-11 place-items-center rounded-full bg-muted text-foreground ring-1 ring-border">
                  <perk.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium text-foreground">{perk.title}</h3>
                  <p className="mt-1.5 text-muted-foreground text-sm leading-6">
                    {perk.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured role spotlight. */}
      <section id="roles" className="w-full px-4 pb-20 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            {...rise()}
            className="relative overflow-hidden rounded-[2rem] border border-border/60 p-8 sm:p-12"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-medium text-foreground text-xs">
                  Featured role
                </span>
                <h2 className="mt-5 text-balance font-sans font-semibold text-3xl text-foreground leading-tight tracking-[-0.02em] sm:text-4xl">
                  Senior Motion Engineer
                </h2>
                <p className="mt-4 text-pretty text-muted-foreground leading-7">
                  Own the animation layer end to end — from the spring under a
                  single press to the choreography of a full page reveal. Set
                  the bar for what premium motion feels like.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    Remote — global
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Timer className="size-3.5" />
                    Full-time
                  </span>
                </div>
              </div>
              <ButtonLink href="#" size="lg" className="shrink-0 rounded-full">
                Apply now
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team — composed from our own premium marquee. */}
      <TeamMarquee
        eyebrow="The crew"
        title={["The people you'd", "build alongside."]}
        members={TEAM}
      />

      {/* CTA — composed from our own premium split CTA. */}
      <CtaSplit
        headline={["Ready to build", "the best-animated UI on the web?"]}
        subtext="Join a senior, remote team that competes on craft and motion. We reply to every application personally."
        installCommand=""
        primaryCta={{ label: "See open roles", href: "#roles" }}
        secondaryCta={{ label: "Introduce yourself", href: "#" }}
        tertiaryCta={{ label: "Learn how we work", href: "#" }}
      />
    </div>
  );
}
