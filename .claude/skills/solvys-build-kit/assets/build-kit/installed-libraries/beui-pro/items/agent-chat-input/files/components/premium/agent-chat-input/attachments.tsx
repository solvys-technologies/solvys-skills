"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ImageHoverPreview } from "@/components/premium/image-hover-preview";
import { SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import { attachmentIcon } from "./attachment-utils";
import type { AgentChatAttachment } from "./types";

export interface AgentChatAttachmentListProps {
  attachments: readonly AgentChatAttachment[];
  imagePreviewUrls: Record<string, string>;
  reduce?: boolean | null;
  onPreview: (attachmentId: string) => void;
  onRemove: (attachmentId: string) => void;
}

export function AgentChatAttachmentList({
  attachments,
  imagePreviewUrls,
  reduce,
  onPreview,
  onRemove,
}: AgentChatAttachmentListProps) {
  return (
    <AnimatePresence initial={false}>
      {attachments.map((attachment) => (
        <motion.div
          layout
          key={attachment.id}
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: -2 }}
          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          className="group inline-flex h-8 max-w-full items-center gap-1.5 rounded-xl border border-border/60 px-1.5 text-xs shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06)]"
        >
          {imagePreviewUrls[attachment.id] ? (
            <button
              type="button"
              aria-label={`Preview ${attachment.name}`}
              onClick={() => onPreview(attachment.id)}
              className="inline-flex min-w-0 items-center rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ImageHoverPreview src={imagePreviewUrls[attachment.id]}>
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  {attachmentIcon(attachment.type)}
                  <span className="max-w-48 truncate font-medium">
                    {attachment.name}
                  </span>
                </span>
              </ImageHoverPreview>
            </button>
          ) : (
            <>
              {attachmentIcon(attachment.type)}
              <span className="max-w-48 truncate font-medium">
                {attachment.name}
              </span>
            </>
          )}
          <motion.button
            type="button"
            aria-label={`Remove ${attachment.name}`}
            onClick={() => onRemove(attachment.id)}
            initial={false}
            whileTap={reduce ? undefined : { scale: 0.92 }}
            transition={SPRING_PRESS}
            className="pointer-events-none grid h-5 w-0 shrink-0 scale-75 place-items-center overflow-hidden rounded-full text-muted-foreground opacity-0 transition-[width,opacity,transform,color,background-color] duration-200 ease-out group-hover:pointer-events-auto group-hover:w-5 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:w-5 group-focus-within:scale-100 group-focus-within:opacity-100 hover:bg-primary/5 hover:text-foreground focus-visible:w-5 focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-3.5" />
          </motion.button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
