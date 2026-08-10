"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type UseCasesCollageStory = {
  id: string;
  label: string;
  title: string;
  description: string;
  note: string;
  icon?: LucideIcon;
};

export type UseCasesStoryCollageProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  stories?: UseCasesCollageStory[];
  defaultStoryId?: string;
  ctaHref?: string;
  ctaLabel?: string;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
};

const DEFAULT_INTERVAL = 4200;

const DEFAULT_STORIES: UseCasesCollageStory[] = [
  {
    id: "listen",
    label: "Listen closely",
    title: "Bring the real customer voice into the room",
    description:
      "Keep the words, examples, and small details that reveal what people actually need instead of reducing everything to a line in a backlog.",
    note: "A better brief begins with the full story",
    icon: MessagesSquare,
  },
  {
    id: "shape",
    label: "Shape together",
    title: "Give every collaborator the same starting point",
    description:
      "Make the intent easy to see so feedback can sharpen the idea rather than pulling it in three different directions.",
    note: "Shared context makes better feedback possible",
    icon: Sparkles,
  },
  {
    id: "remember",
    label: "Remember why",
    title: "Leave a useful story behind every finished decision",
    description:
      "Connect the result back to the need that shaped it, making the next iteration easier for everyone who arrives later.",
    note: "The work stays understandable after launch",
    icon: BookOpenText,
  },
];

export function UseCasesStoryCollage({
  eyebrow = "Use cases",
  title = ["The moments that matter", "deserve the full story."],
  description = "Move through three familiar situations to see how clearer context changes not only the work, but the way people experience making it together.",
  stories = DEFAULT_STORIES,
  defaultStoryId,
  ctaHref = "#",
  ctaLabel = "Explore the stories",
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  className,
}: UseCasesStoryCollageProps) {
  const safeStories = useMemo(
    () => stories.filter((story) => story.id).slice(0, 3),
    [stories],
  );
  const initialId =
    safeStories.find((story) => story.id === defaultStoryId)?.id ??
    safeStories[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(initialId);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { margin: "120px" });
  const isPageInView = usePageInView();
  const activeIndex = Math.max(
    0,
    safeStories.findIndex((story) => story.id === activeId),
  );
  const shouldPlay =
    autoPlay &&
    !reduceMotion &&
    isInView &&
    isPageInView &&
    safeStories.length > 1;

  useEffect(() => {
    if (safeStories.length === 0) {
      setActiveId("");
      return;
    }
    if (!safeStories.some((story) => story.id === activeId)) {
      setActiveId(safeStories[0].id);
    }
  }, [activeId, safeStories]);

  useEffect(() => {
    if (!shouldPlay) return;

    const timer = window.setTimeout(() => {
      setActiveId(safeStories[(activeIndex + 1) % safeStories.length].id);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [activeIndex, interval, safeStories, shouldPlay]);

  if (safeStories.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
      ref={sectionRef}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
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
            className="mt-7 max-w-xl text-balance font-medium text-4xl leading-[0.98] tracking-[-0.05em]"
            stagger={0.06}
            text={title}
            whileInView
            yOffset="24%"
          />

          <motion.p
            className="mt-6 max-w-lg text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7"
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

          <ButtonLink
            className="mt-8 w-fit"
            href={ctaHref}
            size="md"
            variant="secondary"
          >
            {ctaLabel}
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>

        <div className="relative h-[34rem] min-w-0 overflow-hidden rounded-[2rem] bg-muted/50 sm:h-[38rem]">
          <div
            aria-hidden
            className="absolute -top-20 -left-16 size-64 rounded-full bg-primary/8 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute right-10 bottom-10 size-40 rounded-full border border-border/60"
          />

          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
            {safeStories.map((story, index) => {
              const isActive = index === activeIndex;
              const distance = index - activeIndex;
              const Icon =
                story.icon ?? [MessagesSquare, Sparkles, BookOpenText][index];

              return (
                <motion.button
                  animate={
                    reduceMotion
                      ? { opacity: isActive ? 1 : 0.68 }
                      : {
                          x: `${distance * 28}%`,
                          y: Math.abs(distance) * 32,
                          rotate: distance * 5,
                          scale: isActive ? 1 : 0.86,
                          opacity: isActive ? 1 : 0.72,
                        }
                  }
                  aria-pressed={isActive}
                  className="absolute flex min-h-[23rem] w-[78%] max-w-md cursor-pointer flex-col rounded-[1.75rem] border border-border/70 bg-background p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[25rem] sm:p-8"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 48, rotate: distance * 8 }
                  }
                  key={story.id}
                  onClick={() => setActiveId(story.id)}
                  style={{ zIndex: isActive ? 30 : 20 - Math.abs(distance) }}
                  transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
                  type="button"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-medium text-muted-foreground text-xs">
                      {story.label}
                    </span>
                    <span className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
                      <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    </span>
                  </span>

                  <span className="mt-10 block text-balance font-medium text-2xl leading-[1.04] tracking-[-0.04em] sm:text-3xl">
                    {story.title}
                  </span>
                  <span className="mt-5 block text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
                    {story.description}
                  </span>
                  <span className="mt-auto block border-border/60 border-t pt-5 font-medium text-sm">
                    {story.note}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <p className="absolute right-6 bottom-5 z-40 text-muted-foreground text-xs sm:right-8 sm:bottom-7">
            Select a story to bring it forward
          </p>
        </div>
      </div>
    </section>
  );
}
