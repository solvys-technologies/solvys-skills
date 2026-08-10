"use client"

import { Slider } from "@/registry/pro/ui/slider"

export default function SliderTooltip() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-12">
      <Slider
        defaultValue={[42]}
        tooltip="top"
        formatTooltip={(value) => `${value}%`}
      />
      <Slider
        defaultValue={[70]}
        tooltip="bottom"
        formatTooltip={(value) => `${value}%`}
      />
    </div>
  )
}
