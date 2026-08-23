"use client"

import * as React from "react"

import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperVariantsFree() {
  const [splitValue, setSplitValue] = React.useState(3)
  const [detached, setDetached] = React.useState(3)

  return (
    <div className="flex w-[280px] flex-col gap-3">
      <InputStepper
        variant="split"
        value={splitValue}
        onValueChange={setSplitValue}
        min={0}
        max={99}
        aria-label="Split stepper"
      />
      <InputStepper
        variant="detached"
        value={detached}
        onValueChange={setDetached}
        min={0}
        max={99}
        aria-label="Detached stepper"
      />
    </div>
  )
}
