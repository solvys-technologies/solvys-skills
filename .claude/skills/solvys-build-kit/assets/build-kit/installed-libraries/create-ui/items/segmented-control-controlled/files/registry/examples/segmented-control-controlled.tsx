"use client"

import * as React from "react"
import {
  RiLayoutGridFill,
  RiLineChartLine,
  RiListUnordered,
} from "@create-ui/assets/icons"

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlControlled() {
  const [value, setValue] = React.useState("list")

  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl
        variant="neutral"
        appearance="grouped"
        value={value}
        onValueChange={setValue}
      >
        <SegmentedControlItem value="grid" leading={<RiLayoutGridFill />}>
          Grid
        </SegmentedControlItem>
        <SegmentedControlItem value="list" leading={<RiListUnordered />}>
          List
        </SegmentedControlItem>
        <SegmentedControlItem value="chart" leading={<RiLineChartLine />}>
          Chart
        </SegmentedControlItem>
      </SegmentedControl>
      <p className="text-ui-control-sm text-body">
        View: <span className="text-strongest font-semibold">{value}</span>
      </p>
    </div>
  )
}
