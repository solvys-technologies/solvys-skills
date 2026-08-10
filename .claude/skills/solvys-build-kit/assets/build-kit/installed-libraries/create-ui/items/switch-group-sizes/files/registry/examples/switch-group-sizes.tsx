import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupSizes() {
  return (
    <div className="flex flex-col gap-6">
      <SwitchGroup size="xs" className="w-[340px]">
        <Switch id="sw-size-xs" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-size-xs">Size · xs</Label>
            <LabelDescription>
              Switch and label scale together from the group.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup size="sm" className="w-[340px]">
        <Switch id="sw-size-sm" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-size-sm">Size · sm</Label>
            <LabelDescription>
              Switch and label scale together from the group.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup size="md" className="w-[340px]">
        <Switch id="sw-size-md" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-size-md">Size · md</Label>
            <LabelDescription>
              Switch and label scale together from the group.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </div>
  )
}
