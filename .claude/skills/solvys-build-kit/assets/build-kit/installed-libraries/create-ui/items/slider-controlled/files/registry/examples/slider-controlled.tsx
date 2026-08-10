"use client"

import * as React from "react"

import { Slider } from "@/registry/ui/slider"

export default function SliderControlled() {
  const [value, setValue] = React.useState([42])
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="text-ui-control-sm text-body flex justify-between">
        <span>Opacity</span>
        <span className="text-strongest font-medium">{value[0]}%</span>
      </div>
      <Slider value={value} onValueChange={setValue} />
    </div>
  )
}
