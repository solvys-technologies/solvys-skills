"use client"

import {
  RiClipboardLine,
  RiDeleteBin6Line,
  RiFileCopyLine,
} from "@create-ui/assets/icons"

import { ContextMenu, type ContextMenuSize } from "@/registry/ui/context-menu"

function Surface({ size, label }: { size: ContextMenuSize; label: string }) {
  return (
    <ContextMenu size={size}>
      <ContextMenu.Trigger>
        <div className="border-light text-placeholder flex h-28 w-40 items-center justify-center rounded-2xl border border-dashed text-sm select-none">
          {label}
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover className="w-44">
        <ContextMenu.Menu aria-label={`${label} actions`}>
          <ContextMenu.Item id="copy" leading={<RiFileCopyLine />}>
            Copy
          </ContextMenu.Item>
          <ContextMenu.Item id="paste" leading={<RiClipboardLine />}>
            Paste
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item
            id="delete"
            variant="danger"
            leading={<RiDeleteBin6Line />}
          >
            Delete
          </ContextMenu.Item>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}

export default function ContextMenuSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Surface size="xs" label="xs" />
      <Surface size="sm" label="sm" />
      <Surface size="md" label="md" />
    </div>
  )
}
