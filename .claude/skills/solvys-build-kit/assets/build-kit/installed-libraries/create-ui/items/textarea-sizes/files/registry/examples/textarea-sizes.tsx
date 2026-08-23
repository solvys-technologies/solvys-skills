import { Field, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Textarea } from "@/registry/ui/textarea"

export default function TextareaSizes() {
  return (
    <FieldGroup className="lg:w-100">
      <Field size="xs">
        <FieldLabel htmlFor="textarea-size-xs">Extra small</FieldLabel>
        <Textarea id="textarea-size-xs" placeholder="XS size placeholder..." />
      </Field>
      <Field size="sm">
        <FieldLabel htmlFor="textarea-size-sm">Small</FieldLabel>
        <Textarea id="textarea-size-sm" placeholder="SM size placeholder..." />
      </Field>
      <Field size="md">
        <FieldLabel htmlFor="textarea-size-md">Medium</FieldLabel>
        <Textarea id="textarea-size-md" placeholder="MD size placeholder..." />
      </Field>
    </FieldGroup>
  )
}
