import { StepperDots } from "@/registry/ui/stepper"

export default function StepperDotsExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <StepperDots shape="circle" count={5} defaultActiveIndex={2} />
      <StepperDots shape="pill" count={5} defaultActiveIndex={2} />
      <StepperDots shape="bar" count={5} defaultActiveIndex={2} />
    </div>
  )
}
