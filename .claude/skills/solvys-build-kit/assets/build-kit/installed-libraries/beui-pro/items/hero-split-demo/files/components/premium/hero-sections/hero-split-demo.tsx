"use client";

import { Aperture, Box, Hexagon, Layers, Triangle, Zap } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";

const FACES = ["Aria", "Milo", "Juno", "Remy"];

const LOGOS: { name: string; icon: typeof Layers }[] = [
  { name: "Northwind", icon: Layers },
  { name: "Cadenza", icon: Hexagon },
  { name: "Vertex", icon: Aperture },
  { name: "Mosaic", icon: Box },
  { name: "Beacon", icon: Triangle },
  { name: "Relay", icon: Zap },
];

export function HeroSplitDemo() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.52, ease: EASE_OUT, delay },
        };

  return (
    <section className="relative w-full overflow-hidden px-4 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-2xl text-center">
        <motion.span
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-1.5 font-medium text-foreground text-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)]"
        >
          <span className="flex">
            {FACES.map((seed, i) => (
              // biome-ignore lint/performance/noImgElement: small remote SVG avatar
              <motion.img
                key={seed}
                src={`https://api.dicebear.com/10.x/glass/svg?seed=${seed}`}
                alt=""
                aria-hidden
                initial={reduce ? false : { opacity: 0, scale: 0.5, x: -6 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { ...SPRING_BOUNCE, delay: 0.2 + i * 0.08 }
                }
                className="-ml-2 size-5 rounded-full ring-2 ring-card first:ml-0"
              />
            ))}
          </span>
          Trusted by 8,000+ teams
        </motion.span>

        <motion.h2
          {...rise(0.06)}
          className="mt-6 text-balance font-serif text-3xl text-foreground leading-[1.1] sm:text-5xl"
        >
          Search that understands what you mean
        </motion.h2>

        <motion.p
          {...rise(0.12)}
          className="mx-auto mt-5 max-w-md text-pretty text-base text-muted-foreground leading-7"
        >
          Ask in plain language and Atlas ranks the most relevant docs, tickets,
          and threads — no keywords or filters required.
        </motion.p>

        <motion.div
          {...rise(0.18)}
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <ButtonLink href="/" size="lg" className="rounded-full">
            Get started
          </ButtonLink>
          <ButtonLink
            href="/"
            variant="secondary"
            size="lg"
            className="rounded-full"
          >
            Request a demo
          </ButtonLink>
        </motion.div>
      </div>

      {/* Trusted-by logo marquee. */}
      <motion.div {...rise(0.26)} className="mt-16">
        <p className="text-center text-muted-foreground/80 text-xs">
          Searched across the stacks teams trust
        </p>
        <LogoMarquee reduce={reduce} />
      </motion.div>
    </section>
  );
}

function LogoMarquee({ reduce }: { reduce: boolean | null }) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || paused) return;
    const half = halfRef.current;
    if (!half) return;
    let next = x.get() - (22 * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  // Repeat enough that each half spans the full width — no gap before the wrap.
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div
      className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex w-max">
        <motion.div style={{ x }} className="flex w-max gap-10">
          {items.map((logo, i) => {
            const Icon = logo.icon;
            return (
              <span
                key={`${logo.name}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 font-semibold text-base text-muted-foreground/60"
              >
                <Icon className="size-5 text-muted-foreground/80" />
                {logo.name}
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
