"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const MotionBackdrop = motion.create(DialogBackdrop);
const MotionPanel = motion.create(DialogPanel);

const OPEN_SPRING = {
  type: "spring",
  stiffness: 245,
  damping: 27,
  mass: 0.9,
} as const;

const CLOSE_SPRING = {
  type: "spring",
  stiffness: 285,
  damping: 30,
  mass: 0.86,
} as const;

type CardGeometry = {
  source: CardBounds;
  target: CardBounds;
};

type CardBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type FlipCardModalProps = {
  front: ReactNode;
  back: ReactNode;
  id?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  frontLabel?: string;
  backLabel?: string;
  closeLabel?: string;
  className?: string;
  triggerClassName?: string;
  modalClassName?: string;
  faceClassName?: string;
};

export function FlipCardModal({
  front,
  back,
  id,
  open,
  defaultOpen = false,
  onOpenChange,
  triggerLabel = "Open flip card",
  frontLabel = "Show the back of this card",
  backLabel = "Show the front of this card",
  closeLabel = "Close flip card",
  className,
  triggerClassName,
  modalClassName,
  faceClassName,
}: FlipCardModalProps) {
  const generatedId = useId();
  const dialogId = `flip-card-modal-${id ?? generatedId}`;
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [isFlipped, setIsFlipped] = useState(defaultOpen);
  const [geometry, setGeometry] = useState<CardGeometry | null>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const openCard = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setGeometry(getCardGeometry(rect));
    setIsFlipped(true);
    setOpen(true);
  };

  const closeCard = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggleFace = () => {
    setIsFlipped((current) => !current);
  };

  useEffect(() => {
    if (!isOpen) return;

    const updateGeometry = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setGeometry(getCardGeometry(rect));
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);
    window.addEventListener("orientationchange", updateGeometry);
    window.visualViewport?.addEventListener("resize", updateGeometry);

    return () => {
      window.removeEventListener("resize", updateGeometry);
      window.removeEventListener("orientationchange", updateGeometry);
      window.visualViewport?.removeEventListener("resize", updateGeometry);
    };
  }, [isOpen]);

  const activeGeometry =
    geometry ??
    getFallbackGeometry({
      width: triggerRef.current?.offsetWidth ?? 288,
      height: triggerRef.current?.offsetHeight ?? 360,
    });

  const sourceTransform = {
    ...activeGeometry.source,
    rotateY: 0,
  };

  const centeredTransform = {
    ...activeGeometry.target,
    rotateY: isFlipped ? 180 : 0,
  };

  return (
    <div className={className}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        disabled={isOpen}
        onClick={openCard}
        className={cn(
          "relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-border bg-card text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default",
          triggerClassName,
        )}
      >
        {front}
      </button>

      <AnimatePresence
        onExitComplete={() => {
          setIsFlipped(false);
          setGeometry(null);
        }}
      >
        {isOpen ? (
          <Dialog
            key="flip-card-modal"
            open
            onClose={closeCard}
            className="relative z-[100]"
          >
            <MotionBackdrop
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.24, ease: EASE_OUT }
              }
              className="fixed inset-0 bg-foreground/10 backdrop-blur-xl"
            />

            <div
              id={dialogId}
              className="pointer-events-none fixed inset-0 z-[101] [perspective:1400px]"
            >
              <MotionPanel
                initial={reduceMotion ? centeredTransform : sourceTransform}
                animate={centeredTransform}
                exit={{
                  ...sourceTransform,
                  transition: reduceMotion ? { duration: 0 } : CLOSE_SPRING,
                }}
                transition={reduceMotion ? { duration: 0 } : OPEN_SPRING}
                className={cn(
                  "pointer-events-auto fixed touch-manipulation [transform-style:preserve-3d] outline-none [will-change:transform,left,top,width,height]",
                  modalClassName,
                )}
              >
                <CardFace
                  hidden={isFlipped}
                  label={frontLabel}
                  onFlip={toggleFace}
                  onClose={closeCard}
                  closeLabel={closeLabel}
                  className={faceClassName}
                >
                  {front}
                </CardFace>

                <CardFace
                  back
                  autofocus
                  hidden={!isFlipped}
                  label={backLabel}
                  onFlip={toggleFace}
                  onClose={closeCard}
                  closeLabel={closeLabel}
                  className={faceClassName}
                >
                  {back}
                </CardFace>
              </MotionPanel>
            </div>
          </Dialog>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CardFace({
  children,
  back = false,
  autofocus = false,
  hidden,
  label,
  closeLabel,
  onFlip,
  onClose,
  className,
}: {
  children: ReactNode;
  back?: boolean;
  autofocus?: boolean;
  hidden: boolean;
  label: string;
  closeLabel: string;
  onFlip: () => void;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[1.75rem] border border-border bg-card [backface-visibility:hidden]",
        back
          ? "[transform:rotateY(180deg)_translateZ(1px)]"
          : "[transform:translateZ(1px)]",
        className,
      )}
    >
      <button
        type="button"
        aria-label={label}
        onClick={onFlip}
        className="absolute inset-0 z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      />
      <div className="pointer-events-none relative z-20 h-full w-full [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {children}
      </div>
      <button
        type="button"
        data-autofocus={autofocus || undefined}
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute top-4 right-4 z-40 grid size-10 place-items-center rounded-full border border-border/60 bg-background/55 text-foreground outline-none backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-background/75 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}

function getCardGeometry(rect: CardBounds): CardGeometry {
  const viewportPadding = 16;
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const availableWidth = viewportWidth - viewportPadding * 2;
  const availableHeight = viewportHeight - viewportPadding * 2;
  const preferredWidth = viewportWidth < 480 ? 320 : 352;
  const targetWidth = Math.min(
    preferredWidth,
    availableWidth,
    availableHeight * 0.8,
  );
  const targetHeight = targetWidth * 1.25;
  const targetLeft = (viewportWidth - targetWidth) / 2;
  const targetTop = (viewportHeight - targetHeight) / 2;

  return {
    source: {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    },
    target: {
      left: targetLeft,
      top: targetTop,
      width: targetWidth,
      height: targetHeight,
    },
  };
}

function getFallbackGeometry({
  width,
  height,
}: {
  width: number;
  height: number;
}): CardGeometry {
  if (typeof window === "undefined") {
    const bounds = { left: 0, top: 0, width, height };
    return { source: bounds, target: bounds };
  }

  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const left = (viewportWidth - width) / 2;
  const top = (viewportHeight - height) / 2;
  return getCardGeometry({
    left,
    top,
    width,
    height,
  });
}
