"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type SpotlightTestimonial = {
  quote: string;
  name: string;
  role: string;
  tint: string;
};

export type TestimonialsSpotlightProps = {
  eyebrow?: string;
  items?: SpotlightTestimonial[];
  className?: string;
};

const DEFAULT_ITEMS: SpotlightTestimonial[] = [
  {
    quote:
      "beUI gave us motion we could never have built in time. Our launch page went from flat to premium in two days, and the springs feel completely native.",
    name: "Maya Chen",
    role: "Frontend Lead, Northwind",
    tint: "#2563eb",
  },
  {
    quote:
      "The agent primitives are the real unlock. Streaming responses, tool-call surfaces, thinking states — all handled, all polished, all ours to edit.",
    name: "Priya Nair",
    role: "Design Engineer, Cortex",
    tint: "#0d9488",
  },
  {
    quote:
      "Copy-paste source with no black-box dependency was the deciding factor. We read every line, own every line, and ship with full confidence.",
    name: "Tom Becker",
    role: "Staff Engineer, Ledger",
    tint: "#d97706",
  },
  {
    quote:
      "Installed from our private registry in one command. Every block reads perfectly in light and dark — we haven't filed a single theme bug since.",
    name: "Aisha Khan",
    role: "Head of Design, Beacon",
    tint: "#e11d48",
  },
];

export function TestimonialsSpotlight({
  eyebrow = "Wall of love",
  items = DEFAULT_ITEMS,
  className,
}: TestimonialsSpotlightProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: active restarts the timer on manual selection.
  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % items.length),
      5000,
    );
    return () => clearInterval(id);
  }, [reduce, paused, items.length, active]);

  const current = items[active];
  if (!current) return null;

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div
        className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {eyebrow ? (
          <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 font-medium text-muted-foreground text-xs">
            {eyebrow}
          </span>
        ) : null}

        <div className="relative mt-8 flex min-h-[12rem] items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={active}
              initial={
                reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, filter: "blur(8px)" }
              }
              transition={
                reduce ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }
              }
              className="text-balance font-serif text-foreground text-xl leading-[1.4] sm:text-2xl"
            >
              “{current.quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 h-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }
              }
            >
              <p className="font-medium text-foreground text-sm">
                {current.name}
              </p>
              <p className="text-muted-foreground text-xs">{current.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Avatar rail — squircle tiles fanned in a gentle arc. */}
        <div className="mt-10 flex items-end justify-center">
          {items.map((item, i) => {
            const selected = i === active;
            const dist = i - (items.length - 1) / 2;
            return (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={selected}
                animate={
                  reduce
                    ? undefined
                    : {
                        scale: selected ? 1.14 : 1,
                        y: selected ? -8 : Math.abs(dist) * 5,
                        rotate: selected ? 0 : dist * 4,
                      }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                style={{
                  zIndex: selected ? 10 : 1,
                  marginLeft: i === 0 ? 0 : "-0.5rem",
                }}
                className="relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              >
                {selected ? (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={reduce ? { duration: 0 } : SPRING_PANEL}
                    aria-hidden
                    className="-inset-0.5 -z-10 pointer-events-none absolute rounded-[1.1rem] border border-border bg-white/25 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                  />
                ) : null}
                <Avatar name={item.name} selected={selected} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/10.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=eef2f6`;
}

function Avatar({ name, selected }: { name: string; selected: boolean }) {
  return (
    // biome-ignore lint/performance/noImgElement: small remote SVG avatar, no next/image needed.
    <img
      src={avatarUrl(name)}
      alt=""
      aria-hidden
      width={56}
      height={56}
      loading="lazy"
      className={cn(
        "size-14 rounded-2xl border border-border/60 object-cover transition-[filter,opacity,box-shadow]",
        selected
          ? "opacity-100 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.55)]"
          : "opacity-70 grayscale hover:opacity-90",
      )}
    />
  );
}
