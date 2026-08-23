import { RiArrowRightSLine, RiSettings6Fill } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlShape() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl
        variant="neutral"
        shape="rounded"
        appearance="grouped"
        defaultValue="settings"
      >
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
        <SegmentedControlItem
          value="profile"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Profile
          <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
            3
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="neutral"
        shape="pill"
        appearance="grouped"
        defaultValue="settings"
      >
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
        <SegmentedControlItem
          value="profile"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Profile
          <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
            3
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
