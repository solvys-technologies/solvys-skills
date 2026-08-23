import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupThumbIcon() {
  return (
    <div className="flex flex-col gap-6">
      <SwitchGroup className="w-[340px]">
        <Switch id="sw-thumb-icon-on" thumbIcon defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-thumb-icon-on">Sync enabled</Label>
            <LabelDescription>
              A check icon rides the thumb while the setting is on.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup className="w-[340px]">
        <Switch id="sw-thumb-icon-off" thumbIcon />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-thumb-icon-off">Sync disabled</Label>
            <LabelDescription>
              A close icon takes its place once the setting is off.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </div>
  )
}
