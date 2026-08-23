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

type Step = {
  status: "completed" | "active" | "error" | "locked"
  number?: string
  title: string
  description: string
  disabled?: boolean
}

const steps: Step[] = [
  {
    status: "completed",
    title: "Create your account",
    description: "Your account is ready to go.",
  },
  {
    status: "active",
    number: "2",
    title: "Set up your workspace",
    description: "Name your workspace and choose a URL.",
  },
  {
    status: "error",
    title: "Add a payment method",
    description: "Something went wrong. Please try again.",
  },
  {
    status: "locked",
    number: "4",
    title: "Invite your team",
    description: "Add teammates so they can collaborate.",
  },
  {
    status: "locked",
    number: "5",
    title: "Launch your project",
    description: "Available once the earlier steps are done.",
    disabled: true,
  },
]

export default function StepperStates() {
  return (
    <Stepper orientation="vertical" className="max-w-[320px]">
      {steps.map((step) => (
        <StepperItem
          key={step.title}
          status={step.status}
          disabled={step.disabled}
        >
          <StepperIndicator>
            <StepperIcon>{step.number}</StepperIcon>
          </StepperIndicator>
          <StepperContent>
            <StepperContentHead>
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </StepperContentHead>
          </StepperContent>
        </StepperItem>
      ))}
    </Stepper>
  )
}
