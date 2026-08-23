"use client";

import {
  ArrowUp,
  Blocks,
  ChevronDown,
  ChevronRight,
  Code2,
  ListChecks,
  Megaphone,
  Mic,
  Paperclip,
  Plus,
  Search,
  Square,
  Target,
  WandSparkles,
} from "lucide-react";
import { motion } from "motion/react";
import type { RefObject } from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownSubmenu,
  DropdownSubmenuContent,
  DropdownSubmenuTrigger,
  DropdownTrigger,
} from "@/components/premium/dropdown";
import {
  MorphicTooltip,
  MorphicTooltipProvider,
} from "@/components/premium/morphic-tooltip";
import { Switch } from "@/components/premium/switch";
import { SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { findLabel } from "./attachment-utils";
import { ToolbarButton } from "./toolbar-button";
import type {
  AgentChatAgent,
  AgentChatInputClassNames,
  AgentChatInputOption,
} from "./types";

function agentIcon(agentId: string) {
  switch (agentId) {
    case "research-agent":
      return <Search className="size-4" />;
    case "marketing-agent":
      return <Megaphone className="size-4" />;
    case "coding-agent":
      return <Code2 className="size-4" />;
    default:
      return <WandSparkles className="size-4" />;
  }
}

export interface AgentChatInputToolbarProps {
  disabled?: boolean;
  reduce?: boolean | null;
  classNames?: AgentChatInputClassNames;
  actions: {
    allowFileUpload: boolean;
    fileInputRef: RefObject<HTMLInputElement | null>;
  };
  agentSelector: {
    agents: readonly AgentChatAgent[];
    selectedAgent: string;
    setSelectedAgent: (value: string) => void;
  };
  modelSelector: {
    models: readonly AgentChatInputOption[];
    selectedModel: string;
    setSelectedModel: (value: string) => void;
    reasoningLevels: readonly AgentChatInputOption[];
    selectedReasoning: string;
    setSelectedReasoning: (value: string) => void;
    speedModes: readonly AgentChatInputOption[];
    selectedSpeed: string;
    setSelectedSpeed: (value: string) => void;
  };
  submitState: {
    busy: boolean;
    canSubmit: boolean;
  };
  onVoiceClick?: () => void;
  onStop?: () => void;
  onSubmit: () => void;
}

export function AgentChatInputToolbar({
  disabled,
  reduce,
  classNames,
  actions,
  agentSelector,
  modelSelector,
  submitState,
  onVoiceClick,
  onStop,
  onSubmit,
}: AgentChatInputToolbarProps) {
  const { allowFileUpload, fileInputRef } = actions;
  const { agents, selectedAgent, setSelectedAgent } = agentSelector;
  const {
    models,
    selectedModel,
    setSelectedModel,
    reasoningLevels,
    selectedReasoning,
    setSelectedReasoning,
    speedModes,
    selectedSpeed,
    setSelectedSpeed,
  } = modelSelector;
  const { busy, canSubmit } = submitState;
  const [planMode, setPlanMode] = useState(false);
  const [pursueGoal, setPursueGoal] = useState(false);

  return (
    <MorphicTooltipProvider delay={180} closeDelay={40}>
      <div
        className={cn(
          "flex items-center justify-between gap-2 px-2.5 pb-2 sm:gap-3 sm:px-4",
          classNames?.toolbar,
        )}
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <Dropdown>
            <DropdownTrigger
              label="Open agent actions"
              disabled={disabled}
              className="h-8 min-w-8 border-0 px-0 text-muted-foreground hover:bg-primary/5 hover:text-foreground focus-visible:ring-offset-0"
            >
              <Plus className="size-4" />
            </DropdownTrigger>

            <DropdownContent
              side="top"
              portal
              className={cn(
                "w-64 [&_[data-slot=dropdown-icon]]:size-7 [&_[data-slot=dropdown-label]]:text-[13px]",
                classNames?.menu,
              )}
            >
              {allowFileUpload ? (
                <DropdownItem
                  label="Add photos & files"
                  icon={<Paperclip className="size-4" />}
                  onSelect={() => fileInputRef.current?.click()}
                  className=" px-1"
                />
              ) : null}

              <DropdownSeparator className="my-1.5" />

              <DropdownItem
                label="Plan mode"
                icon={<ListChecks className="size-4" />}
                trailing={
                  <Switch checked={planMode} interactive={false} size="sm" />
                }
                onSelect={() => setPlanMode((current) => !current)}
                closeOnSelect={false}
                className="px-1"
              />

              <DropdownItem
                label="Pursue goal"
                icon={<Target className="size-4" />}
                trailing={
                  <Switch checked={pursueGoal} interactive={false} size="sm" />
                }
                onSelect={() => setPursueGoal((current) => !current)}
                closeOnSelect={false}
                className="px-1"
              />

              <DropdownSeparator className="my-1.5" />

              <DropdownSubmenu>
                <DropdownSubmenuTrigger
                  label="Create"
                  icon={<WandSparkles className="size-4" />}
                  trailing={<ChevronRight className="size-4" />}
                  className="px-1 min-h-8"
                />
                <DropdownSubmenuContent
                  width={220}
                  alignOffset={-8}
                  className="p-2 [&_[data-slot=dropdown-label]]:text-[13px]"
                >
                  <DropdownItem label="Component" closeOnSelect={false} />
                  <DropdownItem label="Block" closeOnSelect={false} />
                  <DropdownItem label="Template" closeOnSelect={false} />
                </DropdownSubmenuContent>
              </DropdownSubmenu>

              <DropdownSubmenu>
                <DropdownSubmenuTrigger
                  label="Plugins"
                  icon={<Blocks className="size-4" />}
                  trailing={<ChevronRight className="size-4" />}
                  className="px-1 min-h-8"
                />
                <DropdownSubmenuContent
                  width={220}
                  alignOffset={-8}
                  className="p-2 [&_[data-slot=dropdown-label]]:text-[13px]"
                >
                  <DropdownItem label="GitHub" closeOnSelect={false} />
                  <DropdownItem label="Supabase" closeOnSelect={false} />
                  <DropdownItem label="Linear" closeOnSelect={false} />
                </DropdownSubmenuContent>
              </DropdownSubmenu>
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger
              label="Select agent"
              disabled={disabled}
              className="h-8 max-w-[7.5rem] border-0 px-2 text-muted-foreground hover:bg-primary/5 hover:text-foreground focus-visible:ring-offset-0 sm:max-w-[11rem] sm:px-2.5"
            >
              {({ open }) => (
                <>
                  <span className="truncate text-foreground">
                    {findLabel(agents, selectedAgent)}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </>
              )}
            </DropdownTrigger>

            <DropdownContent
              side="top"
              portal
              className={cn(
                "w-56 p-2 [&_[data-slot=dropdown-icon]]:size-7 [&_[data-slot=dropdown-label]]:text-[13px]",
                classNames?.menu,
              )}
            >
              {agents.map((option) => (
                <DropdownItem
                  key={option.id}
                  label={option.label}
                  description={option.description}
                  icon={option.icon ?? agentIcon(option.id)}
                  selected={option.id === selectedAgent}
                  onSelect={() => setSelectedAgent(option.id)}
                  className="min-h-8 px-1"
                />
              ))}
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <Dropdown>
            <DropdownTrigger
              label="Change model and reasoning"
              disabled={disabled}
              className="h-8 border-0 px-2 text-muted-foreground hover:bg-primary/5 hover:text-foreground focus-visible:ring-offset-0 sm:px-3"
            >
              {({ open }) => (
                <>
                  <span className="text-foreground">
                    {findLabel(models, selectedModel).replace("GPT-", "")}
                  </span>
                  <span className="hidden text-muted-foreground sm:inline">
                    {findLabel(reasoningLevels, selectedReasoning)}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </>
              )}
            </DropdownTrigger>

            <DropdownContent
              align="end"
              side="top"
              portal
              className={cn(
                "w-60 p-2 [&_[data-slot=dropdown-label]]:text-[13px] [&_[data-slot=dropdown-section-label]]:px-2 [&_[data-slot=dropdown-section-label]]:text-[12px]",
                classNames?.menu,
              )}
            >
              <DropdownLabel>Reasoning</DropdownLabel>
              {reasoningLevels.map((option) => (
                <DropdownItem
                  key={option.id}
                  label={option.label}
                  description={option.description}
                  selected={option.id === selectedReasoning}
                  onSelect={() => setSelectedReasoning(option.id)}
                  className="min-h-7.5 rounded-lg"
                />
              ))}

              <DropdownSeparator />

              <DropdownSubmenu>
                <DropdownSubmenuTrigger
                  label={findLabel(models, selectedModel)}
                  trailing={<ChevronRight className="size-4" />}
                  className="min-h-7.5 rounded-lg px-2"
                />
                <DropdownSubmenuContent
                  width={256}
                  alignOffset={-12}
                  className="p-2 [&_[data-slot=dropdown-label]]:text-[13px] [&_[data-slot=dropdown-section-label]]:px-2 [&_[data-slot=dropdown-section-label]]:text-[12px]"
                >
                  <DropdownLabel>Model</DropdownLabel>
                  {models.map((option) => (
                    <DropdownItem
                      key={option.id}
                      label={option.label}
                      selected={option.id === selectedModel}
                      onSelect={() => setSelectedModel(option.id)}
                      className="min-h-7.5 rounded-lg px-2"
                    />
                  ))}
                </DropdownSubmenuContent>
              </DropdownSubmenu>

              <DropdownSubmenu>
                <DropdownSubmenuTrigger
                  label="Speed"
                  trailing={<ChevronRight className="size-4" />}
                  className="min-h-7.5 rounded-lg px-2"
                />
                <DropdownSubmenuContent
                  width={256}
                  alignOffset={-12}
                  className="p-2 [&_[data-slot=dropdown-label]]:text-[13px] [&_[data-slot=dropdown-section-label]]:px-2 [&_[data-slot=dropdown-section-label]]:text-[12px]"
                >
                  <DropdownLabel>Speed</DropdownLabel>
                  {speedModes.map((option) => (
                    <DropdownItem
                      key={option.id}
                      label={option.label}
                      description={option.description}
                      selected={option.id === selectedSpeed}
                      onSelect={() => setSelectedSpeed(option.id)}
                      className="min-h-7.5 rounded-lg px-2"
                    />
                  ))}
                </DropdownSubmenuContent>
              </DropdownSubmenu>
            </DropdownContent>
          </Dropdown>

          <div className="hidden sm:block">
            <MorphicTooltip content="Voice input">
              <ToolbarButton label="Voice input" onClick={onVoiceClick}>
                <Mic className="size-4" />
              </ToolbarButton>
            </MorphicTooltip>
          </div>

          <MorphicTooltip content={busy ? "Stop response" : "Send message"}>
            <motion.button
              type="button"
              disabled={disabled || (!busy && !canSubmit)}
              aria-label={busy ? "Stop response" : "Send message"}
              onClick={busy ? onStop : onSubmit}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={SPRING_PRESS}
              className={cn(
                "grid size-8 place-items-center rounded-full text-primary-foreground transition-colors",
                "bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-45",
              )}
            >
              {busy ? (
                <Square className="size-4" />
              ) : (
                <ArrowUp className="size-4.5" />
              )}
            </motion.button>
          </MorphicTooltip>
        </div>
      </div>
    </MorphicTooltipProvider>
  );
}
