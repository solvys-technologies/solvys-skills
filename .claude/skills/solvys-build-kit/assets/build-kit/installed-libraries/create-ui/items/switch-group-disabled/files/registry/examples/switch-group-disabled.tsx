import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <SwitchGroup disabled className="w-[340px]">
        <Switch id="sw-disabled-on" checked disabled />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-disabled-on">Push notifications</Label>
            <LabelDescription>
              Disabled state cascades to label and description.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup disabled className="w-[340px]">
        <Switch id="sw-disabled-off" checked={false} disabled />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-disabled-off">Marketing emails</Label>
            <LabelDescription>
              The unchecked row reads muted too.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </div>
  )
}
