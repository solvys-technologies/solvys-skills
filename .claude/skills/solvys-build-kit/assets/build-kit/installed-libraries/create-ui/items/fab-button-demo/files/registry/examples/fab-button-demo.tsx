import {
  RiAddLine,
  RiFlashlightLine,
  RiFolderAddLine,
  RiFunctionAddLine,
  RiStickyNoteAddLine,
  RiUploadCloud2Line,
} from "@create-ui/assets/icons"

import {
  FabGroup,
  FabGroupItem,
  FabGroupList,
  FabGroupTrigger,
} from "@/registry/pro/ui/fab-button"

const actions = [
  { key: "upload", label: "Upload file", icon: <RiUploadCloud2Line /> },
  { key: "project", label: "New project", icon: <RiFolderAddLine /> },
  { key: "note", label: "New note", icon: <RiStickyNoteAddLine /> },
  { key: "task", label: "New task", icon: <RiFunctionAddLine /> },
  { key: "boost", label: "Boost", icon: <RiFlashlightLine /> },
]

export default function FabButtonDemo() {
  return (
    <div className="flex min-h-72 flex-wrap items-end justify-center gap-8">
      <div className="flex min-h-72 w-44 items-end justify-end">
        <FabGroup placement="vertical" defaultOpen variant="neutral">
          <FabGroupTrigger leading={<RiAddLine />} />
          <FabGroupList>
            {actions.slice(0, 3).map((action) => (
              <FabGroupItem key={action.key} icon={action.icon}>
                {action.label}
              </FabGroupItem>
            ))}
          </FabGroupList>
        </FabGroup>
      </div>
      <div className="flex min-h-72 w-60 items-end justify-center">
        <FabGroup placement="center" defaultOpen>
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
    </div>
  )
}
