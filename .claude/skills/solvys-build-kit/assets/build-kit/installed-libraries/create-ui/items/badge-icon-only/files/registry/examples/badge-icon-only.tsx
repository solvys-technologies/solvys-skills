import { RiSparklingFill } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"

export default function BadgeIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="xs" iconOnly aria-label="Sparkle">
        <RiSparklingFill />
      </Badge>
      <Badge size="sm" iconOnly aria-label="Sparkle">
        <RiSparklingFill />
      </Badge>
      <Badge size="md" iconOnly aria-label="Sparkle">
        <RiSparklingFill />
      </Badge>
    </div>
  )
}
