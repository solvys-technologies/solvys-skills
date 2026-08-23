import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent, FieldFooter } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

export default function CheckboxGroupVariants() {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup variant="primary" className="w-[340px]">
        <Checkbox id="cb-variant-primary" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-variant-primary">Marketing emails</Label>
            <LabelDescription>
              We&apos;ll only send the things you ask for.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>

      <CheckboxGroup variant="danger" invalid className="w-[340px]">
        <Checkbox id="cb-variant-error" aria-invalid />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-variant-error">Accept the terms</Label>
            <LabelDescription>
              You must agree to the terms before continuing.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>Required field.</FieldFooter>
        </FieldContent>
      </CheckboxGroup>
    </div>
  )
}
