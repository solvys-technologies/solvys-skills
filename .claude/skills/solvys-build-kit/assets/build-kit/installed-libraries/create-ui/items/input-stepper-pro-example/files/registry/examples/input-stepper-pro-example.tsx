"use client"

import * as React from "react"

import { InputStepper } from "@/registry/pro/ui/input-stepper"
import { Field, FieldLabel } from "@/registry/ui/field"

export default function InputStepperProExample() {
  const [price, setPrice] = React.useState(20)
  const [seats, setSeats] = React.useState(2)

  return (
    <div className="flex w-[280px] flex-col gap-6">
      <Field size="md">
        <FieldLabel htmlFor="pro-price">Price</FieldLabel>
        <InputStepper
          id="pro-price"
          variant="end-controls"
          prefix="$"
          value={price}
          onValueChange={setPrice}
          min={0}
          step={5}
        />
      </Field>

      <Field size="md">
        <FieldLabel htmlFor="pro-seats">Seats</FieldLabel>
        <InputStepper
          id="pro-seats"
          variant="vertical-stepper"
          value={seats}
          onValueChange={setSeats}
          min={1}
          max={12}
        />
      </Field>
    </div>
  )
}
