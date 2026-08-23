"use client"

import { Checkbox } from "@/registry/ui/checkbox"

export default function CheckboxStates() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Checkbox aria-label="Unchecked" />
      <Checkbox defaultChecked aria-label="Checked" />
      <Checkbox
        checked="indeterminate"
        onCheckedChange={() => {}}
        aria-label="Indeterminate"
      />
      <Checkbox disabled aria-label="Disabled" />
      <Checkbox disabled defaultChecked aria-label="Disabled checked" />
    </div>
  )
}
