"use client"

import * as React from "react"
import {
  RiCheckLine,
  RiClipboardLine,
  RiCommandLine,
  RiDeleteBin6Line,
  RiDownloadLine,
  RiExternalLinkLine,
  RiFile2Line,
  RiFileCopy2Line,
  RiFileCopyLine,
  RiScissorsCutLine,
} from "@create-ui/assets/icons"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { Badge } from "@/registry/ui/badge"
import { ContextMenu, type ContextMenuSize } from "@/registry/ui/context-menu"
import { Textarea } from "@/registry/ui/textarea"

// KBD pair: ⌘ icon badge + letter badge (Figma node 10798:166071). Both are
// soft-neutral Badges whose size mirrors the menu size 1:1.
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

/* -------------------------------------------------------------------------- */
/*                          Clipboard (cut/copy/paste)                        */
/* -------------------------------------------------------------------------- */

// Right-click the textarea and the menu really operates on the current
// selection via the async Clipboard API. The selection is captured on
// contextmenu because opening the menu moves focus off the textarea.
function ClipboardDemo() {
  const [value, setValue] = React.useState(
    "Select some of this text, then right-click to cut, copy, or paste."
  )
  const [status, setStatus] = React.useState<string | null>(null)
  const rangeRef = React.useRef({ start: 0, end: 0 })
  const areaRef = React.useRef<HTMLTextAreaElement>(null)

  function flash(message: string) {
    setStatus(message)
    window.setTimeout(() => setStatus(null), 1600)
  }

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
    const text = selected() || value
    await navigator.clipboard.writeText(text)
    flash(`Copied ${text.length} characters`)
  }

  async function cut() {
    const { start, end } = rangeRef.current
    const text = selected()
    if (!text) return
    await navigator.clipboard.writeText(text)
    setValue(value.slice(0, start) + value.slice(end))
    flash(`Cut ${text.length} characters`)
  }

  async function paste() {
    const { start, end } = rangeRef.current
    const clip = await navigator.clipboard.readText()
    const next = value.slice(0, start) + clip + value.slice(end)
    setValue(next)
    flash(`Pasted ${clip.length} characters`)
    const caret = start + clip.length
    requestAnimationFrame(() => {
      areaRef.current?.focus()
      areaRef.current?.setSelectionRange(caret, caret)
    })
  }

  return (
    <div className="flex w-72 flex-col gap-2">
      <ContextMenu size="sm">
        <ContextMenu.Trigger tabIndex={-1}>
          <Textarea
            ref={areaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onContextMenu={captureRange}
            rows={4}
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
      <p className="text-placeholder h-4 text-xs">{status}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                        File row (duplicate / delete)                       */
/* -------------------------------------------------------------------------- */

type FileRow = { id: number; name: string }

let nextId = 100

function FileListDemo() {
  const [files, setFiles] = React.useState<FileRow[]>([
    { id: 1, name: "brand-guidelines.pdf" },
    { id: 2, name: "q3-report.xlsx" },
    { id: 3, name: "hero-illustration.png" },
  ])
  const [copiedId, setCopiedId] = React.useState<number | null>(null)

  async function copyName(file: FileRow) {
    await navigator.clipboard.writeText(file.name)
    setCopiedId(file.id)
    window.setTimeout(() => setCopiedId(null), 1600)
  }

  function duplicate(file: FileRow) {
    setFiles((prev) => {
      const index = prev.findIndex((f) => f.id === file.id)
      const copy = { id: (nextId += 1), name: `${file.name} (copy)` }
      const next = [...prev]
      next.splice(index + 1, 0, copy)
      return next
    })
  }

  function remove(file: FileRow) {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }

  return (
    <div className="border-light w-72 overflow-hidden rounded-2xl border">
      {files.length === 0 && (
        <p className="text-placeholder p-4 text-center text-sm">
          No files. All deleted.
        </p>
      )}
      {files.map((file) => (
        <ContextMenu key={file.id} size="sm">
          <ContextMenu.Trigger>
            <div className="hover:bg-weakest text-body border-light flex items-center gap-2 border-b px-3 py-2.5 text-sm select-none last:border-b-0">
              <RiFile2Line className="text-placeholder size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              {copiedId === file.id && (
                <RiCheckLine className="text-success-base size-4 shrink-0" />
              )}
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Popover className="w-52">
            <ContextMenu.Menu aria-label={`Actions for ${file.name}`}>
              <ContextMenu.Section>
                <ContextMenu.Item
                  id="copy"
                  textValue="Copy name"
                  onAction={() => copyName(file)}
                >
                  <ContextMenu.ItemContainer>
                    <RiFileCopyLine />
                    <ContextMenu.ItemLabel>Copy name</ContextMenu.ItemLabel>
                  </ContextMenu.ItemContainer>
                </ContextMenu.Item>
                <ContextMenu.Item
                  id="duplicate"
                  textValue="Duplicate"
                  onAction={() => duplicate(file)}
                >
                  <ContextMenu.ItemContainer>
                    <RiFileCopy2Line />
                    <ContextMenu.ItemLabel>Duplicate</ContextMenu.ItemLabel>
                  </ContextMenu.ItemContainer>
                </ContextMenu.Item>
                <ContextMenu.Item id="download" textValue="Download">
                  <ContextMenu.ItemContainer>
                    <RiDownloadLine />
                    <ContextMenu.ItemLabel>Download</ContextMenu.ItemLabel>
                  </ContextMenu.ItemContainer>
                </ContextMenu.Item>
                <ContextMenu.Item id="open" textValue="Open in new tab">
                  <ContextMenu.ItemContainer>
                    <RiExternalLinkLine />
                    <ContextMenu.ItemLabel>
                      Open in new tab
                    </ContextMenu.ItemLabel>
                  </ContextMenu.ItemContainer>
                </ContextMenu.Item>
              </ContextMenu.Section>
              <ContextMenu.Separator />
              <ContextMenu.Item
                id="delete"
                textValue="Delete"
                variant="danger"
                onAction={() => remove(file)}
              >
                <ContextMenu.ItemContainer>
                  <RiDeleteBin6Line />
                  <ContextMenu.ItemLabel>Delete</ContextMenu.ItemLabel>
                </ContextMenu.ItemContainer>
              </ContextMenu.Item>
            </ContextMenu.Menu>
          </ContextMenu.Popover>
        </ContextMenu>
      ))}
    </div>
  )
}

export default function ContextMenuExample() {
  return (
    <ExampleWrapper>
      <Example title="Clipboard actions">
        <ClipboardDemo />
      </Example>
      <Example title="File row actions">
        <FileListDemo />
      </Example>
    </ExampleWrapper>
  )
}
