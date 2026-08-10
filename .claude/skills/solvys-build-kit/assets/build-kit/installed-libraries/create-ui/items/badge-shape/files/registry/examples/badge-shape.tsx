import { Badge } from "@/registry/ui/badge"

export default function BadgeShape() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge shape="rounded">Rounded</Badge>
      <Badge shape="pill">Pill</Badge>
    </div>
  )
}
