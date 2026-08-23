"use client";

import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { useAnnouncementCycle } from "./use-announcement-cycle";

export type RotatingRibbonAnnouncement = {
  label: string;
  title: string;
  href: string;
  linkLabel: string;
};

export type AnnouncementRotatingRibbonProps = {
  announcements?: RotatingRibbonAnnouncement[];
  autoPlay?: boolean;
  interval?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

const DEFAULT_INTERVAL = 5200;

const DEFAULT_ANNOUNCEMENTS: RotatingRibbonAnnouncement[] = [
  {
    label: "New release",
    title: "The summer collection is ready to explore",
    href: "#",
    linkLabel: "See what is new",
  },
  {
    label: "Early access",
    title: "Join the first group shaping our next chapter",
    href: "#",
    linkLabel: "Request an invite",
  },
  {
    label: "Live session",
    title: "A practical conversation about calmer product work",
    href: "#",
    linkLabel: "Save your place",
  },
];

export function AnnouncementRotatingRibbon({
  announcements = DEFAULT_ANNOUNCEMENTS,
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  dismissible = true,
  onDismiss,
  className,
}: AnnouncementRotatingRibbonProps) {
  const safeAnnouncements = announcements.slice(0, 5);
  const [isOpen, setIsOpen] = useState(true);
  const { activeIndex, containerRef, reduceMotion, shouldPlay } =
    useAnnouncementCycle({
      autoPlay,
      count: safeAnnouncements.length,
      interval,
    });
  const activeAnnouncement = safeAnnouncements[activeIndex];

  if (!activeAnnouncement) return null;

  function dismiss() {
    setIsOpen(false);
    onDismiss?.();
  }

  return (
    <div className={cn("w-full bg-background", className)} ref={containerRef}>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.aside
            animate={{ height: "auto", opacity: 1 }}
            aria-label="Announcements"
            className="relative overflow-hidden bg-foreground text-background"
            exit={{ height: 0, opacity: 0 }}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
          >
            <motion.span
              animate={
                !shouldPlay
                  ? undefined
                  : {
                      transform: [
                        "translate3d(-140%,0,0)",
                        "translate3d(280%,0,0)",
                      ],
                    }
              }
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-background/8 blur-2xl"
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
              }}
            />

            <div className="relative mx-auto flex min-h-16 w-full max-w-7xl items-center gap-3 px-4 py-3 pr-14 sm:px-6 sm:pr-16 lg:px-8">
              <div
                aria-live="polite"
                className="flex min-w-0 flex-1 items-center justify-center gap-3"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, filter: "blur(6px)", y: -8 }
                    }
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, filter: "blur(6px)", y: 8 }
                    }
                    key={`${activeAnnouncement.label}-${activeAnnouncement.title}`}
                    transition={{
                      duration: reduceMotion ? 0 : 0.38,
                      ease: EASE_OUT,
                    }}
                  >
                    <span className="shrink-0 rounded-full bg-background/12 px-2.5 py-1 font-medium text-[11px]">
                      {activeAnnouncement.label}
                    </span>
                    <p className="text-pretty font-medium text-sm leading-5">
                      {activeAnnouncement.title}
                    </p>
                    <ButtonLink
                      className="h-7 shrink-0 border-background/20 bg-background/10 px-2.5 text-background hover:bg-background/15"
                      href={activeAnnouncement.href}
                      size="sm"
                      variant="outline"
                    >
                      {activeAnnouncement.linkLabel}
                      <ArrowRight aria-hidden className="size-3.5" />
                    </ButtonLink>
                  </motion.div>
                </AnimatePresence>
              </div>

              {dismissible ? (
                <Button
                  aria-label="Dismiss announcements"
                  className="absolute right-3 size-10 text-background/65 hover:bg-background/10 hover:text-background sm:right-5"
                  onClick={dismiss}
                  size="icon"
                  variant="ghost"
                >
                  <X aria-hidden className="size-4" />
                </Button>
              ) : null}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
