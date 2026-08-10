import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

const sizes = ["xs", "sm", "md"] as const

export default function CheckboxGroupSizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <CheckboxGroup key={size} size={size} className="w-[340px]">
          <Checkbox id={`cb-size-${size}`} defaultChecked />
          <FieldContent>
            <LabelMain>
              <Label htmlFor={`cb-size-${size}`}>Size · {size}</Label>
              <LabelDescription>
                Checkbox and label scale together from the group.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </CheckboxGroup>
      ))}
    </div>
  )
}
