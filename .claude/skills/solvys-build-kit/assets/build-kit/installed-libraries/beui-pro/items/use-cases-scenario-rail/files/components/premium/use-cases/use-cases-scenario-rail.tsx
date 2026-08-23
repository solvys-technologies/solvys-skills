"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, Coffee, MessagesSquare, PartyPopper } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type UseCasesScenario = {
  id: string;
  moment: string;
  title: string;
  description: string;
  takeaway: string;
  icon?: LucideIcon;
};

export type UseCasesScenarioRailProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  scenarios?: UseCasesScenario[];
  defaultScenarioId?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

const DEFAULT_SCENARIOS: UseCasesScenario[] = [
  {
    id: "monday",
    moment: "Monday morning",
    title: "Start the week knowing what deserves attention",
    description:
      "See the conversations, decisions, and open questions that matter before the calendar begins to fill itself.",
    takeaway: "A calmer start for the whole team",
    icon: Coffee,
  },
  {
    id: "customer-call",
    moment: "Before the customer call",
    title: "Walk in with the full story, not scattered notes",
    description:
      "Bring the last promise, the latest feedback, and the right next question together so every conversation feels continuous.",
    takeaway: "Customers never have to repeat themselves",
    icon: MessagesSquare,
  },
  {
    id: "launch",
    moment: "Launch afternoon",
    title: "Keep the final mile clear when the pace picks up",
    description:
      "Give every owner the same view of what is ready, what needs care, and what can wait until after the release.",
    takeaway: "Less chasing when it matters most",
    icon: PartyPopper,
  },
];

export function UseCasesScenarioRail({
  eyebrow = "Use cases",
  title = ["There when the day", "asks more from your team."],
  description = "The best tools disappear into the moments people already have. Choose a familiar part of the day to see how the experience changes.",
  scenarios = DEFAULT_SCENARIOS,
  defaultScenarioId,
  ctaHref = "#",
  ctaLabel = "See every use case",
  className,
}: UseCasesScenarioRailProps) {
  const safeScenarios = useMemo(
    () => scenarios.filter((scenario) => scenario.id).slice(0, 4),
    [scenarios],
  );
  const initialId =
    safeScenarios.find((scenario) => scenario.id === defaultScenarioId)?.id ??
    safeScenarios[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(initialId);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (safeScenarios.length === 0) {
      setActiveId("");
      return;
    }
    if (!safeScenarios.some((scenario) => scenario.id === activeId)) {
      setActiveId(safeScenarios[0].id);
    }
  }, [activeId, safeScenarios]);

  if (safeScenarios.length === 0) return null;

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

          <motion.div
            className="max-w-xl lg:justify-self-end"
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
            <p className="text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
              {description}
            </p>
            <ButtonLink
              className="mt-6 w-fit"
              href={ctaHref}
              size="md"
              variant="secondary"
            >
              {ctaLabel}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:mt-16 lg:h-[31rem] lg:flex-row">
          {safeScenarios.map((scenario, index) => {
            const isActive = scenario.id === activeId;
            const Icon =
              scenario.icon ?? [Coffee, MessagesSquare, PartyPopper][index % 3];

            return (
              <motion.article
                className={cn(
                  "relative min-h-[15rem] min-w-0 overflow-hidden rounded-[2rem] border border-border/70 bg-card",
                  isActive ? "lg:flex-[1.7]" : "lg:flex-[0.65]",
                )}
                key={scenario.id}
                layout={!reduceMotion}
                transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
              >
                <button
                  aria-expanded={isActive}
                  className="absolute inset-0 z-20 cursor-pointer rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  onClick={() => setActiveId(scenario.id)}
                  type="button"
                >
                  <span className="sr-only">Show {scenario.moment}</span>
                </button>

                <div className="absolute inset-0 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/8 blur-2xl"
                  />
                  <div
                    aria-hidden
                    className="absolute right-10 bottom-10 size-28 rounded-full border border-border/70"
                  />
                  <div
                    aria-hidden
                    className="absolute right-16 bottom-16 size-16 rounded-full bg-background/80"
                  />
                </div>

                <div className="relative z-10 flex h-full min-h-[15rem] flex-col p-6 sm:p-7 lg:min-h-0 lg:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-muted-foreground text-xs">
                      {scenario.moment}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background text-foreground">
                      <Icon
                        aria-hidden
                        className="size-4.5"
                        strokeWidth={1.7}
                      />
                    </span>
                  </div>

                  <AnimatePresence initial={false} mode="popLayout">
                    {isActive ? (
                      <motion.div
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        className="mt-auto max-w-xl pt-16"
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, filter: "blur(6px)", y: 8 }
                        }
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, filter: "blur(6px)", y: 10 }
                        }
                        key={`${scenario.id}-open`}
                        transition={{
                          duration: reduceMotion ? 0 : 0.35,
                          ease: EASE_OUT,
                        }}
                      >
                        <h3 className="text-balance font-medium text-3xl leading-[1.02] tracking-[-0.045em]">
                          {scenario.title}
                        </h3>
                        <p className="mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
                          {scenario.description}
                        </p>
                        <p className="mt-7 font-medium text-sm">
                          {scenario.takeaway}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.h3
                        animate={{ opacity: 1 }}
                        className="mt-auto max-w-[12rem] text-balance font-medium text-xl leading-[1.05] tracking-[-0.035em]"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        key={`${scenario.id}-closed`}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      >
                        {scenario.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
