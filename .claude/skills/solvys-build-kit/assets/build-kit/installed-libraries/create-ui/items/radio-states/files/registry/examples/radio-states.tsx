import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

export default function RadioStates() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <RadioGroup>
        <Radio value="a" aria-label="Unchecked" />
      </RadioGroup>
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="Checked" />
      </RadioGroup>
      <RadioGroup disabled>
        <Radio value="a" disabled aria-label="Disabled" />
      </RadioGroup>
      <RadioGroup defaultValue="a" disabled>
        <Radio value="a" disabled aria-label="Disabled checked" />
      </RadioGroup>
    </div>
  )
}
