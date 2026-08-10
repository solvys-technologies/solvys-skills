"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { EASE_OUT } from "@/lib/ease";

type MarketplaceGradientFloorProps = {
  dark: boolean;
};

const WIDTH = 1440;
const HEIGHT = 560;
const BAR_COUNT = 11;

function barHeight(index: number) {
  const midpoint = (BAR_COUNT - 1) / 2;
  const distance = Math.abs(index - midpoint) / midpoint;
  return HEIGHT * (0.42 + (1 - distance ** 1.35) * 0.58);
}

export function MarketplaceGradientFloor({
  dark,
}: MarketplaceGradientFloorProps) {
  const reduce = useReducedMotion();
  const id = useId().replaceAll(":", "");
  const gradientId = `marketplace-floor-${id}`;
  const blurId = `marketplace-blur-${id}`;
  const colors = dark
    ? ["#07111f", "#0b63ce", "#66cbd1", "#ffd7a8", "#ef6475"]
    : ["#d9e8ff", "#77b7ff", "#8ee0d4", "#ffe2a8", "#f49aa7"];

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scaleY: 0.72 }}
      animate={{ opacity: dark ? 0.88 : 0.72, scaleY: 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 1.1, ease: EASE_OUT, delay: 0.18 }
      }
      className="h-full w-full origin-bottom"
    >
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            {colors.map((color, index) => (
              <stop
                key={color}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
          <filter id={blurId} x="-30%" y="-35%" width="160%" height="170%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {Array.from({ length: BAR_COUNT }, (_, index) => {
          const width = WIDTH / BAR_COUNT;
          const height = barHeight(index);

          return (
            <rect
              // biome-ignore lint/suspicious/noArrayIndexKey: Decorative bars are a fixed, immutable sequence.
              key={index}
              x={index * width - width * 0.08}
              y={HEIGHT - height}
              width={width * 1.18}
              height={height}
              rx={width * 0.45}
              fill={`url(#${gradientId})`}
              filter={`url(#${blurId})`}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
