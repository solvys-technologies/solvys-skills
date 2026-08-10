"use client";

import { ArrowUp, Bot, Globe2, Paperclip, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

const SPECIALISTS = [
  "Research the market",
  "Shape a launch plan",
  "Summarize customer calls",
] as const;

const PLACEHOLDERS = [
  "Find the strongest angle in our customer feedback",
  "Turn this research into a decision brief",
  "Build a launch plan the whole team can follow",
] as const;

export function MarketplaceComposer({ dark }: { dark: boolean }) {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || focused || value) return;

    const interval = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % PLACEHOLDERS.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [focused, reduce, value]);

  function submit() {
    if (!value.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative rounded-[1.35rem] p-2.5 text-left backdrop-blur-2xl sm:p-3",
          dark ? "bg-[#11182d]/86" : "bg-white/76",
        )}
      >
        <div className="flex items-center gap-2 px-3 pt-2 pb-1">
          <span
            className={cn(
              "grid size-7 place-items-center rounded-full",
              dark ? "bg-white/8 text-white/70" : "bg-black/5 text-black/62",
            )}
          >
            <Bot className="size-3.5" />
          </span>
          <span
            className={cn(
              "font-medium text-xs",
              dark ? "text-white/52" : "text-black/48",
            )}
          >
            Auto-match a specialist
          </span>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {!value && !focused ? (
              <motion.p
                key={PLACEHOLDERS[placeholderIndex]}
                initial={
                  reduce ? false : { opacity: 0, y: 7, filter: "blur(5px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, y: -5, filter: "blur(4px)" }
                }
                transition={
                  reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }
                }
                className={cn(
                  "pointer-events-none absolute top-4 left-3 max-w-[calc(100%-1.5rem)] text-base leading-6 sm:left-4 sm:text-lg",
                  dark
                    ? "bg-[linear-gradient(90deg,#fff_0%,#a8d6ff_52%,#ffd6b5_100%)] bg-clip-text text-transparent"
                    : "text-black/42",
                )}
              >
                {PLACEHOLDERS[placeholderIndex]}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <textarea
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setSubmitted(false);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            rows={2}
            aria-label="Describe what you want an AI specialist to handle"
            placeholder={focused ? "What should the specialist handle?" : ""}
            className={cn(
              "relative min-h-24 w-full resize-none bg-transparent px-3 pt-4 text-base leading-6 outline-none sm:px-4 sm:text-lg",
              dark
                ? "text-white placeholder:text-white/34"
                : "text-black placeholder:text-black/32",
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-3 px-1 pb-1 sm:px-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Attach a file"
              className={cn(
                "grid size-10 place-items-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                dark
                  ? "text-white/48 hover:bg-white/7 hover:text-white"
                  : "text-black/42 hover:bg-black/5 hover:text-black",
              )}
            >
              <Paperclip className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Search the web"
              className={cn(
                "grid size-10 place-items-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                dark
                  ? "text-white/48 hover:bg-white/7 hover:text-white"
                  : "text-black/42 hover:bg-black/5 hover:text-black",
              )}
            >
              <Globe2 className="size-4" />
            </button>
          </div>

          <Button
            size="md"
            onClick={submit}
            aria-label="Match a specialist"
            className={cn(
              "size-10 px-0",
              dark
                ? "bg-white text-[#081022] hover:bg-white/86"
                : "bg-black text-white hover:bg-black/82",
            )}
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {submitted ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={reduce ? undefined : { opacity: 0, y: 3, height: 0 }}
              transition={reduce ? { duration: 0 } : SPRING_PANEL}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "mx-3 mt-2 flex items-center gap-2 border-t px-0.5 pt-3 pb-1 text-sm",
                  dark
                    ? "border-white/8 text-white/58"
                    : "border-black/7 text-black/54",
                )}
              >
                <Sparkles className="size-4 text-[#3d8df5]" />
                Matching the best specialist for this request.
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {SPECIALISTS.map((specialist) => (
          <button
            key={specialist}
            type="button"
            onClick={() => {
              setValue(specialist);
              setSubmitted(false);
            }}
            className={cn(
              "min-h-9 rounded-full px-3 text-xs backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
              dark
                ? "bg-white/6 text-white/52 hover:bg-white/10 hover:text-white/82"
                : "bg-white/58 text-black/48 hover:bg-white/82 hover:text-black/72",
            )}
          >
            {specialist}
          </button>
        ))}
      </div>
    </div>
  );
}
