import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function LabelSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Field size="xs">
        <Label htmlFor="label-size-xs">Extra small</Label>
        <Input id="label-size-xs" placeholder="xs" />
      </Field>
      <Field size="sm">
        <Label htmlFor="label-size-sm">Small (default)</Label>
        <Input id="label-size-sm" placeholder="sm" />
      </Field>
      <Field size="md">
        <Label htmlFor="label-size-md">Medium</Label>
        <Input id="label-size-md" placeholder="md" />
      </Field>
    </div>
  )
}
