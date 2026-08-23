"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { AnimatedPrice } from "./animated-price";
import { GradientWaves } from "./gradient-waves";
import type { PricingPeriod } from "./types";

export type AuroraDuoPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  priceSuffix?: string;
  features: string[];
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  featured?: boolean;
};

export type PricingAuroraDuoProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  plans?: AuroraDuoPlan[];
  defaultPeriod?: PricingPeriod;
  annualNote?: string;
  className?: string;
};

const DEFAULT_PLANS: AuroraDuoPlan[] = [
  {
    id: "free",
    name: "Free",
    description:
      "For small launches and the first workflows that prove the idea.",
    monthlyPrice: 0,
    annualPrice: 0,
    priceSuffix: "/month",
    features: [
      "One active workspace",
      "Core building blocks",
      "Community templates",
      "Standard exports",
      "Community support",
    ],
    cta: { label: "Start with Free", href: "#" },
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "For products ready to move faster without trading away finish.",
    monthlyPrice: 24,
    annualPrice: 19,
    priceSuffix: "/month",
    features: [
      "Everything in Free",
      "Unlimited workspaces",
      "Premium building blocks",
      "Production-ready exports",
      "Priority support",
    ],
    cta: { label: "Continue with Pro", href: "#" },
    featured: true,
  },
];

function externalProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

function BottomAurora({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden [mask-image:linear-gradient(to_top,black_18%,black_68%,transparent_100%)]"
    >
      <GradientWaves
        className="absolute -inset-x-[20%] -bottom-[8%] h-[122%] w-[140%]"
        horizonColor="#071328"
        waveColor="#0668e8"
        crestColor="#22d3ee"
        speed={reduce ? 0 : 0.32}
        amplitude={2.8}
        waveScale={0.68}
        waveRatio={0.82}
        swell={39}
        turbulence={18}
        tilt={1.08}
        zoom={0.88}
        height={5.8}
        fogDepth={17}
        detail="medium"
        brightness={1.12}
        opacity={0.96}
        mouseInteraction={!reduce}
        parallaxStrength={0.28}
        grain={!reduce}
        grainIntensity={0.025}
      />
    </div>
  );
}

function PlanCard({
  plan,
  period,
  reduce,
  index,
}: {
  plan: AuroraDuoPlan;
  period: PricingPeriod;
  reduce: boolean | null;
  index: number;
}) {
  const amount = period === "annual" ? plan.annualPrice : plan.monthlyPrice;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE_OUT }}
      className="relative flex min-h-[34rem] flex-col overflow-hidden rounded-3xl border border-border bg-transparent p-6 sm:p-7"
    >
      {plan.featured ? <BottomAurora reduce={reduce} /> : null}

      <div className="relative z-10 flex flex-1 flex-col">
        <h3 className="text-xl font-medium text-foreground">{plan.name}</h3>

        <AnimatedPrice
          amount={amount}
          suffix={plan.priceSuffix}
          className="mt-5 text-5xl font-medium tracking-tight [&>span:first-child]:self-end [&>span:first-child]:pt-0 [&>span:first-child]:pb-[0.46em]"
        />

        <p className="mt-5 max-w-sm text-pretty text-muted-foreground text-sm leading-6">
          {plan.description}
        </p>

        <div className="my-7 flex items-center gap-3 text-muted-foreground text-xs uppercase tracking-widest">
          <span className="h-px flex-1 bg-border" />
          Plan includes
          <span className="h-px flex-1 bg-border" />
        </div>

        <ul className="space-y-3.5">
          {plan.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.16 + featureIndex * 0.04,
                ease: EASE_OUT,
              }}
              className="flex items-center gap-3 text-foreground/75 text-sm"
            >
              <Check className="size-4 shrink-0 text-foreground" />
              {feature}
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <ButtonLink
            href={plan.cta.href}
            size="lg"
            variant={plan.featured ? "primary" : "outline"}
            className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            {...externalProps(plan.cta.external)}
          >
            {plan.cta.label}
            {plan.featured ? <ArrowRight className="size-4" /> : null}
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}

export function PricingAuroraDuo({
  eyebrow = "Plans for every stage",
  title = "Start simple. Upgrade when the work earns it.",
  description = "Choose the room you need today. Keep every path open for tomorrow.",
  plans = DEFAULT_PLANS,
  defaultPeriod = "monthly",
  annualNote = "Save 20%",
  className,
}: PricingAuroraDuoProps) {
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState<PricingPeriod>(defaultPeriod);

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-4xl">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-medium text-foreground leading-tight tracking-tight">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-6 sm:text-base">
            {description}
          </p>
          <div className="mt-7">
            <Tabs
              value={period}
              onValueChange={(value) => setPeriod(value as PricingPeriod)}
              variant="pill"
            >
              <TabsList
                aria-label="Billing period"
                className="border border-border"
              >
                <TabsTrigger value="monthly" className="min-h-10 px-4">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="annual" className="min-h-10 px-4">
                  Annual
                  <span className="ml-2 text-xs opacity-70">{annualNote}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.header>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              period={period}
              reduce={reduce}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
