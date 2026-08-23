"use client"

import * as React from "react"

import { Select } from "@/registry/ui/select"

const ITEMS = [
  { value: "product-design", label: "Product Design" },
  { value: "ux-design", label: "UX Design" },
  { value: "ui-design", label: "UI Design" },
  { value: "motion-design", label: "Motion Design" },
]

function RoleItems() {
  return (
    <Select.Group>
      {ITEMS.map((item) => (
        <Select.Item key={item.value} value={item.value}>
          {item.label}
        </Select.Item>
      ))}
    </Select.Group>
  )
}

export default function SelectStates() {
  const [filled, setFilled] = React.useState<string | null>("product-design")
  const [error, setError] = React.useState<string | null>("ux-design")

  return (
    <div className="gap-component-md grid w-full max-w-md grid-cols-1 sm:grid-cols-2">
      <Select
        value={filled}
        onChange={(key) => setFilled(key ? String(key) : null)}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select role" />
        </Select.Trigger>
        <Select.Popover>
          <RoleItems />
        </Select.Popover>
      </Select>

      <Select isDisabled value="product-design">
        <Select.Trigger>
          <Select.Value placeholder="Select role" />
        </Select.Trigger>
        <Select.Popover>
          <RoleItems />
        </Select.Popover>
      </Select>

      <Select
        isInvalid
        value={error}
        onChange={(key) => setError(key ? String(key) : null)}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select role" />
        </Select.Trigger>
        <Select.Popover>
          <RoleItems />
        </Select.Popover>
      </Select>

      <Select loading value="product-design">
        <Select.Trigger>
          <Select.Value placeholder="Loading…" />
        </Select.Trigger>
        <Select.Popover>
          <RoleItems />
        </Select.Popover>
      </Select>
    </div>
  )
}
