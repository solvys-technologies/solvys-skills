"use client";

import { CheckCircle2, Gem } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_IN_OUT, EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export type VisualPricingArtwork = "ribbons" | "solar";

export type VisualPricingPlan = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  badge?: string;
  description: string;
  features: string[];
  artwork: VisualPricingArtwork;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  featured?: boolean;
};

export type PricingVisualPlansProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  plans?: VisualPricingPlan[];
  className?: string;
};

const DEFAULT_PLANS: VisualPricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    badge: "Self-serve",
    description:
      "Open a workspace, invite your team, and take the core workflow live today.",
    features: [
      "Up to 10 active projects",
      "One connected workspace",
      "Guided setup in under 10 minutes",
    ],
    artwork: "ribbons",
    cta: { label: "Create workspace", href: "#" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$650",
    cadence: "/month",
    badge: "Guided",
    description:
      "Bring in an expert to shape the rollout around your team and operating model.",
    features: [
      "Live working session",
      "A rollout mapped to your use case",
      "Async support after launch",
    ],
    artwork: "solar",
    cta: { label: "Book a walkthrough", href: "#" },
    featured: true,
  },
];

const DRIFT_TRANSITION = {
  duration: 9,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: EASE_IN_OUT,
};

function RibbonsArtwork({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      className="relative size-full overflow-hidden"
      style={{
        background:
          "linear-gradient(125deg, #dff8f6 0%, #8ee6ee 45%, #54bde7 100%)",
      }}
    >
      <motion.div
        className="absolute -top-20 -left-14 size-72 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 66% 65%, rgba(255,255,255,0.94) 0%, rgba(254,179,156,0.72) 26%, rgba(45,205,202,0.14) 62%, transparent 74%)",
        }}
        animate={
          reduce ? undefined : { x: [0, 24], y: [0, 10], scale: [1, 1.08] }
        }
        transition={DRIFT_TRANSITION}
      />
      <motion.div
        className="absolute -right-12 -bottom-24 h-64 w-80 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.82) 0%, rgba(32,188,210,0.28) 48%, transparent 72%)",
        }}
        animate={reduce ? undefined : { x: [0, -18], scale: [1, 1.1] }}
        transition={{ ...DRIFT_TRANSITION, duration: 11 }}
      />
      <div className="absolute inset-0 opacity-45 [background-image:repeating-radial-gradient(ellipse_at_22%_118%,transparent_0,transparent_18px,rgba(255,255,255,0.48)_19px,transparent_20px)]" />
    </div>
  );
}

function SolarArtwork({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      className="relative size-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #a6e3ee 0%, #5ab4d2 48%, #247da8 100%)",
      }}
    >
      <motion.div
        className="absolute -right-10 -bottom-24 size-72 rounded-full blur-lg"
        style={{
          background:
            "radial-gradient(circle at 44% 40%, #fff7c2 0%, #ffba4a 27%, #f36b4f 51%, rgba(238,69,91,0.22) 68%, transparent 74%)",
        }}
        animate={
          reduce ? undefined : { x: [0, -22], y: [0, -8], scale: [1, 1.06] }
        }
        transition={{ ...DRIFT_TRANSITION, duration: 10 }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-44 w-80 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,188,94,0.82) 0%, rgba(245,100,91,0.34) 48%, transparent 72%)",
        }}
        animate={reduce ? undefined : { x: [0, 28], scale: [1, 1.12] }}
        transition={{ ...DRIFT_TRANSITION, duration: 12 }}
      />
      <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.55)_0,rgba(255,255,255,0.55)_1px,transparent_1px,transparent_3px)]" />
    </div>
  );
}

function PlanArtwork({
  artwork,
  reduce,
  canHover,
}: {
  artwork: VisualPricingArtwork;
  reduce: boolean | null;
  canHover: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className="h-36 overflow-hidden border-border border-b"
      whileHover={reduce || !canHover ? undefined : { scale: 1.025 }}
      transition={SPRING_PANEL}
    >
      {artwork === "ribbons" ? (
        <RibbonsArtwork reduce={reduce} />
      ) : (
        <SolarArtwork reduce={reduce} />
      )}
    </motion.div>
  );
}

function externalProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

function VisualPlanCard({
  plan,
  index,
  reduce,
  canHover,
}: {
  plan: VisualPricingPlan;
  index: number;
  reduce: boolean | null;
  canHover: boolean;
}) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce || !canHover ? undefined : { y: -4 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
      className="flex min-h-[34rem] flex-col overflow-hidden rounded-3xl border border-border bg-transparent"
    >
      <PlanArtwork artwork={plan.artwork} reduce={reduce} canHover={canHover} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium text-foreground">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-sans font-medium text-foreground text-2xl tracking-tight">
                {plan.price}
              </span>
              {plan.cadence ? (
                <span className="text-muted-foreground text-sm">
                  {plan.cadence}
                </span>
              ) : null}
            </div>
          </div>
          {plan.badge ? (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-primary/10 via-muted to-background px-2.5 py-1 font-medium text-muted-foreground text-xs shadow-foreground/5 shadow-inner">
              {plan.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-5 max-w-md text-pretty text-muted-foreground text-sm leading-6">
          {plan.description}
        </p>

        <div className="mt-7 border-border border-t pt-6">
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
            What you get
          </p>
          <ul className="mt-4 space-y-3.5">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-foreground/75 text-sm leading-5"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-8">
          <ButtonLink
            href={plan.cta.href}
            size="lg"
            variant={plan.featured ? "primary" : "outline"}
            className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            {...externalProps(plan.cta.external)}
          >
            {plan.cta.label}
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}

export function PricingVisualPlans({
  eyebrow = "Choose your starting point",
  title = "Start free. Bring us in when the stakes rise.",
  description = "Launch on your own today, or book a focused walkthrough when you want a rollout shaped around your team.",
  plans = DEFAULT_PLANS,
  className,
}: PricingVisualPlansProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-4xl">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
            <Gem className="size-4" aria-hidden />
          </span>
          <p className="mt-5 font-medium text-muted-foreground text-xs uppercase tracking-widest">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium text-foreground leading-tight tracking-tight">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-6 sm:text-base">
            {description}
          </p>
        </motion.header>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {plans.map((plan, index) => (
            <VisualPlanCard
              key={plan.id}
              plan={plan}
              index={index}
              reduce={reduce}
              canHover={canHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
