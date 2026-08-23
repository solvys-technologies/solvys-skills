"use client";

import { ArrowLeft, Compass, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { usePageStage } from "./use-page-stage";

/* ─────────────────────────────────────────────────────────
 * WAYFINDER PAGE STORYBOARD
 *
 *    0ms   brand and return action are available
 *   80ms   message and route label rise into view
 *  220ms   map route draws from origin to destination
 *  420ms   waypoints and missing marker settle in
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  content: 80,
  route: 220,
  markers: 420,
} as const;

const STAGES = Object.values(TIMING);

export type NotFoundWayfinderProps = {
  brand?: string;
  homeHref?: string;
  className?: string;
};

export function NotFoundWayfinder({
  brand = "Elsewhere",
  homeHref = "/",
  className,
}: NotFoundWayfinderProps) {
  const { stage, reduce } = usePageStage(STAGES);

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[680px] w-full flex-col overflow-hidden bg-background text-foreground",
        className,
      )}
    >
      <header className="relative z-20 flex min-h-20 items-center justify-between px-5 sm:px-8">
        <a
          href={homeHref}
          className="inline-flex min-h-10 items-center gap-2 font-semibold text-sm focus-visible:outline-2 focus-visible:outline-current"
        >
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <Compass aria-hidden="true" className="size-4" />
          </span>
          {brand}
        </a>
        <span className="font-mono text-[10px] opacity-45 uppercase tracking-[0.18em]">
          404
        </span>
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-10 px-5 pb-8 sm:px-8 lg:flex-row lg:items-end lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            y: stage >= 1 ? 0 : 16,
          }}
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
          className="max-w-xl pb-6 lg:pb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 font-medium text-foreground text-xs">
            <MapPin aria-hidden="true" className="size-3.5" />
            404 · off the map
          </div>
          <h1 className="mt-6 max-w-lg text-balance font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl">
            Wrong turn.
          </h1>
          <ButtonLink
            href={homeHref}
            size="lg"
            className="mt-7 bg-primary text-primary-foreground hover:bg-primary/85"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Go home
          </ButtonLink>
        </motion.div>

        <RouteMap stage={stage} reduce={reduce} />
      </div>
    </section>
  );
}

function RouteMap({ stage, reduce }: { stage: number; reduce: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[1.08] w-full max-w-[570px] shrink-0 overflow-hidden rounded-[36px] bg-muted"
    >
      <svg
        viewBox="0 0 570 530"
        className="absolute inset-0 size-full"
        role="presentation"
      >
        <path
          d="M-30 90C75 115 84 25 190 56C278 82 250 170 355 163C441 158 476 92 612 132"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="34"
        />
        <path
          d="M-20 422C97 389 133 454 226 405C314 358 337 269 440 285C510 296 543 370 610 348"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="48"
        />
        <path
          d="M120 500C128 411 67 350 121 280C170 216 257 246 286 183C320 110 278 66 311 -30"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.06"
          strokeWidth="22"
        />
        <motion.path
          d="M62 420C103 375 91 303 165 285C239 267 274 331 339 281C400 234 367 168 485 112"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="9 13"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: stage >= 2 ? 1 : 0,
            opacity: stage >= 2 ? 1 : 0,
          }}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE_OUT }}
        />
      </svg>

      {[
        { left: "10%", top: "77%", label: "Start" },
        { left: "48%", top: "51%", label: "Here" },
      ].map((marker, index) => (
        <motion.div
          key={marker.label}
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.7,
          }}
          transition={
            reduce ? { duration: 0 } : { ...SPRING_PANEL, delay: index * 0.08 }
          }
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: marker.left, top: marker.top }}
        >
          <span className="block size-3 rounded-full border-[3px] border-background bg-primary ring-4 ring-primary/15" />
          <span className="mt-2 block whitespace-nowrap rounded-full bg-background/80 px-2.5 py-1 font-medium text-foreground text-[10px] backdrop-blur-sm">
            {marker.label}
          </span>
        </motion.div>
      ))}

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{
          opacity: stage >= 3 ? 1 : 0,
          scale: stage >= 3 ? 1 : 0.8,
          rotate: stage >= 3 ? 0 : -8,
        }}
        transition={reduce ? { duration: 0 } : SPRING_PANEL}
        className="absolute right-[10%] top-[14%]"
      >
        <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <MapPin className="size-6" />
        </span>
        <span className="mt-2 block rounded-full bg-primary px-3 py-1.5 text-center font-medium text-[10px] text-primary-foreground">
          404
        </span>
      </motion.div>
    </div>
  );
}
