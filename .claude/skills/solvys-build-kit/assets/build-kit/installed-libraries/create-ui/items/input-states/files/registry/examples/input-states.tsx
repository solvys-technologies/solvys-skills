import { Field, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function InputStates() {
  return (
    <div className="flex w-xs flex-col gap-10 py-4">
      <Field>
        <FieldLabel htmlFor="input-states-default">Default</FieldLabel>
        <Input
          id="input-states-default"
          type="email"
          placeholder="name@example.com"
        />
      </Field>
      <Field invalid>
        <FieldLabel htmlFor="input-states-invalid">Invalid</FieldLabel>
        <Input
          id="input-states-invalid"
          type="email"
          defaultValue="not-an-email"
        />
      </Field>
      <Field disabled>
        <FieldLabel htmlFor="input-states-disabled">Disabled</FieldLabel>
        <Input
          id="input-states-disabled"
          type="email"
          placeholder="name@example.com"
        />
      </Field>
      <Field loading>
        <FieldLabel htmlFor="input-states-loading">Loading</FieldLabel>
        <Input
          id="input-states-loading"
          type="email"
          placeholder="Checking availability…"
        />
      </Field>
    </div>
  )
}
