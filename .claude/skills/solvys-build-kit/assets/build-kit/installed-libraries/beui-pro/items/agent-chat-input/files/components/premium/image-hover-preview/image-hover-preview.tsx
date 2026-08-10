"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { FocusEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface ImageHoverPreviewProps {
  src: string;
  alt?: string;
  label?: string;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
}

export function ImageHoverPreview({
  src,
  alt = "",
  label = "Click to preview",
  children,
  className,
  previewClassName,
}: ImageHoverPreviewProps) {
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const previewWidth = 88;
    const viewportPadding = 12;
    const left = Math.min(
      window.innerWidth - viewportPadding - previewWidth / 2,
      Math.max(viewportPadding + previewWidth / 2, rect.left + rect.width / 2),
    );

    setPosition({
      left,
      top: Math.max(viewportPadding, rect.top - 8),
    });
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  function openPreview() {
    updatePosition();
    setOpen(true);
  }

  function closePreview() {
    setOpen(false);
  }

  function onBlur(event: FocusEvent<HTMLSpanElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closePreview();
    }
  }

  return (
    <span
      ref={triggerRef}
      onPointerEnter={openPreview}
      onPointerLeave={closePreview}
      onFocusCapture={openPreview}
      onBlurCapture={onBlur}
      className={cn("relative inline-flex min-w-0", className)}
    >
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && position ? (
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? false : { opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: 2, scale: 0.98 }}
                  transition={{ duration: reduce ? 0 : 0.16, ease: "easeOut" }}
                  style={{
                    left: position.left,
                    top: position.top,
                    translateX: "-50%",
                    translateY: "-100%",
                  }}
                  className={cn(
                    "pointer-events-none fixed z-[2147483647] flex w-24 flex-col items-center rounded-2xl border border-border bg-background p-1 shadow-[0_18px_50px_-26px_rgb(0_0_0_/_0.7),inset_0_1px_0_rgb(255_255_255_/_0.06)]",
                    previewClassName,
                  )}
                >
                  <span className="block aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={alt}
                      width={80}
                      height={80}
                      unoptimized
                      className="size-full object-cover"
                    />
                  </span>
                  {label ? (
                    <span className="block whitespace-nowrap px-2 pt-1 pb-0.5 text-center text-[11px] text-muted-foreground leading-none">
                      {label}
                    </span>
                  ) : null}
                  <span className="-bottom-1 absolute left-1/2 size-2 -translate-x-1/2 rotate-45 border-border border-r border-b bg-background" />
                </motion.span>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </span>
  );
}
