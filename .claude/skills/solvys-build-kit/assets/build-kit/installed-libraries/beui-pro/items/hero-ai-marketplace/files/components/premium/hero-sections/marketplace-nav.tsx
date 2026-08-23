"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { SharedLayoutBg } from "@/components/motion/shared-layout-bg";
import { SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Specialists", "Workflows", "Use cases", "Pricing"];

export function MarketplaceNav({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const hero = headerRef.current?.closest("section");
      setScrolled(Boolean(hero && hero.getBoundingClientRect().top < -20));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none sticky top-3 z-30 h-0 px-4 sm:top-4 sm:px-6"
    >
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full px-3 transition-[background-color,backdrop-filter] duration-300 sm:px-4",
          scrolled || open
            ? dark
              ? "bg-[#11182d]/88 backdrop-blur-xl"
              : "bg-white/84 backdrop-blur-xl"
            : "bg-transparent backdrop-blur-none",
        )}
      >
        <a
          href="/"
          className="flex min-h-10 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <span
            className={cn(
              "grid size-7 grid-cols-2 gap-0.5 rounded-[9px] p-1.5",
              dark ? "bg-white text-[#081022]" : "bg-black text-white",
            )}
            aria-hidden="true"
          >
            <span className="rounded-[2px] bg-current opacity-40" />
            <span className="rounded-[2px] bg-[#3d8df5]" />
            <span className="rounded-[2px] bg-current" />
            <span className="rounded-[2px] bg-current opacity-65" />
          </span>
          <span className="font-semibold text-[15px] tracking-[-0.035em]">
            Mira
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Marketplace navigation">
          <SharedLayoutBg
            className="w-auto flex-row items-center gap-0.5"
            inset={0}
            pillClassName={cn(
              "rounded-full",
              dark ? "bg-white/8" : "bg-black/5",
            )}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                  dark
                    ? "text-white/54 hover:text-white"
                    : "text-black/48 hover:text-black",
                )}
              >
                {item}
              </a>
            ))}
          </SharedLayoutBg>
        </nav>

        <div className="flex items-center gap-1">
          <ButtonLink
            href="/signin"
            variant="ghost"
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              dark
                ? "text-white/58 hover:bg-white/7 hover:text-white"
                : "text-black/52 hover:bg-black/5 hover:text-black",
            )}
          >
            Sign in
          </ButtonLink>
          <ButtonLink
            href="#specialists"
            size="sm"
            className={cn(
              "hidden px-4 sm:inline-flex",
              dark
                ? "bg-white text-[#081022] hover:bg-white/86"
                : "bg-black text-white hover:bg-black/82",
            )}
          >
            Explore agents
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="marketplace-mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "relative grid size-10 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden",
              dark
                ? "text-white/72 hover:bg-white/7"
                : "text-black/64 hover:bg-black/5",
            )}
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <motion.span
                animate={
                  open
                    ? { y: 7, rotate: 45, width: 20 }
                    : { y: 3, rotate: 0, width: 20 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                className="absolute left-0 block h-px origin-center bg-current"
              />
              <motion.span
                animate={
                  open
                    ? { y: 7, rotate: -45, width: 20 }
                    : { y: 11, rotate: 0, width: 14 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                className="absolute left-0 block h-px origin-center bg-current"
              />
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.nav
              id="marketplace-mobile-navigation"
              aria-label="Mobile marketplace navigation"
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: -8, scale: 0.985, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={
                reduce
                  ? undefined
                  : { opacity: 0, y: -6, scale: 0.985, filter: "blur(3px)" }
              }
              transition={reduce ? { duration: 0 } : SPRING_PANEL}
              className={cn(
                "absolute top-[calc(100%+8px)] right-0 left-0 origin-top overflow-hidden rounded-[1.35rem] p-2 backdrop-blur-2xl lg:hidden",
                dark ? "bg-[#11182d]/96" : "bg-white/94",
              )}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center rounded-2xl px-3 text-sm transition-colors",
                    dark
                      ? "text-white/64 hover:bg-white/7 hover:text-white"
                      : "text-black/58 hover:bg-black/5 hover:text-black",
                  )}
                >
                  {item}
                </a>
              ))}
              <div className="mt-1 grid grid-cols-2 gap-2">
                <ButtonLink
                  href="/signin"
                  variant="ghost"
                  size="md"
                  className={dark ? "text-white/70" : "text-black/62"}
                >
                  Sign in
                </ButtonLink>
                <ButtonLink
                  href="#specialists"
                  size="md"
                  className={
                    dark
                      ? "bg-white text-[#081022] hover:bg-white/86"
                      : "bg-black text-white hover:bg-black/82"
                  }
                >
                  Explore
                </ButtonLink>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
