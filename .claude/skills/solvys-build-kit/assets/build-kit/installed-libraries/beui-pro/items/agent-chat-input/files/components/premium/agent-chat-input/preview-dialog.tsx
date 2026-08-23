"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";

export interface AgentChatAttachmentPreviewDialogProps {
  src?: string;
  name?: string;
  reduce?: boolean | null;
  onClose: () => void;
}

export function AgentChatAttachmentPreviewDialog({
  src,
  name,
  reduce,
  onClose,
}: AgentChatAttachmentPreviewDialogProps) {
  return (
    <AnimatePresence>
      {src ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-6 backdrop-blur-xl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
        >
          <button
            type="button"
            aria-label="Close attachment preview"
            onClick={onClose}
            className="absolute inset-0 cursor-default focus-visible:outline-none"
          />
          <motion.div
            className="relative z-10"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 4 }}
            transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          >
            <Image
              src={src}
              alt={name ?? "Attachment preview"}
              width={960}
              height={720}
              unoptimized
              className="max-h-[min(80vh,720px)] max-w-[min(88vw,960px)] object-contain"
            />
            <button
              type="button"
              aria-label="Close attachment preview"
              onClick={onClose}
              className="-top-3 -right-3 absolute grid size-9 place-items-center rounded-full bg-foreground text-background shadow-[0_12px_40px_-20px_rgb(0_0_0_/_0.7)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
