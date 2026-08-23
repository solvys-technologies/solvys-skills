"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AgentChatAttachmentList } from "./attachments";
import {
  AgentChatComposer,
  type AgentChatComposerHandle,
  type ComposerValue,
} from "./composer";
import {
  DEFAULT_AGENTS,
  DEFAULT_MODELS,
  DEFAULT_REASONING,
  DEFAULT_SKILLS,
  DEFAULT_SPEED,
} from "./constants";
import { useControllableArray, useControllableString } from "./hooks";
import { AgentChatAttachmentPreviewDialog } from "./preview-dialog";
import { QueuedMessageLayer } from "./queue";
import { SkillSelector } from "./skills";
import { AgentChatInputToolbar } from "./toolbar";
import { AgentChatTray } from "./tray";
import type {
  AgentChatAttachment,
  AgentChatInputProps,
  AgentChatQueuedMessage,
  AgentChatSubmitPayload,
} from "./types";
import { useAttachmentPreviewUrls } from "./use-attachment-preview-urls";
import { useSkillCommand } from "./use-skill-command";

export function AgentChatInput({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onStop,
  status = "ready",
  placeholder = "Ask your agent to build, review, or change something",
  disabled = false,
  autoFocus = false,
  minRows = 2,
  maxRows = 7,
  submitOnEnter = true,
  clearOnSubmit = true,
  models = DEFAULT_MODELS,
  model,
  defaultModel = models[0]?.id ?? "gpt-5.5",
  onModelChange,
  reasoningLevels = DEFAULT_REASONING,
  reasoning,
  defaultReasoning = "high",
  onReasoningChange,
  speedModes = DEFAULT_SPEED,
  speed,
  defaultSpeed = "auto",
  onSpeedChange,
  agents = DEFAULT_AGENTS,
  agent,
  defaultAgent = "coding-agent",
  onAgentChange,
  skills = DEFAULT_SKILLS,
  skillIds,
  defaultSkillIds = [],
  onSkillIdsChange,
  attachments,
  defaultAttachments = [],
  onAttachmentsChange,
  queuedMessages,
  defaultQueuedMessages = [],
  onQueuedMessagesChange,
  onQueuedMessageSteer,
  onQueuedMessageRemove,
  onQueuedMessageEdit,
  onVoiceClick,
  allowFileUpload = true,
  acceptedFileTypes,
  className,
  classNames,
}: AgentChatInputProps) {
  const reduce = useReducedMotion();
  const textareaId = useId();
  const fileInputId = useId();
  const composerRef = useRef<AgentChatComposerHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [previewAttachmentId, setPreviewAttachmentId] = useState<string | null>(
    null,
  );

  const [text, setText] = useState(value ?? defaultValue);
  const [selectedModel, setSelectedModel] = useControllableString({
    value: model,
    defaultValue: defaultModel,
    onChange: onModelChange,
  });
  const [selectedReasoning, setSelectedReasoning] = useControllableString({
    value: reasoning,
    defaultValue: defaultReasoning,
    onChange: onReasoningChange,
  });
  const [selectedSpeed, setSelectedSpeed] = useControllableString({
    value: speed,
    defaultValue: defaultSpeed,
    onChange: onSpeedChange,
  });
  const [selectedAgent, setSelectedAgent] = useControllableString({
    value: agent,
    defaultValue: defaultAgent,
    onChange: onAgentChange,
  });
  const [selectedSkillIds, setSelectedSkillIds] = useControllableArray<string>({
    value: skillIds,
    defaultValue: defaultSkillIds,
    onChange: onSkillIdsChange,
  });
  const [currentAttachments, setCurrentAttachments] =
    useControllableArray<AgentChatAttachment>({
      value: attachments,
      defaultValue: defaultAttachments,
      onChange: onAttachmentsChange,
    });
  const [currentQueuedMessages, setCurrentQueuedMessages] =
    useControllableArray<AgentChatQueuedMessage>({
      value: queuedMessages,
      defaultValue: defaultQueuedMessages,
      onChange: onQueuedMessagesChange,
    });

  const busy = status === "submitted" || status === "streaming";
  const hasText = text.trim().length > 0;
  const hasAttachments = currentAttachments.length > 0;
  const hasQueuedMessages = currentQueuedMessages.length > 0;
  const imagePreviewUrls = useAttachmentPreviewUrls(currentAttachments);
  const skillCommand = useSkillCommand({ skills, composerRef });

  function handleComposerChange(next: ComposerValue) {
    setText(next.text);
    onValueChange?.(next.text);
    setSelectedSkillIds(next.skillIds);
  }
  const previewAttachment = previewAttachmentId
    ? currentAttachments.find(
        (attachment) => attachment.id === previewAttachmentId,
      )
    : undefined;
  const previewAttachmentUrl = previewAttachmentId
    ? imagePreviewUrls[previewAttachmentId]
    : undefined;
  const canSubmit = !disabled && !busy && (hasText || hasAttachments);

  useEffect(() => {
    if (!previewAttachmentId) {
      return;
    }

    if (!imagePreviewUrls[previewAttachmentId]) {
      setPreviewAttachmentId(null);
    }
  }, [imagePreviewUrls, previewAttachmentId]);

  useEffect(() => {
    if (!previewAttachmentId) {
      return;
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setPreviewAttachmentId(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewAttachmentId]);

  useEffect(() => {
    if (autoFocus) {
      composerRef.current?.focus();
    }
  }, [autoFocus]);

  function submit() {
    if (!canSubmit) {
      return;
    }

    const composed = composerRef.current?.serialize() ?? {
      text,
      skillIds: [...selectedSkillIds],
    };

    const payload: AgentChatSubmitPayload = {
      text: composed.text.trim(),
      model: selectedModel,
      reasoning: selectedReasoning,
      speed: selectedSpeed,
      agent: selectedAgent,
      skillIds: composed.skillIds,
      attachments: [...currentAttachments],
    };

    onSubmit?.(payload);

    if (clearOnSubmit) {
      composerRef.current?.clear();
      setCurrentAttachments([]);
    }
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const nextAttachments = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}`,
      name: file.name,
      type: file.type,
      size: file.size,
      file,
    }));

    setCurrentAttachments([...currentAttachments, ...nextAttachments]);
    event.target.value = "";
  }

  function removeAttachment(id: string) {
    setCurrentAttachments(
      currentAttachments.filter((attachment) => attachment.id !== id),
    );
  }

  function removeQueuedMessage(messageId: string) {
    const message = currentQueuedMessages.find((item) => item.id === messageId);

    if (message) {
      onQueuedMessageRemove?.(message);
    }

    setCurrentQueuedMessages(
      currentQueuedMessages.filter((item) => item.id !== messageId),
    );
  }

  return (
    <>
      <div
        className={cn("relative w-full max-w-5xl", className)}
        data-status={status}
      >
        <AnimatePresence initial={false}>
          {hasQueuedMessages ? (
            <QueuedMessageLayer
              messages={currentQueuedMessages}
              reduce={reduce}
              onSteer={onQueuedMessageSteer}
              onRemove={(message) => removeQueuedMessage(message.id)}
              onEdit={onQueuedMessageEdit}
            />
          ) : null}
        </AnimatePresence>

        <AgentChatTray
          hasItems={hasAttachments}
          menuOpen={skillCommand.visible}
          reduce={reduce}
          className={classNames?.root}
          textareaFocused={textareaFocused}
          items={
            hasAttachments ? (
              <AgentChatAttachmentList
                key="attachments"
                attachments={currentAttachments}
                imagePreviewUrls={imagePreviewUrls}
                reduce={reduce}
                onPreview={setPreviewAttachmentId}
                onRemove={removeAttachment}
              />
            ) : null
          }
        >
          {(showTrayShell) => (
            <div
              className={cn(
                "relative rounded-[1.35rem] border border-border bg-background shadow-[inset_0_1px_0_rgb(255_255_255_/_0.05),inset_0_0_22px_-18px_color-mix(in_oklch,var(--foreground)_28%,transparent)] data-[textarea-focused=true]:border-border-strong",
                showTrayShell || skillCommand.visible
                  ? "overflow-visible"
                  : "overflow-hidden",
              )}
              data-textarea-focused={textareaFocused}
            >
              <AnimatePresence>
                {skillCommand.visible ? (
                  <SkillSelector
                    skills={skillCommand.options}
                    selectedSkillIds={selectedSkillIds}
                    activeIndex={skillCommand.activeIndex}
                    reduce={reduce}
                    onActiveIndexChange={skillCommand.setActiveIndex}
                    onSelect={skillCommand.select}
                  />
                ) : null}
              </AnimatePresence>

              <AgentChatComposer
                id={textareaId}
                ref={composerRef}
                skills={skills}
                defaultValue={value ?? defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                minRows={minRows}
                maxRows={maxRows}
                submitOnEnter={submitOnEnter}
                onChange={handleComposerChange}
                onSlashQueryChange={skillCommand.onQueryChange}
                onNavKeyDown={skillCommand.onNavKeyDown}
                onSubmit={submit}
                onFocus={() => setTextareaFocused(true)}
                onBlur={() => setTextareaFocused(false)}
                className={cn(
                  "placeholder:text-muted-foreground/70",
                  classNames?.textarea,
                )}
              />

              <AgentChatInputToolbar
                disabled={disabled}
                reduce={reduce}
                classNames={classNames}
                actions={{
                  allowFileUpload,
                  fileInputRef,
                }}
                agentSelector={{
                  agents,
                  selectedAgent,
                  setSelectedAgent,
                }}
                modelSelector={{
                  models,
                  selectedModel,
                  setSelectedModel,
                  reasoningLevels,
                  selectedReasoning,
                  setSelectedReasoning,
                  speedModes,
                  selectedSpeed,
                  setSelectedSpeed,
                }}
                submitState={{ busy, canSubmit }}
                onVoiceClick={onVoiceClick}
                onStop={onStop}
                onSubmit={submit}
              />

              <input
                id={fileInputId}
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                accept={acceptedFileTypes}
                onChange={onFilesSelected}
              />
            </div>
          )}
        </AgentChatTray>
      </div>

      <AgentChatAttachmentPreviewDialog
        src={previewAttachmentUrl}
        name={previewAttachment?.name}
        reduce={reduce}
        onClose={() => setPreviewAttachmentId(null)}
      />
    </>
  );
}
