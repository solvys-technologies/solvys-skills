import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaWithDescription() {
  return (
    <Field className="lg:w-100">
      <FieldLabel htmlFor="textarea-with-description">Feedback</FieldLabel>
      <Textarea
        id="textarea-with-description"
        placeholder="Share your thoughts..."
      />
      <FieldDescription>
        Your feedback helps us improve the product.
      </FieldDescription>
    </Field>
  )
}
