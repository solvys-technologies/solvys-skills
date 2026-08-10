"use client";

import { ArrowUpRight, AtSign, Globe } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TeamSpotlightMember = {
  name: string;
  role: string;
  bio: string;
  seed: string;
  /** Tint behind the avatar (no purple). */
  tint: string;
};

export type TeamSpotlightProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  members?: TeamSpotlightMember[];
  className?: string;
};

const DEFAULT_MEMBERS: TeamSpotlightMember[] = [
  {
    name: "Maya Okafor",
    role: "Founder & CEO",
    bio: "Sets the vision and keeps the bar absurdly high. Previously led design systems at two unicorns before starting beUI.",
    seed: "Maya",
    tint: "#10b981",
  },
  {
    name: "Dev Sharma",
    role: "Head of Engineering",
    bio: "Owns the registry and runtime. Believes motion is a feature, not a finish — and that source you can read beats a black box.",
    seed: "Dev",
    tint: "#0d9488",
  },
  {
    name: "Lior Adler",
    role: "Design Lead",
    bio: "Crafts every spring and easing curve until it feels physical. Obsessed with the half-pixel details nobody notices but everybody feels.",
    seed: "Lior",
    tint: "#0284c7",
  },
  {
    name: "Ana Ruiz",
    role: "Developer Advocate",
    bio: "Turns gnarly APIs into docs you actually enjoy reading. Runs the community and ships the examples you copy first.",
    seed: "Ana",
    tint: "#d97706",
  },
  {
    name: "Kenji Mori",
    role: "Staff Engineer",
    bio: "Performance obsessive — ships 60fps or doesn't ship at all. Keeps the bundle small and the interactions buttery.",
    seed: "Kenji",
    tint: "#e11d48",
  },
];

export function TeamSpotlight({
  eyebrow = "Team",
  title = "The crew behind the craft.",
  subtext = "Pick a face to meet the person behind the components.",
  members = DEFAULT_MEMBERS,
  className,
}: TeamSpotlightProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const member = members[active];

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-4xl">
        {/* Header. */}
        <div className="mx-auto max-w-xl text-center">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 font-medium text-muted-foreground text-xs">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="mt-5 text-balance font-serif text-3xl text-foreground leading-[1.1] sm:text-4xl">
            {title}
          </h2>
          {subtext ? (
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground text-sm leading-7">
              {subtext}
            </p>
          ) : null}
        </div>

        {/* Featured card. */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 bg-card">
          <div className="grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`avatar-${member.seed}`}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }
                }
                className="mx-auto grid size-40 place-items-center rounded-3xl sm:mx-0"
                style={{
                  backgroundColor: `color-mix(in oklch, ${member.tint} 16%, transparent)`,
                }}
              >
                {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
                <img
                  src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${member.seed}`}
                  alt={member.name}
                  className="size-36"
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`info-${member.seed}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }
                }
                className="text-center sm:text-left"
              >
                <h3 className="font-serif text-foreground text-2xl">
                  {member.name}
                </h3>
                <p className="mt-1 font-medium text-emerald-600 text-sm dark:text-emerald-400">
                  {member.role}
                </p>
                <p className="mt-3 text-pretty text-muted-foreground text-sm leading-6">
                  {member.bio}
                </p>
                <div className="mt-4 flex items-center justify-center gap-1.5 sm:justify-start">
                  {[Globe, AtSign].map((Icon, idx) => (
                    <a
                      key={idx === 0 ? "site" : "social"}
                      href="/"
                      aria-label={idx === 0 ? "Website" : "Social"}
                      className="grid size-8 place-items-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                      <Icon className="size-3.5" />
                    </a>
                  ))}
                  <a
                    href="/"
                    className="ml-1 inline-flex items-center gap-1 font-medium text-foreground text-sm"
                  >
                    Full profile
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Avatar rail. */}
          <div className="flex items-center gap-2 overflow-x-auto border-border/60 border-t bg-background/40 p-3">
            {members.map((m, i) => {
              const isActive = i === active;
              return (
                <button
                  key={m.seed}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={m.name}
                  aria-pressed={isActive}
                  className={cn(
                    "relative shrink-0 rounded-2xl p-0.5 transition-all duration-300",
                    isActive ? "scale-105" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <span
                    className="grid size-12 place-items-center rounded-2xl transition-shadow"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${m.tint} 16%, transparent)`,
                      boxShadow: isActive ? `0 0 0 2px ${m.tint}` : "none",
                    }}
                  >
                    {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
                    <img
                      src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${m.seed}`}
                      alt=""
                      aria-hidden
                      className="size-10"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
