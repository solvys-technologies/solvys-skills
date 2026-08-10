"use client"

import * as React from "react"

import { InputStepper } from "@/registry/pro/ui/input-stepper"

export default function InputStepperVariants() {
  const [endControls, setEndControls] = React.useState(3)
  const [vertical, setVertical] = React.useState(3)

  return (
    <div className="flex w-[280px] flex-col gap-3">
      <InputStepper
        variant="end-controls"
        value={endControls}
        onValueChange={setEndControls}
        min={0}
        max={99}
        aria-label="End controls stepper"
      />
      <InputStepper
        variant="vertical-stepper"
        value={vertical}
        onValueChange={setVertical}
        min={0}
        max={99}
        aria-label="Vertical stepper"
      />
    </div>
  )
}
