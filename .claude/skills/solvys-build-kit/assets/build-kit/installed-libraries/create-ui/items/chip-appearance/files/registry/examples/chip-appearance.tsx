import { Chip } from "@/registry/ui/chip"

export default function ChipAppearance() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip appearance="outline" variant="neutral">
          Neutral
        </Chip>
        <Chip appearance="outline" variant="info">
          Blue
        </Chip>
        <Chip appearance="outline" variant="danger">
          Red
        </Chip>
        <Chip appearance="outline" variant="success">
          Green
        </Chip>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip appearance="soft" variant="neutral">
          Neutral
        </Chip>
        <Chip appearance="soft" variant="info">
          Blue
        </Chip>
        <Chip appearance="soft" variant="danger">
          Red
        </Chip>
        <Chip appearance="soft" variant="success">
          Green
        </Chip>
      </div>
    </div>
  )
}
