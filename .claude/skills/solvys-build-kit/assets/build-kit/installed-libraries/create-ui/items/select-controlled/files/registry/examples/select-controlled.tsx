"use client"

import * as React from "react"

import { Select } from "@/registry/ui/select"

export default function SelectControlled() {
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <div className="gap-component-sm flex w-xs flex-col items-start">
      <Select
        value={value}
        className="w-full"
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select plan" />
        </Select.Trigger>
        <Select.Popover>
          <Select.Group>
            <Select.Item value="hobby">Hobby</Select.Item>
            <Select.Item value="pro">Pro</Select.Item>
            <Select.Item value="team">Team</Select.Item>
            <Select.Item value="enterprise">Enterprise</Select.Item>
          </Select.Group>
        </Select.Popover>
      </Select>
      <p className="text-ui-control-sm text-placeholder">
        Selected: <span className="text-body font-medium">{value ?? "—"}</span>
      </p>
    </div>
  )
}
