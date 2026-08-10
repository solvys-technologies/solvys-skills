import { RiStore3Line } from "@create-ui/assets/icons"

import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelIcon, LabelOptional } from "@/registry/ui/label"

export default function LabelOptionalExample() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-optional">
        <LabelIcon>
          <RiStore3Line />
        </LabelIcon>
        Company
        <LabelOptional />
      </Label>
      <Input id="label-optional" placeholder="Acme Inc." />
    </Field>
  )
}
