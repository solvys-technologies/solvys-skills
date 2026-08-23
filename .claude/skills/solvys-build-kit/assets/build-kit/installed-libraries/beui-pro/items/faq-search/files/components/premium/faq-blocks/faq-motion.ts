import type { Variants } from "motion/react";
import { EASE_OUT } from "@/lib/ease";

export const FAQ_LOAD_CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.1,
    },
  },
};

export const FAQ_LOAD_ITEM: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: EASE_OUT,
    },
  },
};

export function faqListContainer(delayChildren = 0.12): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren,
        staggerChildren: 0.065,
      },
    },
  };
}
