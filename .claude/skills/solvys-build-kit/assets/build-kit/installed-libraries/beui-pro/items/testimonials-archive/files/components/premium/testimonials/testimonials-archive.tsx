"use client";

import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type ArchiveTestimonial = {
  ref: string;
  fig: string;
  quote: string;
  name: string;
  role: string;
  /** DiceBear seed for the pinned portrait. */
  seed: string;
};

export type TestimonialsArchiveProps = {
  eyebrow?: string;
  title?: string[];
  subtext?: string;
  items?: ArchiveTestimonial[];
  className?: string;
};

const DEFAULT_ITEMS: ArchiveTestimonial[] = [
  {
    ref: "ARC-8492",
    fig: "FIG. A",
    quote:
      "Shipped our pricing page in an afternoon. The motion is the part I could never get right by hand — now it just feels native.",
    name: "Maya Chen",
    role: "Frontend Lead @ Northwind",
    seed: "Maya",
  },
  {
    ref: "ARC-3391",
    fig: "FIG. M",
    quote:
      "The agent primitives saved us weeks. Streaming, tool calls, thinking states — all handled, all ours to edit.",
    name: "Marcus Strom",
    role: "Design Engineer @ Cortex",
    seed: "Marcus",
  },
  {
    ref: "ARC-7721",
    fig: "FIG. S",
    quote:
      "Every block reads perfectly in light and dark. We haven't filed a single theme bug since we switched.",
    name: "Sara Lindqvist",
    role: "Product Designer @ Mosaic",
    seed: "Sara",
  },
  {
    ref: "ARC-9102",
    fig: "FIG. E",
    quote:
      "Copy-paste source means no black-box dependency. We read every line, own every line, and ship with confidence.",
    name: "Tom Becker",
    role: "Staff Engineer @ Ledger",
    seed: "Tom",
  },
  {
    ref: "ARC-2104",
    fig: "FIG. D",
    quote:
      "Installed from our private registry in one command. Onboarding new engineers is trivial now.",
    name: "Liam O'Brien",
    role: "CTO @ Stacks",
    seed: "Liam",
  },
  {
    ref: "ARC-5567",
    fig: "FIG. R",
    quote:
      "Feels like the components were designed by someone who actually ships products, not just demos.",
    name: "Diego Santos",
    role: "Founder @ Relay",
    seed: "Diego",
  },
];

// Static per-position tilts so the wall looks pinned, not perfectly aligned.
const CARD_TILT = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.6];

export function TestimonialsArchive({
  eyebrow = "Hall of fame",
  title = ["Builders who never", "ship alone."],
  subtext = "Field notes from teams shipping with beUI.",
  items = DEFAULT_ITEMS,
  className,
}: TestimonialsArchiveProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header. */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow ? (
              <span className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-5 text-balance font-serif text-3xl text-foreground leading-[1.05] sm:text-5xl">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          {subtext ? (
            <p className="font-mono text-muted-foreground text-sm tracking-tight sm:pb-2">
              {subtext}
            </p>
          ) : null}
        </div>

        {/* Pinned archive wall. Grid (not multicol) so polaroids can poke above. */}
        <div className="mt-20 grid grid-cols-1 items-start gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ArchiveCard
              key={item.ref}
              item={item}
              tilt={CARD_TILT[i % CARD_TILT.length]}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/10.x/glyphs/svg?seed=${encodeURIComponent(seed)}`;
}

function ArchiveCard({
  item,
  tilt,
  index,
  reduce,
}: {
  item: ArchiveTestimonial;
  tilt: number;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reduce
          ? undefined
          : {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: Math.min(index * 0.06, 0.3),
            }
      }
      style={{ rotate: `${tilt}deg` }}
      className="relative rounded border border-border/70 bg-muted/40 p-5"
    >
      {/* Pinned polaroid, poking above the top-right corner. */}
      <div className="-top-9 absolute right-3 w-[5.5rem] rotate-[5deg]">
        <div className="rounded-[3px] border border-border/60 bg-card p-1.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]">
          {/* biome-ignore lint/performance/noImgElement: small remote SVG portrait. */}
          <img
            src={avatarUrl(item.seed)}
            alt=""
            aria-hidden
            width={72}
            height={72}
            loading="lazy"
            className="aspect-square w-full rounded-[2px] bg-muted object-cover"
          />
          <p className="mt-1 text-center font-serif text-[10px] text-muted-foreground italic">
            {item.fig}
          </p>
        </div>
      </div>

      <p className="pr-24 font-mono text-[10px] text-muted-foreground tracking-[0.2em]">
        REF <span className="ml-1 text-foreground">{item.ref}</span>
      </p>

      <blockquote className="mt-7 max-w-[15rem] font-mono text-foreground text-sm leading-6">
        {item.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-end justify-between border-border/70 border-t border-dashed pt-3">
        <div>
          <p className="font-serif text-base text-foreground italic">
            {item.name}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
            {item.role}
          </p>
        </div>
        <Mail className="size-3.5 text-muted-foreground/40" />
      </figcaption>
    </motion.figure>
  );
}
