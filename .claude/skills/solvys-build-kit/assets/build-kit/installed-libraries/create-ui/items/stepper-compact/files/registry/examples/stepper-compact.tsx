import { Stepper, StepperCompactItem } from "@/registry/pro/ui/stepper"

export default function StepperCompact() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Stepper orientation="horizontal" layout="compact">
        <StepperCompactItem
          status="completed"
          alignment="top"
          indicator="1"
          step="Step 1"
          title="Account"
        />
        <StepperCompactItem
          status="active"
          alignment="top"
          indicator="2"
          step="Step 2"
          title="Workspace"
        />
        <StepperCompactItem
          status="locked"
          alignment="top"
          indicator="3"
          step="Step 3"
          title="Team"
        />
      </Stepper>
      <Stepper orientation="horizontal" layout="compact" className="w-[520px]">
        <StepperCompactItem
          status="completed"
          alignment="left"
          indicator="1"
          title="Account"
        />
        <StepperCompactItem
          status="active"
          alignment="left"
          indicator="2"
          title="Workspace"
        />
        <StepperCompactItem
          status="locked"
          alignment="left"
          indicator="3"
          title="Team"
        />
      </Stepper>
    </div>
  )
}
