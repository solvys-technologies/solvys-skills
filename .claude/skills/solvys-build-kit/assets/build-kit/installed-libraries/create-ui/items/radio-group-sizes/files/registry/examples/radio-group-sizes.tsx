import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const sizes = ["xs", "sm", "md"] as const

export default function RadioGroupSizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <RadioGroup
          key={size}
          size={size}
          defaultValue="a"
          className="w-[340px]"
          fieldClassName="flex-col items-stretch gap-3"
        >
          <div className="flex items-start gap-2">
            <Radio id={`rg-size-${size}-a`} value="a" />
            <FieldContent>
              <LabelMain>
                <Label htmlFor={`rg-size-${size}-a`}>Size · {size}</Label>
                <LabelDescription>
                  Label scales from the group context.
                </LabelDescription>
              </LabelMain>
            </FieldContent>
          </div>
          <div className="flex items-start gap-2">
            <Radio id={`rg-size-${size}-b`} value="b" />
            <FieldContent>
              <LabelMain>
                <Label htmlFor={`rg-size-${size}-b`}>Second option</Label>
              </LabelMain>
            </FieldContent>
          </div>
        </RadioGroup>
      ))}
    </div>
  )
}
