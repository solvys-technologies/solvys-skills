"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  HeartHandshake,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type UseCasesRoleStory = {
  id: string;
  label: string;
  title: string;
  description: string;
  highlight: string;
  quote: string;
  person: string;
  personRole: string;
  icon?: LucideIcon;
};

export type UseCasesRoleStoriesProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  stories?: UseCasesRoleStory[];
  defaultStoryId?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

const DEFAULT_STORIES: UseCasesRoleStory[] = [
  {
    id: "founders",
    label: "Founders",
    title: "Move from a promising idea to a decision you trust",
    description:
      "Keep the customer signal, the tradeoffs, and the next move together so momentum never comes at the cost of clarity.",
    highlight: "More signal. Less second-guessing.",
    quote:
      "We stopped reopening the same decision every week. The reason behind it was finally as visible as the work itself.",
    person: "Mara Chen",
    personRole: "Founder at Daylight",
    icon: BriefcaseBusiness,
  },
  {
    id: "product-teams",
    label: "Product teams",
    title: "Keep the customer close to every product decision",
    description:
      "Turn scattered feedback into a shared story your team can carry from discovery through launch without losing the original need.",
    highlight: "One shared story from request to release.",
    quote:
      "Everyone sees the same context now. Reviews are shorter, handoffs are calmer, and the final product feels much more intentional.",
    person: "Noah Williams",
    personRole: "Product lead at Common Ground",
    icon: UsersRound,
  },
  {
    id: "client-teams",
    label: "Client teams",
    title: "Make every handoff feel thoughtful and complete",
    description:
      "Give clients a clear view of what changed, why it changed, and what comes next without adding another round of status meetings.",
    highlight: "Clear expectations. Fewer follow-ups.",
    quote:
      "Clients feel included without living inside our process. That balance has made the work better on both sides.",
    person: "Elena Ortiz",
    personRole: "Creative director at Northstar",
    icon: HeartHandshake,
  },
];

export function UseCasesRoleStories({
  eyebrow = "Use cases",
  title = ["Made for the people", "moving the work forward."],
  description = "See how different teams use the same calm foundation to make clearer decisions, stay close to customers, and deliver work with confidence.",
  stories = DEFAULT_STORIES,
  defaultStoryId,
  ctaHref = "#",
  ctaLabel = "Find your use case",
  className,
}: UseCasesRoleStoriesProps) {
  const safeStories = useMemo(
    () => stories.filter((story) => story.id).slice(0, 4),
    [stories],
  );
  const initialId =
    safeStories.find((story) => story.id === defaultStoryId)?.id ??
    safeStories[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(initialId);
  const reduceMotion = useReducedMotion() ?? false;
  const activeStory =
    safeStories.find((story) => story.id === activeId) ?? safeStories[0];

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
  const ActiveIcon = activeStory.icon ?? BriefcaseBusiness;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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
              className="mt-7 max-w-3xl text-balance font-medium text-4xl leading-[0.98] tracking-[-0.05em]"
              stagger={0.06}
              text={title}
              whileInView
              yOffset="24%"
            />
          </div>

          <motion.p
            className="max-w-xl text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7 lg:justify-self-end"
            initial={
              reduceMotion ? false : { opacity: 0, filter: "blur(6px)", y: 10 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: 0.25,
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

        <fieldset className="mt-12 flex min-w-0 max-w-full gap-2 overflow-x-auto border-0 p-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-14">
          <legend className="sr-only">Choose a team</legend>
          {safeStories.map((story) => {
            const isActive = story.id === activeStory.id;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "min-h-10 shrink-0 rounded-full px-4 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
                key={story.id}
                onClick={() => setActiveId(story.id)}
                type="button"
              >
                {story.label}
              </button>
            );
          })}
        </fieldset>

        <div
          aria-live="polite"
          className="relative mt-4 overflow-hidden rounded-[2rem] bg-muted/60"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              className="grid min-h-[31rem] gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-12"
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
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE_OUT }}
            >
              <div className="flex min-w-0 flex-col justify-center">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-background text-foreground">
                  <ActiveIcon
                    aria-hidden
                    className="size-5"
                    strokeWidth={1.7}
                  />
                </span>
                <h3 className="mt-8 max-w-xl text-balance font-medium text-3xl leading-[1.02] tracking-[-0.045em]">
                  {activeStory.title}
                </h3>
                <p className="mt-5 max-w-lg text-pretty text-muted-foreground text-sm leading-7 sm:text-base">
                  {activeStory.description}
                </p>
                <p className="mt-8 font-medium text-lg tracking-[-0.02em]">
                  {activeStory.highlight}
                </p>
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

              <RoleStoryPortrait story={activeStory} />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function RoleStoryPortrait({ story }: { story: UseCasesRoleStory }) {
  return (
    <div className="relative flex min-h-[18rem] items-end overflow-hidden rounded-[1.5rem] bg-background p-5 sm:p-7 lg:min-h-0">
      <div
        aria-hidden
        className="absolute -top-14 -right-10 size-52 rounded-full bg-primary/8 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute top-16 left-8 size-32 rounded-full border border-border/60"
      />
      <div
        aria-hidden
        className="absolute top-28 left-24 size-44 rounded-full bg-muted"
      />

      <blockquote className="relative z-10 w-full rounded-[1.35rem] border border-border/60 bg-background/80 p-5 backdrop-blur-md sm:p-6">
        <p className="text-pretty font-medium text-lg leading-7 tracking-[-0.02em] sm:text-xl sm:leading-8">
          “{story.quote}”
        </p>
        <footer className="mt-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-foreground font-medium text-background text-sm">
            {story.person
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span>
            <span className="block font-medium text-sm">{story.person}</span>
            <span className="mt-0.5 block text-muted-foreground text-xs">
              {story.personRole}
            </span>
          </span>
        </footer>
      </blockquote>
    </div>
  );
}
