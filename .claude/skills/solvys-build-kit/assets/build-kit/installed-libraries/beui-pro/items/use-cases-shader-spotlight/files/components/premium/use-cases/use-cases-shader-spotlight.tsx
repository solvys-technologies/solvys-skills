"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, Compass, HeartHandshake, Lightbulb } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type UseCasesShaderStory = {
  id: string;
  label: string;
  title: string;
  description: string;
  proof: string;
  icon?: LucideIcon;
};

export type UseCasesShaderSpotlightProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  stories?: UseCasesShaderStory[];
  defaultStoryId?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

const DEFAULT_STORIES: UseCasesShaderStory[] = [
  {
    id: "new-direction",
    label: "Finding the next direction",
    title: "Turn an early signal into something the team can believe in",
    description:
      "Hold the customer need, the open questions, and the strongest idea together until a clear direction begins to emerge.",
    proof: "From scattered instinct to shared conviction",
    icon: Compass,
  },
  {
    id: "customer-care",
    label: "Growing customer trust",
    title: "Make every response feel connected to the person behind it",
    description:
      "Keep the full relationship visible so each answer can feel thoughtful, timely, and consistent with what came before.",
    proof: "Every conversation continues the last one",
    icon: HeartHandshake,
  },
  {
    id: "creative-work",
    label: "Protecting the big idea",
    title: "Carry the original intent through feedback, edits, and launch",
    description:
      "Give every collaborator the same understanding of what makes the work matter, even as the details continue to change.",
    proof: "The final release still feels like the first idea",
    icon: Lightbulb,
  },
];

export function UseCasesShaderSpotlight({
  eyebrow = "Use cases",
  title = ["Different moments.", "One place to find clarity."],
  description = "Choose the moment your team is facing now. Each story shows how a calmer foundation can change the quality of what happens next.",
  stories = DEFAULT_STORIES,
  defaultStoryId,
  ctaHref = "#",
  ctaLabel = "Explore every story",
  className,
}: UseCasesShaderSpotlightProps) {
  const safeStories = useMemo(
    () => stories.filter((story) => story.id).slice(0, 3),
    [stories],
  );
  const initialId =
    safeStories.find((story) => story.id === defaultStoryId)?.id ??
    safeStories[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(initialId);
  const reduceMotion = useReducedMotion() ?? false;
  const activeIndex = Math.max(
    0,
    safeStories.findIndex((story) => story.id === activeId),
  );
  const activeStory = safeStories[activeIndex];

  useEffect(() => {
    if (safeStories.length === 0) {
      setActiveId("");
      return;
    }
    if (!safeStories.some((story) => story.id === activeId)) {
      setActiveId(safeStories[0].id);
    }
  }, [activeId, safeStories]);

  if (!activeStory) return null;

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

        <div className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-5">
          <div className="relative min-h-[29rem] overflow-hidden rounded-[2rem] sm:min-h-[34rem]">
            <ShaderStoryBackdrop
              activeIndex={activeIndex}
              reduceMotion={reduceMotion}
            />
            <div className="absolute inset-0 bg-background/10 dark:bg-background/42" />

            <div
              aria-live="polite"
              className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  className="rounded-[1.5rem] border border-border/60 bg-background/78 p-5 backdrop-blur-xl sm:max-w-xl sm:p-7"
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(8px)", y: -8 }
                  }
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, filter: "blur(8px)", y: 10 }
                  }
                  key={activeStory.id}
                  transition={{
                    duration: reduceMotion ? 0 : 0.42,
                    ease: EASE_OUT,
                  }}
                >
                  <p className="font-medium text-muted-foreground text-xs">
                    {activeStory.label}
                  </p>
                  <h3 className="mt-3 text-balance font-medium text-2xl leading-[1.04] tracking-[-0.04em] sm:text-3xl">
                    {activeStory.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-6">
                    {activeStory.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col rounded-[2rem] border border-border/70 bg-background p-3 sm:p-4">
            <fieldset className="flex min-w-0 flex-1 flex-col border-0 p-0">
              <legend className="sr-only">Choose a use case</legend>
              {safeStories.map((story, index) => {
                const isActive = story.id === activeStory.id;
                const Icon =
                  story.icon ?? [Compass, HeartHandshake, Lightbulb][index];

                return (
                  <button
                    aria-pressed={isActive}
                    className={cn(
                      "group flex min-h-32 flex-1 items-start gap-4 rounded-[1.4rem] p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:p-5",
                      isActive
                        ? "bg-muted/70 text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    key={story.id}
                    onClick={() => setActiveId(story.id)}
                    type="button"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-10 shrink-0 place-items-center rounded-full transition-colors",
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-sm">
                        {story.label}
                      </span>
                      <span className="mt-2 block text-pretty text-xs leading-5 opacity-70">
                        {story.proof}
                      </span>
                    </span>
                  </button>
                );
              })}
            </fieldset>

            <ButtonLink
              className="mt-3 w-full justify-between rounded-[1.4rem]"
              href={ctaHref}
              size="md"
              variant="secondary"
            >
              {ctaLabel}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShaderStoryBackdrop({
  activeIndex,
  reduceMotion,
}: {
  activeIndex: number;
  reduceMotion: boolean;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0"
          exit={{ opacity: 0 }}
          initial={reduceMotion ? false : { opacity: 0 }}
          key={activeIndex}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT }}
        >
          <ShaderScene index={activeIndex} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ShaderScene({ index }: { index: number }) {
  if (index === 1) {
    return (
      <ShaderBackground
        colors={["#d9ede2", "#a7cdb8", "#7ea49b", "#e6d9be"]}
        distortion={0.48}
        speed={0.1}
        swirl={0.3}
        variant="mesh-gradient"
      />
    );
  }

  if (index === 2) {
    return (
      <ShaderBackground
        colorBack="#d9e7ef"
        colors={["#e7eef1", "#afc9d7", "#d7b4a2"]}
        speed={0.1}
        variant="swirl"
      />
    );
  }

  return (
    <ShaderBackground
      colorBack="#f3d7bd"
      colors={["#f8e3cc", "#e9a883", "#d4846f", "#f3c39d"]}
      softness={0.88}
      speed={0.12}
      variant="grain-gradient"
    />
  );
}
