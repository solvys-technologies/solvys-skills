import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup className="w-[340px]">
      <Checkbox id="cb-demo" defaultChecked />
      <FieldContent>
        <LabelMain>
          <Label htmlFor="cb-demo">Email notifications</Label>
          <LabelDescription>
            Get a digest of product updates once a week.
          </LabelDescription>
        </LabelMain>
      </FieldContent>
    </CheckboxGroup>
  )
}
