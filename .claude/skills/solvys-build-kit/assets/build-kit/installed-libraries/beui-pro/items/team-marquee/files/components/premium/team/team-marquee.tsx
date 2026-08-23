"use client";

import { AtSign, Globe } from "lucide-react";
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

export type TeamMarqueeMember = {
  name: string;
  role: string;
  bio: string;
  seed: string;
};

export type TeamMarqueeProps = {
  eyebrow?: string;
  title?: string[];
  subtext?: string;
  members?: TeamMarqueeMember[];
  className?: string;
};

const DEFAULT_MEMBERS: TeamMarqueeMember[] = [
  {
    name: "Maya Okafor",
    role: "Founder & CEO",
    bio: "Sets the vision and keeps the bar absurdly high. Ex-design systems lead.",
    seed: "Maya",
  },
  {
    name: "Dev Sharma",
    role: "Head of Engineering",
    bio: "Owns the registry and runtime. Motion is a feature, not a finish.",
    seed: "Dev",
  },
  {
    name: "Lior Adler",
    role: "Design Lead",
    bio: "Tunes every spring and curve until it feels physical.",
    seed: "Lior",
  },
  {
    name: "Ana Ruiz",
    role: "Developer Advocate",
    bio: "Turns gnarly APIs into docs you actually enjoy reading.",
    seed: "Ana",
  },
  {
    name: "Kenji Mori",
    role: "Staff Engineer",
    bio: "Performance obsessive — ships 60fps or doesn't ship at all.",
    seed: "Kenji",
  },
  {
    name: "Priya Nair",
    role: "Product Manager",
    bio: "Keeps the roadmap honest and the scope ruthless.",
    seed: "Priya",
  },
  {
    name: "Sam Cole",
    role: "Motion Designer",
    bio: "Storyboards the interactions before a line of code is written.",
    seed: "Sam",
  },
  {
    name: "Tariq Hassan",
    role: "Infra Engineer",
    bio: "Keeps the edge fast and the deploys boring.",
    seed: "Tariq",
  },
  {
    name: "Noa Berger",
    role: "Frontend Engineer",
    bio: "Lives in the component layer; allergic to layout shift.",
    seed: "Noa",
  },
  {
    name: "Ravi Menon",
    role: "Platform Engineer",
    bio: "Builds the tooling that makes everyone else faster.",
    seed: "Ravi",
  },
];

export function TeamMarquee({
  eyebrow = "Team",
  title = ["The humans behind", "every component."],
  subtext = "A small, senior crew obsessed with motion, craft, and developer experience.",
  members = DEFAULT_MEMBERS,
  className,
}: TeamMarqueeProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px" });
  const [hovered, setHovered] = useState(false);
  const paused = !!reduce || !inView || hovered;

  const mid = Math.ceil(members.length / 2);
  const rowOne = members.slice(0, mid);
  const rowTwo = members.slice(mid).concat(members.slice(0, 1));

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
        <MarqueeRow items={rowOne} paused={paused} speed={26} />
        <MarqueeRow items={rowTwo} paused={paused} speed={20} reverse />
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
  items: TeamMarqueeMember[];
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
          <Chip key={`${item.seed}-${i}`} member={item} />
        ))}
      </motion.div>
    </div>
  );
}

function Chip({ member }: { member: TeamMarqueeMember }) {
  return (
    <div className="flex w-[20rem] shrink-0 flex-col rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-border">
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/12 to-muted">
          {/* biome-ignore lint/performance/noImgElement: small remote SVG avatar */}
          <img
            src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${member.seed}`}
            alt={member.name}
            className="size-9"
          />
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground text-sm">
            {member.name}
          </p>
          <p className="truncate text-muted-foreground text-xs">
            {member.role}
          </p>
        </div>
      </div>
      <p className="mt-3 text-pretty text-muted-foreground text-xs leading-5">
        {member.bio}
      </p>
      <div className="mt-3 flex items-center gap-1.5">
        {[Globe, AtSign].map((Icon, idx) => (
          <a
            key={idx === 0 ? "site" : "social"}
            href="/"
            aria-label={
              idx === 0 ? `${member.name} website` : `${member.name} social`
            }
            className="grid size-7 place-items-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <Icon className="size-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
