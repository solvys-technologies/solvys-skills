"use client"

import * as React from "react"

import { InputStepper } from "@/registry/pro/ui/input-stepper"
import {
  Field,
  FieldDescription,
  FieldHelper,
  FieldLabel,
} from "@/registry/ui/field"

export default function InputStepperDemoPro() {
  const [value, setValue] = React.useState(1)

  return (
    <div className="w-80">
      <Field size="sm">
        <FieldLabel>Team Members</FieldLabel>
        <FieldDescription>
          Maximum 25 members on your current plan
        </FieldDescription>

        <InputStepper
          variant="end-controls"
          prefix="$"
          value={value}
          onValueChange={setValue}
          min={0}
          max={10}
          aria-label="Quantity"
        />
        <FieldHelper>Each member counts toward your plan limit</FieldHelper>
      </Field>
    </div>
  )
}
