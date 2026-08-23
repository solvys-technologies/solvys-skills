import { Chip } from "@/registry/ui/chip"

export default function ChipSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip size="xs">xs</Chip>
      <Chip size="sm">sm</Chip>
      <Chip size="md">md</Chip>
      <Chip size="lg">lg</Chip>
      <Chip size="xl">xl</Chip>
    </div>
  )
}
