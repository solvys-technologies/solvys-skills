import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupThumbType() {
  return (
    <div className="flex flex-col gap-6">
      <SwitchGroup thumbType="short" className="w-[340px]">
        <Switch id="sw-thumb-short" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-thumb-short">Short thumb</Label>
            <LabelDescription>Default. Compact square knob.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup thumbType="long" className="w-[340px]">
        <Switch id="sw-thumb-long" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-thumb-long">Long thumb</Label>
            <LabelDescription>
              Wider knob with a longer travel distance.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </div>
  )
}
