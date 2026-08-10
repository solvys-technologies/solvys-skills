import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string;
  className?: string;
  fade?: boolean;
}

export function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  gap = "1rem",
  className,
  fade = true,
}: MarqueeProps) {
  const vertical = direction === "up" || direction === "down";
  const reverse = direction === "right" || direction === "down";
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "group/marquee relative flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        fade &&
          !vertical &&
          "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        fade &&
          vertical &&
          "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      style={{ "--marquee-gap": gap, gap } as CSSProperties}
    >
      <style>{`
        @keyframes beui-marquee-x {
          to { transform: translateX(calc(-100% - var(--marquee-gap))); }
        }
        @keyframes beui-marquee-y {
          to { transform: translateY(calc(-100% - var(--marquee-gap))); }
        }
      `}</style>
      {[0, 1].map((duplicate) => (
        <div
          key={duplicate}
          aria-hidden={duplicate === 1}
          style={{
            animationDuration: `${speed}s`,
            animationDirection: reverse ? "reverse" : "normal",
            gap,
          }}
          className={cn(
            "flex shrink-0 items-center will-change-transform motion-reduce:[animation-play-state:paused]",
            vertical
              ? "flex-col [animation:beui-marquee-y_30s_linear_infinite]"
              : "flex-row [animation:beui-marquee-x_30s_linear_infinite]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          )}
        >
          {items.map((child, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Children.toArray provides a stable ordered snapshot for each duplicated track.
            <div key={index} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
