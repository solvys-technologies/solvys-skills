import {
  RiAddLine,
  RiFolderAddLine,
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

const variants = ["primary", "neutral", "inverse"] as const
const actions = [
  { key: "upload", label: "Upload file", icon: <RiUploadCloud2Line /> },
  { key: "project", label: "New project", icon: <RiFolderAddLine /> },
  { key: "note", label: "New note", icon: <RiStickyNoteAddLine /> },
]

export default function FabButtonVariants() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-3">
          {/* inverse is tuned for dark/inverted surfaces */}
          <div
            className={cn(
              "flex min-h-64 w-44 items-end justify-end overflow-hidden rounded-2xl p-2",
              variant === "inverse" && "bg-static-black"
            )}
          >
            <FabGroup variant={variant} placement="vertical" defaultOpen>
              <FabGroupTrigger leading={<RiAddLine />} />
              <FabGroupList>
                {actions.map((action) => (
                  <FabGroupItem key={action.key} icon={action.icon}>
                    {action.label}
                  </FabGroupItem>
                ))}
              </FabGroupList>
            </FabGroup>
          </div>
          <span className="text-body text-[10px] font-medium uppercase">
            {variant}
          </span>
        </div>
      ))}
    </div>
  )
}
