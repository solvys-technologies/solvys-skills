import {
  RiAddLine,
  RiFlashlightLine,
  RiFolderAddLine,
  RiFunctionAddLine,
  RiStickyNoteAddLine,
  RiUploadCloud2Line,
} from "@create-ui/assets/icons"

import { cn } from "@/registry/lib/utils"
import {
  FabGroup,
  FabGroupItem,
  FabGroupList,
  FabGroupTrigger,
} from "@/registry/pro/ui/fab-button"

// In the radial placements items are icon-only; the children string is used as
// each item's aria-label.
const pool = [
  { key: "upload", label: "Upload file", icon: <RiUploadCloud2Line /> },
  { key: "project", label: "New project", icon: <RiFolderAddLine /> },
  { key: "note", label: "New note", icon: <RiStickyNoteAddLine /> },
  { key: "task", label: "New task", icon: <RiFunctionAddLine /> },
  { key: "boost", label: "Boost", icon: <RiFlashlightLine /> },
]

// center supports up to 5 items; left / right up to 3. Anchor the trigger so the
// arc has room: center stays centred, left fans leftward, right fans rightward.
const cells = [
  {
    placement: "center",
    count: 5,
    label: "center · 5 (max)",
    anchor: "justify-center",
  },
  {
    placement: "left",
    count: 3,
    label: "left · 3 (max)",
    anchor: "justify-end",
  },
  {
    placement: "right",
    count: 3,
    label: "right · 3 (max)",
    anchor: "justify-start",
  },
] as const

export default function FabButtonRadial() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {cells.map(({ placement, count, label, anchor }) => (
        <div key={placement} className="flex w-60 flex-col items-center gap-3">
          <div className={cn("flex min-h-52 w-full items-end", anchor)}>
            <FabGroup placement={placement} defaultOpen>
              <FabGroupTrigger leading={<RiAddLine />} />
              <FabGroupList>
                {pool.slice(0, count).map((action) => (
                  <FabGroupItem key={action.key} icon={action.icon}>
                    {action.label}
                  </FabGroupItem>
                ))}
              </FabGroupList>
            </FabGroup>
          </div>
          <span className="text-body text-[10px] font-medium uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
