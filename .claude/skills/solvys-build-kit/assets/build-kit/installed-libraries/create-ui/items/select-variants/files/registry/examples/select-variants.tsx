"use client"

import * as React from "react"
import {
  France,
  Germany,
  Japan,
  Turkey,
  UnitedStates,
} from "@create-ui/assets/flags"
import { RiGlobalLine } from "@create-ui/assets/icons"

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

export default function SelectVariants() {
  const [a, setA] = React.useState<string | null>(null)
  const [b, setB] = React.useState<string | null>("de")
  const selectedB = COUNTRIES.find((c) => c.value === b)

  return (
    <div className="gap-component-md flex w-full justify-center">
      <div className="w-full sm:max-w-xs">
        <Select value={a} onChange={(key) => setA(key ? String(key) : null)}>
          <Select.Trigger>
            <Select.Value placeholder="Select country" />
          </Select.Trigger>
          <Select.Popover>
            <Select.Group>
              {COUNTRIES.map((country) => (
                <Select.Item key={country.value} value={country.value}>
                  {country.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Popover>
        </Select>
      </div>

      <Select
        variant="compact"
        value={b}
        onChange={(key) => setB(key ? String(key) : null)}
      >
        <Select.Trigger aria-label="Select country">
          {selectedB?.flag ?? <RiGlobalLine />}
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
