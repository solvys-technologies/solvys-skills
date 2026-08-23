"use client";

import { ArrowLeft } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export type NotFoundSpotlightProps = {
  homeHref?: string;
  className?: string;
};

export function NotFoundSpotlight({
  homeHref = "/",
  className,
}: NotFoundSpotlightProps) {
  const reduce = useReducedMotion() ?? false;
  const canHover = useHoverCapable();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(circle 180px at ${springX}% ${springY}%, black 0%, black 35%, transparent 76%)`;

  return (
    <section
      onPointerMove={(event) => {
        if (!canHover || reduce) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
        pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
      }}
      className={cn(
        "relative flex min-h-[680px] w-full flex-col overflow-hidden bg-background text-foreground [container-type:inline-size]",
        className,
      )}
    >
      <header className="relative z-20 flex min-h-20 items-center justify-between px-5 sm:px-8">
        <a
          href={homeHref}
          className="text-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          Aperture
        </a>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Move to reveal
        </span>
      </header>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5">
        <p
          aria-hidden="true"
          className="select-none font-semibold text-[34cqw] text-transparent leading-none tracking-[-0.11em]"
          style={{
            WebkitTextStroke:
              "1px color-mix(in oklch, var(--foreground) 16%, transparent)",
          }}
        >
          404
        </p>
        <motion.p
          aria-label="404"
          className="absolute select-none bg-[linear-gradient(115deg,var(--muted-foreground)_10%,var(--foreground)_48%,color-mix(in_oklch,var(--foreground)_62%,var(--background))_82%)] bg-clip-text font-semibold text-[34cqw] text-transparent leading-none tracking-[-0.11em]"
          style={
            reduce
              ? undefined
              : {
                  maskImage: spotlight,
                  WebkitMaskImage: spotlight,
                }
          }
        >
          404
        </motion.p>
      </div>

      <div className="relative z-20 flex flex-col items-center px-5 pb-10 text-center sm:pb-12">
        <h1 className="font-medium text-lg tracking-[-0.03em]">
          Lost in the dark.
        </h1>
        <ButtonLink
          href={homeHref}
          size="lg"
          variant="outline"
          className="mt-5 border-border bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back home
        </ButtonLink>
      </div>
    </section>
  );
}
