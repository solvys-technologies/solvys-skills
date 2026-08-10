"use client"

import * as React from "react"

import { Switch } from "@/registry/ui/switch"

export default function SwitchControlled() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="flex w-40 items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <p className="text-placeholder text-ui-control-sm">
        Checked:{" "}
        <span className="text-body font-medium">{String(checked)}</span>
      </p>
    </div>
  )
}
