"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Heart, MessageCircleMore, Sunrise } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type UseCasesOutcomeStory = {
  label: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
  linkLabel: string;
  icon?: LucideIcon;
};

export type UseCasesOutcomeStoriesProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  stories?: UseCasesOutcomeStory[];
  className?: string;
};

const DEFAULT_STORIES: UseCasesOutcomeStory[] = [
  {
    label: "For growing teams",
    title: "Make decisions while the context is still fresh",
    description:
      "Bring requests, conversations, and tradeoffs into one clear view so the next move feels obvious instead of rushed.",
    outcome: "Decide with confidence",
    href: "#",
    linkLabel: "Explore team planning",
    icon: Sunrise,
  },
  {
    label: "For customer teams",
    title: "Give every customer an answer that feels personal",
    description:
      "Keep the full story close at hand, respond with care, and make each follow-up feel like a continuation rather than a restart.",
    outcome: "Turn support into trust",
    href: "#",
    linkLabel: "Explore customer care",
    icon: Heart,
  },
  {
    label: "For creative teams",
    title: "Protect the idea through every round of feedback",
    description:
      "Hold onto the original intent while reviews, approvals, and handoffs move forward around a shared understanding.",
    outcome: "Keep the work coherent",
    href: "#",
    linkLabel: "Explore creative reviews",
    icon: MessageCircleMore,
  },
];

export function UseCasesOutcomeStories({
  eyebrow = "Use cases",
  title = ["Less friction around the work.", "More room for the work itself."],
  description = "Different teams arrive with different needs. Each story starts with the moment they want to make simpler and ends with an outcome people can feel.",
  stories = DEFAULT_STORIES,
  className,
}: UseCasesOutcomeStoriesProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const safeStories = stories.slice(0, 3);

  if (safeStories.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            className="inline-flex rounded-full border border-border/70 bg-card px-3 py-1.5 font-medium text-muted-foreground text-xs"
            initial={
              reduceMotion ? false : { opacity: 0, filter: "blur(5px)", y: 8 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
            viewport={{ once: true, margin: "-50px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, filter: "blur(0px)", y: 0 }
            }
          >
            {eyebrow}
          </motion.span>

          <TextReveal
            as="h2"
            blur={10}
            className="mt-7 text-balance font-medium text-4xl leading-[0.98] tracking-[-0.05em]"
            stagger={0.06}
            text={title}
            whileInView
            yOffset="24%"
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7"
            initial={
              reduceMotion ? false : { opacity: 0, filter: "blur(6px)", y: 10 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: 0.26,
              ease: EASE_OUT,
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, filter: "blur(0px)", y: 0 }
            }
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 sm:mt-16 lg:gap-5">
          {safeStories.map((story, index) => {
            const Icon =
              story.icon ?? [Sunrise, Heart, MessageCircleMore][index];

            return (
              <motion.article
                className={cn(
                  "group flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-background p-3",
                  index === 1 && "md:mt-10",
                )}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, filter: "blur(8px)", y: 18 }
                }
                key={`${story.label}-${story.title}`}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: EASE_OUT,
                }}
                viewport={{ once: true, margin: "-60px" }}
                whileInView={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, filter: "blur(0px)", y: 0 }
                }
              >
                <OutcomePortrait
                  index={index}
                  Icon={Icon}
                  reduceMotion={reduceMotion}
                />

                <div className="flex flex-1 flex-col px-4 pt-6 pb-5 sm:px-5 sm:pb-6">
                  <p className="font-medium text-muted-foreground text-xs">
                    {story.label}
                  </p>
                  <h3 className="mt-3 text-pretty font-medium text-2xl leading-[1.04] tracking-[-0.04em]">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-pretty text-muted-foreground text-sm leading-6">
                    {story.description}
                  </p>

                  <div className="mt-8 border-border/60 border-t pt-5">
                    <p className="font-medium text-base tracking-[-0.02em]">
                      {story.outcome}
                    </p>
                    <ButtonLink
                      className="mt-5 w-fit"
                      href={story.href}
                      size="sm"
                      variant="ghost"
                    >
                      {story.linkLabel}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </ButtonLink>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OutcomePortrait({
  index,
  Icon,
  reduceMotion,
}: {
  index: number;
  Icon: LucideIcon;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-52 overflow-hidden rounded-[1.4rem] bg-muted/55">
      <motion.div
        aria-hidden
        className={cn(
          "absolute rounded-full border border-border/60 bg-background/70",
          index === 0 && "top-8 left-8 size-28",
          index === 1 && "top-12 right-7 size-32",
          index === 2 && "top-7 left-1/2 size-36 -translate-x-1/2",
        )}
        initial={reduceMotion ? false : { scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
      />
      <div
        aria-hidden
        className={cn(
          "absolute rounded-full bg-primary/8 blur-xl",
          index === 0 && "right-5 bottom-4 size-32",
          index === 1 && "bottom-2 left-4 size-36",
          index === 2 && "right-4 bottom-6 size-28",
        )}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-14 place-items-center rounded-full bg-background text-foreground">
          <Icon aria-hidden className="size-6" strokeWidth={1.6} />
        </span>
      </div>
    </div>
  );
}
