"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { EASE_IN, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type AgentChatTrayProps = {
  hasItems: boolean;
  menuOpen: boolean;
  reduce?: boolean | null;
  className?: string;
  textareaFocused: boolean;
  items: ReactNode;
  children: (shellVisible: boolean) => ReactNode;
};

export function AgentChatTray({
  hasItems,
  menuOpen,
  reduce,
  className,
  textareaFocused,
  items,
  children,
}: AgentChatTrayProps) {
  const [shellVisible, setShellVisible] = useState(false);

  useEffect(() => {
    if (hasItems) {
      setShellVisible(true);
    }
  }, [hasItems]);

  // The shell stays mounted until the tray row finishes exiting; otherwise the
  // outer layer disappears before the chips/files complete their close motion.
  const showShell = hasItems || shellVisible;

  // Open decelerates (ease-out); close accelerates into the finish (ease-in).
  // An ease-out / spring close crawls to a stop at the end, which reads as the
  // "comes nice, then stops, then closes" two-stage feel.
  const surfaceTransition = reduce
    ? { duration: 0 }
    : {
        duration: hasItems ? 0.3 : 0.22,
        ease: hasItems ? EASE_OUT : EASE_IN,
      };

  return (
    <motion.div
      initial={false}
      animate={{ padding: hasItems ? 4 : 0 }}
      transition={reduce ? { duration: 0 } : { padding: surfaceTransition }}
      className={cn(
        "relative rounded-[1.35rem]",
        showShell || menuOpen ? "overflow-visible" : "overflow-hidden",
        className,
      )}
      data-textarea-focused={textareaFocused}
    >
      {/* Frame surface fades on the same curve as the collapse so the
          background never snaps off mid-close. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: hasItems ? 1 : 0 }}
        transition={surfaceTransition}
        className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-card/60 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.05),inset_0_0_24px_-18px_color-mix(in_oklch,var(--foreground)_30%,transparent)]"
      />

      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          if (!hasItems) {
            setShellVisible(false);
          }
        }}
      >
        {hasItems ? (
          <motion.div
            key="tray"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: EASE_OUT },
                opacity: { duration: 0.2, ease: EASE_OUT },
              },
              transitionEnd: { overflow: "visible" },
            }}
            exit={
              reduce
                ? undefined
                : {
                    height: 0,
                    opacity: 0,
                    overflow: "hidden",
                    transition: {
                      height: { duration: 0.22, ease: EASE_IN },
                      opacity: { duration: 0.14, ease: EASE_IN },
                    },
                  }
            }
            className="relative flex flex-wrap gap-1 px-0.5 pt-0.5 pb-1"
          >
            {items}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative">{children(showShell)}</div>
    </motion.div>
  );
}
