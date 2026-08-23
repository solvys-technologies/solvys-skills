import { RiUser3Line } from "@create-ui/assets/icons"

import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelIcon, LabelRequired } from "@/registry/ui/label"

export default function LabelRequiredExample() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-required">
        <LabelIcon>
          <RiUser3Line />
        </LabelIcon>
        Username
        <LabelRequired />
      </Label>
      <Input id="label-required" placeholder="@jane" required />
    </Field>
  )
}
