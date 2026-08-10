import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

export default function CheckboxGroupPlacement() {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup placement="left" className="w-[340px]">
        <Checkbox id="cb-placement-left" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-placement-left">Placement · left</Label>
            <LabelDescription>
              Default — checkbox before label.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>

      <CheckboxGroup placement="right" className="w-[340px]">
        <Checkbox id="cb-placement-right" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-placement-right">Placement · right</Label>
            <LabelDescription>
              Mirror layout — checkbox after label.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </div>
  )
}
