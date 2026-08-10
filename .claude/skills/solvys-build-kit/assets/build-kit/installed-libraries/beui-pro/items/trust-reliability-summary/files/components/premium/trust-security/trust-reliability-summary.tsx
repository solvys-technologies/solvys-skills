"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  Clock3,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { NumberTicker } from "@/components/motion/number-ticker";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { TrustSectionHeading } from "./trust-section-heading";

export type ReliabilitySupportItem = {
  label: string;
  value: string;
  description: string;
  icon?: LucideIcon;
};

export type TrustReliabilitySummaryProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  uptime?: number;
  supportItems?: ReliabilitySupportItem[];
  statusHref?: string;
  statusLabel?: string;
  className?: string;
};

const DEFAULT_SUPPORT_ITEMS: ReliabilitySupportItem[] = [
  {
    label: "First response",
    value: "Under five minutes",
    description:
      "A real person joins urgent conversations without a long queue.",
    icon: Headphones,
  },
  {
    label: "Active monitoring",
    value: "Every hour of every day",
    description: "Availability and critical paths are watched continuously.",
    icon: Activity,
  },
  {
    label: "Incident follow-up",
    value: "Clear and accountable",
    description:
      "Meaningful incidents receive a plain-language review and next steps.",
    icon: Clock3,
  },
];

export function TrustReliabilitySummary({
  eyebrow = "Reliability and support",
  title = ["Steady when it matters.", "Human when you need help."],
  description = "Dependable infrastructure is only half the promise. Clear communication and thoughtful support keep your team moving when something needs attention.",
  uptime = 99.99,
  supportItems = DEFAULT_SUPPORT_ITEMS,
  statusHref = "#",
  statusLabel = "View live status",
  className,
}: TrustReliabilitySummaryProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const safeItems = supportItems.slice(0, 3);
  const tickerValue = Math.round(uptime * 100);

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <TrustSectionHeading
          align="center"
          description={description}
          eyebrow={eyebrow}
          title={title}
        />

        <div className="mt-14 grid border-border/70 border-y lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            className="relative flex min-h-[31rem] flex-col overflow-hidden py-8 sm:px-8 lg:border-border/60 lg:border-r lg:px-10 lg:py-10"
            initial={
              reduceMotion ? false : { opacity: 0, filter: "blur(8px)", y: 18 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: EASE_OUT,
            }}
            viewport={{ once: true, margin: "-70px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, filter: "blur(0px)", y: 0 }
            }
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-foreground/[0.06] text-muted-foreground dark:bg-foreground/10">
                <ShieldCheck aria-hidden className="size-4" strokeWidth={1.7} />
              </span>
              <div>
                <p className="font-medium text-sm">Service availability</p>
                <p className="mt-0.5 text-muted-foreground text-xs">
                  Measured across the last 30 days
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-end gap-2">
              <NumberTicker
                blur
                className="font-medium text-6xl leading-none tracking-[-0.07em] sm:text-7xl"
                duration={0.75}
                format={(value) => (value / 100).toFixed(2)}
                value={tickerValue}
              />
              <span className="pb-1 font-medium text-2xl text-muted-foreground sm:text-3xl">
                %
              </span>
            </div>
            <p className="mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-6">
              Resilient systems, tested recovery, and careful releases keep
              everyday work available.
            </p>

            <div className="mt-auto pt-10">
              <ReliabilityLine reduceMotion={reduceMotion} />
              <div className="mt-3 flex items-center justify-between text-muted-foreground text-xs">
                <span>30 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </motion.div>

          <div className="flex min-h-[31rem] flex-col py-2 lg:px-8">
            <div className="flex-1">
              {safeItems.map((item, index) => {
                const Icon =
                  item.icon ?? [Headphones, Activity, Clock3][index % 3];

                return (
                  <motion.article
                    className={cn(
                      "grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-5",
                      index > 0 && "border-border/60 border-t",
                    )}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, filter: "blur(6px)", x: 12 }
                    }
                    key={`${item.label}-${item.value}`}
                    transition={{
                      delay: index * 0.08,
                      duration: reduceMotion ? 0 : 0.5,
                      ease: EASE_OUT,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    whileInView={
                      reduceMotion
                        ? undefined
                        : { opacity: 1, filter: "blur(0px)", x: 0 }
                    }
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-foreground/[0.06] text-muted-foreground dark:bg-foreground/10">
                      <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-medium text-muted-foreground text-xs">
                        {item.label}
                      </p>
                      <h3 className="mt-1.5 font-medium text-lg tracking-[-0.025em]">
                        {item.value}
                      </h3>
                      <p className="mt-2 text-pretty text-muted-foreground text-sm leading-6">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="border-border/60 border-t py-6">
              <ButtonLink href={statusHref} size="md" variant="outline">
                {statusLabel}
                <ArrowUpRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReliabilityLine({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg
      className="h-24 w-full overflow-visible text-foreground"
      preserveAspectRatio="none"
      role="presentation"
      viewBox="0 0 640 96"
    >
      <path
        d="M0 72 C70 69 92 76 154 64 S250 57 312 61 S404 32 468 42 S560 24 640 18"
        fill="none"
        opacity="0.12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <motion.path
        d="M0 72 C70 69 92 76 154 64 S250 57 312 61 S404 32 468 42 S560 24 640 18"
        fill="none"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        transition={{
          delay: 0.2,
          duration: reduceMotion ? 0 : 1.1,
          ease: EASE_OUT,
        }}
        viewport={{ once: true, margin: "-60px" }}
        whileInView={
          reduceMotion ? undefined : { pathLength: 1, opacity: 0.78 }
        }
      />
    </svg>
  );
}
