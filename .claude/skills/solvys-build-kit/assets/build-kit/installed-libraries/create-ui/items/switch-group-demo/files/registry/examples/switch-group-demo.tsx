import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupDemo() {
  return (
    <SwitchGroup className="w-[340px]">
      <Switch id="sw-demo" defaultChecked />
      <FieldContent>
        <LabelMain>
          <Label htmlFor="sw-demo">Push notifications</Label>
          <LabelDescription>
            Get alerts the moment something happens on your account.
          </LabelDescription>
        </LabelMain>
      </FieldContent>
    </SwitchGroup>
  )
}
