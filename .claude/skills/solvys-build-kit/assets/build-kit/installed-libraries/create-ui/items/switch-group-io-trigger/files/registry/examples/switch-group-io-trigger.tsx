import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupIoTrigger() {
  return (
    <SwitchGroup ioTrigger className="w-[340px]">
      <Switch id="sw-io-trigger" defaultChecked />
      <FieldContent>
        <LabelMain>
          <Label htmlFor="sw-io-trigger">Power</Label>
          <LabelDescription>
            Shows an I/O glyph inside the track so the state reads beyond color.
          </LabelDescription>
        </LabelMain>
      </FieldContent>
    </SwitchGroup>
  )
}
