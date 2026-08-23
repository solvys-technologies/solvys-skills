"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";
import {
  AtlasAuthForm,
  type AtlasAuthFormProps,
  AtlasGraphic,
} from "./auth-atlas-shared";

export type AuthAtlasSplitProps = AtlasAuthFormProps & {
  artworkLabel?: string;
};

export function AuthAtlasSplit({
  artworkLabel = "One account. Every workspace.",
  className,
  ...formProps
}: AuthAtlasSplitProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "flex min-h-[var(--preview-viewport-height,100svh)] w-full items-center justify-center bg-background",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT }
        }
        className="grid min-h-[var(--preview-viewport-height,100svh)] w-full overflow-hidden bg-background lg:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="flex items-center justify-center px-6 py-16 sm:px-10 lg:px-14">
          <AtlasAuthForm {...formProps} />
        </div>

        <div className="relative h-56 overflow-hidden border-border border-t lg:h-auto lg:border-t-0">
          <Grainient
            className="absolute inset-y-0 left-0 h-full w-[calc(100%+1px)]"
            color1="#315f9f"
            color2="#4b82e5"
            color3="#b8d7ff"
            timeSpeed={reduce ? 0 : 0.18}
            colorBalance={-0.08}
            warpStrength={0.85}
            warpFrequency={4.2}
            warpSpeed={1.35}
            warpAmplitude={56}
            blendAngle={-18}
            blendSoftness={0.12}
            rotationAmount={280}
            noiseScale={1.5}
            grainAmount={0.055}
            contrast={1.08}
            saturation={1.02}
            zoom={0.82}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-[#173b72]/15" />

          <AtlasGraphic
            vivid
            className="absolute inset-x-[-5%] top-1/2 w-[110%] -translate-y-1/2 lg:inset-x-[-18%] lg:w-[136%]"
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.7, ease: EASE_OUT }
            }
            className="absolute bottom-8 left-8 hidden rounded-full border border-border/60 bg-background/80 px-4 py-2 font-medium text-foreground text-sm backdrop-blur-sm lg:block"
          >
            {artworkLabel}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
