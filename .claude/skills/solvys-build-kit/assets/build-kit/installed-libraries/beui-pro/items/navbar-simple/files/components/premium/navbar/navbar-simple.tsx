"use client";

import { Hexagon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  type Transition,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { type ReactNode, type RefObject, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type SimpleNavItem = {
  id: string;
  label: string;
  href: string;
};

export type NavbarSimpleProps = {
  brand?: string;
  brandHref?: string;
  brandMark?: ReactNode;
  items?: SimpleNavItem[];
  activeId?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional scroll container. Omit to follow the page scroll. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
};

const DEFAULT_ITEMS: SimpleNavItem[] = [
  { id: "product", label: "Product", href: "#product" },
  { id: "solutions", label: "Solutions", href: "#solutions" },
  { id: "resources", label: "Resources", href: "#resources" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
];

const MENU_TRANSITION: Transition = {
  duration: 0.2,
  ease: EASE_OUT,
};

export function NavbarSimple({
  brand = "beUI",
  brandHref = "/",
  brandMark,
  items = DEFAULT_ITEMS,
  activeId,
  ctaLabel = "Get started",
  ctaHref = "#",
  scrollContainerRef,
  className,
}: NavbarSimpleProps) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [internalActive, setInternalActive] = useState(
    activeId ?? items[0]?.id ?? "",
  );
  const currentActive = activeId ?? internalActive;
  const { scrollY } = useScroll(
    scrollContainerRef ? { container: scrollContainerRef } : undefined,
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  const selectItem = (id: string) => {
    if (activeId === undefined) setInternalActive(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "pointer-events-none sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || mobileOpen
          ? "border-border/55 border-b bg-background/78 backdrop-blur-xl supports-[backdrop-filter]:bg-background/72"
          : "border-transparent border-b bg-transparent",
        className,
      )}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-5 px-4 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-7">
          <a
            href={brandHref}
            className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-md font-semibold text-foreground text-sm tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
          >
            {brandMark ?? (
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-foreground text-background">
                <Hexagon aria-hidden="true" className="size-4" />
              </span>
            )}
            <span className="truncate">{brand}</span>
          </a>

          <div className="hidden items-center md:flex">
            {items.map((item) => {
              const external = item.href.startsWith("http");
              const active = currentActive === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => selectItem(item.id)}
                  className={cn(
                    "flex min-h-10 items-center rounded-md px-3 font-medium text-sm outline-none transition-colors focus-visible:bg-muted",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <ButtonLink
            href={ctaHref}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {ctaLabel}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="grid size-10 place-items-center text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 md:hidden"
          >
            <span className="relative block h-3.5 w-4.5">
              <motion.span
                initial={false}
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                className="absolute top-0 left-0 h-px w-full bg-current"
              />
              <motion.span
                initial={false}
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                  scaleX: mobileOpen ? 0.5 : 1,
                }}
                transition={reduce ? { duration: 0 } : MENU_TRANSITION}
                className="absolute top-1.5 left-0 h-px w-full bg-current"
              />
              <motion.span
                initial={false}
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                className="absolute bottom-0 left-0 h-px w-full bg-current"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={reduce ? { duration: 0 } : MENU_TRANSITION}
            className="pointer-events-auto absolute inset-x-0 top-full border-border/55 border-b bg-background/96 px-4 py-3 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1">
              {items.map((item, index) => {
                const active = currentActive === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => selectItem(item.id)}
                    initial={reduce ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            duration: 0.18,
                            delay: index * 0.025,
                            ease: EASE_OUT,
                          }
                    }
                    className={cn(
                      "flex min-h-11 items-center rounded-lg px-3 font-medium text-sm outline-none transition-colors focus-visible:bg-muted",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <ButtonLink
                href={ctaHref}
                variant="primary"
                size="md"
                className="mt-2 w-full sm:hidden"
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
