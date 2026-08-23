"use client"

import {
  RiArrowDownDoubleLine,
  RiArrowUpDoubleLine,
  RiClipboardLine,
  RiCommandLine,
  RiDeleteBin6Line,
  RiFileCopy2Line,
  RiFileCopyLine,
  RiPencilLine,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { ContextMenu } from "@/registry/ui/context-menu"

// ⌘ icon badge + letter badge, both soft-neutral and sized to the menu.
function Shortcut({ letter }: { letter: string }) {
  return (
    <span className="ml-auto flex shrink-0 items-center gap-1">
      <Badge variant="neutral" appearance="soft" size="sm" iconOnly>
        <RiCommandLine />
      </Badge>
      <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
        {letter}
      </Badge>
    </span>
  )
}

export default function ContextMenuDemoPro() {
  return (
    <ContextMenu size="sm">
      <ContextMenu.Trigger>
        <div className="bg-weak text-body border-light flex h-40 w-72 items-center justify-center rounded-2xl border text-sm select-none">
          Right-click this card
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover className="w-60">
        <ContextMenu.Menu aria-label="Card actions">
          <ContextMenu.Section>
            <ContextMenu.Header>Edit</ContextMenu.Header>
            <ContextMenu.Item
              id="copy"
              leading={<RiFileCopyLine />}
              trailing={<Shortcut letter="C" />}
            >
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item
              id="duplicate"
              leading={<RiFileCopy2Line />}
              trailing={<Shortcut letter="D" />}
            >
              Duplicate
            </ContextMenu.Item>
            <ContextMenu.Item
              id="paste"
              leading={<RiClipboardLine />}
              trailing={<Shortcut letter="V" />}
            >
              Paste
            </ContextMenu.Item>
          </ContextMenu.Section>
          <ContextMenu.Separator />
          <ContextMenu.Section>
            <ContextMenu.Header>Arrange</ContextMenu.Header>
            <ContextMenu.Item id="front" leading={<RiArrowUpDoubleLine />}>
              Bring to front
            </ContextMenu.Item>
            <ContextMenu.Item id="back" leading={<RiArrowDownDoubleLine />}>
              Send to back
            </ContextMenu.Item>
          </ContextMenu.Section>
          <ContextMenu.Separator />
          <ContextMenu.Item id="rename" leading={<RiPencilLine />}>
            Rename
          </ContextMenu.Item>
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
