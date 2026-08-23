"use client"

import {
  RiClipboardLine,
  RiDeleteBin6Line,
  RiFileCopyLine,
  RiPencilLine,
} from "@create-ui/assets/icons"

import { ContextMenu } from "@/registry/ui/context-menu"

export default function ContextMenuDemo() {
  return (
    <ContextMenu size="sm">
      <ContextMenu.Trigger>
        <div className="border-light text-placeholder flex h-40 w-72 items-center justify-center rounded-2xl border border-dashed text-sm select-none">
          Right-click this area
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover className="w-52">
        <ContextMenu.Menu aria-label="Canvas actions">
          <ContextMenu.Item id="edit" leading={<RiPencilLine />}>
            Edit
          </ContextMenu.Item>
          <ContextMenu.Item id="duplicate" leading={<RiFileCopyLine />}>
            Duplicate
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
