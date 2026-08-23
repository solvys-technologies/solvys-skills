"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const GLYPH_PATTERNS = [
  { id: "first-four", rows: ["101", "101", "111", "001", "001"] },
  { id: "zero", rows: ["111", "101", "101", "101", "111"] },
  { id: "last-four", rows: ["101", "101", "111", "001", "001"] },
] as const;

let nextBlockIndex = 0;
const GLYPHS = GLYPH_PATTERNS.map((glyph) => ({
  id: glyph.id,
  cells: glyph.rows.flatMap((row, rowIndex) =>
    [...row].map((cell, columnIndex) => ({
      id: `${glyph.id}-${rowIndex}-${columnIndex}`,
      blockIndex: cell === "1" ? nextBlockIndex++ : null,
    })),
  ),
}));

export type NotFoundFallingBlocksProps = {
  homeHref?: string;
  className?: string;
};

export function NotFoundFallingBlocks({
  homeHref = "/",
  className,
}: NotFoundFallingBlocksProps) {
  const reduce = useReducedMotion() ?? false;
  const canHover = useHoverCapable();
  const [falling, setFalling] = useState(false);
  const active = canHover && falling && !reduce;

  return (
    <section
      className={cn(
        "relative flex min-h-[680px] w-full flex-col overflow-hidden bg-primary text-primary-foreground [container-type:inline-size]",
        className,
      )}
    >
      <header className="flex min-h-20 items-center justify-between px-5 sm:px-8">
        <a
          href={homeHref}
          className="font-semibold text-sm tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-current"
        >
          Index
        </a>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
          Error 404
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-5 py-12 text-center">
        <button
          type="button"
          aria-label="404. Hover to let the blocks fall."
          onMouseEnter={() => setFalling(true)}
          onMouseLeave={() => setFalling(false)}
          onFocus={() => setFalling(true)}
          onBlur={() => setFalling(false)}
          className="relative flex cursor-default items-start gap-[4cqw] py-[8cqw]"
        >
          {GLYPHS.map((glyph) => (
            <div
              key={glyph.id}
              aria-hidden="true"
              className="grid grid-cols-3 grid-rows-5 gap-[1.1cqw]"
            >
              {glyph.cells.map((cell) => {
                if (cell.blockIndex === null) {
                  return <span key={cell.id} className="size-[5.8cqw]" />;
                }

                const blockIndex = cell.blockIndex;
                const drift = ((blockIndex % 5) - 2) * 10;
                const rotation = ((blockIndex % 7) - 3) * 13;

                return (
                  <motion.span
                    key={cell.id}
                    className="size-[5.8cqw] bg-primary-foreground"
                    animate={
                      active
                        ? {
                            opacity: [1, 1, 0],
                            transform: [
                              "translate3d(0, 0, 0) rotate(0deg)",
                              `translate3d(${drift}px, 62vh, 0) rotate(${rotation}deg)`,
                            ],
                          }
                        : {
                            opacity: 1,
                            transform: "translate3d(0, 0, 0) rotate(0deg)",
                          }
                    }
                    transition={
                      active
                        ? {
                            duration: 1.25,
                            delay: blockIndex * 0.025,
                            ease: [0.55, 0.06, 0.68, 0.19],
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 0.45,
                          }
                        : {
                            duration: 0.22,
                            ease: [0.23, 1, 0.32, 1],
                          }
                    }
                  />
                );
              })}
            </div>
          ))}
        </button>

        <p className="mt-2 font-medium text-sm">Nothing here.</p>
        <ButtonLink
          href={homeHref}
          size="lg"
          className="mt-5 bg-primary-foreground text-primary hover:bg-primary-foreground/85"
        >
          Back to index
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </ButtonLink>
      </div>

      <p className="px-5 pb-6 text-center font-mono text-[9px] uppercase tracking-[0.16em] opacity-55 sm:px-8">
        Hover the number
      </p>
    </section>
  );
}
