import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function FieldDemo() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="field-demo-email">Email Address</FieldLabel>
      <Input id="field-demo-email" type="email" placeholder="you@example.com" />
      <FieldDescription>
        We&apos;ll never share your email with anyone.
      </FieldDescription>
    </Field>
  )
}
