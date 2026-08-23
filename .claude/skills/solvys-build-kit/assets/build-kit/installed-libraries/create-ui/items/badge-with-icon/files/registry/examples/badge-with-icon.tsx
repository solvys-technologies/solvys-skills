import { RiArrowRightLine, RiSparklingFill } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="primary" leading={<RiSparklingFill />}>
        Leading
      </Badge>
      <Badge variant="primary" trailing={<RiArrowRightLine />}>
        Trailing
      </Badge>
      <Badge
        variant="primary"
        leading={<RiSparklingFill />}
        trailing={<RiArrowRightLine />}
      >
        Both
      </Badge>
    </div>
  )
}
