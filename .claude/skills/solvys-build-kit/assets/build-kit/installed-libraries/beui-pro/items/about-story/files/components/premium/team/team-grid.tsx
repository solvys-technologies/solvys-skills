"use client";

import { ArrowUpRight, AtSign, Globe } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TeamMember = {
  name: string;
  role: string;
  /** DiceBear seed for the avatar. */
  seed: string;
};

export type TeamGridProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  members?: TeamMember[];
  hiringHref?: string;
  className?: string;
};

const DEFAULT_MEMBERS: TeamMember[] = [
  { name: "Maya Okafor", role: "Founder & CEO", seed: "Maya" },
  { name: "Dev Sharma", role: "Head of Engineering", seed: "Dev" },
  { name: "Lior Adler", role: "Design Lead", seed: "Lior" },
  { name: "Ana Ruiz", role: "Developer Advocate", seed: "Ana" },
  { name: "Kenji Mori", role: "Staff Engineer", seed: "Kenji" },
  { name: "Priya Nair", role: "Product Manager", seed: "Priya" },
  { name: "Sam Cole", role: "Motion Designer", seed: "Sam" },
  { name: "Tariq Hassan", role: "Infra Engineer", seed: "Tariq" },
];

export function TeamGrid({
  eyebrow = "Team",
  title = "The people behind beUI.",
  subtext = "A small, senior crew obsessed with motion, craft, and developer experience.",
  members = DEFAULT_MEMBERS,
  hiringHref = "/",
  className,
}: TeamGridProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header. */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 font-medium text-muted-foreground text-xs">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-5 text-balance font-serif text-3xl text-foreground leading-[1.1] sm:text-4xl">
              {title}
            </h2>
            {subtext ? (
              <p className="mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-7">
                {subtext}
              </p>
            ) : null}
          </div>
          {hiringHref ? (
            <a
              href={hiringHref}
              className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card px-4 py-2 font-medium text-foreground text-sm transition-colors hover:border-border"
            >
              <span className="relative flex size-1.5">
                {!reduce ? (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
                ) : null}
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              We're hiring
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}
        </div>

        {/* Member grid. */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <motion.div
              key={m.seed}
              initial={
                reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: Math.min(i * 0.06, 0.3),
                    }
              }
              className="group flex flex-col rounded-3xl border border-border/50 bg-card p-3 transition-all duration-300 hover:border-border/80 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-muted to-muted">
                {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
                <img
                  src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${m.seed}`}
                  alt={m.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Socials slide up on hover. */}
                <div className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {[Globe, AtSign].map((Icon, idx) => (
                    <a
                      key={idx === 0 ? "site" : "social"}
                      href="/"
                      aria-label={idx === 0 ? "Website" : "Social"}
                      className="grid size-8 place-items-center rounded-lg border border-white/20 bg-neutral-950/70 text-white backdrop-blur-sm transition-colors hover:bg-neutral-950/90"
                    >
                      <Icon className="size-3.5" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="px-1 pt-3 pb-1">
                <h3 className="font-medium text-foreground text-sm">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-muted-foreground text-xs">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
