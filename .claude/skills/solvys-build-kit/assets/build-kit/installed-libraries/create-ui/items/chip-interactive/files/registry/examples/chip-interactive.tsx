"use client"

import * as React from "react"

import { Chip } from "@/registry/ui/chip"

const filters = ["All", "Design", "Engineering", "Product", "Marketing"]

export default function ChipInteractive() {
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(["All"])
  )

  const toggle = (value: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((value) => (
        <Chip
          key={value}
          variant="info"
          selected={selected.has(value)}
          onClick={() => toggle(value)}
        >
          {value}
        </Chip>
      ))}
    </div>
  )
}
