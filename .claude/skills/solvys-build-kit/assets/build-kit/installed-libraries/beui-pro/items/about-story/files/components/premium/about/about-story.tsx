"use client";

import { ArrowRight, Compass, Flag, HeartHandshake, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";
import { type Stat, StatsBand } from "../stats";
import { TeamGrid, type TeamMember } from "../team";

const VALUES = [
  {
    icon: Compass,
    title: "Craft over noise",
    body: "We sweat the details others skip — motion, timing, and the small interactions that make software feel alive.",
  },
  {
    icon: HeartHandshake,
    title: "Customers first",
    body: "Every roadmap call starts with the people using the product. We build with them, not just for them.",
  },
  {
    icon: Zap,
    title: "Ship, then sharpen",
    body: "We move fast and refine in the open — small focused releases beat big risky ones, every time.",
  },
];

const FACES = ["Priya", "Marcus", "Lena", "Theo", "Noa"];

const ABOUT_STATS: Stat[] = [
  { value: 14, suffix: "k+", label: "Teams building", sub: "worldwide" },
  { value: 92, suffix: "+", label: "Countries reached", sub: "and counting" },
  { value: 60, suffix: "", label: "Teammates", sub: "nine time zones" },
  { value: 8, suffix: "yrs", label: "Shipping since 2018", sub: "in the open" },
];

const LEADERS: TeamMember[] = [
  { name: "Priya Nair", role: "Co-founder & CEO", seed: "Priya" },
  { name: "Marcus Vale", role: "Co-founder & CTO", seed: "Marcus" },
  { name: "Lena Ortiz", role: "Head of Design", seed: "Lena" },
  { name: "Theo Park", role: "Head of Engineering", seed: "Theo" },
];

export type AboutStoryProps = {
  brand?: string;
  className?: string;
};

export function AboutStory({ brand = "beUI", className }: AboutStoryProps) {
  const reduce = useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <div className={cn("w-full", className)}>
      <section className="w-full px-4 pt-20 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          {/* Intro. */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              {...rise()}
              className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 font-medium text-muted-foreground text-xs"
            >
              About {brand}
            </motion.span>

            <TextReveal
              as="h1"
              text={["We build the motion layer", "modern teams ship with."]}
              split="word"
              blur={10}
              className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] sm:text-6xl"
            />

            <motion.p
              {...rise(0.12)}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground leading-8"
            >
              {brand} started with a simple frustration: great products deserve
              great motion, but it's the first thing teams cut for time. So we
              made it copy-paste easy.
            </motion.p>

            <motion.div
              {...rise(0.18)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <ButtonLink href="#" size="lg" className="rounded-full">
                Join the team
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="#"
                variant="secondary"
                size="lg"
                className="rounded-full"
              >
                Our story
              </ButtonLink>
            </motion.div>
          </div>

          {/* Visual collage. */}
          <motion.div
            {...rise(0.1)}
            className="mt-16 grid gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:[height:24rem]"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border sm:col-span-2 sm:row-span-2">
              <Grainient
                className="absolute inset-0"
                color1="#dfe9a6"
                color2="#6fb389"
                color3="#cf9a5c"
                grainAmount={0.09}
                contrast={1.15}
                zoom={0.8}
              />
              <div className="relative flex h-full min-h-44 flex-col justify-end p-7">
                <p className="font-serif text-2xl text-white drop-shadow-sm sm:text-3xl">
                  Remote-first, craft-obsessed
                </p>
                <p className="mt-1 max-w-sm text-sm text-white/80">
                  A small team across nine time zones, shipping in the open.
                </p>
              </div>
            </div>

            {/* People tile. */}
            <div className="flex flex-col justify-between rounded-3xl border border-border p-6">
              <div className="flex -space-x-2.5">
                {FACES.map((seed) => (
                  // biome-ignore lint/performance/noImgElement: small remote SVG avatar
                  <img
                    key={seed}
                    src={`https://api.dicebear.com/10.x/notionists/svg?seed=${seed}`}
                    alt=""
                    aria-hidden
                    className="size-9 rounded-full bg-muted ring-2 ring-background"
                  />
                ))}
              </div>
              <div>
                <p className="font-medium text-foreground">A senior crew</p>
                <p className="mt-0.5 text-muted-foreground text-sm">
                  Designers and engineers who've shipped at scale.
                </p>
              </div>
            </div>

            {/* Founded tile. */}
            <div className="flex flex-col justify-between rounded-3xl border border-border p-6">
              <span className="grid size-10 place-items-center rounded-full bg-accent/15 text-accent">
                <Flag className="size-5" />
              </span>
              <div>
                <p className="font-serif text-3xl text-foreground">Est. 2018</p>
                <p className="mt-0.5 text-muted-foreground text-sm">
                  Building in the open ever since.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission + values. */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <motion.h2
                {...rise()}
                className="text-balance font-serif text-3xl text-foreground leading-tight sm:text-4xl"
              >
                Our mission is to make premium feel default.
              </motion.h2>
              <motion.p
                {...rise(0.08)}
                className="mt-5 text-pretty text-muted-foreground leading-8"
              >
                For too long, the polish that makes products feel premium lived
                only inside a handful of well-funded design teams. We're
                changing that — packaging the motion, the timing, and the taste
                into source you own and ship the same day.
              </motion.p>
              <motion.p
                {...rise(0.14)}
                className="mt-4 text-pretty text-muted-foreground leading-8"
              >
                No black-box dependencies, no lock-in. Just thoughtful
                components, built to be read, tweaked, and made yours.
              </motion.p>
            </div>

            <div className="flex flex-col gap-4">
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  {...rise(i * 0.08)}
                  className="flex gap-4 rounded-3xl border border-border p-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <value.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground text-sm leading-6">
                      {value.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Composed from our own premium blocks. */}
      <StatsBand
        eyebrow="By the numbers"
        title="Trusted by teams who care about craft."
        stats={ABOUT_STATS}
      />

      <TeamGrid
        eyebrow="Team"
        title="The people behind it."
        subtext="Designers and engineers who've shipped at the companies you know — now building in the open."
        members={LEADERS}
      />

      {/* CTA. */}
      <section className="w-full px-4 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            {...rise()}
            className="flex flex-col items-center gap-5 rounded-[2rem] border border-border p-10 text-center sm:p-16"
          >
            <span className="inline-flex items-center rounded-full border border-border px-3.5 py-1.5 font-medium text-muted-foreground text-xs">
              Careers
            </span>
            <h2 className="max-w-xl text-balance font-serif text-3xl text-foreground sm:text-4xl">
              Want to build the future of motion with us?
            </h2>
            <p className="max-w-md text-pretty text-muted-foreground leading-7">
              We're hiring across design and engineering, fully remote. Come
              help us make premium the default.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="#" size="lg" className="rounded-full">
                See open roles
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="#"
                variant="secondary"
                size="lg"
                className="rounded-full"
              >
                Say hello
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
