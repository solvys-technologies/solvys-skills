"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const DARK_COLORS = ["#08090c", "#0b2455", "#087c82", "#ef5a71", "#f0c3a8"];
const LIGHT_COLORS = ["#f7f1e8", "#7fcfc9", "#5b8fe8", "#f28da1", "#f2cba7"];

export function SignalAurora({ night }: { night: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          night
            ? "bg-[radial-gradient(ellipse_at_55%_92%,#176d76_0%,#173b72_28%,#0a0b0f_66%)]"
            : "bg-[radial-gradient(ellipse_at_55%_92%,#9ddbd4_0%,#a7bde8_30%,#f5f0e8_70%)]",
        )}
      />

      <MeshGradient
        className={cn(
          "absolute inset-x-[-8%] top-[-12%] h-[124%] w-[116%] transition-opacity duration-500",
          night ? "opacity-95" : "opacity-75",
        )}
        colors={night ? DARK_COLORS : LIGHT_COLORS}
        speed={reduce ? 0 : 0.24}
        distortion={1.25}
        swirl={0.72}
        grainMixer={0.16}
        grainOverlay={0.08}
        scale={1.18}
        maxPixelCount={1_250_000}
      />

      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          night
            ? "bg-gradient-to-b from-[#08090c]/72 via-[#08090c]/22 to-[#08090c]/5"
            : "bg-gradient-to-b from-[#f7f1e8]/68 via-[#f7f1e8]/18 to-transparent",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          night
            ? "bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.32)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_34%,rgba(35,25,15,0.08)_100%)]",
        )}
      />
    </div>
  );
}
