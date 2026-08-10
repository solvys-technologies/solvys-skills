"use client"

import * as React from "react"

import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperStates() {
  const [filled, setFilled] = React.useState(3)
  const [invalid, setInvalid] = React.useState(3)

  return (
    <div className="flex w-[280px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-ui-control-sm text-disabled font-medium">
          Default
        </span>
        <InputStepper
          size="md"
          placeholder="3"
          min={0}
          max={99}
          aria-label="Default stepper"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-ui-control-sm text-disabled font-medium">
          Filled
        </span>
        <InputStepper
          size="md"
          value={filled}
          onValueChange={setFilled}
          min={0}
          max={99}
          aria-label="Filled stepper"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-ui-control-sm text-disabled font-medium">
          Invalid
        </span>
        <InputStepper
          size="md"
          invalid
          value={invalid}
          onValueChange={setInvalid}
          min={0}
          max={99}
          aria-label="Invalid stepper"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-ui-control-sm text-disabled font-medium">
          Disabled
        </span>
        <InputStepper
          size="md"
          disabled
          defaultValue={3}
          min={0}
          max={99}
          aria-label="Disabled stepper"
        />
      </div>
    </div>
  )
}
