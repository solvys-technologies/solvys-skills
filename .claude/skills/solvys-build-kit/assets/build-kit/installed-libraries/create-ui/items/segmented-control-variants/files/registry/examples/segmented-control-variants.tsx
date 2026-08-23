import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlVariants() {
  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        defaultValue="month"
      >
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
        <SegmentedControlItem value="quarter">Quarter</SegmentedControlItem>
        <SegmentedControlItem value="year">Year</SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl
        variant="primary"
        appearance="grouped"
        defaultValue="month"
      >
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
        <SegmentedControlItem value="quarter">Quarter</SegmentedControlItem>
        <SegmentedControlItem value="year">Year</SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
