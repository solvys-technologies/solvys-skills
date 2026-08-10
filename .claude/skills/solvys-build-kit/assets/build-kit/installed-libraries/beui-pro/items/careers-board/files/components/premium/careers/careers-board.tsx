"use client";

import { ArrowUpRight, Clock, Globe, MapPin, Plus } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useId, useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";
import { type Stat, StatsBand } from "../stats";

type Role = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  blurb: string;
  responsibilities: string[];
};

const DEPARTMENTS = ["Engineering", "Design", "Product", "Growth"] as const;

const ROLES: Role[] = [
  {
    id: "senior-motion-eng",
    title: "Senior Motion Engineer",
    department: "Engineering",
    location: "Remote — global",
    type: "Full-time",
    blurb:
      "Own the animation layer end to end — from the spring physics under a single button press to the choreography of a full page reveal.",
    responsibilities: [
      "Build and refine reusable motion primitives the whole team ships on",
      "Profile and tune interactions to stay transform-only at 60fps",
      "Set the bar for what premium motion feels like across the library",
    ],
  },
  {
    id: "frontend-eng",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote — global",
    type: "Full-time",
    blurb:
      "Turn polished designs into resilient, accessible components that teams drop straight into production.",
    responsibilities: [
      "Ship blocks and templates with real motion, not screenshots",
      "Own accessibility, reduced-motion, and theming from day one",
      "Keep the registry fast, typed, and easy to install",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote — Europe",
    type: "Full-time",
    blurb:
      "Design the sections other teams wish they had time to build — heroes, pricing, onboarding, and everything between.",
    responsibilities: [
      "Prototype motion and interaction before a line of code is written",
      "Sweat spacing, timing, and the small details that read as premium",
      "Partner tightly with engineering to keep design and code in sync",
    ],
  },
  {
    id: "product-lead",
    title: "Product Lead",
    department: "Product",
    location: "Remote — Americas",
    type: "Full-time",
    blurb:
      "Shape what we build next — reading the market, talking to customers, and turning signal into a focused roadmap.",
    responsibilities: [
      "Own the drop calendar and decide what ships in each release",
      "Run customer conversations and translate them into sharp specs",
      "Balance breadth of the catalog against depth of polish",
    ],
  },
  {
    id: "growth-marketer",
    title: "Growth Marketer",
    department: "Growth",
    location: "Remote — global",
    type: "Contract",
    blurb:
      "Get premium components in front of the teams who care about craft — through content, launches, and community.",
    responsibilities: [
      "Own launches end to end, from teaser to changelog",
      "Build the content engine around motion and frontend craft",
      "Turn happy customers into the loudest part of the funnel",
    ],
  },
];

const BOARD_STATS: Stat[] = [
  { value: 100, suffix: "%", label: "Remote", sub: "since day one" },
  { value: 9, suffix: "", label: "Time zones", sub: "one async team" },
  { value: 4, suffix: "wk", label: "Paid recharge", sub: "every year" },
  { value: 0, suffix: "", label: "Legacy code", sub: "greenfield craft" },
];

const FILTERS = ["All", ...DEPARTMENTS] as const;
type Filter = (typeof FILTERS)[number];

export type CareersBoardProps = {
  brand?: string;
  className?: string;
};

export function CareersBoard({ brand = "beUI", className }: CareersBoardProps) {
  const reduce = useReducedMotion();
  const layoutId = useId();
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: ROLES.length };
    for (const dept of DEPARTMENTS) {
      map[dept] = ROLES.filter((r) => r.department === dept).length;
    }
    return map;
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? ROLES
        : ROLES.filter((role) => role.department === filter),
    [filter],
  );

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
      <section className="w-full px-4 pt-24 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          {/* Intro. */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              {...rise()}
              className="inline-flex items-center rounded-full bg-card px-3.5 py-1.5 font-medium text-[11px] text-muted-foreground uppercase tracking-[0.14em] shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)]"
            >
              Careers at {brand}
            </motion.span>

            <TextReveal
              as="h1"
              text={["Build the motion", "teams ship with."]}
              split="word"
              blur={10}
              className="mt-7 text-balance font-sans font-semibold text-5xl text-foreground leading-[1.02] tracking-[-0.03em] sm:text-6xl"
            />

            <motion.p
              {...rise(0.12)}
              className="mx-auto mt-6 max-w-lg text-pretty text-lg text-muted-foreground leading-8"
            >
              We're a small, senior, fully-remote crew making premium the
              default. Find where you fit below — every role is remote and
              async-first.
            </motion.p>
          </div>

          {/* Roles header. */}
          <motion.div
            {...rise(0.16)}
            className="mx-auto mt-16 flex max-w-3xl items-baseline justify-between border-border/60 border-b pb-4"
          >
            <h2 className="font-medium text-foreground text-lg">Open roles</h2>
            <span className="font-mono text-muted-foreground text-xs tabular-nums">
              {visible.length} open
            </span>
          </motion.div>

          {/* Department filter. */}
          <motion.div
            {...rise(0.18)}
            className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center gap-2"
          >
            <LayoutGroup id={layoutId}>
              {FILTERS.map((item) => {
                const active = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={cn(
                      "relative inline-flex min-h-10 items-center gap-2 rounded-full px-4 font-medium text-sm transition-colors",
                      active
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="careers-filter-pill"
                        transition={reduce ? { duration: 0 } : SPRING_PANEL}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    ) : null}
                    <span className="relative">{item}</span>
                    <span
                      className={cn(
                        "relative rounded-full px-1.5 py-0.5 text-xs tabular-nums",
                        active
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "border border-border/60 text-muted-foreground",
                      )}
                    >
                      {counts[item]}
                    </span>
                  </button>
                );
              })}
            </LayoutGroup>
          </motion.div>

          {/* Open roles list — the star. */}
          <motion.div
            {...rise(0.24)}
            className="mx-auto mt-8 flex max-w-3xl flex-col gap-3"
          >
            <LayoutGroup>
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((role, index) => (
                  <RoleRow
                    key={role.id}
                    role={role}
                    index={index}
                    reduce={reduce}
                  />
                ))}
              </AnimatePresence>
            </LayoutGroup>
          </motion.div>
        </div>
      </section>

      {/* Composed from our own premium stat band. */}
      <StatsBand
        eyebrow="Life here"
        title="A team built for focus, not meetings."
        stats={BOARD_STATS}
      />

      {/* Closing CTA — full-bleed ocean grainient banner, hero-style treatment. */}
      <section className="px-2.5 pb-2.5 sm:px-3">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#1c5b96]">
          {/* Sky-blue flow-field backdrop — light and airy in both themes. */}
          <Grainient
            className="absolute inset-0"
            color1="#1c5b96"
            color2="#4a9fe0"
            color3="#bfe4ff"
            timeSpeed={0.2}
            grainAmount={0.045}
            contrast={1.25}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10 ring-inset"
          />
          {/* Legibility scrim — darker only at the very edges, lifted center. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_35%,rgb(9_28_52_/_0.5))]"
          />

          <motion.div
            {...rise()}
            className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-8 sm:py-28"
          >
            <span className="grid size-12 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
              <Globe className="size-5" />
            </span>
            <h2 className="max-w-md text-balance font-sans font-semibold text-2xl text-white tracking-[-0.02em] drop-shadow-sm sm:text-4xl">
              Don't see your role?
            </h2>
            <p className="max-w-sm text-pretty text-white/85 leading-7">
              We hire for talent over titles. If you care about craft and
              motion, tell us what you'd want to build.
            </p>
            <ButtonLink
              href="#"
              size="lg"
              className="mt-2 rounded-full bg-white text-neutral-900 hover:bg-white/90"
            >
              Introduce yourself
              <ArrowUpRight className="size-4" />
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function RoleRow({
  role,
  index,
  reduce,
}: {
  role: Role;
  index: number;
  reduce: boolean | null;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <motion.div
      layout={reduce ? false : "position"}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.4, ease: EASE_OUT, delay: index * 0.05 }
      }
      className="overflow-hidden rounded-2xl border border-border/60 transition-colors hover:border-border"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-base text-foreground">
              {role.title}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground text-xs">
              {role.department}
            </span>
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wide">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3" />
              {role.type}
            </span>
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground"
        >
          <Plus className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }
            }
            className="overflow-hidden"
          >
            <div className="border-border/60 border-t px-5 py-4">
              <p className="text-pretty text-muted-foreground text-sm leading-7">
                {role.blurb}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-foreground text-sm leading-6"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#" className="mt-5 rounded-full">
                Apply for this role
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
