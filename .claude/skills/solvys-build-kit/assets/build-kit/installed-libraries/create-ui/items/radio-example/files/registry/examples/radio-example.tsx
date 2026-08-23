import { Example, ExampleWrapper } from "@/registry/components/example"
import { FieldLabel } from "@/registry/ui/field"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

const variants = ["primary", "neutral", "inverse", "danger", "success"] as const
const sizes = ["md", "sm", "xs"] as const

type Variant = (typeof variants)[number]
type Size = (typeof sizes)[number]

export default function RadioGroupExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1 2xl:grid-cols-1">
      <RadioGroupMatrix />
      <InvalidMatrix />
    </ExampleWrapper>
  )
}

function RadioGroupMatrix() {
  return (
    <Example title="Variants & Sizes">
      <div className="space-y-6">
        {sizes.map((size) => {
          const sizeLabel =
            size === "md" ? "Medium" : size === "sm" ? "Small" : "Extra Small"

          return (
            <div key={size} className="space-y-2">
              <p className="text-subtle text-xs font-medium uppercase">
                {sizeLabel}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {variants.map((variant) => (
                  <RadioGroupCell
                    key={`${size}-${variant}`}
                    variant={variant}
                    size={size}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Example>
  )
}

function InvalidMatrix() {
  return (
    <Example title="Invalid">
      <div className="space-y-6">
        {sizes.map((size) => {
          const sizeLabel =
            size === "md" ? "Medium" : size === "sm" ? "Small" : "Extra Small"

          return (
            <div key={size} className="space-y-2">
              <p className="text-subtle text-xs font-medium uppercase">
                {sizeLabel}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {variants.map((variant) => (
                  <RadioGroupCell
                    key={`invalid-${size}-${variant}`}
                    variant={variant}
                    size={size}
                    invalid
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Example>
  )
}

function RadioGroupCell({
  variant,
  size,
  invalid,
}: {
  variant: Variant
  size: Size
  invalid?: boolean
}) {
  const id = `${invalid ? "invalid" : "matrix"}-${variant}-${size}`
  const label = variant.charAt(0).toUpperCase() + variant.slice(1)
  const isInverse = variant === "inverse"

  const content = (
    <div className="flex items-center gap-3">
      <RadioGroup defaultValue="checked" invalid={invalid}>
        <div className="flex items-center gap-2">
          <Radio
            value="checked"
            id={`${id}-checked`}
            variant={variant}
            size={size}
          />
          <Radio
            value="unchecked"
            id={`${id}-unchecked`}
            variant={variant}
            size={size}
          />
        </div>
      </RadioGroup>
      <FieldLabel
        htmlFor={`${id}-checked`}
        className={`text-sm font-normal ${isInverse ? "text-white" : ""}`}
      >
        {label}
      </FieldLabel>
    </div>
  )

  if (isInverse) {
    return (
      <div className="bg-strongest -mx-4 rounded-lg px-4 py-3">{content}</div>
    )
  }

  return content
}
