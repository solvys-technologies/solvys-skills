"use client";

import {
  Activity,
  BookOpen,
  ChevronDown,
  LayoutTemplate,
  type LucideIcon,
  Menu,
  MessagesSquare,
  Orbit,
  ScanLine,
  Waypoints,
  Workflow,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export type FeatureMorphItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type FeatureMorphMenu = {
  id: string;
  label: string;
  items: FeatureMorphItem[];
};

export type FeatureMorphLink = {
  label: string;
  href: string;
};

export type NavbarFeatureMorphProps = {
  brandLabel?: string;
  brandHref?: string;
  menus?: FeatureMorphMenu[];
  links?: FeatureMorphLink[];
  signInLabel?: string;
  signInHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

const DEFAULT_MENUS: FeatureMorphMenu[] = [
  {
    id: "platform",
    label: "Platform",
    items: [
      {
        title: "Automations",
        description: "Build flows that run themselves",
        href: "#automations",
        icon: Workflow,
      },
      {
        title: "Liveboards",
        description: "Watch every signal as it arrives",
        href: "#liveboards",
        icon: ScanLine,
      },
      {
        title: "Journeys",
        description: "Map each step across your product",
        href: "#journeys",
        icon: Waypoints,
      },
      {
        title: "Templates",
        description: "Start with a proven workflow",
        href: "#templates",
        icon: LayoutTemplate,
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      {
        title: "Field notes",
        description: "Practical guides from the team",
        href: "#field-notes",
        icon: BookOpen,
      },
      {
        title: "Community",
        description: "Learn alongside other builders",
        href: "#community",
        icon: MessagesSquare,
      },
      {
        title: "System status",
        description: "Live service health and history",
        href: "#status",
        icon: Activity,
      },
      {
        title: "Quickstarts",
        description: "Ship your first flow in minutes",
        href: "#quickstarts",
        icon: Orbit,
      },
    ],
  },
];

const DEFAULT_LINKS: FeatureMorphLink[] = [
  { label: "Pricing", href: "#pricing" },
  { label: "Stories", href: "#stories" },
];

const CLOSED_HEIGHT = 66;
const DESKTOP_WIDTH = 720;
const DESKTOP_OPEN_HEIGHT = 414;
const MOBILE_WIDTH = 360;
const MOBILE_OPEN_HEIGHT = 500;
const TOP_RADIUS = 33;
const OPEN_BOTTOM_RADIUS = 30;

const PANEL_VARIANTS: Variants = {
  closed: { clipPath: "inset(0 0 100% 0)" },
  open: { clipPath: "inset(0 0 0% 0)" },
};

const DIVIDER_VARIANTS: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.08, ease: EASE_OUT },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.15, delay: 0.06, ease: EASE_OUT },
  },
};

type CardMotionContext = {
  direction: number;
  reduce: boolean;
};

const CARD_VARIANTS: Variants = {
  hidden: ({ direction, reduce }: CardMotionContext) => ({
    opacity: 0,
    transform: reduce
      ? "translateX(0px) translateY(0px)"
      : direction === 0
        ? "translateX(0px) translateY(8px)"
        : `translateX(${direction * 10}px) translateY(3px)`,
    filter: reduce ? "blur(0px)" : "blur(4px)",
  }),
  visible: ({ reduce }: CardMotionContext) => ({
    opacity: 1,
    transform: "translateX(0px) translateY(0px)",
    filter: "blur(0px)",
    transition: {
      duration: reduce ? 0.1 : 0.18,
      ease: EASE_OUT,
    },
  }),
  exit: ({ direction, reduce }: CardMotionContext) => ({
    opacity: 0,
    transform: reduce
      ? "translateX(0px) translateY(0px)"
      : direction === 0
        ? "translateX(0px) translateY(-5px)"
        : `translateX(${-direction * 8}px) translateY(-2px)`,
    filter: reduce ? "blur(0px)" : "blur(2px)",
    transition: {
      duration: reduce ? 0.08 : 0.18,
      ease: EASE_OUT,
    },
  }),
};

function surfacePath(width: number, height: number, bottomRadius: number) {
  return [
    `M ${TOP_RADIUS} 0`,
    `H ${width - TOP_RADIUS}`,
    `Q ${width} 0 ${width} ${TOP_RADIUS}`,
    `V ${height - bottomRadius}`,
    `Q ${width} ${height} ${width - bottomRadius} ${height}`,
    `H ${bottomRadius}`,
    `Q 0 ${height} 0 ${height - bottomRadius}`,
    `V ${TOP_RADIUS}`,
    `Q 0 0 ${TOP_RADIUS} 0`,
    "Z",
  ].join(" ");
}

export function NavbarFeatureMorph({
  brandLabel = "Aster",
  brandHref = "/",
  menus = DEFAULT_MENUS,
  links = DEFAULT_LINKS,
  signInLabel = "Log in",
  signInHref = "#log-in",
  ctaLabel = "Start free",
  ctaHref = "#start-free",
  className,
}: NavbarFeatureMorphProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuDirection, setMenuDirection] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuId, setMobileMenuId] = useState(menus[0]?.id ?? "");
  const activeMenu = menus.find((menu) => menu.id === activeMenuId);
  const mobileMenu = menus.find((menu) => menu.id === mobileMenuId) ?? menus[0];

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setActiveMenuId(null);
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenuId(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const openMenu = (id: string) => {
    cancelClose();
    const currentIndex = menus.findIndex((menu) => menu.id === activeMenuId);
    const nextIndex = menus.findIndex((menu) => menu.id === id);
    setMenuDirection(
      currentIndex < 0 || nextIndex < 0
        ? 0
        : Math.sign(nextIndex - currentIndex),
    );
    setActiveMenuId(id);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setActiveMenuId(null), 100);
  };

  const close = () => {
    setActiveMenuId(null);
    setMobileOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className={cn("h-[4.125rem] w-full px-4 pt-6", className)}
    >
      <nav
        aria-label="Primary navigation"
        onPointerEnter={canHover ? cancelClose : undefined}
        onPointerLeave={canHover ? scheduleClose : undefined}
        className="relative mx-auto h-[4.125rem] w-full max-w-[45rem]"
      >
        <MorphSurface expanded={Boolean(activeMenu)} reduce={reduce} />
        <MorphSurface expanded={mobileOpen} reduce={reduce} mobile />

        <div className="relative z-30 flex h-[4.125rem] items-center gap-0.5 p-2 px-3 sm:px-4">
          <a
            href={brandHref}
            aria-label={brandLabel}
            className="mr-auto flex h-10 shrink-0 items-center gap-2 rounded-full px-1.5 pr-2.5 font-semibold text-foreground text-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Orbit aria-hidden="true" className="size-4.5" />
            </span>
            <span className="hidden sm:inline">{brandLabel}</span>
          </a>

          <div className="hidden shrink-0 items-center gap-0.5 md:flex">
            {menus.map((menu) => {
              const isOpen = activeMenuId === menu.id;
              return (
                <button
                  key={menu.id}
                  type="button"
                  onPointerEnter={() => {
                    if (canHover) openMenu(menu.id);
                  }}
                  onClick={() => openMenu(menu.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-haspopup="true"
                  className={cn(
                    "flex h-10 items-center gap-1 rounded-full px-2.5 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/30",
                    isOpen
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {menu.label}
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={reduce ? { duration: 0 } : SPRING_PANEL}
                  >
                    <ChevronDown className="size-3.5" />
                  </motion.span>
                </button>
              );
            })}

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onPointerEnter={() => {
                  if (canHover) setActiveMenuId(null);
                }}
                className="flex h-10 items-center rounded-full px-2.5 font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/30"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto hidden shrink-0 items-center gap-0.5 md:flex">
            <ButtonLink href={signInHref} variant="ghost" size="sm">
              {signInLabel}
            </ButtonLink>
            <ButtonLink href={ctaHref} variant="primary" size="sm">
              {ctaLabel}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((open) => !open);
              setActiveMenuId(null);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={`${panelId}-mobile`}
            className="relative grid size-10 place-items-center rounded-full text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-foreground/30 md:hidden"
          >
            <MorphIcon visible={!mobileOpen}>
              <Menu className="size-5" />
            </MorphIcon>
            <MorphIcon visible={mobileOpen} className="absolute">
              <X className="size-5" />
            </MorphIcon>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {activeMenu ? (
            <FeaturePanel
              id={panelId}
              menu={activeMenu}
              direction={menuDirection}
              reduce={reduce}
              onNavigate={close}
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <MobilePanel
              id={`${panelId}-mobile`}
              menus={menus}
              activeMenu={mobileMenu}
              activeMenuId={mobileMenuId}
              links={links}
              signInLabel={signInLabel}
              signInHref={signInHref}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              reduce={reduce}
              onMenuChange={setMobileMenuId}
              onNavigate={close}
            />
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function MorphSurface({
  expanded,
  reduce,
  mobile = false,
}: {
  expanded: boolean;
  reduce: boolean | null;
  mobile?: boolean;
}) {
  const width = mobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
  const openHeight = mobile ? MOBILE_OPEN_HEIGHT : DESKTOP_OPEN_HEIGHT;
  const path = surfacePath(
    width,
    expanded ? openHeight : CLOSED_HEIGHT,
    expanded ? OPEN_BOTTOM_RADIUS : TOP_RADIUS,
  );

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${openHeight}`}
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 w-full",
        mobile ? "h-[31.25rem] md:hidden" : "hidden h-[25.875rem] md:block",
      )}
    >
      <motion.path
        initial={false}
        animate={{ d: path }}
        transition={reduce ? { duration: 0 } : SPRING_PANEL}
        d={path}
        fill="var(--muted)"
        fillOpacity="0.8"
        stroke="var(--border)"
        strokeOpacity="0.6"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function MorphIcon({
  visible,
  className,
  children,
}: {
  visible: boolean;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      animate={
        visible
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
      }
      transition={reduce ? { duration: 0 } : SPRING_PANEL}
    >
      {children}
    </motion.span>
  );
}

function FeaturePanel({
  id,
  menu,
  direction,
  reduce,
  onNavigate,
}: {
  id: string;
  menu: FeatureMorphMenu;
  direction: number;
  reduce: boolean | null;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={id}
      initial="closed"
      animate="open"
      exit="closed"
      variants={PANEL_VARIANTS}
      transition={reduce ? { duration: 0 } : SPRING_PANEL}
      className="absolute inset-x-0 top-[4.125rem] z-20 hidden h-[21.75rem] overflow-hidden pt-2 md:block"
    >
      <motion.span
        aria-hidden="true"
        variants={DIVIDER_VARIANTS}
        className="absolute inset-x-0 top-0 h-px bg-border/60"
      />
      <AnimatePresence mode="sync" custom={direction} propagate>
        <AnimatedFeatureGrid
          key={menu.id}
          items={menu.items}
          direction={direction}
          reduce={Boolean(reduce)}
          onNavigate={onNavigate}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function MobilePanel({
  id,
  menus,
  activeMenu,
  activeMenuId,
  links,
  signInLabel,
  signInHref,
  ctaLabel,
  ctaHref,
  reduce,
  onMenuChange,
  onNavigate,
}: {
  id: string;
  menus: FeatureMorphMenu[];
  activeMenu?: FeatureMorphMenu;
  activeMenuId: string;
  links: FeatureMorphLink[];
  signInLabel: string;
  signInHref: string;
  ctaLabel: string;
  ctaHref: string;
  reduce: boolean | null;
  onMenuChange: (id: string) => void;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={id}
      initial="closed"
      animate="open"
      exit="closed"
      variants={PANEL_VARIANTS}
      transition={reduce ? { duration: 0 } : SPRING_PANEL}
      className="absolute inset-x-0 top-[4.125rem] z-20 h-[27.125rem] overflow-hidden pt-2 md:hidden"
    >
      <motion.span
        aria-hidden="true"
        variants={DIVIDER_VARIANTS}
        className="absolute inset-x-0 top-0 h-px bg-border/60"
      />
      <div className="flex gap-1 px-1">
        {menus.map((menu) => (
          <button
            key={menu.id}
            type="button"
            onClick={() => onMenuChange(menu.id)}
            className={cn(
              "min-h-10 rounded-full px-3 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
              activeMenuId === menu.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground",
            )}
          >
            {menu.label}
          </button>
        ))}
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className="flex min-h-10 items-center rounded-full px-3 font-medium text-muted-foreground text-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            {link.label}
          </a>
        ))}
      </div>
      <AnimatePresence mode="sync" propagate>
        {activeMenu ? (
          <AnimatedFeatureGrid
            key={activeMenu.id}
            items={activeMenu.items}
            direction={0}
            reduce={Boolean(reduce)}
            onNavigate={onNavigate}
            className="top-12"
          />
        ) : null}
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-2 p-1 pt-2">
        <ButtonLink href={signInHref} variant="outline" size="md">
          {signInLabel}
        </ButtonLink>
        <ButtonLink href={ctaHref} variant="primary" size="md">
          {ctaLabel}
        </ButtonLink>
      </div>
    </motion.div>
  );
}

function AnimatedFeatureGrid({
  items,
  direction,
  reduce,
  onNavigate,
  className,
}: {
  items: FeatureMorphItem[];
  direction: number;
  reduce: boolean;
  onNavigate: () => void;
  className?: string;
}) {
  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { delayChildren: 0.06, staggerChildren: 0.03 },
    },
    exit: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };
  const motionContext: CardMotionContext = { direction, reduce };

  return (
    <motion.div
      custom={motionContext}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "absolute inset-x-0 top-0 grid grid-cols-2 gap-2 p-1 pt-2",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.title}
            href={item.href}
            onClick={onNavigate}
            custom={motionContext}
            variants={CARD_VARIANTS}
            className="flex min-h-36 flex-col items-center justify-center rounded-[1.35rem] bg-background px-3 py-5 text-center outline-none transition-colors hover:bg-background/80 focus-visible:ring-2 focus-visible:ring-foreground/30 sm:min-h-40 sm:px-5 sm:py-6"
          >
            <span className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span className="mt-3 font-semibold text-base text-foreground sm:text-lg">
              {item.title}
            </span>
            <span className="mt-1 text-muted-foreground text-xs sm:text-sm">
              {item.description}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
