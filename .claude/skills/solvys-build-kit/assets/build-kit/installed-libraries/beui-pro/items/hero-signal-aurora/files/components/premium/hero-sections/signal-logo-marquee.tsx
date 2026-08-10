"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const BRANDS = [
  { name: "Linear", slug: "linear" },
  { name: "Notion", slug: "notion" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Intercom", slug: "intercom" },
  { name: "Stripe", slug: "stripe" },
  { name: "Figma", slug: "figma" },
];

function LogoSet({
  night,
  hidden = false,
}: {
  night: boolean;
  hidden?: boolean;
}) {
  const color = night ? "ffffff" : "171717";

  return (
    <div
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={hidden || undefined}
    >
      {BRANDS.map((brand) => (
        <span
          key={brand.slug}
          className="flex shrink-0 items-center gap-2.5 font-semibold text-base tracking-[-0.025em]"
        >
          {/* biome-ignore lint/performance/noImgElement: Simple Icons serves the official lightweight SVG mark. */}
          <img
            src={`https://cdn.simpleicons.org/${brand.slug}/${color}`}
            alt=""
            aria-hidden
            className="size-5 object-contain opacity-80"
          />
          {brand.name}
        </span>
      ))}
    </div>
  );
}

export function SignalLogoMarquee({ night }: { night: boolean }) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        night ? "text-white/48" : "text-black/42",
      )}
      aria-label="Trusted by product teams at Linear, Notion, HubSpot, Intercom, Stripe, and Figma"
    >
      <style>{`@keyframes signal-logo-marquee { to { transform: translateX(-33.333333%); } }`}</style>
      <div
        className={cn(
          "flex w-max items-center group-hover:[animation-play-state:paused]",
          !reduce && "[animation:signal-logo-marquee_30s_linear_infinite]",
        )}
      >
        <LogoSet night={night} />
        <LogoSet night={night} hidden />
        <LogoSet night={night} hidden />
      </div>
    </section>
  );
}
