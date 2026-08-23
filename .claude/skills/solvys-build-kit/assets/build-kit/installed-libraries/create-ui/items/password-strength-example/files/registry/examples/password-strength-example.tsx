import { ExampleWrapper } from "@/registry/components/example"
import {
  PasswordStrength,
  type PasswordStrengthSize,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"

const RULE_LABELS = [
  "Use at least 8 characters.",
  "Mix letters, numbers, and symbols.",
  "Avoid common words or patterns.",
] as const

const SIZES: PasswordStrengthSize[] = ["xs", "sm", "md"]

// One row per Figma variant (Too Weak -> Very Strong), each with its strength
// level and which of the three rules are met.
const LEVELS: { strength: StrengthLevel; met: [boolean, boolean, boolean] }[] =
  [
    { strength: 1, met: [false, false, false] }, // Too Weak
    { strength: 2, met: [true, false, false] }, // Weak
    { strength: 3, met: [true, true, false] }, // Fair
    { strength: 4, met: [true, true, true] }, // Strong
    { strength: 5, met: [true, true, true] }, // Very Strong
  ]

function rulesFor(met: [boolean, boolean, boolean]) {
  return RULE_LABELS.map((label, index) => ({ label, met: met[index] }))
}

export default function PasswordStrengthExample() {
  return (
    <ExampleWrapper className="max-w-6xl md:grid-cols-1">
      {/* Columns = size (xs / sm / md), rows = variant (Too Weak -> Very Strong),
          matching the Figma "_Password Strength" frame. */}
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((level) =>
          SIZES.map((size) => (
            <PasswordStrength
              key={`${level.strength}-${size}`}
              size={size}
              strength={level.strength}
              rules={rulesFor(level.met)}
            />
          ))
        )}
      </div>
    </ExampleWrapper>
  )
}
