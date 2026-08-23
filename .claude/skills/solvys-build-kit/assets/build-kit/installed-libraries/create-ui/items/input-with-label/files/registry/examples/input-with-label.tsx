import { Field, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function InputWithLabel() {
  return (
    <Field className="w-xs">
      <FieldLabel htmlFor="input-with-label-email">Email</FieldLabel>
      <Input
        id="input-with-label-email"
        type="email"
        placeholder="name@example.com"
      />
    </Field>
  )
}
