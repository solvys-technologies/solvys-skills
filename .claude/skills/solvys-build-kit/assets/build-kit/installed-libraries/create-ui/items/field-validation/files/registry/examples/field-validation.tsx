import { Field, FieldError, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"

export default function FieldValidation() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field invalid>
        <FieldLabel htmlFor="field-invalid-single">Email Address</FieldLabel>
        <Input
          id="field-invalid-single"
          placeholder="you@example.com"
          aria-invalid
        />
        <FieldError>Please provide a valid email address.</FieldError>
      </Field>
      <Field invalid>
        <FieldLabel htmlFor="field-invalid-multi">Bio</FieldLabel>
        <Textarea
          id="field-invalid-multi"
          placeholder="Tell us about yourself"
          aria-invalid
        />
        <FieldError
          errors={[
            { message: "Minimum 20 characters required." },
            { message: "No special characters allowed." },
          ]}
        />
      </Field>
    </FieldGroup>
  )
}
