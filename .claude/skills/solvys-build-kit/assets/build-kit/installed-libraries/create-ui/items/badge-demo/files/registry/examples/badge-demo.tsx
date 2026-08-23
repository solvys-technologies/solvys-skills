import type { ReactNode } from "react"
import {
  RiBugLine,
  RiCheckLine,
  RiCloseFill,
  RiFireFill,
  RiHistoryLine,
  RiIdCardFill,
  RiNotification3Fill,
  RiProgress2Line,
  RiProgress3Line,
  RiProhibitedLine,
  RiShoppingBasketFill,
  RiSparklingFill,
  RiTimeLine,
  RiVerifiedBadgeFill,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"

function IconTile({
  icon,
  count,
  variant,
}: {
  icon: ReactNode
  count: number
  variant: "warning" | "success" | "danger"
}) {
  return (
    <div className="bg-weak text-strongest relative flex size-8 items-center justify-center rounded-lg [&_svg]:size-5">
      {icon}
      <Badge
        variant={variant}
        appearance="solid"
        size="xs"
        shape="pill"
        numberOnly
        className="absolute -top-1.5 -right-1.5"
      >
        {count}
      </Badge>
    </div>
  )
}

export default function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-start gap-3">
        <IconTile icon={<RiIdCardFill />} count={2} variant="warning" />
        <IconTile icon={<RiShoppingBasketFill />} count={5} variant="success" />
        <IconTile icon={<RiNotification3Fill />} count={23} variant="danger" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="info" size="md" leading={<RiProgress2Line />}>
          In Progress
        </Badge>
        <Badge variant="success" size="md" leading={<RiCheckLine />}>
          Successful
        </Badge>
        <Badge variant="danger" size="md" leading={<RiCloseFill />}>
          Failed
        </Badge>
        <Badge
          variant="neutral"
          size="md"
          leading={<RiProhibitedLine />}
          disabled
        >
          Disabled
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge
          variant="away"
          appearance="outline"
          size="md"
          shape="pill"
          leading={<RiHistoryLine />}
        >
          Backlog
        </Badge>
        <Badge
          variant="neutral"
          appearance="outline"
          size="md"
          shape="pill"
          leading={<RiTimeLine />}
        >
          Expire
        </Badge>
        <Badge
          variant="warning"
          appearance="outline"
          size="md"
          shape="pill"
          leading={<RiProgress3Line />}
        >
          In Review
        </Badge>
        <Badge
          variant="highlighted"
          appearance="outline"
          size="md"
          shape="pill"
          leading={<RiBugLine />}
        >
          Bug / Issue
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="info" appearance="solid" size="md">
          Beta
        </Badge>
        <Badge
          variant="highlighted"
          appearance="solid"
          size="md"
          leading={<RiSparklingFill />}
        >
          Featured
        </Badge>
        <Badge
          variant="danger"
          appearance="solid"
          size="md"
          leading={<RiFireFill />}
        >
          New
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="warning" appearance="solid" size="md" shape="pill">
          Hot
        </Badge>
        <Badge
          variant="verified"
          appearance="solid"
          size="md"
          shape="pill"
          leading={<RiVerifiedBadgeFill />}
        >
          Verified
        </Badge>
      </div>
    </div>
  )
}
