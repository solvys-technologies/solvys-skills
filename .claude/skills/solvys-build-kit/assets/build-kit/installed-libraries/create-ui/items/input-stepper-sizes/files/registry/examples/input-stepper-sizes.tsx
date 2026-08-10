"use client"

import * as React from "react"

import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperSizes() {
  const [xs, setXs] = React.useState(2)
  const [sm, setSm] = React.useState(2)
  const [md, setMd] = React.useState(2)

  return (
    <div className="flex w-[280px] flex-col gap-3">
      <InputStepper
        size="xs"
        value={xs}
        onValueChange={setXs}
        min={0}
        max={99}
        aria-label="Extra small stepper"
      />
      <InputStepper
        size="sm"
        value={sm}
        onValueChange={setSm}
        min={0}
        max={99}
        aria-label="Small stepper"
      />
      <InputStepper
        size="md"
        value={md}
        onValueChange={setMd}
        min={0}
        max={99}
        aria-label="Medium stepper"
      />
    </div>
  )
}
