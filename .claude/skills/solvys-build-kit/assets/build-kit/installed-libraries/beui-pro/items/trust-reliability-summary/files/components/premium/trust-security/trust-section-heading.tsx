"use client";

import { motion, useReducedMotion } from "motion/react";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TrustSectionHeadingProps = {
  eyebrow: string;
  title: string | string[];
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function TrustSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: TrustSectionHeadingProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <motion.span
        className="inline-flex rounded-full border border-border/70 bg-foreground/[0.04] px-3 py-1.5 font-medium text-muted-foreground text-xs"
        initial={
          reduceMotion ? false : { opacity: 0, filter: "blur(5px)", y: 8 }
        }
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
        viewport={{ once: true, margin: "-50px" }}
        whileInView={
          reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }
        }
      >
        {eyebrow}
      </motion.span>

      <TextReveal
        as="h2"
        blur={10}
        className="mt-7 text-balance font-medium text-4xl leading-[0.98] tracking-[-0.05em]"
        stagger={0.06}
        text={title}
        whileInView
        yOffset="24%"
      />

      <motion.p
        className={cn(
          "mt-6 max-w-2xl text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7",
          centered && "mx-auto",
        )}
        initial={
          reduceMotion ? false : { opacity: 0, filter: "blur(5px)", y: 10 }
        }
        transition={{
          delay: 0.25,
          duration: reduceMotion ? 0 : 0.5,
          ease: EASE_OUT,
        }}
        viewport={{ once: true, margin: "-50px" }}
        whileInView={
          reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }
        }
      >
        {description}
      </motion.p>
    </div>
  );
}
