import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

export default function RadioDemo() {
  return (
    <RadioGroup defaultValue="a">
      <Radio value="a" aria-label="Option A" />
      <Radio value="b" aria-label="Option B" />
    </RadioGroup>
  )
}
