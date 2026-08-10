import { Field, FieldLabel } from "@/registry/ui/field"
import { LabelRequired } from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaWithLabel() {
  return (
    <Field className="lg:w-100">
      <FieldLabel htmlFor="textarea-with-label">
        Bio <LabelRequired />
      </FieldLabel>
      <Textarea id="textarea-with-label" placeholder="Tell us about yourself" />
    </Field>
  )
}
