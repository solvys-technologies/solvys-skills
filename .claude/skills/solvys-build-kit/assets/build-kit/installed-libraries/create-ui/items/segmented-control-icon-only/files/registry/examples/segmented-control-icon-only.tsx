import {
  RiLayoutGridFill,
  RiLineChartLine,
  RiListUnordered,
} from "@create-ui/assets/icons"

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlIconOnly() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        defaultValue="grid"
      >
        <SegmentedControlItem value="grid" iconOnly aria-label="Grid view">
          <RiLayoutGridFill />
        </SegmentedControlItem>
        <SegmentedControlItem value="list" iconOnly aria-label="List view">
          <RiListUnordered />
        </SegmentedControlItem>
        <SegmentedControlItem value="chart" iconOnly aria-label="Chart view">
          <RiLineChartLine />
        </SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="primary"
        shape="pill"
        appearance="grouped"
        defaultValue="grid"
      >
        <SegmentedControlItem value="grid" iconOnly aria-label="Grid view">
          <RiLayoutGridFill />
        </SegmentedControlItem>
        <SegmentedControlItem value="list" iconOnly aria-label="List view">
          <RiListUnordered />
        </SegmentedControlItem>
        <SegmentedControlItem value="chart" iconOnly aria-label="Chart view">
          <RiLineChartLine />
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
