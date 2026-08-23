import { RiInformationFill } from "@create-ui/assets/icons"

import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaDisabled() {
  return (
    <Field disabled className="lg:w-100">
      <FieldLabel htmlFor="textarea-disabled">Notes</FieldLabel>
      <Textarea id="textarea-disabled" placeholder="Not available" />
      <FieldHelper icon={<RiInformationFill />}>
        Helper hint text for you.
      </FieldHelper>
    </Field>
  )
}
