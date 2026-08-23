import { RiFlagFill } from "@create-ui/assets/icons"

import { StepperIcon } from "@/registry/pro/ui/stepper"

export default function StepperIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <StepperIcon variant="info" appearance="soft">
        1
      </StepperIcon>
      <StepperIcon variant="primary" appearance="solid">
        2
      </StepperIcon>
      <StepperIcon variant="neutral-light" appearance="outline">
        3
      </StepperIcon>
      <StepperIcon variant="success" />
      <StepperIcon variant="error" />
      <StepperIcon variant="primary">
        <RiFlagFill />
      </StepperIcon>
    </div>
  )
}
