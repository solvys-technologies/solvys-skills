"use client";

import { BorderBeam } from "border-beam";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/motion/button/base";
import { Marquee } from "@/components/motion/marquee";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type AnnouncementGradientMarqueeProps = {
  messages?: string[];
  href?: string;
  linkLabel?: string;
  speed?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

const DEFAULT_MESSAGES = [
  "Meet the August collection",
  "New blocks for brighter launches",
  "Every release is ready to explore",
];

export function AnnouncementGradientMarquee({
  messages = DEFAULT_MESSAGES,
  href = "#",
  linkLabel = "View the collection",
  speed = 24,
  dismissible = true,
  onDismiss,
  className,
}: AnnouncementGradientMarqueeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const reduceMotion = useReducedMotion() ?? false;
  const safeMessages = messages.filter(Boolean).slice(0, 6);
  const marqueeMessages = Array.from({ length: 3 }, (_, repeatIndex) =>
    safeMessages.map((message, messageIndex) => ({
      hidden: repeatIndex > 0,
      key: `${repeatIndex}-${messageIndex}`,
      message,
    })),
  ).flat();

  if (safeMessages.length === 0) return null;

  function dismiss() {
    setIsOpen(false);
    onDismiss?.();
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.aside
          animate={{ height: "auto", opacity: 1 }}
          aria-label="Announcement"
          className={cn("relative isolate w-full overflow-hidden", className)}
          exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE_OUT }}
        >
          <BorderBeam
            active={!reduceMotion}
            borderRadius={0}
            className="w-full"
            colorVariant="colorful"
            duration={3.8}
            saturation={1}
            size="md"
            strength={0.68}
            theme="auto"
          >
            <div className="relative flex min-h-14 items-center gap-3 bg-background px-3 sm:px-4">
              <Marquee
                className="min-w-0 flex-1"
                fade
                gap="1.5rem"
                pauseOnHover={false}
                speed={speed}
              >
                {marqueeMessages.map(({ hidden, key, message }) => (
                  <span
                    aria-hidden={hidden}
                    className="flex items-center gap-2.5 whitespace-nowrap font-medium text-[13px] text-foreground tracking-[-0.01em] sm:text-sm"
                    key={key}
                  >
                    {message}
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-foreground/55"
                    />
                  </span>
                ))}
              </Marquee>

              <ButtonLink
                className="h-9 shrink-0 border-border/60 bg-secondary px-3"
                href={href}
                size="sm"
                variant="secondary"
              >
                {linkLabel}
                <ArrowRight aria-hidden className="size-3.5" />
              </ButtonLink>

              {dismissible ? (
                <Button
                  aria-label="Dismiss announcement"
                  className="size-10 shrink-0"
                  onClick={dismiss}
                  size="icon"
                  variant="ghost"
                >
                  <X aria-hidden className="size-4" />
                </Button>
              ) : null}
            </div>
          </BorderBeam>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
