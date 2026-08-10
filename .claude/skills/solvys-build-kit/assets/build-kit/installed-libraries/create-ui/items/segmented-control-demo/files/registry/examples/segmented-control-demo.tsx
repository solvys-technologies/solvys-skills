import {
  RiBillLine,
  RiChat1Line,
  RiFunctionLine,
  RiNotification3Line,
  RiSettings3Line,
} from "@create-ui/assets/icons"

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"

export default function SegmentedControlDemo() {
  return (
    <SegmentedControl
      variant="neutral"
      appearance="grouped"
      size="lg"
      defaultValue="all"
    >
      <SegmentedControlItem value="all" leading={<RiFunctionLine />}>
        All
      </SegmentedControlItem>
      <SegmentedControlItem
        value="messages"
        leading={<RiChat1Line />}
        trailing={<StatusBadge variant="info" />}
      >
        Messages
      </SegmentedControlItem>
      <SegmentedControlItem value="billing" leading={<RiBillLine />}>
        Billing
      </SegmentedControlItem>
      <SegmentedControlItem
        value="notifications"
        leading={<RiNotification3Line />}
        trailing={<span>7</span>}
        disabled
      >
        Notifications
      </SegmentedControlItem>
      <SegmentedControlItem value="settings" leading={<RiSettings3Line />}>
        Settings
      </SegmentedControlItem>
    </SegmentedControl>
  )
}
