import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function FieldSeparatorExample() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-sep-email">Email Address</FieldLabel>
        <Input
          id="field-sep-email"
          type="email"
          placeholder="you@example.com"
        />
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="field-sep-username">Username</FieldLabel>
        <Input id="field-sep-username" placeholder="janedoe" />
      </Field>
    </FieldGroup>
  )
}
