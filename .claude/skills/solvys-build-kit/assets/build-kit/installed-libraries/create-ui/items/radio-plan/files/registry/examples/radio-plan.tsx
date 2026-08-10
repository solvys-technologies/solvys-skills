"use client"

import * as React from "react"

import { Badge } from "@/registry/ui/badge"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

type Plan = {
  id: string
  name: string
  price: string
  description: string
  badge?: string
}

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    description: "For hobby projects and trying things out.",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12 /mo",
    badge: "Popular",
    description: "For growing teams that ship every week.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49 /mo",
    description: "Advanced controls, SSO, and priority support.",
  },
]

export default function RadioPlan() {
  const [value, setValue] = React.useState("pro")

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      className="w-[380px] max-w-full"
      fieldClassName="flex-col items-stretch gap-3"
    >
      {PLANS.map((plan) => {
        const selected = plan.id === value
        return (
          <div
            key={plan.id}
            data-selected={selected ? "" : undefined}
            onClick={() => setValue(plan.id)}
            className={`p-component-lg flex cursor-pointer items-start gap-3 rounded-xl border transition-colors ${
              selected
                ? "border-primary-500 bg-primary-weak"
                : "border-light bg-weak"
            }`}
          >
            <Radio id={`plan-${plan.id}`} value={plan.id} className="mt-0.5" />
            <FieldContent>
              <LabelMain>
                <div className="flex w-full items-center gap-2">
                  <Label htmlFor={`plan-${plan.id}`} className="w-auto">
                    {plan.name}
                  </Label>
                  {plan.badge ? (
                    <Badge variant="primary" appearance="solid" size="sm">
                      {plan.badge}
                    </Badge>
                  ) : null}
                  <span className="text-body ml-auto shrink-0 font-semibold">
                    {plan.price}
                  </span>
                </div>
                <LabelDescription>{plan.description}</LabelDescription>
              </LabelMain>
            </FieldContent>
          </div>
        )
      })}
    </RadioGroup>
  )
}
