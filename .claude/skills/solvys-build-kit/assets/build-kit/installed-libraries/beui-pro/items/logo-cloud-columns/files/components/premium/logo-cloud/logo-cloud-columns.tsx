"use client";

import { useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LOGO_CLOUD_BRANDS,
  type LogoCloudBrand,
  LogoCloudMark,
} from "./logo-cloud-data";

const COLUMN_MOTION_STYLES = `
  @keyframes beui-logo-column-scroll {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(0, -50%, 0); }
  }

  .beui-logo-column:hover .beui-logo-column-track {
    animation-play-state: paused;
  }
`;

export type LogoCloudColumnsProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  brands?: LogoCloudBrand[];
  columns?: number;
  className?: string;
};

export function LogoCloudColumns({
  eyebrow = "In good company",
  title = "A living field of teams building what comes next.",
  subtext = "Independent studios, growing products, and global platforms use the same foundation without ending up with the same design.",
  brands = DEFAULT_LOGO_CLOUD_BRANDS,
  columns = 4,
  className,
}: LogoCloudColumnsProps) {
  const reduce = useReducedMotion();
  const columnCount = Math.min(
    Math.max(1, columns),
    Math.max(1, brands.length),
  );

  if (brands.length === 0) return null;

  const lanes = Array.from({ length: columnCount }, (_, laneIndex) =>
    brands.filter((_, brandIndex) => brandIndex % columnCount === laneIndex),
  );

  return (
    <section
      className={cn("w-full bg-background px-4 py-20 sm:px-8", className)}
    >
      <style>{COLUMN_MOTION_STYLES}</style>
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div className="max-w-lg pb-2">
          {eyebrow ? (
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-4 text-balance font-semibold text-3xl text-foreground leading-tight tracking-[-0.04em] sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {subtext ? (
            <p className="mt-5 max-w-md text-pretty text-muted-foreground text-sm leading-7">
              {subtext}
            </p>
          ) : null}
        </div>

        <div
          className="grid h-[420px] grid-cols-2 overflow-hidden border-border border-y [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:h-[380px] sm:[grid-template-columns:repeat(var(--logo-columns),minmax(0,1fr))]"
          style={{ "--logo-columns": columnCount } as CSSProperties}
        >
          {lanes.map((lane, laneIndex) => {
            const direction = laneIndex % 2 === 0 ? "normal" : "reverse";
            return (
              <div
                key={lane.map((brand) => brand.name).join("-")}
                className="beui-logo-column group overflow-hidden border-border border-l odd:border-l-0 hover:bg-muted/20 sm:odd:border-l sm:first:border-l-0"
              >
                <div
                  className="beui-logo-column-track will-change-transform"
                  style={
                    {
                      animationName: reduce
                        ? "none"
                        : "beui-logo-column-scroll",
                      animationDuration: `${22 + laneIndex * 3}s`,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                      animationDirection: direction,
                    } as CSSProperties
                  }
                >
                  {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1 || undefined}>
                      {lane.map((brand) => (
                        <div
                          key={`${copy}-${brand.name}`}
                          className="flex h-[6.5rem] items-center border-border/70 border-b px-3 sm:px-5"
                        >
                          <LogoCloudMark
                            brand={brand}
                            className="text-muted-foreground transition-[color,transform] duration-300 group-hover:text-foreground hover:translate-x-1"
                            iconClassName="size-4 sm:size-5"
                            nameClassName="text-sm sm:text-base"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
