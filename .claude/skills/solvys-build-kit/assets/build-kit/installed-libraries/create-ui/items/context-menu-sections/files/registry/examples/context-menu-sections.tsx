"use client"

import {
  RiClipboardLine,
  RiDeleteBin6Line,
  RiFileCopyLine,
  RiFolderTransferLine,
  RiScissorsCutLine,
} from "@create-ui/assets/icons"

import { ContextMenu } from "@/registry/ui/context-menu"

export default function ContextMenuSections() {
  return (
    <ContextMenu size="sm">
      <ContextMenu.Trigger>
        <div className="border-light text-placeholder flex h-40 w-72 items-center justify-center rounded-2xl border border-dashed text-sm select-none">
          Right-click this area
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover className="w-56">
        <ContextMenu.Menu aria-label="Row actions">
          <ContextMenu.Section>
            <ContextMenu.Header>Edit</ContextMenu.Header>
            <ContextMenu.Item id="cut" leading={<RiScissorsCutLine />}>
              Cut
            </ContextMenu.Item>
            <ContextMenu.Item id="copy" leading={<RiFileCopyLine />}>
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item id="paste" leading={<RiClipboardLine />}>
              Paste
            </ContextMenu.Item>
          </ContextMenu.Section>
          <ContextMenu.Separator />
          <ContextMenu.Section>
            <ContextMenu.Header>Organize</ContextMenu.Header>
            <ContextMenu.Item id="move" leading={<RiFolderTransferLine />}>
              Move to…
            </ContextMenu.Item>
            <ContextMenu.Item
              id="delete"
              variant="danger"
              leading={<RiDeleteBin6Line />}
            >
              Delete
            </ContextMenu.Item>
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}
