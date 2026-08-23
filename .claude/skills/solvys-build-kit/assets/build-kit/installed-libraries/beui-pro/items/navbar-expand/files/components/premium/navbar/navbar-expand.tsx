"use client";

import { Hexagon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  type Transition,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type RefObject, useId, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

type ExpandLink = { id: string; label: string; href: string };

export type NavbarExpandProps = {
  brand?: string;
  brandHref?: string;
  items?: ExpandLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional scroll container. Omit to follow the page scroll. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
};

const DEFAULT_ITEMS: ExpandLink[] = [
  { id: "features", label: "Features", href: "#features" },
  { id: "agents", label: "Agents", href: "#agents" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "docs", label: "Docs", href: "#docs" },
];

const NAV_RESTING_WIDTH_REM = 40;
const NAV_SCROLLED_WIDTH_REM = 47;
const NAV_EXPAND_SCROLL_DISTANCE = 280;
const NAV_WIDTH_SPRING = {
  stiffness: 170,
  damping: 24,
  mass: 0.8,
} as const;
const NAV_CONTENT_TRANSITION: Transition = {
  type: "spring",
  duration: 0.45,
  bounce: 0.12,
};
const NAV_MENU_TRANSITION = {
  duration: 0.2,
  ease: EASE_OUT,
} as const;

export function NavbarExpand({
  brand = "beUI",
  brandHref = "/",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  ctaHref = "#",
  scrollContainerRef,
  className,
}: NavbarExpandProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const indicatorId = useId();
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [hovered, setHovered] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll(
    scrollContainerRef ? { container: scrollContainerRef } : undefined,
  );
  const rawWidth = useTransform(
    scrollY,
    [0, NAV_EXPAND_SCROLL_DISTANCE],
    [NAV_RESTING_WIDTH_REM, NAV_SCROLLED_WIDTH_REM],
  );
  const smoothWidth = useSpring(rawWidth, NAV_WIDTH_SPRING);
  const navWidth = useMotionTemplate`${smoothWidth}rem`;
  const rawContentOpacity = useTransform(scrollY, [0, 180], [0.82, 1]);
  const contentOpacity = useSpring(rawContentOpacity, NAV_WIDTH_SPRING);
  const rawContentX = useTransform(scrollY, [0, 180], [-4, 0]);
  const contentX = useSpring(rawContentX, NAV_WIDTH_SPRING);
  const target = hovered ?? active;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 12);
  });

  const reducedNavWidth = `${hasScrolled ? NAV_SCROLLED_WIDTH_REM : NAV_RESTING_WIDTH_REM}rem`;

  return (
    <header
      className={cn(
        "pointer-events-none sticky top-0 z-50 w-full px-4 pt-4",
        className,
      )}
    >
      <motion.nav
        aria-label="Primary"
        layoutRoot
        style={{ width: reduce ? reducedNavWidth : navWidth }}
        className="pointer-events-auto mx-auto flex h-12 max-w-[min(calc(100vw-2rem),47rem)] items-center justify-between gap-2 overflow-hidden rounded-full border border-border/50 bg-background/80 px-2 pl-3 backdrop-blur-xl supports-[backdrop-filter]:bg-background/72"
      >
        <a
          href={brandHref}
          className="flex min-w-0 shrink-0 items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Hexagon aria-hidden="true" className="size-4" />
          </span>
          <span className="truncate font-semibold text-foreground text-sm">
            {brand}
          </span>
        </a>

        <motion.div
          style={{
            opacity: reduce ? (hasScrolled ? 1 : 0.82) : contentOpacity,
            x: reduce ? (hasScrolled ? 0 : -4) : contentX,
          }}
          initial={false}
          transition={NAV_CONTENT_TRANSITION}
          className="hidden items-center sm:flex"
          onPointerLeave={() => setHovered(null)}
        >
          {items.map((item) => {
            const selected = target === item.id;
            const external = item.href.startsWith("http");

            return (
              <a
                key={item.id}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                onClick={() => setActive(item.id)}
                onPointerEnter={() => {
                  if (canHover) setHovered(item.id);
                }}
                className={cn(
                  "relative isolate flex h-8 items-center rounded-full px-3.5 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/30",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId={`navbar-expand-indicator-${indicatorId}`}
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-muted"
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                  />
                ) : null}
                {item.label}
              </a>
            );
          })}
        </motion.div>

        <div className="flex shrink-0 items-center gap-1.5">
          <ButtonLink
            href={ctaHref}
            variant="primary"
            size="sm"
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            {ctaLabel}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="grid size-9 place-items-center rounded-full text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                className="absolute top-0 left-0 h-0.5 w-full rounded-full bg-current"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={reduce ? { duration: 0 } : NAV_MENU_TRANSITION}
                className="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
                className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={reduce ? { duration: 0 } : NAV_MENU_TRANSITION}
            className="pointer-events-auto absolute top-[4.25rem] right-4 left-4 mx-auto max-w-md rounded-3xl border border-border/60 bg-background/95 p-2 backdrop-blur-xl sm:hidden"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActive(item.id);
                  setMobileOpen(false);
                }}
                className="block min-h-10 rounded-2xl px-3 py-2.5 font-medium text-foreground text-sm outline-none hover:bg-muted focus-visible:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink
              href={ctaHref}
              variant="primary"
              size="md"
              className="mt-2 w-full rounded-2xl"
            >
              {ctaLabel}
            </ButtonLink>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
