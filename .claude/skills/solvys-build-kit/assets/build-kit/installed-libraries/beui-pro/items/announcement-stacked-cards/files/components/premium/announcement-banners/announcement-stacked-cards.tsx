"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Gift,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { useAnnouncementCycle } from "./use-announcement-cycle";

export type StackedCardAnnouncement = {
  label: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon?: LucideIcon;
};

export type AnnouncementStackedCardsProps = {
  announcements?: StackedCardAnnouncement[];
  autoPlay?: boolean;
  interval?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

const DEFAULT_INTERVAL = 4600;

const DEFAULT_ANNOUNCEMENTS: StackedCardAnnouncement[] = [
  {
    label: "Just launched",
    title: "A new collection for the way your team works now",
    description:
      "Explore a thoughtful set of releases shaped around clearer decisions and calmer collaboration.",
    href: "#",
    linkLabel: "Explore the collection",
    icon: Sparkles,
  },
  {
    label: "Community gathering",
    title: "An evening for people building with care",
    description:
      "Join a small live conversation about the choices that make digital products feel considered.",
    href: "#",
    linkLabel: "Reserve a seat",
    icon: CalendarDays,
  },
  {
    label: "A thank-you gift",
    title: "Something special for our earliest supporters",
    description:
      "A limited collection is waiting for the people who helped make the first chapter possible.",
    href: "#",
    linkLabel: "Open your gift",
    icon: Gift,
  },
];

export function AnnouncementStackedCards({
  announcements = DEFAULT_ANNOUNCEMENTS,
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  dismissible = true,
  onDismiss,
  className,
}: AnnouncementStackedCardsProps) {
  const safeAnnouncements = announcements.slice(0, 3);
  const [isOpen, setIsOpen] = useState(true);
  const { activeIndex, containerRef, reduceMotion, setActiveIndex } =
    useAnnouncementCycle({
      autoPlay,
      count: safeAnnouncements.length,
      interval,
    });

  if (safeAnnouncements.length === 0) return null;

  function dismiss() {
    setIsOpen(false);
    onDismiss?.();
  }

  function showPrevious() {
    setActiveIndex(
      (current) =>
        (current - 1 + safeAnnouncements.length) % safeAnnouncements.length,
    );
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % safeAnnouncements.length);
  }

  return (
    <div
      className={cn(
        "w-full bg-background px-4 py-14 sm:px-6 lg:px-8",
        className,
      )}
      ref={containerRef}
    >
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.aside
            animate={{ height: "auto", opacity: 1 }}
            aria-label="Announcements"
            className="mx-auto w-full max-w-4xl overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
          >
            <div className="relative h-[20rem] sm:h-[15rem]">
              {safeAnnouncements.map((announcement, index) => {
                const offset =
                  (index - activeIndex + safeAnnouncements.length) %
                  safeAnnouncements.length;
                const isActive = offset === 0;
                const Icon =
                  announcement.icon ?? [Sparkles, CalendarDays, Gift][index];

                return (
                  <motion.article
                    animate={
                      reduceMotion
                        ? { opacity: isActive ? 1 : 0.55 }
                        : {
                            x: offset * 5,
                            y: offset * 13,
                            scale: 1 - offset * 0.04,
                            opacity: 1 - offset * 0.2,
                          }
                    }
                    className="absolute inset-x-0 top-0 min-h-[17.5rem] origin-top overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-5 sm:min-h-[12rem] sm:p-6"
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }
                    }
                    key={`${announcement.label}-${announcement.title}`}
                    style={{ zIndex: 30 - offset }}
                    transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
                  >
                    {!isActive ? (
                      <button
                        aria-label={`Show announcement: ${announcement.title}`}
                        className="absolute inset-0 cursor-pointer rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      />
                    ) : null}

                    <div
                      aria-hidden={!isActive}
                      aria-live={isActive ? "polite" : undefined}
                      className="relative flex min-h-[13.5rem] flex-col sm:min-h-[9rem]"
                    >
                      <div className="flex items-center gap-3 pr-12">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground/[0.07] text-foreground/65 dark:bg-foreground/10">
                          <Icon
                            aria-hidden
                            className="size-4.5"
                            strokeWidth={1.7}
                          />
                        </span>
                        <p className="font-medium text-muted-foreground text-xs">
                          {announcement.label}
                        </p>
                        <p className="ml-auto font-medium text-muted-foreground text-xs tabular-nums">
                          {index + 1} of {safeAnnouncements.length}
                        </p>
                      </div>

                      <div className="mt-5 min-w-0 flex-1 sm:grid sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
                        <div>
                          <h3 className="max-w-xl text-balance font-medium text-2xl leading-[1.05] tracking-[-0.04em]">
                            {announcement.title}
                          </h3>
                          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground text-sm leading-6">
                            {announcement.description}
                          </p>
                        </div>

                        {isActive ? (
                          <div className="mt-5 flex shrink-0 items-center gap-2 sm:mt-0">
                            <ButtonLink
                              href={announcement.href}
                              size="md"
                              variant="secondary"
                            >
                              {announcement.linkLabel}
                              <ArrowUpRight aria-hidden className="size-4" />
                            </ButtonLink>
                            {safeAnnouncements.length > 1 ? (
                              <div className="flex items-center gap-1">
                                <Button
                                  aria-label="Show previous announcement"
                                  className="size-10"
                                  onClick={showPrevious}
                                  size="icon"
                                  variant="ghost"
                                >
                                  <ArrowLeft aria-hidden className="size-4" />
                                </Button>
                                <Button
                                  aria-label="Show next announcement"
                                  className="size-10"
                                  onClick={showNext}
                                  size="icon"
                                  variant="ghost"
                                >
                                  <ArrowRight aria-hidden className="size-4" />
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {dismissible && isActive ? (
                      <Button
                        aria-label="Dismiss announcements"
                        className="absolute top-3 right-3 size-10 sm:top-4 sm:right-4"
                        onClick={dismiss}
                        size="icon"
                        variant="ghost"
                      >
                        <X aria-hidden className="size-4" />
                      </Button>
                    ) : null}
                  </motion.article>
                );
              })}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
