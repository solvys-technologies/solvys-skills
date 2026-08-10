import { Checkbox } from "@/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/ui/field"

export default function FieldGrouping() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Preferences</FieldLegend>
      <FieldDescription>
        Select all that apply to customize your experience.
      </FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox id="field-pref-dark" />
          <FieldLabel htmlFor="field-pref-dark" className="font-normal">
            Dark mode
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-pref-compact" />
          <FieldLabel htmlFor="field-pref-compact" className="font-normal">
            Compact view
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-pref-notifications" defaultChecked />
          <FieldLabel
            htmlFor="field-pref-notifications"
            className="font-normal"
          >
            Enable notifications
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
