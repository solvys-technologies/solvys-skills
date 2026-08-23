"use client"

import * as React from "react"
import {
  France,
  Germany,
  Japan,
  Turkey,
  UnitedStates,
} from "@create-ui/assets/flags"

import { Select } from "@/registry/ui/select"

const COUNTRIES = [
  {
    value: "de",
    label: "Germany",
    flag: <Germany className="size-5 shrink-0" />,
  },
  {
    value: "us",
    label: "United States",
    flag: <UnitedStates className="size-5 shrink-0" />,
  },
  { value: "jp", label: "Japan", flag: <Japan className="size-5 shrink-0" /> },
  {
    value: "fr",
    label: "France",
    flag: <France className="size-5 shrink-0" />,
  },
  {
    value: "tr",
    label: "Türkiye",
    flag: <Turkey className="size-5 shrink-0" />,
  },
]

export default function SelectDemo() {
  const [value, setValue] = React.useState<string | null>("de")
  const selected = COUNTRIES.find((c) => c.value === value)

  return (
    <div className="w-full max-w-xs">
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger>
          {selected?.flag}
          <Select.Value placeholder="Select country">
            {selected?.label}
          </Select.Value>
        </Select.Trigger>
        <Select.Popover>
          <Select.Group>
            {COUNTRIES.map((country) => (
              <Select.Item key={country.value} value={country.value}>
                {country.flag}
                {country.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Popover>
      </Select>
    </div>
  )
}
