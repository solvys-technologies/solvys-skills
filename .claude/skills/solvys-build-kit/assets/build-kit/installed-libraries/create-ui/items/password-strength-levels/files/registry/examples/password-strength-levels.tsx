import {
  PasswordStrength,
  type PasswordStrengthRule,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"

// Each card derives its meter and checklist from a real password string, the
// same way you would in a form. The samples climb from Too Weak to Very Strong.
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
    { label: "Make it 12 characters or longer.", met: password.length >= 12 },
  ]

  return { strength, rules }
}

export default function PasswordStrengthLevels() {
  const tooWeak = evaluate("password")
  const weak = evaluate("Sunshine")
  const fair = evaluate("Sunshine1")
  const strong = evaluate("Sunshine1!")
  const veryStrong = evaluate("Sunshine123!")

  return (
    <div className="flex flex-col gap-4">
      <PasswordStrength
        size="sm"
        strength={tooWeak.strength}
        rules={tooWeak.rules}
      />
      <PasswordStrength size="sm" strength={weak.strength} rules={weak.rules} />
      <PasswordStrength size="sm" strength={fair.strength} rules={fair.rules} />
      <PasswordStrength
        size="sm"
        strength={strong.strength}
        rules={strong.rules}
      />
      <PasswordStrength
        size="sm"
        strength={veryStrong.strength}
        rules={veryStrong.rules}
      />
    </div>
  )
}
