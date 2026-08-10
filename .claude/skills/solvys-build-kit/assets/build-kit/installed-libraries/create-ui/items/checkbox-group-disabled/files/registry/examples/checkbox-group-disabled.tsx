import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

export default function CheckboxGroupDisabled() {
  return (
    <CheckboxGroup disabled className="w-[340px]">
      <Checkbox id="cb-disabled" defaultChecked disabled />
      <FieldContent>
        <LabelMain>
          <Label htmlFor="cb-disabled">Push notifications</Label>
          <LabelDescription>
            Disabled state cascades to the label and description.
          </LabelDescription>
        </LabelMain>
      </FieldContent>
    </CheckboxGroup>
  )
}
