"use client"

import * as React from "react"

import { Chip } from "@/registry/ui/chip"
import { Select } from "@/registry/ui/select"

const PEOPLE = [
  { value: "ayla", label: "Ayla" },
  { value: "liam", label: "Liam" },
  { value: "yuki", label: "Yuki" },
  { value: "sofia", label: "Sofia" },
  { value: "marcus", label: "Marcus" },
]

export default function SelectMulti() {
  const [selected, setSelected] = React.useState<string[]>(["ayla", "liam"])

  const remove = (value: string) =>
    setSelected((prev) => prev.filter((v) => v !== value))

  return (
    <div className="w-full max-w-sm">
      <Select
        selectionMode="multiple"
        value={selected}
        onChange={(keys) => setSelected([...keys].map(String))}
      >
        <Select.Trigger>
          {selected.length > 0 ? (
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
              {selected.map((val) => {
                const label = PEOPLE.find((p) => p.value === val)?.label ?? val
                return (
                  <Chip
                    key={val}
                    size="md"
                    appearance="soft"
                    variant="neutral"
                    shape="rounded"
                    onClose={() => remove(val)}
                  >
                    {label}
                  </Chip>
                )
              })}
            </div>
          ) : (
            <Select.Value placeholder="Select people…" />
          )}
        </Select.Trigger>
        <Select.Popover>
          <Select.Group>
            {PEOPLE.map((p) => (
              <Select.Item key={p.value} value={p.value}>
                {p.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Popover>
      </Select>
    </div>
  )
}
