"use client"

import * as React from "react"

import { CurrencyFlag } from "@/registry/ui/country-flag"
import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupLeadingIcon,
  InputGroupSelect,
  InputGroupSlot,
} from "@/registry/ui/input-group"
import { SelectItem } from "@/registry/ui/select"

const CURRENCIES = ["USD", "EUR", "GBP"] as const

const CURRENCY_SYMBOLS: Record<(typeof CURRENCIES)[number], string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
}

export default function InputGroupAmount() {
  const [currency, setCurrency] = React.useState("USD")

  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-amount">Amount</FieldLabel>
      <InputGroup>
        <InputGroupLeadingIcon>
          <span className="font-medium">
            {CURRENCY_SYMBOLS[currency as (typeof CURRENCIES)[number]]}
          </span>
        </InputGroupLeadingIcon>
        <InputGroupSlot>
          <InputGroupControl
            id="input-group-amount"
            placeholder="0.00"
            defaultValue="1,250.00"
            inputMode="decimal"
          />
        </InputGroupSlot>
        <InputGroupSelect
          value={currency}
          onChange={(key) => setCurrency(key as string)}
          prefix={<CurrencyFlag code={currency} className="size-5" />}
          valueChildren={currency}
        >
          {CURRENCIES.map((c) => (
            <SelectItem key={c} value={c}>
              <CurrencyFlag code={c} className="size-5" />
              {c}
            </SelectItem>
          ))}
        </InputGroupSelect>
      </InputGroup>
    </Field>
  )
}
