"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { type PointerEvent, type ReactNode, useRef, useState } from "react";
import { SPRING_MOUSE } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export type FooterSpotlightLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterSpotlightColumn = {
  title: string;
  links: FooterSpotlightLink[];
};

export type FooterSpotlightProps = {
  brand?: string;
  /** Giant outlined wordmark revealed by the cursor spotlight. */
  wordmark?: string;
  tagline?: string;
  columns?: FooterSpotlightColumn[];
  /** Optional content rendered under the brand tagline. */
  brandExtra?: ReactNode;
  /** Spotlight radius in pixels. */
  radius?: number;
  className?: string;
};

const DEFAULT_COLUMNS: FooterSpotlightColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#" },
      { label: "Blocks", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Registry", href: "#" },
      { label: "CLI", href: "#" },
      { label: "Examples", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function FooterSpotlight({
  brand = "beUI Pro",
  brandExtra,
  wordmark = "Oorem",
  tagline = "Premium motion components and blocks for modern React apps.",
  columns = DEFAULT_COLUMNS,
  radius = 200,
  className,
}: FooterSpotlightProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const ref = useRef<HTMLDivElement>(null);
  // Key of the link currently hovered/focused — used to dim the rest.
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const sx = useSpring(x, SPRING_MOUSE);
  const sy = useSpring(y, SPRING_MOUSE);

  // Soft radial mask that follows the cursor and clips the filled wordmark.
  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${sx}px ${sy}px, black, transparent 70%)`;

  const spotlightOn = canHover && !reduce;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (!spotlightOn) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    opacity.set(1);
  }

  return (
    <footer
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand column. */}
          <div className="flex flex-col">
            <span className="font-sans text-foreground text-xl">{brand}</span>
            <p className="mt-3 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
              {tagline}
            </p>
            {brandExtra ? <div className="mt-6">{brandExtra}</div> : null}
          </div>

          {/* Link columns. Hovering/focusing one link dims and blurs the rest. */}
          <div
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            onPointerLeave={() => setActiveLink(null)}
          >
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col">
                <p className="font-medium text-foreground text-sm">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => {
                    const key = `${column.title}/${link.label}`;
                    const dimmed =
                      !reduce && activeLink !== null && activeLink !== key;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(link.external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          onPointerEnter={() => setActiveLink(key)}
                          onFocus={() => setActiveLink(key)}
                          onBlur={() => setActiveLink(null)}
                          className={cn(
                            "inline-flex w-fit items-center text-muted-foreground text-sm outline-none transition-[opacity,filter,color] duration-300 ease-out hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4",
                            dimmed && "opacity-40 blur-[1.5px]",
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight wordmark — pinned to the bottom edge and clipped so only
            its top half shows. */}
        <div
          ref={ref}
          onPointerMove={handleMove}
          onPointerLeave={() => opacity.set(0)}
          className="relative  mt-16 h-[10vw] select-none overflow-hidden"
        >
          {/* Base: outlined letters. When spotlight is off, this stays faintly
              visible so the wordmark never disappears on touch / reduced motion. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 block translate-y-1/3 whitespace-nowrap text-center font-sans text-[18vw] text-transparent leading-[0.9]"
            style={{
              WebkitTextStroke:
                "1px color-mix(in oklch, var(--foreground) 22%, transparent)",
            }}
          >
            {wordmark}
          </span>

          {spotlightOn ? (
            // Overlay: filled letters clipped to the cursor spotlight.
            <motion.span
              aria-hidden
              style={{
                opacity,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
              className="absolute inset-x-0 bottom-0 block translate-y-1/3 whitespace-nowrap text-center font-sans text-[18vw] text-foreground leading-[0.9]"
            >
              {wordmark}
            </motion.span>
          ) : (
            // No-hover fallback: a quiet static fill so the mark reads on touch.
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 block translate-y-1/3 whitespace-nowrap text-center font-sans text-[18vw] text-foreground/10 leading-[0.9]"
            >
              {wordmark}
            </span>
          )}
          <span className="sr-only">{wordmark}</span>
        </div>
      </div>
    </footer>
  );
}
