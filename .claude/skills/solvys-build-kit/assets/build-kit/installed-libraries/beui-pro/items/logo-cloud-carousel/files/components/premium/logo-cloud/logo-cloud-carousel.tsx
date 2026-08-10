"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { Children, memo, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LOGO_CLOUD_BRANDS,
  type LogoCloudBrand,
  LogoCloudMark,
} from "./logo-cloud-data";

const CYCLE_INTERVAL = 1600;
const STAGGER_DELAY = 0.125;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export type LogosCarouselProps = {
  children: ReactNode;
  columnCount?: number;
  direction?: "ltr" | "rtl";
  className?: string;
};

export type LogoCloudCarouselProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  brands?: LogoCloudBrand[];
  columnCount?: number;
  direction?: "ltr" | "rtl";
  className?: string;
};

export function LogoCloudCarousel({
  eyebrow = "Chosen by focused teams",
  title = "The names change. The standard stays high.",
  subtext = "A rotating view of the teams using one flexible system to ship distinctly their own.",
  brands = DEFAULT_LOGO_CLOUD_BRANDS,
  columnCount = 4,
  direction = "ltr",
  className,
}: LogoCloudCarouselProps) {
  if (brands.length === 0) return null;

  return (
    <section
      className={cn("w-full bg-background px-4 py-20 sm:px-8", className)}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 pb-10 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,0.65fr)] sm:items-end">
          <div>
            {eyebrow ? (
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-4 max-w-2xl text-balance font-semibold text-3xl text-foreground leading-tight tracking-[-0.04em] sm:text-4xl">
                {title}
              </h2>
            ) : null}
          </div>
          {subtext ? (
            <p className="max-w-md text-pretty text-muted-foreground text-sm leading-7 sm:justify-self-end">
              {subtext}
            </p>
          ) : null}
        </div>

        <div>
          <span className="sr-only">
            {brands.map((brand) => brand.name).join(", ")}
          </span>
          <div className="sm:hidden">
            <LogoCarouselRow
              brands={brands}
              columnCount={Math.min(2, columnCount)}
              direction={direction}
            />
          </div>
          <div className="hidden sm:block">
            <LogoCarouselRow
              brands={brands}
              columnCount={columnCount}
              direction={direction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCarouselRow({
  brands,
  columnCount,
  direction,
}: {
  brands: LogoCloudBrand[];
  columnCount: number;
  direction: "ltr" | "rtl";
}) {
  const visibleColumnCount = Math.max(1, Math.min(columnCount, brands.length));

  return (
    <div
      aria-hidden
      className="relative flex h-28 items-center border border-border"
    >
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${visibleColumnCount}, minmax(0, 1fr))`,
        }}
      >
        {brands.slice(0, visibleColumnCount).map((brand) => (
          <span
            className="border-border border-r last:border-r-0"
            key={brand.name}
          />
        ))}
      </div>
      <LogosCarousel
        className="relative z-10 w-full"
        columnCount={visibleColumnCount}
        direction={direction}
      >
        {brands.map((brand) => (
          <LogoCloudMark
            brand={brand}
            className="text-muted-foreground"
            iconClassName="size-5 sm:size-6"
            key={brand.name}
            nameClassName="text-base sm:text-lg"
          />
        ))}
      </LogosCarousel>
    </div>
  );
}

export function LogosCarousel({
  children,
  columnCount = 4,
  direction = "ltr",
  className,
}: LogosCarouselProps) {
  const logos = useMemo(() => Children.toArray(children), [children]);
  const columns = useMemo(
    () => distribute(logos, columnCount),
    [logos, columnCount],
  );
  const reduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const isPageInView = usePageInView();
  const shouldPlay = !reduceMotion && isInView && isPageInView;

  const [indices, setIndices] = useState(() => columns.map(() => 0));

  const columnsRef = useRef(columns);
  columnsRef.current = columns;

  useEffect(() => {
    if (!shouldPlay) return;
    const id = setInterval(() => {
      setIndices((prev) =>
        columnsRef.current.map((col, i) => ((prev[i] ?? 0) + 1) % col.length),
      );
    }, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, [shouldPlay]);

  return (
    <div
      className={cn("grid", className)}
      data-slot="logos-carousel"
      ref={containerRef}
      style={{
        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((col, i) => (
        <LogoColumn
          activeIndex={(indices[i] ?? 0) % col.length}
          delay={
            reduceMotion
              ? 0
              : (direction === "rtl" ? columns.length - 1 - i : i) *
                STAGGER_DELAY
          }
          // biome-ignore lint/suspicious/noArrayIndexKey: these are fixed visual slots, not reordered records
          key={i}
          logos={col}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

const LogoColumn = memo(function LogoColumn({
  logos,
  activeIndex,
  delay,
  reduceMotion,
}: {
  logos: ReactNode[];
  activeIndex: number;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative overflow-hidden" data-slot="logos-carousel-column">
      {/* Invisible spacer — holds the column's natural height so absolutely
          positioned logos don't collapse the grid cell. */}
      <div
        aria-hidden="true"
        className="pointer-events-none invisible select-none"
      >
        {logos[0]}
      </div>

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          animate={{
            opacity: 1,
            y: "0%",
            transition: reduceMotion
              ? { duration: 0 }
              : { ease: EASE, duration: 0.5, delay },
          }}
          className="absolute inset-0 flex items-center justify-center"
          data-slot="logos-carousel-logo"
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: "-60%",
                  transition: { ease: EASE, duration: 0.5, delay },
                }
          }
          initial={reduceMotion ? false : { opacity: 0, y: "60%" }}
          key={activeIndex}
        >
          {logos[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

function distribute(logos: ReactNode[], count: number): ReactNode[][] {
  const n = Math.min(count, logos.length);
  const cols: ReactNode[][] = Array.from({ length: n }, () => []);
  logos.forEach((logo, i) => {
    cols[i % n].push(logo);
  });
  return cols;
}
