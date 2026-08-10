import {
  PasswordStrength,
  type PasswordStrengthRule,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"

// A richer, five-rule policy. Here the meter tracks the checklist directly: the
// strength level is the number of satisfied rules.
function evaluate(password: string): {
  strength: StrengthLevel
  rules: PasswordStrengthRule[]
} {
  const rules: PasswordStrengthRule[] = [
    { label: "Use at least 8 characters.", met: password.length >= 8 },
    { label: "Include an uppercase letter.", met: /[A-Z]/.test(password) },
    { label: "Include a number.", met: /\d/.test(password) },
    { label: "Include a symbol.", met: /[^a-zA-Z0-9]/.test(password) },
    {
      label: "Avoid spaces.",
      met: password.length > 0 && !/\s/.test(password),
    },
  ]

  const strength = rules.filter((rule) => rule.met).length as StrengthLevel

  return { strength, rules }
}

export default function PasswordStrengthRequirements() {
  const { strength, rules } = evaluate("vault#2026key")

  return <PasswordStrength size="md" strength={strength} rules={rules} />
}
