import { Checkbox } from "@/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"

export default function FieldOrientation() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field orientation="vertical">
        <FieldLabel htmlFor="field-orientation-vertical">Vertical</FieldLabel>
        <Input
          id="field-orientation-vertical"
          placeholder="Label sits above the control"
        />
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="field-orientation-horizontal" defaultChecked />
        <FieldLabel
          htmlFor="field-orientation-horizontal"
          className="font-normal"
        >
          Horizontal: control and label share a row
        </FieldLabel>
      </Field>
      <Field orientation="responsive">
        <FieldLabel htmlFor="field-orientation-responsive">
          Responsive
        </FieldLabel>
        <Input
          id="field-orientation-responsive"
          placeholder="Stacks on narrow, inlines when there is room"
        />
        <FieldDescription>
          Label and control stack in tight space and move onto one row once the
          container is wide enough.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
