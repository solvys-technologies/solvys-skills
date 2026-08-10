"use client"

import * as React from "react"

import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperControlled() {
  const [value, setValue] = React.useState(3)

  return (
    <div className="flex w-[240px] flex-col gap-2">
      <InputStepper
        value={value}
        onValueChange={setValue}
        min={0}
        max={99}
        step={1}
        aria-label="Controlled stepper"
      />
      <p className="text-placeholder text-ui-control-sm">
        Value: <span className="text-body font-medium">{value}</span>
      </p>
    </div>
  )
}
