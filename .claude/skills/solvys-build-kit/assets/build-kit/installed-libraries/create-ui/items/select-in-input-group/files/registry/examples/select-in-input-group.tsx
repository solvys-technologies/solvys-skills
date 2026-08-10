"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupControl,
  InputGroupSlot,
} from "@/registry/ui/input-group"
import { Select } from "@/registry/ui/select"

export default function SelectInInputGroup() {
  const [currency, setCurrency] = React.useState<string | null>("usd")

  return (
    <div className="w-full max-w-xs">
      <InputGroup>
        <Select
          variant="compact"
          value={currency}
          onChange={(key) => setCurrency(key ? String(key) : null)}
        >
          <Select.Trigger aria-label="Currency">
            <Select.Value />
          </Select.Trigger>
          <Select.Popover>
            <Select.Group>
              <Select.Item value="usd">USD</Select.Item>
              <Select.Item value="eur">EUR</Select.Item>
              <Select.Item value="jpy">JPY</Select.Item>
              <Select.Item value="try">TRY</Select.Item>
            </Select.Group>
          </Select.Popover>
        </Select>
        <InputGroupSlot>
          <InputGroupControl placeholder="0.00" inputMode="decimal" />
        </InputGroupSlot>
      </InputGroup>
    </div>
  )
}
