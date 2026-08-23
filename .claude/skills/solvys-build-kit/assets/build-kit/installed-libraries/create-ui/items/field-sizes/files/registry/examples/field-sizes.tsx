import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function FieldSizes() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field size="xs">
        <FieldLabel htmlFor="field-size-xs">Extra Small</FieldLabel>
        <Input id="field-size-xs" placeholder="Extra small input" />
        <FieldDescription>Minimal density for inline editing.</FieldDescription>
      </Field>
      <Field size="sm">
        <FieldLabel htmlFor="field-size-sm">Small</FieldLabel>
        <Input id="field-size-sm" placeholder="Small input" />
        <FieldDescription>Compact density for dense tables.</FieldDescription>
      </Field>
      <Field size="md">
        <FieldLabel htmlFor="field-size-md">Medium</FieldLabel>
        <Input id="field-size-md" placeholder="Medium input" />
        <FieldDescription>Default density for most forms.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
