"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldHelper,
  FieldLabel,
} from "@/registry/ui/field"
import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <div className="w-80">
      <Field size="sm">
        <FieldLabel>Team Members</FieldLabel>
        <FieldDescription>
          Maximum 25 members on your current plan
        </FieldDescription>
        <InputStepper
          value={value}
          onValueChange={setValue}
          min={0}
          max={25}
          aria-label="Quantity"
        />
        <FieldHelper>Each member counts toward your plan limit</FieldHelper>
      </Field>
    </div>
  )
}
