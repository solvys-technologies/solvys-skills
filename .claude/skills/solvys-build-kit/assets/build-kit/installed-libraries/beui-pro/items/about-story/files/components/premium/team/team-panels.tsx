"use client";

import { ArrowUpRight, AtSign, Globe } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { SPRING_SWAP } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TeamPanelMember = {
  name: string;
  role: string;
  bio: string;
  seed: string;
};

export type TeamPanelsProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  members?: TeamPanelMember[];
  className?: string;
};

// Per-panel background tints (no purple) — index-mapped, cycles if more members.
const TINTS = [
  "from-emerald-500/25",
  "from-teal-500/25",
  "from-sky-500/25",
  "from-amber-500/25",
  "from-rose-500/25",
];

const DEFAULT_MEMBERS: TeamPanelMember[] = [
  {
    name: "Maya Okafor",
    role: "Founder & CEO",
    bio: "Sets the vision and keeps the bar absurdly high. Ex-design systems lead.",
    seed: "Maya",
  },
  {
    name: "Dev Sharma",
    role: "Head of Engineering",
    bio: "Owns the registry and runtime. Believes motion is a feature, not a finish.",
    seed: "Dev",
  },
  {
    name: "Lior Adler",
    role: "Design Lead",
    bio: "Crafts every spring and easing curve until it feels physical.",
    seed: "Lior",
  },
  {
    name: "Ana Ruiz",
    role: "Developer Advocate",
    bio: "Turns gnarly APIs into docs you actually enjoy reading.",
    seed: "Ana",
  },
  {
    name: "Kenji Mori",
    role: "Staff Engineer",
    bio: "Performance obsessive — ships 60fps or doesn't ship at all.",
    seed: "Kenji",
  },
];

export function TeamPanels({
  eyebrow = "Team",
  title = "Meet the makers.",
  subtext = "Hover a panel to get to know the crew behind every component.",
  members = DEFAULT_MEMBERS,
  className,
}: TeamPanelsProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
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

        {/* Expanding panels. */}
        <div className="mt-12 flex h-[34rem] flex-col gap-2.5 md:h-[26rem] md:flex-row">
          {members.map((m, i) => {
            const isActive = i === active;
            const tint = TINTS[i % TINTS.length];
            return (
              <motion.button
                key={m.seed}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`${m.name}, ${m.role}`}
                initial={false}
                animate={{ flexGrow: isActive ? 3.4 : 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 210, damping: 34, mass: 0.9 }
                }
                style={{ flexBasis: 0, willChange: "flex-grow" }}
                className={cn(
                  "group relative min-h-0 overflow-hidden rounded-3xl border text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
                  isActive ? "border-border/70" : "border-border/40",
                )}
              >
                {/* Tinted backdrop. */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br to-transparent",
                    tint,
                  )}
                />

                {/* Avatar. */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
                  <img
                    src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${m.seed}`}
                    alt={m.name}
                    className={cn(
                      "size-40 transition-[transform,opacity] duration-500 ease-out",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-80 md:opacity-55",
                    )}
                  />
                </div>

                {/* Bottom gradient + content — name is bottom-anchored, detail
                    reveals above it so nothing reflows. */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-neutral-950/85 via-neutral-950/40 to-transparent p-4 pt-16">
                  {/* Always mounted at a fixed width so it never rewraps as
                      the panel resizes — only opacity / y animate. */}
                  <motion.div
                    aria-hidden={!isActive}
                    initial={false}
                    animate={
                      reduce
                        ? { opacity: isActive ? 1 : 0 }
                        : { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }
                    }
                    transition={reduce ? { duration: 0 } : SPRING_SWAP}
                    className={cn(
                      "mb-2 w-60",
                      isActive ? null : "pointer-events-none",
                    )}
                  >
                    <p className="text-pretty text-white/80 text-xs leading-5">
                      {m.bio}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5">
                      {[Globe, AtSign].map((Icon, idx) => (
                        <span
                          key={idx === 0 ? "site" : "social"}
                          className="grid size-7 place-items-center rounded-lg border border-white/20 bg-white/10 text-white"
                        >
                          <Icon className="size-3.5" />
                        </span>
                      ))}
                      <span className="ml-1 inline-flex items-center gap-1 font-medium text-white/90 text-xs">
                        Profile
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </motion.div>

                  <p className="font-medium text-sm text-white drop-shadow">
                    {m.name}
                  </p>
                  <p className="text-white/70 text-xs">{m.role}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
