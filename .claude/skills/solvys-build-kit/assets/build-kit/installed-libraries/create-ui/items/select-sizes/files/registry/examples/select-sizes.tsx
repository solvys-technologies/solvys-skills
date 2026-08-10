"use client"

import * as React from "react"

import { Select, type SelectSize } from "@/registry/ui/select"

const ITEMS = [
  { value: "product-design", label: "Product Design" },
  { value: "ux-design", label: "UX Design" },
  { value: "ui-design", label: "UI Design" },
  { value: "motion-design", label: "Motion Design" },
]

function SizeSelect({ size }: { size: SelectSize }) {
  const [value, setValue] = React.useState<string | null>("product-design")
  return (
    <Select
      size={size}
      value={value}
      onChange={(key) => setValue(key ? String(key) : null)}
    >
      <Select.Trigger>
        <Select.Value placeholder="Select role" />
      </Select.Trigger>
      <Select.Popover>
        <Select.Group>
          {ITEMS.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select>
  )
}

export default function SelectSizes() {
  return (
    <div className="gap-component-md flex w-xs flex-col">
      <SizeSelect size="xs" />
      <SizeSelect size="sm" />
      <SizeSelect size="md" />
    </div>
  )
}
