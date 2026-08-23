import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function InputWithDescription() {
  return (
    <Field className="w-xs">
      <FieldLabel htmlFor="input-with-description-username">
        Username
      </FieldLabel>
      <Input
        id="input-with-description-username"
        type="text"
        placeholder="Enter your username"
      />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  )
}
