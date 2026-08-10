"use client"

import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"
import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperInField() {
  const [quantity, setQuantity] = React.useState(1)

  return (
    <div className="flex w-[320px] flex-col gap-6">
      <Field size="md">
        <FieldLabel htmlFor="qty">Quantity</FieldLabel>
        <InputStepper
          id="qty"
          value={quantity}
          onValueChange={setQuantity}
          min={1}
          max={10}
        />
        <FieldDescription>
          Inherits size from <code>{'<Field size="md" />'}</code>.
        </FieldDescription>
      </Field>

      <Field size="sm" invalid>
        <FieldLabel htmlFor="qty-invalid">Quantity (invalid)</FieldLabel>
        <InputStepper id="qty-invalid" defaultValue={3} />
        <FieldDescription>
          Inherits <code>invalid</code> from Field.
        </FieldDescription>
      </Field>

      <Field size="xs" disabled>
        <FieldLabel htmlFor="qty-disabled">Quantity (disabled)</FieldLabel>
        <InputStepper id="qty-disabled" defaultValue={3} variant="detached" />
      </Field>
    </div>
  )
}
