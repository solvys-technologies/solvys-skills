"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Bell,
  Check,
  Gauge,
  Route,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const DEFAULT_INTERVAL = 6200;

export type ContentEngagementSequenceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon?: LucideIcon;
  visual?: ReactNode;
};

export type ContentEngagementSequenceProps = {
  title?: string;
  mutedTitle?: string;
  items?: ContentEngagementSequenceItem[];
  defaultItemId?: string;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
};

const DEFAULT_ITEMS: ContentEngagementSequenceItem[] = [
  {
    id: "welcome",
    title: "Guide every first step",
    description:
      "Turn a new signup into a clear, personal path with timely prompts that respond to what each customer has already done.",
    href: "#",
    linkLabel: "Explore guided onboarding",
    icon: Sparkles,
  },
  {
    id: "updates",
    title: "Share updates that matter",
    description:
      "Deliver product news, account alerts, and helpful reminders in the channel and moment most likely to earn attention.",
    href: "#",
    linkLabel: "Explore customer updates",
    icon: Bell,
  },
  {
    id: "journeys",
    title: "Build journeys that adapt",
    description:
      "Connect messages into thoughtful sequences that change course as customers engage, convert, or need more time.",
    href: "#",
    linkLabel: "Explore adaptive journeys",
    icon: Route,
  },
];

export function ContentEngagementSequence({
  title = "Meet customers",
  mutedTitle = "in the moment that matters.",
  items = DEFAULT_ITEMS,
  defaultItemId,
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  className,
}: ContentEngagementSequenceProps) {
  const safeItems = useMemo(() => items.filter((item) => item.id), [items]);
  const initialId =
    safeItems.find((item) => item.id === defaultItemId)?.id ??
    safeItems[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(initialId);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { margin: "120px" });
  const isPageInView = usePageInView();
  const shouldPlay =
    autoPlay &&
    !reduceMotion &&
    isInView &&
    isPageInView &&
    safeItems.length > 1;

  const activeIndex = Math.max(
    0,
    safeItems.findIndex((item) => item.id === activeId),
  );
  const activeItem = safeItems[activeIndex];

  useEffect(() => {
    if (safeItems.length === 0) {
      setActiveId("");
      return;
    }
    if (!safeItems.some((item) => item.id === activeId)) {
      setActiveId(safeItems[0].id);
    }
  }, [activeId, safeItems]);

  useEffect(() => {
    if (!shouldPlay) return;

    const timer = window.setTimeout(() => {
      setActiveId(safeItems[(activeIndex + 1) % safeItems.length].id);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [activeIndex, interval, safeItems, shouldPlay]);

  function selectItem(id: string) {
    setActiveId(id);
  }

  if (!activeItem) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
      ref={sectionRef}
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="max-w-3xl text-balance font-semibold text-4xl leading-[0.96] tracking-[-0.055em] md:text-5xl">
          <TextReveal blur={10} text={title} whileInView yOffset="22%" />
          <TextReveal
            blur={10}
            className="text-muted-foreground/70"
            delay={0.16}
            text={mutedTitle}
            whileInView
            yOffset="22%"
          />
        </h2>

        <div className="mt-12 grid overflow-hidden border border-border/70 sm:mt-14 lg:grid-cols-[1.55fr_0.95fr]">
          <CampaignStage
            activeIndex={activeIndex}
            activeItem={activeItem}
            reduceMotion={reduceMotion}
          />

          <div className="grid min-w-0 border-border/70 border-t lg:grid-rows-3 lg:border-t-0 lg:border-l">
            {safeItems.map((item, index) => {
              const isActive = item.id === activeId;
              const Icon = item.icon ?? [Sparkles, Bell, Route][index % 3];

              return (
                <article
                  className={cn(
                    "relative flex min-h-[13rem] flex-col border-border/70 border-b transition-colors duration-500 last:border-b-0",
                    isActive ? "bg-muted/40" : "bg-background",
                  )}
                  key={item.id}
                >
                  {isActive && shouldPlay ? (
                    <motion.span
                      animate={{ scaleX: 1 }}
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
                      initial={{ scaleX: 0 }}
                      key={item.id}
                      transition={{ duration: interval / 1000, ease: "linear" }}
                    />
                  ) : null}

                  <button
                    aria-pressed={isActive}
                    className="group/row flex w-full flex-1 flex-col px-5 pb-3 pt-5 text-left outline-none transition-colors focus-visible:bg-muted/60 sm:px-6 sm:pt-6"
                    onClick={() => selectItem(item.id)}
                    type="button"
                  >
                    <span className="flex w-full items-center justify-between">
                      <span className="font-medium text-muted-foreground text-xs tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-full transition-colors duration-300",
                          isActive
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground group-hover/row:text-foreground",
                        )}
                      >
                        <Icon
                          aria-hidden
                          className="size-3.5"
                          strokeWidth={1.8}
                        />
                      </span>
                    </span>

                    <span
                      className={cn(
                        "mt-5 font-medium text-lg tracking-[-0.025em] transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/75 group-hover/row:text-foreground",
                      )}
                    >
                      {item.title}
                    </span>
                    <span className="mt-3 max-w-md text-pretty text-muted-foreground text-sm leading-6">
                      {item.description}
                    </span>
                  </button>

                  <ButtonLink
                    className="mb-5 ml-5 w-fit sm:mb-6 sm:ml-6"
                    href={item.href}
                    size="sm"
                    variant={isActive ? "secondary" : "ghost"}
                  >
                    {item.linkLabel}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CampaignStage({
  activeItem,
  activeIndex,
  reduceMotion,
}: {
  activeItem: ContentEngagementSequenceItem;
  activeIndex: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative isolate min-h-[30rem] overflow-hidden bg-muted sm:min-h-[36rem] lg:min-h-[39rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <ShaderBackground
          colorBack="#f2d7b6"
          colors={["#f6e5ca", "#eebf98", "#d9c7ab", "#f4d6b4"]}
          softness={0.88}
          speed={0.12}
          variant="grain-gradient"
        />
        <div className="absolute inset-0 bg-background/10 dark:bg-background/55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,hsl(var(--background)/0.42))]" />
      </div>

      <div className="absolute inset-x-4 top-5 flex items-center justify-between border-border/60 border-b pb-4 text-foreground/70 sm:inset-x-7 sm:top-7">
        <span className="font-medium text-xs uppercase tracking-[0.16em]">
          Customer journey
        </span>
        <span className="text-xs tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} / 03
        </span>
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="absolute inset-x-0 bottom-0 top-16"
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -18, filter: "blur(8px)" }
          }
          initial={
            reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }
          }
          key={activeItem.id}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE_OUT }
          }
        >
          {activeItem.visual ?? (
            <DefaultScene index={activeIndex} reduceMotion={reduceMotion} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DefaultScene({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean;
}) {
  if (index === 1) {
    return <UpdateScene reduceMotion={reduceMotion} />;
  }
  if (index === 2) {
    return <JourneyScene reduceMotion={reduceMotion} />;
  }
  return <WelcomeScene reduceMotion={reduceMotion} />;
}

function WelcomeScene({ reduceMotion }: { reduceMotion: boolean }) {
  const steps = [
    "Create your workspace",
    "Invite your first teammate",
    "Publish your first project",
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-10">
      <div className="w-full max-w-md border border-border/70 bg-background/55 p-5 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
              Getting started
            </p>
            <p className="mt-2 font-semibold text-xl tracking-[-0.035em]">
              Your workspace is ready
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-muted">
            <Sparkles aria-hidden className="size-4" strokeWidth={1.7} />
          </span>
        </div>

        <div className="mt-7 space-y-2">
          {steps.map((step, stepIndex) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 border border-border/65 bg-background/55 px-4 py-3.5 backdrop-blur-md supports-[backdrop-filter]:bg-background/40"
              initial={reduceMotion ? false : { opacity: 0, x: -14 }}
              key={step}
              transition={{
                delay: reduceMotion ? 0 : 0.12 + stepIndex * 0.09,
                duration: reduceMotion ? 0 : 0.45,
                ease: EASE_OUT,
              }}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full border",
                  stepIndex === 0
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground",
                )}
              >
                {stepIndex === 0 ? (
                  <Check aria-hidden className="size-3" strokeWidth={2} />
                ) : (
                  <span className="text-[10px] tabular-nums">
                    {stepIndex + 1}
                  </span>
                )}
              </span>
              <span className="text-sm">{step}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 h-1 overflow-hidden bg-muted">
          <motion.div
            animate={{ scaleX: 0.58 }}
            className="h-full origin-left bg-foreground"
            initial={reduceMotion ? false : { scaleX: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.32,
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE_OUT,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function UpdateScene({ reduceMotion }: { reduceMotion: boolean }) {
  const notifications = [
    {
      label: "Product update",
      title: "The new project view is live",
      meta: "Sent to active teams",
    },
    {
      label: "Account alert",
      title: "Your weekly summary is ready",
      meta: "Delivered by email",
    },
    {
      label: "Helpful reminder",
      title: "Three tasks are waiting for review",
      meta: "Shown inside the workspace",
    },
  ];

  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 px-5 sm:px-12">
      {notifications.map((notification, notificationIndex) => (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={cn(
            "w-full max-w-xl border border-border/70 bg-background/55 p-4 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40 sm:p-5",
            notificationIndex === 1 && "self-end",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
          key={notification.title}
          transition={{
            delay: reduceMotion ? 0 : notificationIndex * 0.1,
            duration: reduceMotion ? 0 : 0.5,
            ease: EASE_OUT,
          }}
        >
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
              <Bell aria-hidden className="size-4" strokeWidth={1.7} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-muted-foreground text-xs">
                  {notification.label}
                </p>
                <span className="shrink-0 text-muted-foreground text-xs">
                  Just now
                </span>
              </div>
              <p className="mt-2 font-medium tracking-[-0.02em]">
                {notification.title}
              </p>
              <p className="mt-1.5 text-muted-foreground text-xs">
                {notification.meta}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function JourneyScene({ reduceMotion }: { reduceMotion: boolean }) {
  const stages = [
    { title: "Welcome sent", meta: "All new accounts", Icon: Sparkles },
    { title: "Intent detected", meta: "Clicked product tour", Icon: Gauge },
    { title: "Follow-up ready", meta: "Personalized by activity", Icon: Route },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-10">
      <div className="w-full max-w-lg border border-border/70 bg-background/55 p-5 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40 sm:p-7">
        <div className="flex items-end justify-between gap-4 border-border/70 border-b pb-5">
          <div>
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
              Active journey
            </p>
            <p className="mt-2 font-semibold text-xl tracking-[-0.035em]">
              New customer path
            </p>
          </div>
          <p className="text-right text-muted-foreground text-xs leading-5">
            68% completed
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {stages.map(({ title, meta, Icon }, stageIndex) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="relative flex items-center gap-4 border border-border/65 bg-background/55 p-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/40"
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              key={title}
              transition={{
                delay: reduceMotion ? 0 : stageIndex * 0.1,
                duration: reduceMotion ? 0 : 0.48,
                ease: EASE_OUT,
              }}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted">
                <Icon aria-hidden className="size-4" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className="font-medium text-sm">{title}</p>
                <p className="mt-1 text-muted-foreground text-xs">{meta}</p>
              </div>
              <span className="ml-auto text-muted-foreground text-xs tabular-nums">
                0{stageIndex + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
