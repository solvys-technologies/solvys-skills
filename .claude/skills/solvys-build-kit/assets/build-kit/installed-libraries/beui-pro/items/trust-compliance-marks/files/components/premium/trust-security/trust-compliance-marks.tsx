"use client";

import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { TrustSectionHeading } from "./trust-section-heading";

export type ComplianceMark = {
  name: string;
  standard: string;
  description: string;
};

export type TrustComplianceMarksProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  marks?: ComplianceMark[];
  commitments?: string[];
  trustCenterHref?: string;
  trustCenterLabel?: string;
  className?: string;
};

const DEFAULT_MARKS: ComplianceMark[] = [
  {
    name: "SOC 2",
    standard: "Type II",
    description:
      "Independent controls reviewed across security, availability, and confidentiality.",
  },
  {
    name: "ISO",
    standard: "27001",
    description:
      "A documented security program shaped around continuous risk management.",
  },
  {
    name: "GDPR",
    standard: "Ready",
    description:
      "Clear data rights, regional processing choices, and practical privacy controls.",
  },
  {
    name: "HIPAA",
    standard: "Ready",
    description:
      "Safeguards and agreements available for teams handling protected health data.",
  },
];

const DEFAULT_COMMITMENTS = [
  "Encryption in transit and at rest",
  "Annual independent reviews",
  "Regional data controls",
];

export function TrustComplianceMarks({
  eyebrow = "Trust and security",
  title = ["Proof you can share", "with every stakeholder."],
  description = "Clear standards make security easier to evaluate. Give legal, procurement, and leadership the evidence they need without slowing the work down.",
  marks = DEFAULT_MARKS,
  commitments = DEFAULT_COMMITMENTS,
  trustCenterHref = "#",
  trustCenterLabel = "Visit the trust center",
  className,
}: TrustComplianceMarksProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const safeMarks = marks.slice(0, 4);
  const safeCommitments = commitments.slice(0, 4);

  if (safeMarks.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <TrustSectionHeading
            description={description}
            eyebrow={eyebrow}
            title={title}
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            transition={{
              delay: 0.32,
              duration: reduceMotion ? 0 : 0.45,
              ease: EASE_OUT,
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <ButtonLink href={trustCenterHref} size="md" variant="outline">
              {trustCenterLabel}
              <ArrowUpRight aria-hidden className="size-4" />
            </ButtonLink>
          </motion.div>
        </div>

        <div className="mt-14 grid border-border/70 border-y md:grid-cols-2 lg:grid-cols-4">
          {safeMarks.map((mark, index) => (
            <motion.article
              className={cn(
                "flex min-h-56 flex-col px-1 py-8 sm:px-6 lg:px-7",
                index > 0 && "border-border/60 border-t",
                index === 1 && "md:border-t-0",
                index > 1 && "lg:border-t-0",
                index % 2 === 1 && "md:border-l",
                index > 1 && "lg:border-l",
                index === 2 && "md:border-l-0",
              )}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, filter: "blur(7px)", y: 16 }
              }
              key={`${mark.name}-${mark.standard}`}
              transition={{
                delay: index * 0.07,
                duration: reduceMotion ? 0 : 0.52,
                ease: EASE_OUT,
              }}
              viewport={{ once: true, margin: "-70px" }}
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, filter: "blur(0px)", y: 0 }
              }
            >
              <ShieldCheck
                aria-hidden
                className="size-5 text-muted-foreground"
                strokeWidth={1.6}
              />
              <div className="mt-8 flex items-end gap-2">
                <h3 className="font-medium text-3xl tracking-[-0.05em]">
                  {mark.name}
                </h3>
                <p className="pb-1 font-medium text-muted-foreground text-xs">
                  {mark.standard}
                </p>
              </div>
              <p className="mt-4 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
                {mark.description}
              </p>
            </motion.article>
          ))}
        </div>

        {safeCommitments.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {safeCommitments.map((commitment) => (
              <span
                className="inline-flex items-center gap-2 text-muted-foreground text-sm"
                key={commitment}
              >
                <Check aria-hidden className="size-4 text-foreground" />
                {commitment}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
