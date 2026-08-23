import { Field, FieldError, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function InputWithError() {
  return (
    <Field invalid className="w-xs">
      <FieldLabel htmlFor="input-with-error-email">Email</FieldLabel>
      <Input
        id="input-with-error-email"
        type="email"
        defaultValue="not-an-email"
      />
      <FieldError errors={[{ message: "Enter a valid email address." }]} />
    </Field>
  )
}
