"use client";

import { ArrowUpRight, CornerUpLeft } from "lucide-react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { usePageStage } from "./use-page-stage";

/* ─────────────────────────────────────────────────────────
 * EDITORIAL PAGE STORYBOARD
 *
 *    0ms   masthead and home link are available
 *   70ms   issue marker and copy enter
 *  180ms   oversized numerals rise independently
 *  340ms   footer note and secondary action resolve
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  copy: 70,
  numerals: 180,
  footer: 340,
} as const;

const STAGES = Object.values(TIMING);
const DIGITS = [
  { id: "hundreds", value: "4" },
  { id: "tens", value: "0" },
  { id: "ones", value: "4" },
] as const;

export type NotFoundEditorialProps = {
  publication?: string;
  homeHref?: string;
  archiveHref?: string;
  className?: string;
};

export function NotFoundEditorial({
  publication = "Field Notes",
  homeHref = "/",
  archiveHref = "/archive",
  className,
}: NotFoundEditorialProps) {
  const { stage, reduce } = usePageStage(STAGES);

  return (
    <section
      className={cn(
        "flex min-h-[680px] w-full flex-col overflow-hidden bg-background text-foreground",
        className,
      )}
    >
      <header className="flex min-h-20 items-center justify-between border-border/60 border-b px-5 sm:px-8">
        <a
          href={homeHref}
          className="font-serif text-xl tracking-[-0.03em] focus-visible:outline-2 focus-visible:outline-ring"
        >
          {publication}
        </a>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          Vol. 404 · Missing
        </span>
      </header>

      <div className="grid flex-1 grid-rows-[auto_1fr] lg:grid-cols-[0.38fr_0.62fr] lg:grid-rows-1">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            x: stage >= 1 ? 0 : -16,
          }}
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
          className="flex flex-col justify-between border-border/60 border-b p-6 sm:p-10 lg:border-r lg:border-b-0 lg:p-12"
        >
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              Page 404
            </p>
            <h1 className="mt-6 max-w-sm text-balance font-serif text-4xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              The page you wanted was edited out.
            </h1>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={homeHref} size="lg">
              <CornerUpLeft aria-hidden="true" className="size-4" />
              Return home
            </ButtonLink>
            <ButtonLink href={archiveHref} size="lg" variant="outline">
              Browse archive
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </motion.div>

        <div className="relative flex min-h-[380px] items-end overflow-hidden bg-primary px-3 pt-10 text-primary-foreground [container-type:inline-size] sm:min-h-[470px] sm:px-6 lg:min-h-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--primary-foreground)_22%,transparent)_1px,transparent_1px)] [background-size:25%_100%]"
          />
          <div className="relative flex w-full items-end justify-between overflow-hidden">
            {DIGITS.map((digit, index) => (
              <motion.span
                key={digit.id}
                initial={reduce ? false : { opacity: 0, y: "26%" }}
                animate={{
                  opacity: stage >= 2 ? 1 : 0,
                  y: stage >= 2 ? 0 : "26%",
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { ...SPRING_PANEL, delay: index * 0.06 }
                }
                className="font-serif text-[50cqw] leading-[0.66] tracking-[-0.12em]"
              >
                {digit.value}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="absolute right-5 top-5 max-w-36 text-right font-mono text-[9px] text-primary-foreground/60 uppercase leading-5 tracking-[0.16em] sm:right-8 sm:top-8"
          >
            Missing page
          </motion.div>
        </div>
      </div>
    </section>
  );
}
