import {
  RiAddLine,
  RiFolderAddLine,
  RiStickyNoteAddLine,
  RiUploadCloud2Line,
} from "@create-ui/assets/icons"

import {
  FabGroup,
  FabGroupItem,
  FabGroupList,
  FabGroupTrigger,
} from "@/registry/pro/ui/fab-button"

const appearances = ["default", "soft"] as const
const actions = [
  { key: "upload", label: "Upload file", icon: <RiUploadCloud2Line /> },
  { key: "project", label: "New project", icon: <RiFolderAddLine /> },
  { key: "note", label: "New note", icon: <RiStickyNoteAddLine /> },
]

export default function FabButtonAppearance() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {appearances.map((appearance) => (
        <div key={appearance} className="flex flex-col items-center gap-3">
          <div className="flex min-h-64 w-44 items-end justify-end">
            <FabGroup appearance={appearance} placement="vertical" defaultOpen>
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
            {appearance}
          </span>
        </div>
      ))}
    </div>
  )
}
