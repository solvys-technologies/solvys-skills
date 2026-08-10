import { RiInformationFill } from "@create-ui/assets/icons"

import { Field, FieldGroup, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"

export default function FieldLoading() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field loading>
        <FieldLabel htmlFor="field-loading-input">Username</FieldLabel>
        <Input
          id="field-loading-input"
          placeholder="Checking availability…"
          defaultValue="create-ui"
        />
        <FieldHelper icon={<RiInformationFill />}>
          Verifying that this username is free.
        </FieldHelper>
      </Field>
      <Field loading>
        <FieldLabel htmlFor="field-loading-textarea">Bio</FieldLabel>
        <Textarea
          id="field-loading-textarea"
          defaultValue="Saving your draft…"
        />
      </Field>
    </FieldGroup>
  )
}
