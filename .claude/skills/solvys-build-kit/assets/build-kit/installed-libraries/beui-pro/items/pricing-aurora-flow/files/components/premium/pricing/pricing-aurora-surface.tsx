"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/ease";
import { useDarkTheme } from "@/lib/hooks/use-dark-theme";
import { cn } from "@/lib/utils";

const WIDTH = 640;
const HEIGHT = 720;
const BAR_COUNT = 9;

function barHeight(index: number) {
  const midpoint = (BAR_COUNT - 1) / 2;
  const distance = Math.abs(index - midpoint) / midpoint;
  return HEIGHT * (0.46 + (1 - distance ** 1.45) * 0.42);
}

export function PricingAuroraSurface() {
  const reduce = useReducedMotion();
  const dark = useDarkTheme();
  const id = useId().replaceAll(":", "");
  const gradientId = `pricing-aurora-${id}`;
  const blurId = `pricing-aurora-blur-${id}`;
  const colors = dark
    ? ["#210b14", "#a7244e", "#f15f7c", "#ffad68", "#ffe0aa"]
    : ["#f8e4df", "#ee9eaf", "#e96882", "#f2a165", "#ffd69e"];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden transition-colors duration-500",
        dark ? "bg-[#0b0c0f]" : "bg-[#f7f4f0]",
      )}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scaleY: 0.72 }}
        animate={{ opacity: dark ? 0.98 : 0.74, scaleY: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 1.05, ease: EASE_OUT, delay: 0.12 }
        }
        className="absolute -inset-x-[20%] -bottom-[9%] h-[91%] origin-bottom [mask-image:linear-gradient(to_top,black_4%,black_65%,transparent_100%)]"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  x: ["-2.5%", "3.5%", "-1%"],
                  scaleX: [1.03, 0.97, 1.015],
                  scaleY: [0.98, 1.035, 0.99],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 10.5,
                  ease: EASE_IN_OUT,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }
          }
          className="size-full origin-bottom will-change-transform"
        >
          <svg
            aria-hidden="true"
            className="size-full"
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
              <filter id={blurId} x="-45%" y="-42%" width="190%" height="190%">
                <feGaussianBlur stdDeviation="34" />
              </filter>
            </defs>

            {Array.from({ length: BAR_COUNT }, (_, index) => {
              const width = WIDTH / BAR_COUNT;
              const height = barHeight(index);

              return (
                <motion.rect
                  // biome-ignore lint/suspicious/noArrayIndexKey: Decorative bars are a fixed sequence.
                  key={index}
                  x={index * width - width * 0.12}
                  y={HEIGHT - height}
                  width={width * 1.24}
                  height={height}
                  rx={width * 0.52}
                  fill={`url(#${gradientId})`}
                  filter={`url(#${blurId})`}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 100%",
                  }}
                  animate={
                    reduce
                      ? { opacity: 0.9, scaleY: 1 }
                      : {
                          opacity: [0.72, 0.98, 0.8],
                          scaleY: [0.78 + index * 0.012, 1, 0.86],
                        }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          duration: 5.4 + index * 0.24,
                          delay: index * -0.31,
                          ease: EASE_IN_OUT,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                        }
                  }
                />
              );
            })}
          </svg>
        </motion.div>
      </motion.div>

      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          dark
            ? "bg-[linear-gradient(to_bottom,#0b0c0f_8%,rgba(11,12,15,0.76)_38%,rgba(11,12,15,0.08)_100%)]"
            : "bg-[linear-gradient(to_bottom,#f7f4f0_8%,rgba(247,244,240,0.67)_38%,rgba(247,244,240,0.04)_100%)]",
        )}
      />
    </div>
  );
}
