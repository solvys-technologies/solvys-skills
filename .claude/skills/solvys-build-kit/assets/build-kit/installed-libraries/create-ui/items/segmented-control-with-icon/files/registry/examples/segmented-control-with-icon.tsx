import {
  RiArrowRightSLine,
  RiInbox2Line,
  RiSettings6Fill,
  RiUser3Line,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlWithIcon() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        defaultValue="inbox"
      >
        <SegmentedControlItem value="inbox" leading={<RiInbox2Line />}>
          Inbox
        </SegmentedControlItem>
        <SegmentedControlItem value="profile" leading={<RiUser3Line />}>
          Profile
        </SegmentedControlItem>
        <SegmentedControlItem value="settings" leading={<RiSettings6Fill />}>
          Settings
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        defaultValue="next"
      >
        <SegmentedControlItem value="back" trailing={<RiArrowRightSLine />}>
          Continue
        </SegmentedControlItem>
        <SegmentedControlItem value="next" trailing={<RiArrowRightSLine />}>
          Review
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        defaultValue="profile"
      >
        <SegmentedControlItem
          value="profile"
          leading={<RiUser3Line />}
          trailing={<RiArrowRightSLine />}
        >
          Profile
          <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
            3
          </Badge>
        </SegmentedControlItem>
        <SegmentedControlItem
          value="settings"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Settings
          <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
