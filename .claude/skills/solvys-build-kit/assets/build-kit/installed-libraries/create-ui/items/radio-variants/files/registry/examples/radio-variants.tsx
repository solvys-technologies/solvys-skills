import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const variants = ["primary", "neutral", "danger", "success"] as const

export default function RadioVariants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((variant) => (
          <RadioGroup key={variant} defaultValue="on">
            <Radio
              variant={variant}
              value="on"
              aria-label={`${variant} radio`}
            />
          </RadioGroup>
        ))}
        <div className="bg-strongest flex items-center rounded-md p-3">
          <RadioGroup defaultValue="on">
            <Radio variant="inverse" value="on" aria-label="Inverse radio" />
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
