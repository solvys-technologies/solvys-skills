import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

export default function RadioGroupPlacement() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        placement="left"
        defaultValue="a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio id="rg-placement-left-a" value="a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-placement-left-a">Placement · left</Label>
              <LabelDescription>Default — radio before label.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>

      <RadioGroup
        placement="right"
        defaultValue="a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex flex-row-reverse items-start gap-2">
          <Radio id="rg-placement-right-a" value="a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-placement-right-a">Placement · right</Label>
              <LabelDescription>
                Mirror layout — radio after label.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </div>
  )
}
