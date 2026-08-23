"use client"

import * as React from "react"

import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupLeadingIcon,
  InputGroupSelect,
  InputGroupSlot,
} from "@/registry/ui/input-group"
import { SelectItem } from "@/registry/ui/select"

const CURRENCY_SYMBOLS: Record<string, string> = {
  usd: "$",
  eur: "€",
  gbp: "£",
}

export default function InputGroupWithSelect() {
  const [currency, setCurrency] = React.useState("usd")

  return (
    <Field className="w-77 lg:w-sm">
      <FieldLabel htmlFor="input-group-with-select-amount">Amount</FieldLabel>
      <InputGroup>
        <InputGroupLeadingIcon>
          <span className="font-medium">{CURRENCY_SYMBOLS[currency]}</span>
        </InputGroupLeadingIcon>
        <InputGroupSlot>
          <InputGroupControl
            id="input-group-with-select-amount"
            placeholder="0.00"
          />
        </InputGroupSlot>
        <InputGroupSelect
          value={currency}
          onChange={(key) => setCurrency(key as string)}
        >
          <SelectItem value="usd">USD</SelectItem>
          <SelectItem value="eur">EUR</SelectItem>
          <SelectItem value="gbp">GBP</SelectItem>
        </InputGroupSelect>
      </InputGroup>
    </Field>
  )
}
