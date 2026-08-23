import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"

export default function SwitchGroupVariants() {
  return (
    <div className="flex flex-col gap-6 px-4">
      <SwitchGroup variant="primary" className="w-80">
        <Switch id="sw-variant-primary" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-variant-primary">Primary</Label>
            <LabelDescription>The default product intent.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup variant="info" className="w-80">
        <Switch id="sw-variant-info" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-variant-info">Info</Label>
            <LabelDescription>
              Blue track for informational toggles.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <SwitchGroup variant="neutral" className="w-80">
        <Switch id="sw-variant-neutral" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-variant-neutral">Neutral</Label>
            <LabelDescription>
              Quiet grey track for low-emphasis rows.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>

      <div className="bg-strongest -ml-4 rounded-lg p-4">
        <SwitchGroup variant="inverse" className="w-80">
          <Switch id="sw-variant-inverse" defaultChecked />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="sw-variant-inverse" className="text-weakest">
                Inverse
              </Label>
              <LabelDescription className="text-weak">
                For use on dark surfaces.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </SwitchGroup>
      </div>

      <SwitchGroup variant="semantic" className="w-[340px]">
        <Switch id="sw-variant-semantic" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-variant-semantic">Semantic</Label>
            <LabelDescription>Green when on, red when off.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </div>
  )
}
