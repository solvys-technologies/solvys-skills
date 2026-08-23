import {
  PasswordStrength,
  type PasswordStrengthRule,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"

// A simpler, two-rule checklist derived from one sample password, shown at each
// size. Keep the rules to the essentials when space is tight.
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
      label: "Add a number or symbol.",
      met: /\d/.test(password) || /[^a-zA-Z0-9]/.test(password),
    },
  ]

  return { strength, rules }
}

export default function PasswordStrengthSizes() {
  const { strength, rules } = evaluate("Harbor-92")

  return (
    <div className="flex flex-col gap-4">
      <PasswordStrength size="xs" strength={strength} rules={rules} />
      <PasswordStrength size="sm" strength={strength} rules={rules} />
      <PasswordStrength size="md" strength={strength} rules={rules} />
    </div>
  )
}
