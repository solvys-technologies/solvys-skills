"use client";

import {
  Aperture,
  Box,
  Circle,
  Command,
  Gem,
  Hexagon,
  type LucideIcon,
  Octagon,
  Triangle,
} from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Logo = { name: string; icon: LucideIcon };

export type LogoCloudMarqueeProps = {
  eyebrow?: string;
  logos?: Logo[];
  className?: string;
};

const DEFAULT_LOGOS: Logo[] = [
  { name: "Northwind", icon: Hexagon },
  { name: "Relay", icon: Triangle },
  { name: "Cortex", icon: Aperture },
  { name: "Ledger", icon: Box },
  { name: "Beacon", icon: Gem },
  { name: "Stacks", icon: Command },
  { name: "Mosaic", icon: Octagon },
  { name: "Pulse", icon: Circle },
];

export function LogoCloudMarquee({
  eyebrow = "Trusted by teams shipping with beUI",
  logos = DEFAULT_LOGOS,
  className,
}: LogoCloudMarqueeProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px" });
  const [hovered, setHovered] = useState(false);
  const paused = !!reduce || !inView || hovered;

  return (
    <section
      ref={sectionRef}
      className={cn("w-full px-4 py-16 sm:px-8", className)}
    >
      <div className="mx-auto w-full max-w-6xl">
        {eyebrow ? (
          <p className="text-center font-medium text-muted-foreground text-sm">
            {eyebrow}
          </p>
        ) : null}

        <div
          className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <Row logos={logos} paused={paused} speed={26} />
        </div>
      </div>
    </section>
  );
}

function Row({
  logos,
  paused,
  speed,
}: {
  logos: Logo[];
  paused: boolean;
  speed: number;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-measure when logos change.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [logos]);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const half = halfRef.current;
    if (!half) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  const row = [...logos, ...logos];

  return (
    <div ref={trackRef} className="flex w-max">
      <motion.div
        style={{ x }}
        className="flex w-max items-center gap-12 pr-12"
      >
        {row.map((logo, i) => (
          <LogoMark key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

function LogoMark({ logo }: { logo: Logo }) {
  const Icon = logo.icon;
  return (
    <span className="flex shrink-0 items-center gap-2 text-muted-foreground/70 transition-colors hover:text-foreground">
      <Icon className="size-5" strokeWidth={1.75} />
      <span className="font-semibold text-lg tracking-tight">{logo.name}</span>
    </span>
  );
}
