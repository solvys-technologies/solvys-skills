"use client"

import * as React from "react"

import { Checkbox } from "@/registry/ui/checkbox"

type CheckedState = boolean | "indeterminate"

export default function CheckboxControlled() {
  const [checked, setChecked] = React.useState<CheckedState>("indeterminate")

  return (
    <div className="flex w-40 items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Controlled checkbox"
      />
      <p className="text-placeholder text-ui-control-sm">
        State: <span className="text-body font-medium">{String(checked)}</span>
      </p>
    </div>
  )
}
