"use client";

import { motion, useReducedMotion } from "motion/react";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type GridTestimonial = {
  quote: string;
  name: string;
  role: string;
  tint: string;
  /** Render larger with an accent edge. */
  featured?: boolean;
};

export type TestimonialsGridProps = {
  eyebrow?: string;
  title?: string[];
  subtext?: string;
  items?: GridTestimonial[];
  className?: string;
};

const DEFAULT_ITEMS: GridTestimonial[] = [
  {
    quote:
      "beUI gave us motion we could never have built in time. The agent primitives alone — streaming, tool calls, thinking states — saved us a full quarter of work, and every interaction feels native.",
    name: "Maya Chen",
    role: "Frontend Lead, Northwind",
    tint: "#2563eb",
    featured: true,
  },
  {
    quote:
      "Quiet, fast, polished. Our marketing site finally matches the product.",
    name: "Aisha Khan",
    role: "Head of Design, Beacon",
    tint: "#e11d48",
  },
  {
    quote:
      "Copy-paste source means no black-box dependency. We read and own every line.",
    name: "Tom Becker",
    role: "Staff Engineer, Ledger",
    tint: "#d97706",
  },
  {
    quote:
      "Installed from our private registry in one command. Onboarding new engineers is trivial now.",
    name: "Liam O'Brien",
    role: "CTO, Stacks",
    tint: "#0284c7",
  },
  {
    quote:
      "The springs feel native. Reviewers assumed we hand-tuned every single interaction in the app.",
    name: "Kenji Watanabe",
    role: "Eng Manager, Pulse",
    tint: "#0891b2",
  },
  {
    quote:
      "Every block reads perfectly in light and dark. Zero theme bugs filed.",
    name: "Sara Lindqvist",
    role: "Product Designer, Mosaic",
    tint: "#ea580c",
  },
  {
    quote:
      "Feels like the components were designed by someone who actually ships products.",
    name: "Diego Santos",
    role: "Founder, Relay",
    tint: "#059669",
  },
];

export function TestimonialsGrid({
  eyebrow = "Wall of love",
  title = ["Built for teams", "that sweat the details."],
  subtext = "Premium motion, owned source, and a private registry — trusted by founders and platform teams alike.",
  items = DEFAULT_ITEMS,
  className,
}: TestimonialsGridProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 font-medium text-muted-foreground text-xs">
              {eyebrow}
            </span>
          ) : null}
          <TextReveal
            as="h2"
            text={title}
            split="word"
            blur={10}
            className="mt-5 text-balance font-serif text-3xl text-foreground leading-[1.1] sm:text-4xl"
          />
          {subtext ? (
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-7">
              {subtext}
            </p>
          ) : null}
        </div>

        {/* Masonry via CSS columns; cards never break across columns. */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={
                reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }
              }
              whileInView={
                reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, margin: "-40px" }}
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: Math.min(i * 0.06, 0.3),
                    }
              }
              className={cn(
                "mb-4 break-inside-avoid rounded-2xl border bg-card p-5",
                item.featured ? "border-transparent" : "border-border/60",
              )}
              style={
                item.featured
                  ? {
                      boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${item.tint} 45%, transparent)`,
                    }
                  : undefined
              }
            >
              <blockquote
                className={cn(
                  "text-pretty text-foreground leading-6",
                  item.featured ? "text-base sm:text-lg" : "text-sm",
                )}
              >
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Avatar name={item.name} />
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground text-sm">
                    {item.name}
                  </p>
                  <p className="truncate text-muted-foreground text-xs">
                    {item.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/10.x/glass/svg?seed=${encodeURIComponent(seed)}`;
}

function Avatar({ name }: { name: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: small remote SVG avatar, no next/image needed.
    <img
      src={avatarUrl(name)}
      alt=""
      aria-hidden
      width={36}
      height={36}
      loading="lazy"
      className="size-9 shrink-0 rounded-full border border-border/60"
    />
  );
}
