"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleDot,
  Focus,
  Layers2,
  MessageCircle,
  SlidersHorizontal,
  Sparkles,
  SwatchBook,
  Type,
  UserRound,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ContentValueGridItem = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ContentValueGridProps = {
  mutedTitle?: string;
  title?: string;
  description?: string;
  items?: ContentValueGridItem[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  footnote?: string;
  className?: string;
};

const DEFAULT_ITEMS: ContentValueGridItem[] = [
  {
    eyebrow: "Shared direction",
    title: "Turn scattered ideas into one clear plan",
    description:
      "Keep the thinking, decisions, and next steps together from the start.",
  },
  {
    eyebrow: "Steady delivery",
    title: "Keep every handoff moving forward",
    description:
      "Give each owner the context they need without another status meeting.",
  },
  {
    eyebrow: "Flexible by design",
    title: "Shape the system around your team",
    description:
      "Start with the way you work today, then adapt it as the team grows.",
  },
];

export function ContentValueGrid({
  mutedTitle = "More tools create noise.",
  title = "Clear systems move work.",
  description = "Give every idea, decision, and handoff a clear place to move forward.",
  items = DEFAULT_ITEMS,
  primaryHref = "#",
  primaryLabel = "Explore the workspace",
  secondaryHref = "#",
  secondaryLabel = "See how teams work",
  footnote = "Bring the process you have. Make it easier to run.",
  className,
}: ContentValueGridProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-balance font-semibold text-4xl md:text-5xl leading-[0.94] tracking-[-0.065em]">
            <TextReveal
              blur={10}
              className="text-muted-foreground/70"
              stagger={0.055}
              text={mutedTitle}
              whileInView
              yOffset="20%"
            />
            <TextReveal
              blur={10}
              className="text-foreground"
              delay={0.18}
              stagger={0.055}
              text={title}
              whileInView
              yOffset="20%"
            />
          </h2>

          <motion.p
            initial={
              reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(7px)" }
            }
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={{ once: true, margin: "-50px" }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.6, delay: 0.55, ease: EASE_OUT }
            }
            className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16">
          {items.slice(0, 3).map((item, index) => (
            <ValueCard
              index={index}
              item={item}
              key={`${item.eyebrow}-${item.title}`}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.55, delay: 0.18, ease: EASE_OUT }
          }
          className="mt-10 flex flex-col items-center"
        >
          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
            <ButtonLink href={primaryHref} size="md" variant="primary">
              {primaryLabel}
              <ArrowUpRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href={secondaryHref} size="md" variant="secondary">
              <BriefcaseBusiness aria-hidden className="size-4" />
              {secondaryLabel}
            </ButtonLink>
          </div>
          <p className="mt-6 text-center text-muted-foreground text-sm">
            {footnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ValueCard({
  item,
  index,
  reduceMotion,
}: {
  item: ContentValueGridItem;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={
        reduceMotion ? false : { opacity: 0, y: 26, filter: "blur(10px)" }
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
              delay: index * 0.09,
              ease: EASE_OUT,
            }
      }
      className="group flex min-h-[29rem] flex-col overflow-hidden rounded-[1.6rem] border border-border/70 bg-background"
    >
      <div className="relative h-64 overflow-hidden border-border/70 border-b bg-background">
        <IllustrationShader index={index} />
        {index === 0 ? (
          <OrbitScene reduceMotion={reduceMotion} />
        ) : index === 1 ? (
          <ToolkitScene reduceMotion={reduceMotion} />
        ) : (
          <PeopleScene reduceMotion={reduceMotion} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
          {item.eyebrow}
        </p>
        <h3 className="mt-3 text-balance font-semibold text-2xl leading-[1.05] tracking-[-0.04em]">
          {item.title}
        </h3>
        <p className="mt-4 text-pretty text-muted-foreground text-sm leading-6">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

function IllustrationShader({ index }: { index: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {index === 0 ? (
        <ShaderBackground
          colorBack="#f5dfca"
          colors={["#f8c9ad", "#e7a68f", "#f6dfbd", "#cf887b"]}
          softness={0.84}
          speed={0.14}
          variant="grain-gradient"
        />
      ) : index === 1 ? (
        <ShaderBackground
          colors={["#dbeafe", "#93c5fd", "#60a5fa", "#2563eb"]}
          distortion={0.5}
          speed={0.14}
          swirl={0.3}
          variant="mesh-gradient"
        />
      ) : (
        <ShaderBackground
          colorBack="#dff3e7"
          colors={["#f0f7d4", "#a8d8b9", "#5ba98c"]}
          speed={0.1}
          variant="swirl"
        />
      )}
      <div className="absolute inset-0 bg-background/15 dark:bg-background/50" />
    </div>
  );
}

function OrbitScene({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes = [
    { Icon: Sparkles, className: "left-[12%] top-[24%]", delay: 0 },
    { Icon: Focus, className: "right-[13%] top-[29%]", delay: 0.35 },
    { Icon: Check, className: "bottom-[18%] left-[48%]", delay: 0.7 },
  ];

  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute left-1/2 top-9 h-72 w-[125%] -translate-x-1/2 rounded-[50%] border border-border/65" />
      <div className="absolute left-1/2 top-24 h-52 w-[92%] -translate-x-1/2 rounded-[50%] border border-border/55" />
      <div className="absolute left-1/2 top-36 h-32 w-[58%] -translate-x-1/2 rounded-[50%] border border-border/45" />
      {nodes.map(({ Icon, className, delay }) => (
        <motion.span
          initial={
            reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-40px" }}
          className={cn(
            "absolute grid size-11 place-items-center rounded-full border border-border/70 bg-background/75 text-foreground backdrop-blur-md",
            className,
          )}
          key={className}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 0.4,
                  delay: 0.12 + delay * 0.25,
                  ease: EASE_OUT,
                }
          }
        >
          <Icon className="size-4.5" strokeWidth={1.65} />
        </motion.span>
      ))}
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 0.35, delay: 0.34, ease: EASE_OUT }
        }
        className="absolute left-[56%] top-[39%] grid size-8 place-items-center rounded-full border border-border/70 bg-foreground text-background"
      >
        <CircleDot className="size-3.5" />
      </motion.span>
    </div>
  );
}

function ToolkitScene({ reduceMotion }: { reduceMotion: boolean }) {
  const tools = [Type, SwatchBook, Layers2];

  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-x-0 top-[36%] h-px bg-border/70" />
      <motion.div
        initial={
          reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
        }
        whileInView={
          reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once: true, margin: "-40px" }}
        className="absolute left-1/2 top-11 flex -translate-x-1/2 gap-3"
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 0.4,
                delay: 0.12,
                ease: EASE_OUT,
              }
        }
      >
        {tools.map((Icon, index) => (
          <span
            className={cn(
              "grid size-14 place-items-center rounded-2xl border border-border/70 bg-background/80 text-foreground backdrop-blur-md",
              index === 1 && "translate-y-2",
            )}
            key={Icon.displayName ?? index}
          >
            <Icon className="size-5" strokeWidth={1.55} />
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={
          reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
        }
        whileInView={
          reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once: true, margin: "-40px" }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 0.4, delay: 0.28, ease: EASE_OUT }
        }
        className="absolute left-1/2 top-[58%] flex -translate-x-1/2 items-center gap-3 rounded-full border border-border/70 bg-background/75 px-4 py-2.5 backdrop-blur-md"
      >
        <span className="size-2.5 rounded-full bg-foreground" />
        <span className="size-2.5 rounded-full border border-foreground/50" />
        <span className="size-2.5 rounded-full bg-muted-foreground/50" />
        <span className="h-4 w-px bg-border" />
        <SlidersHorizontal className="size-4 text-muted-foreground" />
      </motion.div>
      <div className="absolute inset-x-7 bottom-6 flex items-center gap-2">
        <motion.span
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.55, delay: 0.38, ease: EASE_OUT }
          }
          className="h-1.5 flex-1 origin-left rounded-full bg-foreground/75"
        />
        <span className="h-1.5 w-1/4 rounded-full bg-border" />
        <span className="h-1.5 w-1/6 rounded-full bg-border" />
      </div>
    </div>
  );
}

function PeopleScene({ reduceMotion }: { reduceMotion: boolean }) {
  const people = [
    {
      Icon: UserRound,
      className: "left-[10%] top-[43%] size-14",
      iconClassName: "size-5",
      delay: 0.2,
    },
    {
      Icon: MessageCircle,
      className: "left-[42%] top-[14%] size-16",
      iconClassName: "size-6",
      delay: 0.65,
    },
    {
      Icon: Workflow,
      className: "right-[7%] top-[29%] size-24",
      iconClassName: "size-8",
      delay: 0.95,
    },
  ];

  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute left-[17%] top-[49%] h-px w-[66%] -rotate-12 bg-border/70" />
      <div className="absolute left-[46%] top-[28%] h-[45%] w-px rotate-[58deg] bg-border/60" />
      {people.map(({ Icon, className, iconClassName, delay }) => (
        <motion.span
          initial={
            reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-40px" }}
          className={cn(
            "absolute grid place-items-center rounded-full border border-border/70 bg-background/75 text-foreground backdrop-blur-md",
            className,
          )}
          key={className}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 0.4,
                  delay: 0.12 + delay * 0.22,
                  ease: EASE_OUT,
                }
          }
        >
          <Icon className={iconClassName} strokeWidth={1.5} />
        </motion.span>
      ))}
      <motion.span
        initial={
          reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
        }
        whileInView={
          reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once: true, margin: "-40px" }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 0.4, delay: 0.42, ease: EASE_OUT }
        }
        className="absolute bottom-7 left-[32%] flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 text-muted-foreground text-xs backdrop-blur-md"
      >
        <Sparkles className="size-3.5" />
        Built together
      </motion.span>
    </div>
  );
}
