import { Chip } from "@/registry/ui/chip"

export default function ChipShape() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip shape="rounded">Rounded</Chip>
      <Chip shape="pill">Pill</Chip>
    </div>
  )
}
