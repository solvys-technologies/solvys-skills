import {
  PasswordStrength,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"

// Omit `rules` to render the meter alone. Strength is still derived from a real
// password, just without the checklist.
function score(password: string): StrengthLevel {
  const signals = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
    password.length >= 12,
  ]

  return (password ? signals.filter(Boolean).length : 0) as StrengthLevel
}

export default function PasswordStrengthMeterOnly() {
  return (
    <div className="flex flex-col gap-4">
      <PasswordStrength size="md" strength={score("river7")} />
      <PasswordStrength size="md" strength={score("Sunshine123!")} />
    </div>
  )
}
