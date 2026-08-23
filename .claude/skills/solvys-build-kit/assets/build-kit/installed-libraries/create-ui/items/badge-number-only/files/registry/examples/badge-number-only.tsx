import { Badge } from "@/registry/ui/badge"

export default function BadgeNumberOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="danger" size="xs" numberOnly>
        1
      </Badge>
      <Badge variant="danger" size="sm" numberOnly>
        12
      </Badge>
      <Badge variant="danger" size="md" numberOnly>
        99
      </Badge>
    </div>
  )
}
