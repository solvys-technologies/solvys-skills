"use client"

import * as React from "react"

import { Checkbox } from "@/registry/ui/checkbox"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

type Permission = { id: string; title: string; description: string }

const PERMISSIONS: Permission[] = [
  {
    id: "billing",
    title: "Manage billing",
    description: "Update payment methods and download invoices.",
  },
  {
    id: "invite",
    title: "Invite members",
    description: "Send and revoke workspace invitations.",
  },
  {
    id: "content",
    title: "Edit content",
    description: "Create, edit, and publish across every project.",
  },
  {
    id: "analytics",
    title: "View analytics",
    description: "Open dashboards and usage reports.",
  },
]

export default function CheckboxList() {
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(["invite", "content"])
  )

  const allSelected = selected.size === PERMISSIONS.length
  const selectAll = allSelected
    ? true
    : selected.size > 0
      ? "indeterminate"
      : false

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(PERMISSIONS.map((p) => p.id)))

  return (
    <div className="border-light bg-static shadow-neutral-2xs w-[380px] max-w-full overflow-hidden rounded-2xl border">
      <div className="border-light bg-weak flex items-start gap-3 border-b p-4">
        <Checkbox id="cb-all" checked={selectAll} onCheckedChange={toggleAll} />
        <LabelMain>
          <Label htmlFor="cb-all">Select all</Label>
          <LabelDescription>
            {selected.size} of {PERMISSIONS.length} selected
          </LabelDescription>
        </LabelMain>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {PERMISSIONS.map((permission) => (
          <div key={permission.id} className="flex items-start gap-3">
            <Checkbox
              id={`cb-${permission.id}`}
              checked={selected.has(permission.id)}
              onCheckedChange={() => toggle(permission.id)}
            />
            <LabelMain>
              <Label htmlFor={`cb-${permission.id}`}>{permission.title}</Label>
              <LabelDescription>{permission.description}</LabelDescription>
            </LabelMain>
          </div>
        ))}
      </div>
    </div>
  )
}
