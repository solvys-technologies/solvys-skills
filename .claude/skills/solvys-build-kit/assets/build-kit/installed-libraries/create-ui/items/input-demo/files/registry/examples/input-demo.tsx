import { Field, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function InputDemo() {
  return (
    <Field className="w-xs">
      <FieldLabel htmlFor="input-demo-email">Email</FieldLabel>
      <Input id="input-demo-email" type="email" placeholder="you@example.com" />
    </Field>
  )
}
