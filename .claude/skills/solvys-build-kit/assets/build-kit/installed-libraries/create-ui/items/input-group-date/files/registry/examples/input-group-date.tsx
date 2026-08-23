"use client"

import { DateInput } from "@/registry/ui/date-input"
import { Field, FieldLabel } from "@/registry/ui/field"

export default function InputGroupDate() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-date">Date</FieldLabel>
      <DateInput
        id="input-group-date"
        onValueChange={(iso, date) => console.log(iso, date)}
      />
    </Field>
  )
}
