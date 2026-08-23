"use client";

import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { EASE_OUT_CSS, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { FaqItem } from "./faq-data";
import { FAQ_LOAD_ITEM, faqListContainer } from "./faq-motion";

export type FaqDisclosureListProps = {
  items: readonly FaqItem[];
  defaultValue?: string | null;
  numbered?: boolean;
  compact?: boolean;
  loadDelay?: number;
  className?: string;
};

export function FaqDisclosureList({
  items,
  defaultValue = null,
  numbered = false,
  compact = false,
  loadDelay = 0.12,
  className,
}: FaqDisclosureListProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultValue);

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "show"}
      variants={faqListContainer(loadDelay)}
      className={cn("border-border border-t", className)}
    >
      {items.map((item, index) => (
        <FaqDisclosureRow
          key={item.id}
          item={item}
          index={index}
          open={openId === item.id}
          numbered={numbered}
          compact={compact}
          reduce={reduce}
          triggerId={`${baseId}-${item.id}-trigger`}
          contentId={`${baseId}-${item.id}-content`}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </motion.div>
  );
}

function FaqDisclosureRow({
  item,
  index,
  open,
  numbered,
  compact,
  reduce,
  triggerId,
  contentId,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  numbered: boolean;
  compact: boolean;
  reduce: boolean | null;
  triggerId: string;
  contentId: string;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout="position"
      variants={FAQ_LOAD_ITEM}
      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
      className="border-border border-b"
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
        className={cn(
          "group flex min-h-16 w-full items-start gap-4 py-5 text-left transition-colors duration-200 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground",
          !compact && "sm:min-h-20 sm:py-6",
        )}
      >
        {numbered ? (
          <span className="mt-1 w-8 shrink-0 font-medium text-muted-foreground text-xs tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 font-medium text-base leading-6 sm:text-lg">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className="mt-0.5 grid size-8 shrink-0 place-items-center bg-muted text-muted-foreground"
        >
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>

      <section
        id={contentId}
        aria-labelledby={triggerId}
        aria-hidden={!open}
        style={{ transitionTimingFunction: EASE_OUT_CSS }}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            style={{ transitionTimingFunction: EASE_OUT_CSS }}
            className={cn(
              "max-w-2xl text-pretty text-muted-foreground leading-7 transition-[opacity,transform] duration-200 motion-reduce:transition-none",
              open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
              numbered && "pl-12",
            )}
          >
            <div className={cn("pb-6", !compact && "sm:pb-7")}>
              {item.answer}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
