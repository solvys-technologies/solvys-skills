import { Badge } from "@/registry/ui/badge"

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="xs">xs</Badge>
      <Badge size="sm">sm</Badge>
      <Badge size="md">md</Badge>
    </div>
  )
}
