import { Chip } from "@/registry/ui/chip"

export default function ChipStates() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>Default</Chip>
        <Chip selected>Selected</Chip>
        <Chip dragging>Dragging</Chip>
        <Chip disabled>Disabled</Chip>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="info" appearance="soft">
          Default
        </Chip>
        <Chip variant="info" appearance="soft" selected>
          Selected
        </Chip>
        <Chip variant="info" appearance="soft" dragging>
          Dragging
        </Chip>
        <Chip variant="info" appearance="soft" disabled>
          Disabled
        </Chip>
      </div>
    </div>
  )
}
