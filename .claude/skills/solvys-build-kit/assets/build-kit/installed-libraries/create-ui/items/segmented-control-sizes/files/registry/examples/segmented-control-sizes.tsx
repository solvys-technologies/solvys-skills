import { RiArrowRightSLine, RiSettings6Fill } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl
        variant="neutral"
        size="xl"
        appearance="grouped"
        defaultValue="settings"
      >
        <SegmentedControlItem
          value="settings"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Settings
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
        <SegmentedControlItem
          value="profile"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Profile
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            3
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="neutral"
        size="lg"
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
        size="md"
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
        size="sm"
        appearance="grouped"
        defaultValue="settings"
      >
        <SegmentedControlItem value="settings" leading={<RiSettings6Fill />}>
          Settings
          <Badge variant="neutral" appearance="soft" size="xs" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
        <SegmentedControlItem value="profile" leading={<RiSettings6Fill />}>
          Profile
          <Badge variant="neutral" appearance="soft" size="xs" numberOnly>
            3
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="neutral"
        size="xs"
        appearance="grouped"
        defaultValue="settings"
      >
        <SegmentedControlItem value="settings" leading={<RiSettings6Fill />}>
          Settings
        </SegmentedControlItem>
        <SegmentedControlItem value="profile" leading={<RiSettings6Fill />}>
          Profile
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
