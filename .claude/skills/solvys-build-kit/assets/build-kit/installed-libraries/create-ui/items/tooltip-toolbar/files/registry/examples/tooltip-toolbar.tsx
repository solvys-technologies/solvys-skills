"use client"

import type { ReactNode } from "react"
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiItalic,
  RiLink,
  RiStrikethrough,
  RiUnderline,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

function Tip({
  icon,
  label,
  keys,
  active,
  group = false,
}: {
  icon: ReactNode
  label: string
  keys: string
  active?: boolean
  group?: boolean
}) {
  const trigger = group ? (
    <ButtonGroupItem iconOnly active={active} aria-label={label}>
      {icon}
    </ButtonGroupItem>
  ) : (
    <Button
      variant="neutral-light"
      appearance="ghost"
      size="md"
      iconOnly
      aria-label={label}
    >
      {icon}
    </Button>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent showArrow>
        <span className="flex items-center gap-2">
          {label}
          <kbd className="text-ui-control-xs rounded bg-white/15 px-1 py-px">
            {keys}
          </kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export default function TooltipToolbar() {
  return (
    <div className="border-light bg-static shadow-neutral-xs flex w-fit items-center gap-0.5 rounded-xl border p-1">
      <Tip icon={<RiBold />} label="Bold" keys="⌘B" />
      <Tip icon={<RiItalic />} label="Italic" keys="⌘I" />
      <Tip icon={<RiUnderline />} label="Underline" keys="⌘U" />
      <Tip icon={<RiStrikethrough />} label="Strikethrough" keys="⌘⇧S" />
      <span aria-hidden="true" className="bg-light mx-1 h-5 w-px shrink-0" />
      <Tip icon={<RiLink />} label="Insert link" keys="⌘K" />
      <span aria-hidden="true" className="bg-light mx-1 h-5 w-px shrink-0" />
      <ButtonGroup variant="soft" size="md">
        <Tip
          icon={<RiAlignLeft />}
          label="Align left"
          keys="⌘⇧L"
          active
          group
        />
        <Tip icon={<RiAlignCenter />} label="Align center" keys="⌘⇧E" group />
        <Tip icon={<RiAlignRight />} label="Align right" keys="⌘⇧R" group />
      </ButtonGroup>
    </div>
  )
}
