import { FieldContent, FieldFooter } from "@/registry/ui/field"
import { Label, LabelMain } from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const variants = ["primary", "neutral", "danger"] as const

export default function RadioGroupVariants() {
  return (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <RadioGroup
          key={variant}
          variant={variant}
          invalid={variant === "danger"}
          defaultValue={variant === "danger" ? undefined : "a"}
          className="w-[340px]"
          fieldClassName="flex-col items-stretch gap-3"
        >
          <div className="flex items-start gap-2">
            <Radio id={`rg-${variant}-a`} value="a" />
            <FieldContent>
              <LabelMain>
                <Label htmlFor={`rg-${variant}-a`}>Variant · {variant}</Label>
              </LabelMain>
            </FieldContent>
          </div>
          <div className="flex items-start gap-2">
            <Radio id={`rg-${variant}-b`} value="b" />
            <FieldContent>
              <LabelMain>
                <Label htmlFor={`rg-${variant}-b`}>Second option</Label>
              </LabelMain>
            </FieldContent>
          </div>
          {variant === "danger" && (
            <FieldFooter>Pick one to continue.</FieldFooter>
          )}
        </RadioGroup>
      ))}
    </div>
  )
}
