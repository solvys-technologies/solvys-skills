"use client"

import * as React from "react"

import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Separator } from "@/registry/ui/separator"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

const preferences = [
  {
    id: "switch-settings-email",
    title: "Email notifications",
    description: "Receipts, security alerts, and account activity.",
    defaultOn: true,
  },
  {
    id: "switch-settings-push",
    title: "Push notifications",
    description: "Real-time updates delivered to your devices.",
    defaultOn: true,
  },
  {
    id: "switch-settings-sms",
    title: "SMS alerts",
    description: "Text messages for time-sensitive events only.",
    defaultOn: false,
  },
  {
    id: "switch-settings-updates",
    title: "Product updates",
    description: "Occasional news about new features and releases.",
    defaultOn: false,
  },
  {
    id: "switch-settings-dark",
    title: "Dark mode",
    description: "Use a darker color theme across the dashboard.",
    defaultOn: true,
  },
]

export default function SwitchSettings() {
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(preferences.map((pref) => [pref.id, pref.defaultOn]))
  )

  return (
    <div className="border-light bg-static shadow-neutral-2xs p-component-lg gap-component-lg flex w-[420px] max-w-full flex-col rounded-2xl border">
      <div className="flex flex-col gap-1">
        <h3 className="text-heading-h6 text-strongest">
          Notification preferences
        </h3>
        <p className="text-paragraph-sm text-placeholder">
          Manage how Create UI keeps you in the loop.
        </p>
      </div>
      <div className="gap-component-lg flex flex-col">
        {preferences.map((pref, index) => (
          <React.Fragment key={pref.id}>
            {index > 0 && <Separator />}
            <SwitchGroup placement="right">
              <Switch
                id={pref.id}
                checked={enabled[pref.id]}
                onCheckedChange={(checked) =>
                  setEnabled((prev) => ({ ...prev, [pref.id]: checked }))
                }
              />
              <FieldContent>
                <LabelMain>
                  <Label htmlFor={pref.id}>{pref.title}</Label>
                  <LabelDescription>{pref.description}</LabelDescription>
                </LabelMain>
              </FieldContent>
            </SwitchGroup>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
