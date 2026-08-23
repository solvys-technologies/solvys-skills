import { StepperLine } from "@/registry/pro/ui/stepper"

const variants = [
  "neutral-light",
  "neutral-solid",
  "primary",
  "info",
  "success",
  "error",
] as const

export default function StepperLineExample() {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="text-placeholder text-ui-control-sm w-24 font-medium">
            {variant}
          </span>
          <StepperLine
            orientation="horizontal"
            variant={variant}
            appearance="solid"
            className="w-24 flex-none"
          />
          <StepperLine
            orientation="horizontal"
            variant={variant}
            appearance="soft"
            className="w-24 flex-none"
          />
        </div>
      ))}
    </div>
  )
}
