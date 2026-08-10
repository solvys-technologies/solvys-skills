import { FieldContent } from "@/registry/ui/field"
import { Label, LabelDescription, LabelMain } from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const options = [
  { value: "free", title: "Free", description: "For personal projects." },
  {
    value: "pro",
    title: "Pro",
    description: "For freelancers and small teams.",
  },
  {
    value: "team",
    title: "Team",
    description: "For larger teams with shared workspaces.",
  },
]

export default function RadioGroupDemo() {
  return (
    <RadioGroup
      defaultValue="pro"
      className="w-[340px]"
      fieldClassName="flex-col items-stretch gap-4"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-2">
          <Radio id={`plan-${option.value}`} value={option.value} />
          <FieldContent>
            <LabelMain>
              <Label htmlFor={`plan-${option.value}`}>{option.title}</Label>
              <LabelDescription>{option.description}</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      ))}
    </RadioGroup>
  )
}
