"use client"

import { Slider } from "@/registry/pro/ui/slider"
import { Badge } from "@/registry/ui/badge"

const MARKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
export default function SliderDemoPro() {
  return (
    <div className="w-full max-w-96">
      <div className="gap-component-md flex items-center pb-10">
        <Badge variant="neutral" appearance="soft" size="md">
          0%
        </Badge>
        <Slider
          defaultValue={[42]}
          marks={MARKS}
          tooltip="top"
          formatTooltip={(value) => `${value}%`}
        />
        <Badge variant="neutral" appearance="soft" size="md">
          100%
        </Badge>
      </div>
    </div>
  )
}
