"use client";

import {
  ArrowRight,
  Check,
  Clock,
  Palette,
  Star,
  Upload,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";

const TITLES = [
  {
    title: "Let's get to know you",
    sub: "Drop your first and last name below — just so we know what to call you.",
  },
  {
    title: "Let's make it official",
    sub: "Add your logo and company details — we'll set you up right away.",
  },
  {
    title: "Welcome aboard",
    sub: "Upload your assets, describe your style, and let the magic unfold.",
  },
];

const PERKS = [
  { icon: Upload, body: "Upload your brand manual and illustrations." },
  { icon: Palette, body: "Generate on-brand visuals from a single prompt." },
  { icon: Zap, body: "Keep every creation consistent, effortless, and yours." },
];

// Per-step grainient palette (no purple): blue → emerald → amber.
const GRAINS = [
  { color1: "#cfe0fb", color2: "#5b8def", color3: "#2f5fb0" },
  { color1: "#b9f0d8", color2: "#34c98a", color3: "#0f9468" },
  { color1: "#fde4c4", color2: "#f6a86a", color3: "#e0824a" },
];

const LAST = 2;

export type OnboardingSplitProps = {
  brand?: string;
  logoSrc?: string;
  className?: string;
};

export function OnboardingSplit({
  brand = "beUI",
  logoSrc = "/beui-mark.png",
  className,
}: OnboardingSplitProps) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");

  const fade = reduce
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 12, filter: "blur(5px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -12, filter: "blur(5px)" },
        transition: { duration: 0.3, ease: EASE_OUT },
      };

  return (
    <section
      className={cn("grid min-h-screen w-full lg:grid-cols-2", className)}
    >
      {/* Left: form. */}
      <div className="flex items-center p-6 sm:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          <p className="font-mono text-muted-foreground text-sm tabular-nums">
            0{step + 1} / 03
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} {...fade}>
              <h1 className="mt-4 text-balance font-serif text-3xl text-foreground sm:text-4xl">
                {TITLES[step].title}
              </h1>
              <p className="mt-3 max-w-sm text-pretty text-muted-foreground leading-7">
                {TITLES[step].sub}
              </p>

              <div className="mt-10">
                {step === 0 ? (
                  <div className="flex flex-col gap-3">
                    <Field
                      label="First name"
                      value={first}
                      onChange={setFirst}
                      placeholder="Ada"
                    />
                    <Field
                      label="Last name"
                      value={last}
                      onChange={setLast}
                      placeholder="Lovelace"
                    />
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <span className="size-16 shrink-0 rounded-2xl bg-gradient-to-br from-sky-400 via-emerald-300 to-amber-300" />
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Company logo
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="mt-1.5 rounded-full"
                        >
                          Choose
                        </Button>
                      </div>
                    </div>
                    <Field
                      label="Company name"
                      value={company}
                      onChange={setCompany}
                      placeholder="Acme Inc"
                    />
                    <Field
                      label="Workspace URL"
                      value={url}
                      onChange={setUrl}
                      placeholder="acme.beui.app"
                    />
                  </div>
                ) : null}

                {step === 2 ? (
                  <ul className="flex flex-col gap-4">
                    {PERKS.map((perk) => (
                      <li key={perk.body} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                          <perk.icon className="size-4" />
                        </span>
                        <span className="text-pretty text-foreground text-sm leading-6">
                          {perk.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>

          {step === 0 ? (
            <p className="mt-8 max-w-sm text-muted-foreground text-xs leading-5">
              By clicking "Continue", you agree to {brand}'s{" "}
              <a
                href="/"
                className="text-foreground underline underline-offset-2"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/"
                className="text-foreground underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          ) : null}

          <div className="mt-8 flex items-center gap-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full"
              >
                Back
              </Button>
            ) : null}
            <Button
              type="button"
              size="lg"
              onClick={() => setStep((s) => Math.min(s + 1, LAST))}
              className={cn("rounded-full", step === 0 && "w-full")}
            >
              {step === LAST ? "Let's go" : "Continue"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right: animated app mock. */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* Grainient backdrop, swaps palette per step. */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <Grainient
              className="absolute inset-0"
              color1={GRAINS[step].color1}
              color2={GRAINS[step].color2}
              color3={GRAINS[step].color3}
              grainAmount={0.08}
              contrast={1.12}
              zoom={0.82}
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating live card with a pointer-driven 3D tilt. */}
        <div className="absolute inset-0 grid place-items-center p-12">
          <Tilt reduce={reduce} className="mx-auto w-full max-w-sm">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.96 }
                }
                transition={
                  reduce ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }
                }
              >
                {step === 0 ? (
                  <IdentityCard first={first} last={last} reduce={reduce} />
                ) : null}

                {step === 1 ? (
                  <MockCard>
                    <div className="flex items-center gap-3">
                      <span className="size-10 rounded-xl bg-gradient-to-br from-sky-400 via-emerald-300 to-amber-300" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-neutral-900 text-sm">
                          {company.trim() || "Your company"}
                        </p>
                        <p className="truncate text-neutral-500 text-xs">
                          {url.trim() || "workspace.beui.app"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-2.5">
                      {[0, 1, 2].map((n) => (
                        <div key={n} className="flex items-center gap-2.5">
                          <span className="size-5 rounded-md bg-black/10" />
                          <span
                            className="h-2.5 rounded-full bg-black/10"
                            style={{ width: `${70 - n * 12}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-700 text-xs">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      250 credits left
                    </span>
                  </MockCard>
                ) : null}

                {step === 2 ? (
                  <WelcomeCard
                    brand={brand}
                    logoSrc={logoSrc}
                    first={first}
                    last={last}
                    url={url}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

/* Step 2: a premium membership pass — gradient header, avatar, perks, plan. */
function WelcomeCard({
  brand,
  logoSrc,
  first,
  last,
  url,
}: {
  brand: string;
  logoSrc: string;
  first: string;
  last: string;
  url: string;
}) {
  const full = `${first.trim()} ${last.trim()}`.trim();
  const name = full || "Your name";
  const seed = full || "Ada Lovelace";
  const FEATURES = [
    "Unlimited generations",
    "On-brand, every time",
    "Priority support",
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/40 shadow-2xl backdrop-blur-xl">
      {/* Header. */}
      <div className="z-0 relative h-20 bg-gradient-to-br from-amber-200 to-orange-300">
        <span className="absolute top-4 left-5 font-medium text-[11px] text-amber-900/70 uppercase tracking-wider">
          Member pass
        </span>
        <span className="absolute top-4 right-4 grid size-8 place-items-center rounded-xl bg-white/80 shadow-sm">
          {/* biome-ignore lint/performance/noImgElement: small brand mark */}
          <img src={logoSrc} alt={brand} className="size-5 rounded-md" />
        </span>
      </div>

      <div className="px-6 pb-6">
        <span className="mt-5 block size-16 overflow-hidden rounded-full bg-neutral-100">
          {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
          <img
            src={`https://api.dicebear.com/10.x/notionists/svg?seed=${encodeURIComponent(seed)}`}
            alt={name}
            className="size-full"
          />
        </span>
        <div className="mt-3">
          <p className="truncate font-semibold text-lg text-neutral-900 leading-tight">
            {name}
          </p>
          <p className="font-medium text-[11px] text-neutral-500 uppercase tracking-wider">
            The {brand} maker
          </p>
        </div>

        <div className="mt-5 space-y-2">
          {FEATURES.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2.5 text-neutral-800 text-sm"
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="size-2.5" />
              </span>
              {f}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between  pt-4">
          <p className="truncate text-neutral-500 text-xs">
            {url.trim() || "workspace.beui.app"}
          </p>
          <span className="shrink-0 rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-[11px] text-white">
            Pro
          </span>
        </div>
      </div>
    </div>
  );
}

function MockCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/40 shadow-2xl ring-1 ring-white/60 backdrop-blur-xl">
      <div className={cn("relative p-6", className)}>{children}</div>
    </div>
  );
}

/* Pointer-driven 3D tilt wrapper. */
function Tilt({
  children,
  className,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  reduce: boolean | null;
}) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 200,
    damping: 18,
  });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* Step 0: a living identity card — gradient cover, floating avatar,
   live full name, an online dot, and a verified pop. */
function IdentityCard({
  first,
  last,
  reduce,
}: {
  first: string;
  last: string;
  reduce: boolean | null;
}) {
  const name = `${first.trim()} ${last.trim()}`.trim();
  const handle = name ? name.toLowerCase().replace(/\s+/g, "") : "yourname";
  const seed = name || "Ada Lovelace";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl  backdrop-blur-xl">
      {/* Gradient cover with drifting blobs. */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-br from-sky-300/70 to-emerald-300/70">
        {reduce ? null : (
          <>
            <motion.span
              aria-hidden
              animate={{ x: [-10, 18, -10], y: [0, 10, 0] }}
              transition={{
                duration: 9,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="absolute top-2 left-6 size-20 rounded-full bg-sky-400/60 blur-2xl"
            />
            <motion.span
              aria-hidden
              animate={{ x: [10, -16, 10], y: [4, -8, 4] }}
              transition={{
                duration: 11,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="absolute right-8 bottom-0 size-24 rounded-full bg-emerald-400/60 blur-2xl"
            />
          </>
        )}
      </div>

      <div className="relative px-6 pb-6">
        {/* Avatar overlapping the cover. */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
          className="relative -mt-10 w-fit"
        >
          <span className="block size-20 overflow-hidden rounded-full bg-white ring-4 ring-white">
            {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
            <img
              src={`https://api.dicebear.com/10.x/notionists/svg?seed=${encodeURIComponent(seed)}`}
              alt={name || "avatar"}
              className="size-full"
            />
          </span>
        </motion.div>

        {/* Name + verified. */}
        <div className="mt-4 flex items-center gap-2">
          <p className="font-semibold text-2xl text-neutral-900">
            {name || "Your name"}
          </p>
          <AnimatePresence>
            {name ? (
              <motion.span
                aria-hidden
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 480, damping: 18 }
                }
                className="grid size-5 place-items-center rounded-full bg-sky-500 text-white"
              >
                <Check className="size-3" />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
        <p className="mt-0.5 text-neutral-500 text-sm">@{handle}</p>

        {/* Meta chips. */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { icon: Star, label: "New member" },
            { icon: Clock, label: "Joined today" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-neutral-500 text-xs"
            >
              <Icon className="size-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block rounded-2xl border border-border bg-background px-4 py-2.5 transition-colors focus-within:border-foreground/40 focus-within:ring-2 focus-within:ring-foreground/15">
      <span className="block font-medium text-muted-foreground text-xs">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0.5 w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
      />
    </label>
  );
}
