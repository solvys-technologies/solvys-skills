"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import {
  AtlasAuthForm,
  type AtlasAuthFormProps,
  AtlasGraphic,
} from "./auth-atlas-shared";

export type AuthAtlasProps = AtlasAuthFormProps;

export function AuthAtlas({ className, ...formProps }: AuthAtlasProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative flex min-h-[var(--preview-viewport-height,100svh)] w-full items-center justify-center overflow-hidden bg-background",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT }
        }
        className="relative flex min-h-[var(--preview-viewport-height,100svh)] w-full items-start justify-center overflow-hidden bg-background px-6 pt-16 sm:px-10 sm:pt-20"
      >
        <AtlasAuthForm {...formProps} className="relative z-10" />

        <div
          className="pointer-events-none absolute bottom-[-18%] left-[-30%] flex w-[125%] justify-center [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_44%,black_74%)]"
          aria-hidden="true"
        >
          <AtlasGraphic className="w-full max-w-none" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </motion.div>
    </section>
  );
}
