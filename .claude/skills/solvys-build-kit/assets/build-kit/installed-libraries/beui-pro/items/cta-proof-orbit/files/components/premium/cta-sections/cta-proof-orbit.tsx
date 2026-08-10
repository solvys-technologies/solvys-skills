"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaProofOrbitLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaProofOrbitPerson = {
  name: string;
  role: string;
  image: string;
};

export type CtaProofOrbitProps = {
  people?: CtaProofOrbitPerson[];
  title?: string;
  description?: string;
  cta?: CtaProofOrbitLink;
  note?: string;
  className?: string;
};

const DEFAULT_PEOPLE: CtaProofOrbitPerson[] = [
  {
    name: "Maya Chen",
    role: "Design lead",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85",
  },
  {
    name: "Eli Brooks",
    role: "Product engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85",
  },
  {
    name: "Ana Silva",
    role: "Founder",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85",
  },
  {
    name: "Noah Williams",
    role: "Creative director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=85",
  },
  {
    name: "Leah Martin",
    role: "Frontend lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=85",
  },
];

const PORTRAIT_STYLES = [
  "size-11 translate-y-4",
  "size-14 translate-y-1",
  "size-20 -translate-y-2",
  "size-14 translate-y-1",
  "size-11 translate-y-4",
];

function externalProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

export function CtaProofOrbit({
  people = DEFAULT_PEOPLE,
  title = "Join teams shipping work they are proud to show.",
  description = "Start with polished foundations, adapt every detail, and move from first pass to finished product faster.",
  cta = { label: "See what you can build", href: "#" },
  note = "Source included from day one",
  className,
}: CtaProofOrbitProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden px-4 py-24 sm:px-8",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.ul
          initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="flex h-24 items-center justify-center -space-x-2 sm:h-28 sm:-space-x-1"
          aria-label="Built for cross-functional product teams"
        >
          {people.map((person, index) => {
            const center = Math.floor(people.length / 2);
            const distance = Math.abs(index - center);
            const portraitStyle =
              PORTRAIT_STYLES[index] ?? "size-11 translate-y-4";

            return (
              <motion.li
                key={`${person.name}-${person.role}`}
                animate={
                  reduce
                    ? undefined
                    : { y: [0, distance % 2 === 0 ? -3 : 3, 0] }
                }
                transition={{
                  duration: 4.5 + index * 0.25,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className={cn(
                  "relative shrink-0 rounded-full border border-border p-1",
                  portraitStyle,
                  distance === 0 && "z-10 border-foreground/30",
                )}
              >
                {/* biome-ignore lint/performance/noImgElement: installable blocks accept consumer-hosted portrait URLs. */}
                <img
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  className="size-full rounded-full object-cover grayscale"
                />
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
          className="mt-4 font-medium text-muted-foreground text-xs uppercase tracking-widest"
        >
          Designers · founders · builders
        </motion.p>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.1 }}
          className="mt-7 max-w-3xl text-pretty text-4xl font-medium leading-tight tracking-tight sm:text-balance"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.18 }}
          className="mt-5 max-w-xl text-pretty text-base text-muted-foreground leading-7"
        >
          {description}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
          className="mt-8"
        >
          <ButtonLink
            href={cta.href}
            size="lg"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            {...externalProps(cta.external)}
          >
            {cta.label}
            <ArrowRight className="size-4" />
          </ButtonLink>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.32 }}
          className="mt-5 inline-flex items-center gap-2 text-muted-foreground text-sm"
        >
          <span className="grid size-5 place-items-center rounded-full border border-border">
            <Check className="size-3" />
          </span>
          {note}
        </motion.p>
      </div>
    </section>
  );
}
