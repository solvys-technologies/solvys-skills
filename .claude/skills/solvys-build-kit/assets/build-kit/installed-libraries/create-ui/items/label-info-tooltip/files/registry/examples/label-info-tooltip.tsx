import { RiKey2Line } from "@create-ui/assets/icons"

import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"
import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelIcon, LabelInfoSlot } from "@/registry/ui/label"

export default function LabelInfoTooltip() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-info">
        <LabelIcon>
          <RiKey2Line />
        </LabelIcon>
        API token
        <LabelInfoSlot>
          <InfoTooltip variant="inverse" side="top">
            Used to authenticate API requests. Keep it secret, treat it like a
            password, and rotate it right away if it ever leaks or shows up in a
            commit.
          </InfoTooltip>
        </LabelInfoSlot>
      </Label>
      <Input id="label-info" placeholder="sk-…" />
    </Field>
  )
}
