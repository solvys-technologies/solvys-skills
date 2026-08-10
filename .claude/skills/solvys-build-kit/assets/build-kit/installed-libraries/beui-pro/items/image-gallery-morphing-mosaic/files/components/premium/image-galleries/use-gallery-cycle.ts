"use client";

import { useInView, usePageInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export function useGalleryCycle(itemCount: number, interval: number) {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { margin: "120px" });
  const isPageInView = usePageInView();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(0, itemCount - 1)));
  }, [itemCount]);

  useEffect(() => {
    if (
      reduceMotion ||
      !isInView ||
      !isPageInView ||
      itemCount < 2 ||
      interval <= 0
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % itemCount);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, isInView, isPageInView, itemCount, reduceMotion]);

  const selectIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return {
    activeIndex,
    containerRef,
    reduceMotion,
    selectIndex,
  };
}
