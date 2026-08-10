import { RiMailLine } from "@create-ui/assets/icons"

import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelIcon } from "@/registry/ui/label"

export default function LabelWithIcon() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-with-icon">
        <LabelIcon>
          <RiMailLine />
        </LabelIcon>
        Email address
      </Label>
      <Input id="label-with-icon" type="email" placeholder="you@example.com" />
    </Field>
  )
}
