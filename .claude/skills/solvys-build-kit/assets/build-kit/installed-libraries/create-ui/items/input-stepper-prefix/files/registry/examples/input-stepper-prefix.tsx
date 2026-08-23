"use client"

import * as React from "react"

import { InputStepper } from "@/registry/pro/ui/input-stepper"

export default function InputStepperPrefix() {
  const [amount, setAmount] = React.useState(20)

  return (
    <div className="w-[240px]">
      <InputStepper
        variant="end-controls"
        prefix="$"
        value={amount}
        onValueChange={setAmount}
        min={0}
        step={5}
        aria-label="Amount"
      />
    </div>
  )
}
