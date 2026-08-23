import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const sizes = ["xs", "sm", "md"] as const

export default function RadioSizes() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map((size) => (
        <RadioGroup key={size} defaultValue="on">
          <Radio size={size} value="on" aria-label={`Radio ${size}`} />
        </RadioGroup>
      ))}
    </div>
  )
}
