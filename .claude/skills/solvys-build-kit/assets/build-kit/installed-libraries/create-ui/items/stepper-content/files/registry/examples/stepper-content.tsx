import {
  Stepper,
  StepperActions,
  StepperContent,
  StepperContentHead,
  StepperDescription,
  StepperIcon,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/registry/pro/ui/stepper"
import { Button } from "@/registry/ui/button"

export default function StepperContentExample() {
  return (
    <Stepper orientation="vertical" className="max-w-[320px]">
      <StepperItem status="completed">
        <StepperIndicator>
          <StepperIcon />
        </StepperIndicator>
        <StepperContent>
          <StepperContentHead>
            <StepperTitle>Create your account</StepperTitle>
            <StepperDescription>
              Your account is ready to go.
            </StepperDescription>
          </StepperContentHead>
        </StepperContent>
      </StepperItem>
      <StepperItem status="active">
        <StepperIndicator>
          <StepperIcon>2</StepperIcon>
        </StepperIndicator>
        <StepperContent>
          <StepperContentHead>
            <StepperTitle>Set up your workspace</StepperTitle>
            <StepperDescription>
              Name your workspace and choose a URL.
            </StepperDescription>
          </StepperContentHead>
          <StepperActions>
            <Button size="sm" variant="neutral-solid">
              Continue
            </Button>
            <Button size="sm" variant="neutral-solid" appearance="soft">
              Back
            </Button>
          </StepperActions>
        </StepperContent>
      </StepperItem>
      <StepperItem status="locked">
        <StepperIndicator>
          <StepperIcon>3</StepperIcon>
        </StepperIndicator>
        <StepperContent>
          <StepperContentHead>
            <StepperTitle>Invite your team</StepperTitle>
            <StepperDescription>
              Add teammates so they can collaborate.
            </StepperDescription>
          </StepperContentHead>
        </StepperContent>
      </StepperItem>
    </Stepper>
  )
}
