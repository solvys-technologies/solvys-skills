import { RiFilter3Fill } from "@create-ui/assets/icons"

import { Chip } from "@/registry/ui/chip"

export default function ChipWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="info">
        <RiFilter3Fill />
        Filter
      </Chip>
      <Chip variant="success" appearance="soft">
        <RiFilter3Fill />
        Filter
      </Chip>
      <Chip variant="danger" shape="pill">
        <RiFilter3Fill />
        Filter
      </Chip>
    </div>
  )
}
