"use client"

import * as React from "react"
import {
  RiClipboardLine,
  RiCommandLine,
  RiFileCopyLine,
  RiScissorsCutLine,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { ContextMenu, type ContextMenuSize } from "@/registry/ui/context-menu"
import { Textarea } from "@/registry/ui/textarea"

// ⌘ icon badge + letter badge; both soft-neutral Badges mirroring the menu size.
function Shortcut({
  letter,
  size = "sm",
}: {
  letter: string
  size?: ContextMenuSize
}) {
  return (
    <span className="ml-auto flex shrink-0 items-center gap-1">
      <Badge variant="neutral" appearance="soft" size={size} iconOnly>
        <RiCommandLine />
      </Badge>
      <Badge variant="neutral" appearance="soft" size={size} numberOnly>
        {letter}
      </Badge>
    </span>
  )
}

export default function ContextMenuTextarea() {
  const [value, setValue] = React.useState(
    "Select some of this text, then right-click to cut, copy, or paste."
  )
  const rangeRef = React.useRef({ start: 0, end: 0 })
  const areaRef = React.useRef<HTMLTextAreaElement>(null)

  // Opening the menu moves focus off the textarea, so capture the selection on
  // contextmenu while it is still available.
  function captureRange(event: React.MouseEvent<HTMLTextAreaElement>) {
    const el = event.currentTarget
    rangeRef.current = {
      start: el.selectionStart ?? 0,
      end: el.selectionEnd ?? 0,
    }
  }

  const selected = () => {
    const { start, end } = rangeRef.current
    return value.slice(start, end)
  }

  async function copy() {
    await navigator.clipboard.writeText(selected() || value)
  }

  async function cut() {
    const { start, end } = rangeRef.current
    if (!selected()) return
    await navigator.clipboard.writeText(selected())
    setValue(value.slice(0, start) + value.slice(end))
  }

  async function paste() {
    const { start, end } = rangeRef.current
    const clip = await navigator.clipboard.readText()
    setValue(value.slice(0, start) + clip + value.slice(end))
    const caret = start + clip.length
    requestAnimationFrame(() => {
      areaRef.current?.focus()
      areaRef.current?.setSelectionRange(caret, caret)
    })
  }

  return (
    <ContextMenu size="sm">
      {/* tabIndex={-1}: the wrapped Textarea is already focusable, so the
          trigger should not add a second tab stop. */}
      <ContextMenu.Trigger tabIndex={-1}>
        <Textarea
          ref={areaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onContextMenu={captureRange}
          rows={4}
          className="w-72"
          aria-label="Editable note"
        />
      </ContextMenu.Trigger>
      <ContextMenu.Popover className="w-56">
        <ContextMenu.Menu aria-label="Clipboard actions">
          <ContextMenu.Item id="cut" textValue="Cut" onAction={cut}>
            <ContextMenu.ItemContainer>
              <RiScissorsCutLine />
              <ContextMenu.ItemLabel>Cut</ContextMenu.ItemLabel>
            </ContextMenu.ItemContainer>
            <Shortcut letter="X" />
          </ContextMenu.Item>
          <ContextMenu.Item id="copy" textValue="Copy" onAction={copy}>
            <ContextMenu.ItemContainer>
              <RiFileCopyLine />
              <ContextMenu.ItemLabel>Copy</ContextMenu.ItemLabel>
            </ContextMenu.ItemContainer>
            <Shortcut letter="C" />
          </ContextMenu.Item>
          <ContextMenu.Item id="paste" textValue="Paste" onAction={paste}>
            <ContextMenu.ItemContainer>
              <RiClipboardLine />
              <ContextMenu.ItemLabel>Paste</ContextMenu.ItemLabel>
            </ContextMenu.ItemContainer>
            <Shortcut letter="V" />
          </ContextMenu.Item>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}
