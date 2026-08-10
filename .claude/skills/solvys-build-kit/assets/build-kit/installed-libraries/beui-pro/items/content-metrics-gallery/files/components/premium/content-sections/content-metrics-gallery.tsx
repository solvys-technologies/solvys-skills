"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export type ContentMetricsGalleryItem = {
  metric: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type ContentMetricsGalleryProps = {
  eyebrow?: string;
  title?: string | string[];
  items?: ContentMetricsGalleryItem[];
  className?: string;
};

const DEFAULT_ITEMS: ContentMetricsGalleryItem[] = [
  {
    metric: "42%",
    description: "Less time spent on repeat work.",
    href: "#",
    linkLabel: "Reduce repeat work",
  },
  {
    metric: "3.6x",
    description: "Faster from first brief to final delivery.",
    href: "#",
    linkLabel: "Explore faster workflows",
  },
  {
    metric: "24/7",
    description: "A clear view of every moving part.",
    href: "#",
    linkLabel: "See live visibility",
  },
];

export function ContentMetricsGallery({
  eyebrow = "Built for momentum",
  title = ["Less time managing.", "More time moving."],
  items = DEFAULT_ITEMS,
  className,
}: ContentMetricsGalleryProps) {
  const reduceMotion = useReducedMotion();
  const canHover = useHoverCapable();

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduceMotion ? undefined : { duration: 0.65, ease: EASE_OUT }
          }
          className="max-w-4xl"
        >
          {eyebrow ? (
            <p className="mb-5 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
          ) : null}
        </motion.div>
        <TextReveal
          as="h2"
          blur={10}
          className="max-w-4xl text-balance font-semibold text-4xl leading-[0.94] tracking-[-0.065em] md:text-5xl"
          stagger={0.07}
          text={title}
          whileInView
          yOffset="24%"
        />

        <div className="mt-14 grid gap-3 md:grid-cols-3 lg:mt-20 lg:gap-4">
          {items.slice(0, 3).map((item, index) => (
            <MetricStoryCard
              index={index}
              item={item}
              key={`${item.metric}-${item.description}`}
              reduceMotion={reduceMotion ?? false}
              canHover={canHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricStoryCard({
  item,
  index,
  reduceMotion,
  canHover,
}: {
  item: ContentMetricsGalleryItem;
  index: number;
  reduceMotion: boolean;
  canHover: boolean;
}) {
  return (
    <motion.article
      initial={
        reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }
      }
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 0.65,
              ease: EASE_OUT,
              delay: Math.min(index * 0.09, 0.18),
            }
      }
      className="group relative isolate flex min-h-[32rem] overflow-hidden rounded-[1.4rem] border border-border bg-background p-5 sm:min-h-[35rem] sm:p-6 md:min-h-[31rem] lg:min-h-[36rem]"
    >
      <CardAtmosphere index={index} reduceMotion={reduceMotion} />

      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="font-medium text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-[-0.07em]">
            {item.metric}
          </p>
          {index === 1 ? <CardLink canHover={canHover} item={item} /> : null}
        </div>

        <div className="mt-auto flex items-end justify-between gap-5">
          <p className="max-w-[17rem] text-pretty text-foreground/75 text-sm leading-6">
            {item.description}
          </p>
          {index !== 1 ? <CardLink canHover={canHover} item={item} /> : null}
        </div>
      </div>
    </motion.article>
  );
}

function CardLink({
  item,
  canHover,
}: {
  item: ContentMetricsGalleryItem;
  canHover: boolean;
}) {
  return (
    <ButtonLink
      aria-label={item.linkLabel}
      href={item.href}
      size="icon"
      variant="secondary"
      className="size-12 shrink-0 rounded-full border-transparent bg-foreground text-background hover:bg-foreground/90"
    >
      <ArrowUpRight
        aria-hidden
        className={cn(
          "size-6 transition-transform duration-300",
          canHover &&
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        )}
      />
    </ButtonLink>
  );
}

function CardAtmosphere({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean;
}) {
  if (index === 0) {
    return (
      <ShaderStage>
        <ShaderBackground
          variant="swirl"
          colorBack="#f4d5bf"
          colors={["#fff2df", "#f2ae91", "#d98674"]}
          speed={0.12}
        />
      </ShaderStage>
    );
  }

  if (index === 1) {
    return (
      <ShaderStage drift={!reduceMotion}>
        <ShaderBackground
          variant="waves"
          colorBack="#f4dec8"
          colorFront="#e9a47f"
        />
      </ShaderStage>
    );
  }

  return (
    <ShaderStage>
      <ShaderBackground
        variant="grain-gradient"
        colorBack="#f6e6d3"
        colors={["#f8c7ad", "#ed9e82", "#f5d9b5", "#e6b990"]}
        softness={0.82}
        speed={0.16}
      />
    </ShaderStage>
  );
}

function ShaderStage({
  children,
  drift = false,
}: {
  children: ReactNode;
  drift?: boolean;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        animate={
          drift
            ? {
                x: ["-2%", "2%", "-2%"],
                y: ["1%", "-1%", "1%"],
              }
            : undefined
        }
        transition={
          drift
            ? {
                duration: 12,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
            : undefined
        }
        className="absolute inset-0 scale-[1.08]"
      >
        {children}
      </motion.div>
      <div className="absolute inset-0 bg-background/15 dark:bg-background/55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background/45 to-transparent dark:from-background/65" />
    </div>
  );
}
