import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"

const shapes = ["rounded", "pill", "square"] as const

export default function CheckboxGroupShapes() {
  return (
    <div className="flex flex-col gap-6">
      {shapes.map((shape) => (
        <CheckboxGroup key={shape} shape={shape} className="w-[340px]">
          <Checkbox id={`cb-shape-${shape}`} defaultChecked />
          <FieldContent>
            <LabelMain>
              <Label htmlFor={`cb-shape-${shape}`}>Shape · {shape}</Label>
              <LabelDescription>
                Shape cascades from the group to the child checkbox.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </CheckboxGroup>
      ))}
    </div>
  )
}
