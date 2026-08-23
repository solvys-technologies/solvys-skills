import {
  PasswordStrength,
  type PasswordStrengthRule,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"

// Deriving from an empty string gives the pristine state: a neutral meter with
// no label and every rule unmet, exactly what renders before the user types.
function evaluate(password: string): {
  strength: StrengthLevel
  rules: PasswordStrengthRule[]
} {
  const signals = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
    password.length >= 12,
  ]

  const strength = (
    password ? signals.filter(Boolean).length : 0
  ) as StrengthLevel

  const rules: PasswordStrengthRule[] = [
    { label: "Use at least 8 characters.", met: password.length >= 8 },
    {
      label: "Mix letters, numbers, and symbols.",
      met:
        /[a-zA-Z]/.test(password) &&
        /\d/.test(password) &&
        /[^a-zA-Z0-9]/.test(password),
    },
    { label: "Avoid common words or patterns.", met: password.length >= 12 },
  ]

  return { strength, rules }
}

export default function PasswordStrengthEmpty() {
  const { strength, rules } = evaluate("")

  return <PasswordStrength size="md" strength={strength} rules={rules} />
}
