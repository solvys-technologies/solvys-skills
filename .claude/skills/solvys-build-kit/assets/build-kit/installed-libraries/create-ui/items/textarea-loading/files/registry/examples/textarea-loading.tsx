import { RiInformationFill } from "@create-ui/assets/icons"

import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaLoading() {
  return (
    <Field loading className="lg:w-100">
      <FieldLabel htmlFor="textarea-loading">Notes</FieldLabel>
      <Textarea
        id="textarea-loading"
        placeholder="Loading..."
        defaultValue="Saving your draft…"
      />
      <FieldHelper icon={<RiInformationFill />}>
        Helper hint text for you.
      </FieldHelper>
    </Field>
  )
}
