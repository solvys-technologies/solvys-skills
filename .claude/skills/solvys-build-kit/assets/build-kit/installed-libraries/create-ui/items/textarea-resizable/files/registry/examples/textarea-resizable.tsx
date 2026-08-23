import { RiInformationFill } from "@create-ui/assets/icons"

import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaResizable() {
  return (
    <Field className="lg:w-100">
      <FieldLabel htmlFor="textarea-resizable">Notes</FieldLabel>
      <Textarea
        id="textarea-resizable"
        placeholder="Drag the corner to resize..."
        resizable="y"
      />
      <FieldHelper icon={<RiInformationFill />}>
        You can resize this textarea vertically.
      </FieldHelper>
    </Field>
  )
}
