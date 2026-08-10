export type StepFormOption = {
  value: string;
  label: string;
  description?: string;
};

type StepFormStepBase = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  required?: boolean;
};

export type StepFormTextStep = StepFormStepBase & {
  type: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
};

export type StepFormChoiceStep = StepFormStepBase & {
  type: "choice";
  options: StepFormOption[];
};

export type StepFormStep = StepFormTextStep | StepFormChoiceStep;

export type StepFormAnswers = Record<string, string>;

export type AnimatedStepFormProps = {
  steps?: StepFormStep[];
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
  onComplete?: (answers: StepFormAnswers) => void;
  className?: string;
};
