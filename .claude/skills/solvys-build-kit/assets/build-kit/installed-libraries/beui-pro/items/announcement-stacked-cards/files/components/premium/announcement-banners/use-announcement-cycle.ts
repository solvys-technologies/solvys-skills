"use client";

import { useInView, usePageInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type AnnouncementCycleOptions = {
  count: number;
  autoPlay: boolean;
  interval: number;
  initialIndex?: number;
};

export function useAnnouncementCycle({
  count,
  autoPlay,
  interval,
  initialIndex = 0,
}: AnnouncementCycleOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(containerRef, { margin: "100px" });
  const isPageInView = usePageInView();
  const [activeIndex, setActiveIndex] = useState(() =>
    count > 0 ? Math.min(Math.max(initialIndex, 0), count - 1) : 0,
  );

  useEffect(() => {
    if (count === 0) {
      setActiveIndex(0);
      return;
    }
    if (activeIndex >= count) {
      setActiveIndex(0);
    }
  }, [activeIndex, count]);

  const shouldPlay =
    autoPlay && !reduceMotion && isInView && isPageInView && count > 1;

  useEffect(() => {
    if (!shouldPlay) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, interval);

    return () => window.clearInterval(timer);
  }, [count, interval, shouldPlay]);

  return {
    activeIndex,
    containerRef,
    reduceMotion,
    setActiveIndex,
    shouldPlay,
  };
}
