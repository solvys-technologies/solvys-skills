"use client";

import { CornerDownRight, Edit3, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import {
  MorphicTooltip,
  MorphicTooltipProvider,
} from "@/components/premium/morphic-tooltip";
import { SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import type { AgentChatQueuedMessage } from "./types";

export interface QueuedMessageListProps {
  messages: readonly AgentChatQueuedMessage[];
  reduce?: boolean | null;
  onSteer?: (message: AgentChatQueuedMessage) => void;
  onRemove?: (message: AgentChatQueuedMessage) => void;
  onEdit?: (message: AgentChatQueuedMessage) => void;
}

export function QueuedMessageLayer({
  messages,
  reduce,
  onSteer,
  onRemove,
  onEdit,
}: QueuedMessageListProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <motion.div
      layout
      key="queued-message-layer"
      initial={reduce ? false : { opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.99 }}
      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
      className="relative z-0 mx-auto md:w-[94%] w-[88%] overflow-hidden rounded-t-[1.25rem] border border-border/70 bg-card/70 px-2 py-1 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06),inset_0_0_22px_-18px_color-mix(in_oklch,var(--foreground)_30%,transparent)] backdrop-blur-xl"
    >
      <MorphicTooltipProvider delay={180} closeDelay={40}>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              layout
              key={message.id}
              initial={reduce ? false : { opacity: 0, y: 5, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -3, scale: 0.99 }}
              transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
              className="group flex min-h-8 items-center gap-2 rounded-xl px-2 text-muted-foreground text-sm"
            >
              <CornerDownRight className="size-4 shrink-0 opacity-70" />
              <span className="min-w-0 flex-1 truncate font-medium">
                {message.text}
              </span>
              <div className="ml-auto flex items-center gap-1 opacity-75 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                {onSteer ? (
                  <MorphicTooltip content="Steer queued message">
                    <QueueActionButton
                      label={`${message.actionLabel ?? "Steer"} ${message.text}`}
                      disabled={message.disabled}
                      onClick={() => onSteer(message)}
                    >
                      <CornerDownRight className="size-3.5" />
                      <span className="hidden sm:inline">
                        {message.actionLabel ?? "Steer"}
                      </span>
                    </QueueActionButton>
                  </MorphicTooltip>
                ) : null}
                {onRemove ? (
                  <MorphicTooltip content="Remove queued message">
                    <QueueIconButton
                      label={`Remove ${message.text}`}
                      disabled={message.disabled}
                      onClick={() => onRemove(message)}
                    >
                      <Trash2 className="size-3.5" />
                    </QueueIconButton>
                  </MorphicTooltip>
                ) : null}
                {onEdit ? (
                  <MorphicTooltip content="Edit queued message">
                    <QueueIconButton
                      label={`Edit ${message.text}`}
                      disabled={message.disabled}
                      onClick={() => onEdit(message)}
                    >
                      <Edit3 className="size-3.5" />
                    </QueueIconButton>
                  </MorphicTooltip>
                ) : null}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </MorphicTooltipProvider>
    </motion.div>
  );
}

type QueueButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function QueueActionButton({
  label,
  disabled,
  onClick,
  children,
}: QueueButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={SPRING_PRESS}
      className="inline-flex h-7 items-center gap-1 rounded-lg px-1.5 text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </motion.button>
  );
}

function QueueIconButton({
  label,
  disabled,
  onClick,
  children,
}: QueueButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      transition={SPRING_PRESS}
      className="grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </motion.button>
  );
}
