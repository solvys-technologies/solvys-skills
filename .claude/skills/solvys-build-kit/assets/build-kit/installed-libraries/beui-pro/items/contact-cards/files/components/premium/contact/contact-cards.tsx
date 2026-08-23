"use client";

import { ArrowUpRight, Briefcase, LifeBuoy, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ContactCardsProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  email?: string;
  className?: string;
};

const METHODS = [
  {
    icon: Briefcase,
    title: "Talk to sales",
    body: "Pricing, demos, and procurement for teams.",
    action: "Contact sales",
    href: "/",
  },
  {
    icon: LifeBuoy,
    title: "Get support",
    body: "Bugs, account issues, and integration help.",
    action: "Open a ticket",
    href: "/",
  },
  {
    icon: Users,
    title: "Join the community",
    body: "Chat with builders and share what you ship.",
    action: "Join Discord",
    href: "/",
  },
];

const TEAM = ["Maya", "Dev", "Lior", "Ana"];

export function ContactCards({
  eyebrow = "Contact",
  title = "How can we help?",
  subtext = "Pick the lane that fits — sales, support, or community. Real humans, fast replies.",
  email = "hello@beui.dev",
  className,
}: ContactCardsProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-5xl">
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

        {/* Method cards. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METHODS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.a
                key={m.title}
                href={m.href}
                initial={reduce ? false : { opacity: 0, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }
                }
                className="group relative flex flex-col rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border/80 hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)]"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-emerald-500/12 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-500/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-medium text-foreground text-lg">
                  {m.title}
                </h3>
                <p className="mt-1.5 flex-1 text-pretty text-muted-foreground text-sm leading-6">
                  {m.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 font-medium text-foreground text-sm">
                  {m.action}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Featured "talk to us" strip. */}
        <div className="mt-4 flex flex-col items-center justify-between gap-6 rounded-3xl border border-border/50 bg-gradient-to-br from-emerald-500/[0.07] to-transparent p-6 sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex">
              {TEAM.map((seed, i) => (
                // biome-ignore lint/performance/noImgElement: small remote SVG avatar
                <motion.img
                  key={seed}
                  src={`https://api.dicebear.com/10.x/notionists/svg?seed=${seed}`}
                  alt=""
                  aria-hidden
                  initial={reduce ? false : { opacity: 0, scale: 0.5, x: -6 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { ...SPRING_BOUNCE, delay: 0.1 + i * 0.07 }
                  }
                  className="-ml-2 size-9 rounded-full bg-muted ring-2 ring-card first:ml-0"
                />
              ))}
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                Prefer to talk it through?
              </p>
              <p className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="relative flex size-1.5">
                  {!reduce ? (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
                  ) : null}
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Book a 30-min call · avg reply &lt; 2h
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 gap-2.5 sm:w-auto">
            <ButtonLink
              href="/"
              size="md"
              className="flex-1 rounded-full sm:flex-none"
            >
              Book a demo
            </ButtonLink>
            <ButtonLink
              href={`mailto:${email}`}
              variant="outline"
              size="md"
              className="flex-1 rounded-full sm:flex-none"
            >
              {email}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
