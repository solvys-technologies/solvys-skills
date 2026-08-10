import {
  RiInbox2Line,
  RiSettings6Fill,
  RiUser3Line,
} from "@create-ui/assets/icons"

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlAppearance() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl variant="neutral" appearance="flat" className="gap-2">
        <SegmentedControlItem leading={<RiInbox2Line />}>
          Inbox
        </SegmentedControlItem>
        <SegmentedControlItem selected leading={<RiUser3Line />}>
          Mine
        </SegmentedControlItem>
        <SegmentedControlItem leading={<RiSettings6Fill />}>
          Archived
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        defaultValue="week"
      >
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
