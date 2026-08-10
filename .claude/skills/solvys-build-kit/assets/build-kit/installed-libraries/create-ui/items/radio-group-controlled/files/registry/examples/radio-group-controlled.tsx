"use client"

import * as React from "react"

import { FieldContent } from "@/registry/ui/field"
import { Label, LabelMain } from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const options = ["light", "dark", "system"] as const

export default function RadioGroupControlled() {
  const [value, setValue] = React.useState<(typeof options)[number]>("system")

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        value={value}
        onValueChange={(next) => setValue(next as (typeof options)[number])}
        className="w-[280px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        {options.map((option) => (
          <div key={option} className="flex items-start gap-2">
            <Radio id={`theme-${option}`} value={option} />
            <FieldContent>
              <LabelMain>
                <Label htmlFor={`theme-${option}`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Label>
              </LabelMain>
            </FieldContent>
          </div>
        ))}
      </RadioGroup>
      <p className="text-placeholder text-ui-control-sm">
        Selected: <span className="text-body font-medium">{value}</span>
      </p>
    </div>
  )
}
