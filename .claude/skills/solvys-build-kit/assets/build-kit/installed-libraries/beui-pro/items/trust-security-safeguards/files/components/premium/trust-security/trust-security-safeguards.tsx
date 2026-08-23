"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  DatabaseBackup,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { TrustSectionHeading } from "./trust-section-heading";

export type SecuritySafeguard = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type TrustSecuritySafeguardsProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  safeguards?: SecuritySafeguard[];
  securityHref?: string;
  securityLabel?: string;
  className?: string;
};

const DEFAULT_SAFEGUARDS: SecuritySafeguard[] = [
  {
    title: "Private by default",
    description:
      "Access stays scoped to the people and services that genuinely need it.",
    icon: LockKeyhole,
  },
  {
    title: "Strong identity controls",
    description:
      "Single sign-on, multi-factor authentication, and clear session policies.",
    icon: Fingerprint,
  },
  {
    title: "Managed encryption",
    description:
      "Modern encryption protects data while it moves and while it is stored.",
    icon: KeyRound,
  },
  {
    title: "Recoverable by design",
    description:
      "Regular backups and tested recovery plans keep important work available.",
    icon: DatabaseBackup,
  },
];

export function TrustSecuritySafeguards({
  eyebrow = "Security by design",
  title = ["Protection that stays", "quietly in the background."],
  description = "Security should support the work, not interrupt it. Every layer is designed to reduce risk while keeping ordinary moments simple.",
  safeguards = DEFAULT_SAFEGUARDS,
  securityHref = "#",
  securityLabel = "Explore our security approach",
  className,
}: TrustSecuritySafeguardsProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const safeSafeguards = safeguards.slice(0, 4);

  if (safeSafeguards.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <TrustSectionHeading
          description={description}
          eyebrow={eyebrow}
          title={title}
        />

        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-border/65 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--foreground)_7%,transparent),transparent_68%)]"
            initial={
              reduceMotion ? false : { opacity: 0, filter: "blur(8px)", x: -18 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              ease: EASE_OUT,
            }}
            viewport={{ once: true, margin: "-70px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, filter: "blur(0px)", x: 0 }
            }
          >
            <SafeguardVisual reduceMotion={reduceMotion} />
          </motion.div>

          <div className="flex flex-col justify-between">
            <div className="border-border/70 border-y">
              {safeSafeguards.map((safeguard, index) => {
                const Icon =
                  safeguard.icon ??
                  [LockKeyhole, Fingerprint, KeyRound, DatabaseBackup][index];

                return (
                  <motion.article
                    className={cn(
                      "grid gap-4 py-6 sm:grid-cols-[auto_0.72fr_1fr] sm:items-start sm:gap-6",
                      index > 0 && "border-border/60 border-t",
                    )}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, filter: "blur(6px)", y: 12 }
                    }
                    key={safeguard.title}
                    transition={{
                      delay: index * 0.07,
                      duration: reduceMotion ? 0 : 0.5,
                      ease: EASE_OUT,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    whileInView={
                      reduceMotion
                        ? undefined
                        : { opacity: 1, filter: "blur(0px)", y: 0 }
                    }
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-foreground/[0.06] text-muted-foreground dark:bg-foreground/10">
                      <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    </span>
                    <h3 className="font-medium text-base tracking-[-0.02em] sm:pt-2">
                      {safeguard.title}
                    </h3>
                    <p className="max-w-md text-pretty text-muted-foreground text-sm leading-6 sm:pt-1.5">
                      {safeguard.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              className="mt-8"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{
                delay: 0.32,
                duration: reduceMotion ? 0 : 0.45,
                ease: EASE_OUT,
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <ButtonLink href={securityHref} size="md" variant="outline">
                {securityLabel}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SafeguardVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      {[0, 1, 2].map((ring) => (
        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.18, 0.42, 0.18],
                  scale: [1, 1.035, 1],
                }
          }
          aria-hidden
          className="absolute rounded-full border border-border/70"
          key={ring}
          style={{
            width: `${11 + ring * 5}rem`,
            height: `${11 + ring * 5}rem`,
          }}
          transition={{
            delay: ring * 0.22,
            duration: 4.8,
            ease: EASE_IN_OUT,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}

      <motion.div
        animate={
          reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 1.5, 0] }
        }
        className="relative grid size-32 place-items-center rounded-[2rem] border border-border/70 bg-background"
        transition={{
          duration: 4.8,
          ease: EASE_IN_OUT,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <ShieldCheck aria-hidden className="size-12" strokeWidth={1.35} />
      </motion.div>

      <motion.span
        animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
        className="absolute top-[20%] right-[8%] rounded-full border border-border/65 bg-background/80 px-3 py-2 font-medium text-muted-foreground text-xs backdrop-blur-xl sm:right-[14%]"
        transition={{
          duration: 4.2,
          ease: EASE_IN_OUT,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        Access verified
      </motion.span>

      <motion.span
        animate={reduceMotion ? undefined : { x: [0, -4, 0] }}
        className="absolute bottom-[20%] left-[8%] rounded-full border border-border/65 bg-background/80 px-3 py-2 font-medium text-muted-foreground text-xs backdrop-blur-xl sm:left-[14%]"
        transition={{
          delay: 0.4,
          duration: 4.2,
          ease: EASE_IN_OUT,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        Data protected
      </motion.span>
    </div>
  );
}
