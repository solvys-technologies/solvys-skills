"use client"

import * as React from "react"
import {
  RiBankCardLine,
  RiCheckboxCircleFill,
  RiFileLine,
  RiGlobalLine,
} from "@create-ui/assets/icons"

import { Select } from "@/registry/ui/select"

const PLANS = [
  {
    id: "free",
    label: "Free",
    desc: "For individuals getting started",
    icon: <RiFileLine />,
  },
  {
    id: "pro",
    label: "Pro",
    desc: "Billed annually · advanced features",
    icon: <RiGlobalLine />,
  },
  {
    id: "team",
    label: "Team",
    desc: "Shared billing and workspaces",
    icon: <RiBankCardLine />,
  },
]

export default function SelectRichItems() {
  const [value, setValue] = React.useState<string | null>("pro")
  const selected = PLANS.find((plan) => plan.id === value)

  return (
    <div className="w-xs">
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger>
          <Select.Value placeholder="Choose a plan">
            {selected ? selected.label : null}
          </Select.Value>
        </Select.Trigger>
        <Select.Popover className="w-80">
          {PLANS.map((plan) => (
            <Select.Item
              key={plan.id}
              value={plan.id}
              leading={plan.icon}
              description={plan.desc}
              indicator={<RiCheckboxCircleFill />}
            >
              {plan.label}
            </Select.Item>
          ))}
        </Select.Popover>
      </Select>
    </div>
  )
}
