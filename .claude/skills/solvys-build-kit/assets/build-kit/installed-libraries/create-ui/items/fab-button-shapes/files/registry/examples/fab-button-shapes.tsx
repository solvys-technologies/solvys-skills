import { RiAddLine } from "@create-ui/assets/icons"

import { FabButton } from "@/registry/pro/ui/fab-button"

export default function FabButtonShapes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <FabButton shape="rounded" leading={<RiAddLine />} />
      <FabButton shape="pill" leading={<RiAddLine />} />
    </div>
  )
}
