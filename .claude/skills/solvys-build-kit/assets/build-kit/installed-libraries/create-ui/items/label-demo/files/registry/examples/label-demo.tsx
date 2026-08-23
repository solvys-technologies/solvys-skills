import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function LabelDemo() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo">Full name</Label>
      <Input id="label-demo" placeholder="Ada Lovelace" />
    </Field>
  )
}
