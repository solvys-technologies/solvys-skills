import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupPlacement() {
  return (
    <div className="flex flex-col gap-6">
      <SwitchGroup placement="left" className="w-[340px]">
        <Switch id="sw-placement-left" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-placement-left">Placement · left</Label>
            <LabelDescription>
              Default. Switch before the label.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup placement="right" className="w-[340px]">
        <Switch id="sw-placement-right" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-placement-right">Placement · right</Label>
            <LabelDescription>
              Mirror layout. Switch after the label.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </div>
  )
}
