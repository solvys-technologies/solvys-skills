"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, CircleCheck, Layers3, Workflow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export type ContentCapabilityShowcaseItem = {
  label: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon?: LucideIcon;
};

export type ContentCapabilityShowcaseProps = {
  eyebrow?: string;
  title?: string | string[];
  features?: string[];
  items?: ContentCapabilityShowcaseItem[];
  className?: string;
};

const DEFAULT_FEATURES = [
  "Shape ideas with your whole team",
  "Move from planning into production",
  "Keep every handoff clear and visible",
  "Adapt the system as the work changes",
];

const DEFAULT_ITEMS: ContentCapabilityShowcaseItem[] = [
  {
    label: "Shared workspace",
    title: "Plan together",
    description:
      "Turn loose ideas into clear plans without losing the context behind them.",
    href: "#",
    linkLabel: "Explore shared planning",
    icon: Layers3,
  },
  {
    label: "Connected flows",
    title: "Keep work moving",
    description:
      "Connect the steps, owners, and approvals that carry work through delivery.",
    href: "#",
    linkLabel: "Explore connected flows",
    icon: Workflow,
  },
];

export function ContentCapabilityShowcase({
  eyebrow = "One connected system",
  title = ["Made for the way", "your team works."],
  features = DEFAULT_FEATURES,
  items = DEFAULT_ITEMS,
  className,
}: ContentCapabilityShowcaseProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const canHover = useHoverCapable();

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-7xl items-start gap-x-4 gap-y-10 lg:grid-cols-[1.35fr_1fr_1fr]">
        <div className="flex flex-col px-1 py-2 sm:px-2 lg:min-h-[29rem] lg:py-5 lg:pr-8">
          <motion.span
            initial={
              reduceMotion ? false : { opacity: 0, filter: "blur(8px)", y: 8 }
            }
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, filter: "blur(0px)", y: 0 }
            }
            viewport={{ once: true, margin: "-60px" }}
            transition={
              reduceMotion ? undefined : { duration: 0.55, ease: EASE_OUT }
            }
            className="w-fit rounded-full border border-border/70 bg-card px-3 py-1.5 font-medium text-muted-foreground text-xs"
          >
            {eyebrow}
          </motion.span>

          <TextReveal
            as="h2"
            blur={10}
            className="mt-8 text-balance font-semibold text-4xl leading-[0.98] tracking-[-0.055em] md:text-5xl lg:[&>span]:whitespace-nowrap"
            stagger={0.075}
            text={title}
            whileInView
            yOffset="28%"
          />

          <motion.ul
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.55, delay: 0.35, ease: EASE_OUT }
            }
            className="mt-12 space-y-3.5 lg:mt-auto"
          >
            {features.slice(0, 4).map((feature) => (
              <li
                className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                key={feature}
              >
                <CircleCheck
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-foreground"
                  strokeWidth={1.7}
                />
                <span>{feature}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {items.slice(0, 2).map((item, index) => (
          <CapabilityCard
            canHover={canHover}
            index={index}
            item={item}
            key={`${item.title}-${item.label}`}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}

function CapabilityCard({
  item,
  index,
  reduceMotion,
  canHover,
}: {
  item: ContentCapabilityShowcaseItem;
  index: number;
  reduceMotion: boolean;
  canHover: boolean;
}) {
  const Icon = item.icon ?? (index === 0 ? Layers3 : Workflow);

  return (
    <motion.article
      initial={
        reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }
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
              delay: 0.12 + index * 0.1,
              ease: EASE_OUT,
            }
      }
      className="group flex flex-col rounded-[1.5rem] border border-border/70 p-3"
    >
      <div className="relative isolate h-60 overflow-hidden rounded-[1.05rem] border border-border/60 sm:h-64 lg:h-[17rem]">
        <CardShader index={index} />
        <span className="absolute right-4 top-4 rounded-full border border-border/70 bg-background/45 px-3 py-1.5 font-medium text-foreground text-xs backdrop-blur-xl supports-[backdrop-filter]:bg-background/35">
          {item.label}
        </span>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-20 place-items-center rounded-full border border-border/70 bg-background/45 text-foreground backdrop-blur-xl supports-[backdrop-filter]:bg-background/35">
            <Icon aria-hidden className="size-9" strokeWidth={1.45} />
          </span>
        </span>
      </div>

      <div className="flex flex-col p-3 pb-2 pt-5 sm:p-4 sm:pb-3 sm:pt-6">
        <h3 className="font-semibold text-2xl tracking-[-0.035em]">
          {item.title}
        </h3>
        <p className="mt-2.5 max-w-sm text-pretty text-muted-foreground text-sm leading-6 lg:min-h-12">
          {item.description}
        </p>
        <ButtonLink
          aria-label={item.linkLabel}
          className="mt-5 w-fit gap-2 rounded-full"
          href={item.href}
          size="sm"
          variant="secondary"
        >
          Explore
          <ArrowUpRight
            aria-hidden
            className={cn(
              "size-4 transition-transform duration-300",
              canHover &&
                "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            )}
          />
        </ButtonLink>
      </div>
    </motion.article>
  );
}

function CardShader({ index }: { index: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {index === 0 ? (
        <ShaderBackground
          colors={["#f8dfc1", "#de8e75", "#b96f64", "#f1b78f"]}
          distortion={0.62}
          speed={0.18}
          swirl={0.42}
          variant="mesh-gradient"
        />
      ) : (
        <ShaderBackground
          colorBack="#e6c9ba"
          colorFront="#f1a877"
          speed={0.22}
          variant="neuro-noise"
        />
      )}
      <div className="absolute inset-0 bg-background/10 dark:bg-background/35" />
    </div>
  );
}
