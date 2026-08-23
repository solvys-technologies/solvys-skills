import { Chip } from "@/registry/ui/chip"

export default function ChipColors() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="neutral">Neutral</Chip>
      <Chip variant="info">Info</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="success">Success</Chip>
    </div>
  )
}
