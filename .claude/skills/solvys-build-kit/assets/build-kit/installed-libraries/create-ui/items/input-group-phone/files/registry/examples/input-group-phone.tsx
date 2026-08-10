"use client"

import { Field, FieldLabel } from "@/registry/ui/field"
import { PhoneInput } from "@/registry/ui/phone-input"

export default function InputGroupPhone() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-phone">Phone Number</FieldLabel>
      <PhoneInput
        id="input-group-phone"
        defaultCountry="US"
        onValueChange={(value, { country }) => console.log(value, country)}
      />
    </Field>
  )
}
