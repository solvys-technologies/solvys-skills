"use client";

import { ArrowRight, ArrowUpRight, Sparkles, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/motion/button/base";
import { ChromaticTextReveal } from "@/components/motion/chromatic-text-reveal";
import { ShaderBackground } from "@/components/motion/shader-background";
import { EASE_IN_OUT, EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type AnnouncementShaderLaunchProps = {
  label?: string;
  title?: string | string[];
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

export function AnnouncementShaderLaunch({
  label = "The new collection",
  title = ["Made to", "connect.", "create.", "launch."],
  description = "Meet a considered collection shaped for teams who want the work to feel clearer, calmer, and more distinctly their own.",
  primaryHref = "#",
  primaryLabel = "Explore the release",
  secondaryHref = "#",
  secondaryLabel = "Read the story",
  dismissible = true,
  onDismiss,
  className,
}: AnnouncementShaderLaunchProps) {
  const [isOpen, setIsOpen] = useState(true);
  const reduceMotion = useReducedMotion() ?? false;
  const bannerRef = useRef<HTMLElement>(null);
  const isInView = useInView(bannerRef, { margin: "120px" });
  const isPageInView = usePageInView();
  const shouldPlay = !reduceMotion && isInView && isPageInView;
  const animatedTitle = splitAnimatedTitle(title);

  function dismiss() {
    setIsOpen(false);
    onDismiss?.();
  }

  return (
    <div
      className={cn(
        "w-full bg-background px-4 py-14 sm:px-6 lg:px-8",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.aside
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-label="Featured announcement"
            className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-border/70 bg-background"
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: -10 }
            }
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
            ref={bannerRef}
            transition={reduceMotion ? { duration: 0 } : SPRING_PANEL}
          >
            <div className="relative h-64 overflow-hidden border-border/60 border-b sm:h-72">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <ShaderBackground
                  colorBack="#efd6bc"
                  colors={["#f8e2c9", "#efb089", "#d88772", "#b8d5ce"]}
                  softness={0.84}
                  speed={shouldPlay ? 0.12 : 0}
                  variant="grain-gradient"
                />
                <div className="absolute inset-0 bg-background/10 dark:bg-background/58" />
              </div>

              <motion.span
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                className="absolute top-5 left-5 z-10 inline-flex rounded-full border border-border/55 bg-background/58 px-3 py-1.5 font-medium text-foreground text-xs backdrop-blur-xl"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, filter: "blur(6px)", y: 8 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  ease: EASE_OUT,
                }}
              >
                {label}
              </motion.span>

              <ConnectionVisual shouldPlay={shouldPlay} />

              {dismissible ? (
                <Button
                  aria-label="Dismiss announcement"
                  className="absolute top-4 right-4 z-10 size-10 border border-border/55 bg-background/58 backdrop-blur-xl"
                  onClick={dismiss}
                  size="icon"
                  variant="ghost"
                >
                  <X aria-hidden className="size-4" />
                </Button>
              ) : null}
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-balance font-medium text-3xl leading-[1.02] tracking-[-0.045em]">
                <ChromaticTextReveal
                  className="max-w-full"
                  duration={0.9}
                  pauseDuration={1.15}
                  prefix={animatedTitle.prefix}
                  startOnView={false}
                  words={animatedTitle.words}
                />
              </h2>

              <motion.p
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                className="mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-6"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, filter: "blur(6px)", y: 8 }
                }
                transition={{
                  delay: 0.22,
                  duration: reduceMotion ? 0 : 0.45,
                  ease: EASE_OUT,
                }}
              >
                {description}
              </motion.p>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-7 flex flex-col gap-2.5 sm:flex-row"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                transition={{
                  delay: 0.3,
                  duration: reduceMotion ? 0 : 0.45,
                  ease: EASE_OUT,
                }}
              >
                <ButtonLink
                  className="justify-center sm:flex-1"
                  href={primaryHref}
                  size="md"
                >
                  {primaryLabel}
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink
                  className="justify-center sm:flex-1"
                  href={secondaryHref}
                  size="md"
                  variant="outline"
                >
                  {secondaryLabel}
                  <ArrowUpRight aria-hidden className="size-4" />
                </ButtonLink>
              </motion.div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function splitAnimatedTitle(title: string | string[]) {
  const parts = Array.isArray(title) ? title.filter(Boolean) : [title];

  if (parts.length > 1) {
    return { prefix: parts[0] ?? "", words: parts.slice(1) };
  }

  const words = (parts[0] ?? "").trim().split(/\s+/);
  const animatedWord = words.pop() ?? "";
  return { prefix: words.join(" "), words: [animatedWord] };
}

function ConnectionVisual({ shouldPlay }: { shouldPlay: boolean }) {
  const panels = [
    { rotate: -8, x: -70, y: 10, delay: 0 },
    { rotate: 8, x: 70, y: 10, delay: 0.08 },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-16 bottom-3"
    >
      {panels.map((panel) => (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          key={panel.rotate}
        >
          <motion.div
            animate={
              shouldPlay
                ? {
                    opacity: 1,
                    rotate: [panel.rotate, panel.rotate * 0.78, panel.rotate],
                    x: panel.x,
                    y: [panel.y, panel.y - 5, panel.y],
                  }
                : { opacity: 1, rotate: panel.rotate, x: panel.x, y: panel.y }
            }
            className="flex h-28 w-36 flex-col justify-end gap-2 rounded-[1.35rem] border border-border/55 bg-background/46 p-4 backdrop-blur-xl"
            initial={
              shouldPlay
                ? { opacity: 0, rotate: panel.rotate, x: panel.x, y: 24 }
                : false
            }
            transition={
              shouldPlay
                ? {
                    opacity: {
                      delay: panel.delay,
                      duration: 0.4,
                      ease: EASE_OUT,
                    },
                    rotate: {
                      delay: panel.delay,
                      duration: 5.6,
                      ease: EASE_IN_OUT,
                      repeat: Number.POSITIVE_INFINITY,
                    },
                    x: {
                      delay: panel.delay,
                      duration: 0.5,
                      ease: EASE_OUT,
                    },
                    y: {
                      delay: panel.delay,
                      duration: 5.6,
                      ease: EASE_IN_OUT,
                      repeat: Number.POSITIVE_INFINITY,
                    },
                  }
                : { duration: 0 }
            }
          >
            <span className="h-2 w-3/5 rounded-full bg-foreground/22" />
            <span className="h-2 w-full rounded-full bg-foreground/12" />
            <span className="h-2 w-4/5 rounded-full bg-foreground/12" />
          </motion.div>
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={
            shouldPlay
              ? {
                  opacity: 1,
                  rotate: [0, 2, 0, -2, 0],
                  scale: [1, 1.035, 1],
                }
              : { opacity: 1, rotate: 0, scale: 1 }
          }
          className="grid size-24 place-items-center rounded-[1.75rem] border border-border/60 bg-background/72 text-foreground backdrop-blur-xl"
          initial={shouldPlay ? { opacity: 0, scale: 0.86 } : false}
          transition={
            shouldPlay
              ? {
                  opacity: { duration: 0.4, ease: EASE_OUT },
                  rotate: {
                    duration: 6,
                    ease: EASE_IN_OUT,
                    repeat: Number.POSITIVE_INFINITY,
                  },
                  scale: {
                    duration: 3,
                    ease: EASE_IN_OUT,
                    repeat: Number.POSITIVE_INFINITY,
                  },
                }
              : { duration: 0 }
          }
        >
          <Sparkles aria-hidden className="size-8" strokeWidth={1.55} />
        </motion.div>
      </div>
    </div>
  );
}
