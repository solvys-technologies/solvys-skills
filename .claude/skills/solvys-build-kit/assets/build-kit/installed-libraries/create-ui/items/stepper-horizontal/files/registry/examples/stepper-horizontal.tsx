import {
  Stepper,
  StepperContent,
  StepperContentHead,
  StepperDescription,
  StepperIcon,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/registry/pro/ui/stepper"

export default function StepperHorizontal() {
  return (
    <div className="w-[600px]">
      <Stepper orientation="horizontal">
        <StepperItem status="completed">
          <StepperIndicator>
            <StepperIcon />
          </StepperIndicator>
          <StepperContent>
            <StepperContentHead>
              <StepperTitle>Account</StepperTitle>
              <StepperDescription>
                Set your email and password.
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
              <StepperTitle>Workspace</StepperTitle>
              <StepperDescription>Name it and pick a URL.</StepperDescription>
            </StepperContentHead>
          </StepperContent>
        </StepperItem>
        <StepperItem status="locked">
          <StepperIndicator>
            <StepperIcon>3</StepperIcon>
          </StepperIndicator>
          <StepperContent>
            <StepperContentHead>
              <StepperTitle>Team</StepperTitle>
              <StepperDescription>Invite your teammates.</StepperDescription>
            </StepperContentHead>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  )
}
