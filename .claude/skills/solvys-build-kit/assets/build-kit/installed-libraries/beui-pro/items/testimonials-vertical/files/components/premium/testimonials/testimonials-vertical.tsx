"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type VerticalTestimonial = {
  quote: string;
  name: string;
  role: string;
  outcome?: string;
};

export type TestimonialsVerticalProps = {
  eyebrow?: string;
  title?: string;
  testimonials?: VerticalTestimonial[];
  className?: string;
};

const DEFAULT_TESTIMONIALS: VerticalTestimonial[] = [
  {
    quote:
      "We replaced three weeks of UI work with one afternoon of composition.",
    name: "Mina Park",
    role: "Design engineer, Northstar",
    outcome: "18 days saved",
  },
  {
    quote:
      "The motion feels authored, not sprinkled on after the layout was done.",
    name: "Theo Martin",
    role: "Founder, Relay",
  },
  {
    quote:
      "Every block survived our theme without becoming another generic SaaS section.",
    name: "Iris Okafor",
    role: "Product designer, Canopy",
    outcome: "+31% conversion",
  },
  {
    quote:
      "Our landing page finally has rhythm. The source is clean enough that the team keeps extending it.",
    name: "Samir Khan",
    role: "Frontend lead, Index",
  },
  {
    quote:
      "The registry workflow is absurdly fast. Install, tune the copy, ship.",
    name: "June Lee",
    role: "Independent developer",
    outcome: "42 min to production",
  },
  {
    quote:
      "It gave us the kind of interaction detail we normally cut before launch.",
    name: "Alex Rowan",
    role: "VP Product, Fable",
  },
  {
    quote:
      "The variants actually have different taste. That matters more than another hundred components.",
    name: "Nora Bell",
    role: "Creative director, Studio Arc",
    outcome: "4 launches shipped",
  },
  {
    quote:
      "Reduced-motion and mobile behavior were already considered. We did not inherit polish debt.",
    name: "Eli Grant",
    role: "Accessibility lead, Common",
  },
  {
    quote:
      "The source feels like it came from a product team, not a component generator.",
    name: "Priya Shah",
    role: "Staff engineer, Forma",
    outcome: "0 design regressions",
  },
];

const COLUMN_CONFIG = [
  { id: "left", direction: "dispatch-up", duration: 31 },
  { id: "center", direction: "dispatch-down", duration: 35 },
  { id: "right", direction: "dispatch-up", duration: 39 },
] as const;

const COLUMN_COPIES = ["primary", "duplicate"] as const;

export function TestimonialsVertical({
  eyebrow = "Field notes",
  title = "What shipped after the handoff.",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsVerticalProps) {
  const reduce = useReducedMotion();
  const columns = COLUMN_CONFIG.map((config, column) => ({
    ...config,
    items: testimonials.filter((_, index) => index % 3 === column),
  }));

  return (
    <section
      className={cn("w-full overflow-hidden px-4 py-20 sm:px-8", className)}
    >
      <style>{`
        @keyframes dispatch-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes dispatch-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
      `}</style>
      <div className="mx-auto grid w-full max-w-6xl gap-10 border-border/60 border-y py-5 lg:grid-cols-[0.72fr_1.28fr] lg:gap-0 lg:py-0">
        <motion.header
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="flex flex-col justify-between border-border/60 lg:border-r lg:py-10 lg:pr-10"
        >
          <div>
            <p className="font-mono text-[11px] text-[#d84c2f] uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
            <h2 className="mt-5 max-w-sm text-balance font-serif text-4xl text-foreground leading-[0.98] tracking-[-0.03em] sm:text-5xl">
              {title}
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 border-border/60 border-t pt-5 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
            <span>{testimonials.length} dispatches</span>
            <span>Continuous signal</span>
          </div>
        </motion.header>

        <div className="group/marquee grid h-[38rem] grid-cols-2 gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] lg:grid-cols-3 lg:pl-5">
          {columns.map((column, columnIndex) => {
            const visibleItems =
              column.items.length > 0 ? column.items : testimonials;
            return (
              <section
                key={column.id}
                aria-label={`${column.id} testimonial column`}
                className={cn(
                  "overflow-hidden",
                  columnIndex === 2 && "hidden lg:block",
                )}
              >
                <div
                  style={{
                    animationName: reduce ? "none" : column.direction,
                    animationDuration: `${column.duration}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                  }}
                  className="will-change-transform [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]"
                >
                  {COLUMN_COPIES.map((copy) => (
                    <div
                      key={copy}
                      aria-hidden={copy === "duplicate"}
                      className="flex flex-col gap-3 pb-3"
                    >
                      {visibleItems.map((item, index) => (
                        <article
                          key={`${copy}-${item.name}`}
                          className={cn(
                            "relative border border-border/60 bg-card p-5",
                            index % 3 === 1 && "bg-[#d84c2f]/[0.06]",
                          )}
                        >
                          {item.outcome ? (
                            <p className="mb-8 font-mono text-[10px] text-[#d84c2f] uppercase tracking-[0.14em]">
                              {item.outcome}
                            </p>
                          ) : null}
                          <blockquote className="text-pretty font-serif text-lg text-foreground leading-7">
                            “{item.quote}”
                          </blockquote>
                          <footer className="mt-7 border-border/60 border-t pt-4">
                            <p className="font-medium text-foreground text-sm">
                              {item.name}
                            </p>
                            <p className="mt-1 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.08em]">
                              {item.role}
                            </p>
                          </footer>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
