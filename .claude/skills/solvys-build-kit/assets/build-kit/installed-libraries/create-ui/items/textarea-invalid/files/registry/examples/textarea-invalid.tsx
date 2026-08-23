import { RiErrorWarningFill } from "@create-ui/assets/icons"

import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaInvalid() {
  return (
    <Field invalid className="lg:w-100">
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        aria-invalid="true"
        placeholder="Enter your message"
        defaultValue="Too short."
      />
      <FieldHelper icon={<RiErrorWarningFill />}>
        Message must be at least 20 characters.
      </FieldHelper>
    </Field>
  )
}
