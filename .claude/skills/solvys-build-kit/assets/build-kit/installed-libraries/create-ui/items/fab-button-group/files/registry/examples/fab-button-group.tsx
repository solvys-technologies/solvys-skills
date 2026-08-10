import {
  RiAddLine,
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
]

export default function FabButtonGroup() {
  return (
    <div className="flex min-h-72 items-end justify-center">
      <FabGroup placement="vertical" defaultOpen>
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
  )
}
