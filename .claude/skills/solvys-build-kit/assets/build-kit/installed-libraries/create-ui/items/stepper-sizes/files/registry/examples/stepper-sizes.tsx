import { Stepper, StepperBadgeItem } from "@/registry/ui/stepper"

export default function StepperSizes() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-10">
      <Stepper layout="badge" size="sm" className="max-w-[220px]">
        <StepperBadgeItem status="completed" number="1." title="Account" />
        <StepperBadgeItem status="active" number="2." title="Workspace" />
        <StepperBadgeItem status="locked" number="3." title="Team" />
      </Stepper>
      <Stepper layout="badge" size="md" className="max-w-[220px]">
        <StepperBadgeItem status="completed" number="1." title="Account" />
        <StepperBadgeItem status="active" number="2." title="Workspace" />
        <StepperBadgeItem status="locked" number="3." title="Team" />
      </Stepper>
    </div>
  )
}
