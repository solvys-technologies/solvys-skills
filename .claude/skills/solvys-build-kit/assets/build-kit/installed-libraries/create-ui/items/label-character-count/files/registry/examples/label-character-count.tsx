import { Field } from "@/registry/ui/field"
import { Label, LabelBlock, LabelCount, LabelMain } from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"

export default function LabelCharacterCount() {
  return (
    <Field className="w-full max-w-xs">
      <LabelBlock>
        <LabelMain>
          <Label htmlFor="label-counter">Bio</Label>
        </LabelMain>
        <LabelCount>0/300</LabelCount>
      </LabelBlock>
      <Textarea id="label-counter" placeholder="Tell us about yourself" />
    </Field>
  )
}
