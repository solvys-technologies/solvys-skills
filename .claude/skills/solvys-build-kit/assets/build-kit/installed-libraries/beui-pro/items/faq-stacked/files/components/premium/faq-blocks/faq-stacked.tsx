"use client";

import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { EASE_OUT_CSS, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, type FaqItem } from "./faq-data";
import {
  FAQ_LOAD_CONTAINER,
  FAQ_LOAD_ITEM,
  faqListContainer,
} from "./faq-motion";

export type FaqStackedProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: readonly FaqItem[];
  defaultOpenIds?: readonly string[];
  className?: string;
};

export function FaqStacked({
  eyebrow = "FAQs",
  title = "Frequently asked questions",
  description = "A few clear answers to help you understand how everything works.",
  items = FAQ_ITEMS.slice(0, 5),
  defaultOpenIds = [items[0]?.id, items[1]?.id].filter((id): id is string =>
    Boolean(id),
  ),
  className,
}: FaqStackedProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(defaultOpenIds),
  );
  const titleWords = title.trim().split(/\s+/);
  const lastTitleWord = titleWords.pop() ?? title;
  const titleLead = titleWords.join(" ");

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      className={cn(
        "w-full bg-background px-4 py-16 font-sans text-foreground sm:px-8 sm:py-24",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={FAQ_LOAD_CONTAINER}
        className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20"
      >
        <motion.div
          variants={FAQ_LOAD_ITEM}
          className="lg:sticky lg:top-8 lg:self-start"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="size-2.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            <p className="font-medium text-sm">{eyebrow}</p>
          </div>

          <h2 className="mt-8 max-w-md text-balance font-semibold text-4xl leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            {titleLead ? `${titleLead} ` : null}
            <span className="relative inline-block">
              {lastTitleWord}
              <span
                aria-hidden="true"
                className="absolute -right-1 -bottom-2 left-0 h-2"
              >
                <span className="absolute top-0 right-0 left-2 h-0.5 -rotate-2 bg-primary" />
                <span className="absolute right-3 bottom-0 left-0 h-0.5 rotate-1 bg-primary/60" />
              </span>
            </span>
          </h2>
          <p className="mt-8 max-w-sm text-pretty text-muted-foreground leading-7">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          variants={faqListContainer(0.16)}
          className="flex flex-col gap-4"
        >
          {items.map((item) => {
            const open = openIds.has(item.id);
            const triggerId = `${baseId}-${item.id}-trigger`;
            const contentId = `${baseId}-${item.id}-content`;

            return (
              <motion.article
                key={item.id}
                layout="position"
                variants={FAQ_LOAD_ITEM}
                transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                className="overflow-hidden rounded-[1.5rem] border border-border bg-background transition-colors duration-200 hover:border-foreground/20"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={contentId}
                  onClick={() => toggle(item.id)}
                  className="group flex min-h-20 w-full items-start gap-5 px-5 py-5 text-left outline-none transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring/30 sm:px-6"
                >
                  <span className="min-w-0 flex-1 pt-1 font-medium text-lg leading-6 sm:text-xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-foreground"
                  >
                    {open ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
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
                    <p
                      style={{ transitionTimingFunction: EASE_OUT_CSS }}
                      className={cn(
                        "max-w-2xl px-5 text-pretty text-muted-foreground leading-7 transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:px-6",
                        open
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1 opacity-0",
                      )}
                    >
                      <span className="block pb-6">{item.answer}</span>
                    </p>
                  </div>
                </section>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
