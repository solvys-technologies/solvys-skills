"use client";

import { ChevronDown, Hexagon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

type MenuLink = {
  title: string;
  desc: string;
  href: string;
};

type NavItem = {
  id: string;
  label: string;
  href?: string;
  menu?: MenuLink[];
  /** Dropdown column count — drives the panel width. */
  cols?: 1 | 2;
};

export type NavbarMorphProps = {
  brand?: string;
  items?: NavItem[];
  signInLabel?: string;
  signInHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

const DEFAULT_ITEMS: NavItem[] = [
  {
    id: "product",
    label: "Product",
    cols: 2,
    menu: [
      {
        title: "Components",
        desc: "Motion primitives and controls",
        href: "#",
      },
      { title: "Blocks", desc: "Composed marketing sections", href: "#" },
      { title: "Templates", desc: "Full pages, ready to ship", href: "#" },
      {
        title: "Agent kit",
        desc: "Chat, tools, streaming surfaces",
        href: "#",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    cols: 1,
    menu: [
      { title: "Docs", desc: "Install and usage guides", href: "#" },
      { title: "Changelog", desc: "What shipped this week", href: "#" },
      { title: "Guides", desc: "Patterns and deep dives", href: "#" },
      { title: "Showcase", desc: "Sites built with beUI", href: "#" },
    ],
  },
  { id: "pricing", label: "Pricing", href: "#" },
  { id: "customers", label: "Customers", href: "#" },
];

export function NavbarMorph({
  brand = "beUI",
  items = DEFAULT_ITEMS,
  signInLabel = "Sign in",
  signInHref = "#",
  ctaLabel = "Get started",
  ctaHref = "#",
  className,
}: NavbarMorphProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const innerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [navPill, setNavPill] = useState({ x: 0, w: 0, show: false });
  const [drop, setDrop] = useState({ x: 0, y: 0, w: 0, h: 0, show: false });
  const [left, setLeft] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hover pill inside the dropdown — measured relative to the panel content.
  const moveDrop = (el: HTMLElement) => {
    const c = dropRef.current;
    if (!c) return;
    const r = el.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    setDrop({
      x: r.left - cr.left,
      y: r.top - cr.top,
      w: r.width,
      h: r.height,
      show: true,
    });
  };

  const litPill = (id: string, el: HTMLElement) => {
    setHoveredNav(id);
    const nav = navRef.current;
    if (!nav) return;
    const r = el.getBoundingClientRect();
    const nr = nav.getBoundingClientRect();
    setNavPill({ x: r.left - nr.left, w: r.width, show: true });
  };

  const open = (id: string, el: HTMLElement) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const inner = innerRef.current;
    if (inner) {
      const l =
        el.getBoundingClientRect().left - inner.getBoundingClientRect().left;
      setLeft(l);
    }
    // Reset the dropdown hover pill when the menu changes.
    if (id !== active) setDrop((p) => ({ ...p, show: false }));
    setActive(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 90);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const activeItem = items.find((i) => i.id === active && i.menu);

  return (
    <section className={cn("w-full px-4 pt-6 sm:px-8", className)}>
      <header className="relative mx-auto w-full max-w-5xl">
        <div
          ref={innerRef}
          className="relative flex h-14 items-center justify-between rounded-full border border-border/60 bg-background/50 px-3 backdrop-blur-md sm:px-4"
        >
          {/* Brand. */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-lg px-1 font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            <span className="grid size-7 place-items-center rounded-lg bg-foreground text-background">
              <Hexagon className="size-4" />
            </span>
            {brand}
          </a>

          {/* Desktop nav with a self-measured sliding hover pill. */}
          <nav
            ref={navRef}
            className="-translate-x-1/2 absolute left-1/2 hidden items-center gap-1 lg:flex"
            onPointerLeave={() => {
              setHoveredNav(null);
              setNavPill((p) => ({ ...p, show: false }));
              if (canHover) scheduleClose();
            }}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute top-0.5 bottom-0.5 left-0 rounded-full bg-muted"
              initial={false}
              animate={
                reduce
                  ? { opacity: navPill.show ? 1 : 0 }
                  : {
                      x: navPill.x,
                      width: navPill.w,
                      opacity: navPill.show ? 1 : 0,
                    }
              }
              transition={reduce ? { duration: 0 } : SPRING_PANEL}
            />
            {items.map((item) => {
              const lit = (hoveredNav ?? active) === item.id;
              return item.menu ? (
                <button
                  key={item.id}
                  type="button"
                  onPointerEnter={(e) => {
                    litPill(item.id, e.currentTarget);
                    if (canHover) open(item.id, e.currentTarget);
                  }}
                  onClick={(e) => {
                    if (active === item.id) setActive(null);
                    else open(item.id, e.currentTarget);
                  }}
                  className={cn(
                    "relative z-10 flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/30",
                    lit ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      active === item.id && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  onPointerEnter={(e) => {
                    litPill(item.id, e.currentTarget);
                    if (canHover) scheduleClose();
                  }}
                  className={cn(
                    "relative z-10 rounded-lg px-3 py-2 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/30",
                    lit ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right actions. */}
          <div className="flex items-center gap-2">
            <ButtonLink
              href={signInHref}
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {signInLabel}
            </ButtonLink>
            <ButtonLink
              href={ctaHref}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {ctaLabel}
            </ButtonLink>
            <MorphToggle
              open={mobileOpen}
              reduce={reduce}
              onClick={() => setMobileOpen((o) => !o)}
            />
          </div>

          {/* Shared-layout dropdown panel. */}
          <AnimatePresence>
            {activeItem ? (
              <motion.div
                key="panel"
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, y: 6, x: left }
                }
                animate={
                  reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: left }
                }
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        x: SPRING_PANEL,
                        y: { duration: 0.18, ease: EASE_OUT },
                        opacity: { duration: 0.18, ease: EASE_OUT },
                      }
                }
                onPointerEnter={canHover ? cancelClose : undefined}
                onPointerLeave={canHover ? scheduleClose : undefined}
                className="absolute top-[calc(100%+0.5rem)] left-0 z-20"
              >
                <motion.div
                  layout
                  transition={reduce ? { duration: 0 } : SPRING_PANEL}
                  className="overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
                >
                  {/* Static wrapper: hover pill lives here, OUTSIDE the
                      switching grid, so it never disturbs the open/switch. */}
                  <div
                    ref={dropRef}
                    className="relative"
                    onPointerLeave={() =>
                      setDrop((p) => ({ ...p, show: false }))
                    }
                  >
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute top-0 left-0 rounded-xl bg-foreground/[0.07]"
                      initial={false}
                      animate={
                        reduce
                          ? { opacity: drop.show ? 1 : 0 }
                          : {
                              x: drop.x,
                              y: drop.y,
                              width: drop.w,
                              height: drop.h,
                              opacity: drop.show ? 1 : 0,
                            }
                      }
                      transition={reduce ? { duration: 0 } : SPRING_PANEL}
                    />
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={activeItem.id}
                        layout
                        initial={
                          reduce ? false : { opacity: 0, filter: "blur(4px)" }
                        }
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={
                          reduce
                            ? { opacity: 0 }
                            : { opacity: 0, filter: "blur(4px)" }
                        }
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.16, ease: EASE_OUT }
                        }
                        className={cn(
                          "grid gap-1",
                          activeItem.cols === 1 ? "grid-cols-1" : "grid-cols-2",
                        )}
                      >
                        {activeItem.menu?.map((link) => (
                          <MenuCard
                            key={link.title}
                            link={link}
                            compact={activeItem.cols === 1}
                            onPointerEnter={moveDrop}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Mobile sheet. */}
        <MobileSheet
          open={mobileOpen}
          items={items}
          reduce={reduce}
          signInLabel={signInLabel}
          signInHref={signInHref}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </header>
    </section>
  );
}

function MenuCard({
  link,
  compact,
  onPointerEnter,
}: {
  link: MenuLink;
  compact: boolean;
  onPointerEnter: (el: HTMLElement) => void;
}) {
  if (compact) {
    return (
      <a
        href={link.href}
        onPointerEnter={(e) => onPointerEnter(e.currentTarget)}
        className="relative z-10 block w-[12rem] rounded-lg px-3 py-2 font-medium text-foreground text-sm outline-none focus-visible:bg-muted"
      >
        {link.title}
      </a>
    );
  }
  return (
    <a
      href={link.href}
      onPointerEnter={(e) => onPointerEnter(e.currentTarget)}
      className="relative z-10 block w-[15rem] rounded-xl p-3 outline-none focus-visible:bg-muted"
    >
      <span className="block font-medium text-foreground text-sm">
        {link.title}
      </span>
      <span className="mt-0.5 block text-muted-foreground text-xs leading-5">
        {link.desc}
      </span>
    </a>
  );
}

function MorphToggle({
  open,
  reduce,
  onClick,
}: {
  open: boolean;
  reduce: boolean | null;
  onClick: () => void;
}) {
  const t = reduce ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="grid size-9 place-items-center rounded-lg text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 lg:hidden"
    >
      <span className="relative block h-3.5 w-4">
        <motion.span
          animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={t}
          className="absolute top-0 left-0 h-0.5 w-full rounded-full bg-current"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={t}
          className="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={t}
          className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current"
        />
      </span>
    </button>
  );
}

function MobileSheet({
  open,
  items,
  reduce,
  signInLabel,
  signInHref,
  ctaLabel,
  ctaHref,
}: {
  open: boolean;
  items: NavItem[];
  reduce: boolean | null;
  signInLabel: string;
  signInHref: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }
          }
          className="absolute inset-x-0 top-full z-40 overflow-hidden lg:hidden"
        >
          <div className="mt-2 rounded-2xl border border-border/60 bg-background/95 p-2 backdrop-blur-md">
            {items.map((item) => (
              <MobileRow key={item.id} item={item} reduce={reduce} />
            ))}
            <div className="mt-2 grid gap-2 p-1">
              <ButtonLink href={signInHref} variant="outline" size="md">
                {signInLabel}
              </ButtonLink>
              <ButtonLink href={ctaHref} variant="primary" size="md">
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MobileRow({
  item,
  reduce,
}: {
  item: NavItem;
  reduce: boolean | null;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.menu) {
    return (
      <a
        href={item.href}
        className="block rounded-xl px-3 py-2.5 font-medium text-foreground text-sm outline-none hover:bg-muted focus-visible:bg-muted"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 font-medium text-foreground text-sm outline-none hover:bg-muted focus-visible:bg-muted"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.26, ease: EASE_OUT }
            }
            className="overflow-hidden"
          >
            <div className="grid gap-0.5 py-1 pl-2">
              {item.menu.map((link) => (
                <MobileMenuLink
                  key={link.title}
                  link={link}
                  compact={item.cols === 1}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileMenuLink({
  link,
  compact,
}: {
  link: MenuLink;
  compact: boolean;
}) {
  return (
    <a
      href={link.href}
      className="block rounded-lg px-3 py-2 outline-none hover:bg-muted focus-visible:bg-muted"
    >
      <span className="block font-medium text-foreground text-sm">
        {link.title}
      </span>
      {compact ? null : (
        <span className="block text-muted-foreground text-xs">{link.desc}</span>
      )}
    </a>
  );
}
