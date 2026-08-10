"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Fixed monogram tint (reads on light and dark). */
  tint: string;
};

export type TestimonialsMarqueeProps = {
  eyebrow?: string;
  title?: string[];
  subtext?: string;
  items?: Testimonial[];
  className?: string;
};

const DEFAULT_ITEMS: Testimonial[] = [
  {
    quote:
      "Shipped our pricing page in an afternoon. The motion is the part I could never get right by hand.",
    name: "Maya Chen",
    role: "Frontend Lead, Northwind",
    tint: "#2563eb",
  },
  {
    quote:
      "Feels like the components were designed by someone who actually ships products, not just demos.",
    name: "Diego Santos",
    role: "Founder, Relay",
    tint: "#059669",
  },
  {
    quote:
      "The agent primitives saved us weeks — streaming, tool calls, and thinking states all handled.",
    name: "Priya Nair",
    role: "Design Engineer, Cortex",
    tint: "#0d9488",
  },
  {
    quote:
      "Copy-paste source means no black-box dependency. We read and own every line we ship.",
    name: "Tom Becker",
    role: "Staff Engineer, Ledger",
    tint: "#d97706",
  },
  {
    quote:
      "Quiet, fast, polished. Our marketing site finally matches the quality of the product.",
    name: "Aisha Khan",
    role: "Head of Design, Beacon",
    tint: "#e11d48",
  },
  {
    quote:
      "Installed from our own registry in one command. Onboarding new engineers is trivial now.",
    name: "Liam O'Brien",
    role: "CTO, Stacks",
    tint: "#0284c7",
  },
  {
    quote:
      "Every block reads perfectly in light and dark. We haven't filed a single theme bug.",
    name: "Sara Lindqvist",
    role: "Product Designer, Mosaic",
    tint: "#ea580c",
  },
  {
    quote:
      "The springs feel native. Reviewers assumed we hand-tuned every single interaction.",
    name: "Kenji Watanabe",
    role: "Eng Manager, Pulse",
    tint: "#0891b2",
  },
];

export function TestimonialsMarquee({
  eyebrow = "Loved by builders",
  title = ["Teams ship faster", "with beUI."],
  subtext = "From solo founders to platform teams — premium motion, owned source, and zero theme bugs.",
  items = DEFAULT_ITEMS,
  className,
}: TestimonialsMarqueeProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px" });
  const [hovered, setHovered] = useState(false);
  const paused = !!reduce || !inView || hovered;

  const mid = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, mid);
  const rowTwo = items.slice(mid).concat(items.slice(0, 1));

  return (
    <section
      ref={sectionRef}
      className={cn("w-full px-4 py-20 sm:px-8", className)}
    >
      <div className="mx-auto w-full max-w-2xl text-center">
        {eyebrow ? (
          <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 font-medium text-muted-foreground text-xs">
            {eyebrow}
          </span>
        ) : null}
        <TextReveal
          as="h2"
          text={title}
          split="word"
          blur={10}
          className="mt-5 text-balance font-serif text-3xl text-foreground leading-[1.1] sm:text-4xl"
        />
        {subtext ? (
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground text-sm leading-7">
            {subtext}
          </p>
        ) : null}
      </div>

      <div
        className="relative mt-14 flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <MarqueeRow items={rowOne} paused={paused} speed={28} />
        <MarqueeRow items={rowTwo} paused={paused} speed={22} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  paused,
  speed,
  reverse = false,
}: {
  items: Testimonial[];
  paused: boolean;
  speed: number;
  reverse?: boolean;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-measure when the item set changes.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const half = halfRef.current;
    if (!half) return;
    const step = ((reverse ? 1 : -1) * (speed * delta)) / 1000;
    let next = x.get() + step;
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  // Two copies so the translation wraps seamlessly at half the track width.
  const cards = [...items, ...items];

  return (
    <div ref={trackRef} className="flex w-max">
      <motion.div style={{ x }} className="flex w-max gap-4">
        {cards.map((item, i) => (
          <Card key={`${item.name}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ item }: { item: Testimonial }) {
  return (
    <figure className="w-[20rem] shrink-0 rounded-2xl border border-border/60 bg-card p-5">
      <blockquote className="text-pretty text-foreground text-sm leading-6">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar name={item.name} />
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground text-sm">
            {item.name}
          </p>
          <p className="truncate text-muted-foreground text-xs">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/10.x/glass/svg?seed=${encodeURIComponent(seed)}`;
}

function Avatar({ name }: { name: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: small remote SVG avatar, no next/image needed.
    <img
      src={avatarUrl(name)}
      alt=""
      aria-hidden
      width={36}
      height={36}
      loading="lazy"
      className="size-9 shrink-0 rounded-full border border-border/60"
    />
  );
}
