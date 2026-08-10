"use client"

import { CreditCardInput } from "@/registry/ui/credit-card-input"
import { Field, FieldLabel } from "@/registry/ui/field"

export default function InputGroupCreditCard() {
  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-credit-card">Card Number</FieldLabel>
      <CreditCardInput
        id="input-group-credit-card"
        defaultValue="5555555555554444"
        onValueChange={(value, { cardType, isValid }) =>
          console.log(value, cardType, isValid)
        }
      />
    </Field>
  )
}
