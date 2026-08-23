"use client"

import * as React from "react"
import { RiLock2Line } from "@create-ui/assets/icons"

import {
  PasswordStrength,
  type PasswordStrengthRule,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"
import { Field, FieldLabel } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupSlot,
} from "@/registry/ui/input-group"

// The kind of checks a real signup field runs. Each requirement is its own rule,
// and the meter score is the number of satisfied checks plus a bonus for length.
function evaluate(password: string): {
  strength: StrengthLevel
  rules: PasswordStrengthRule[]
} {
  const hasMinLength = password.length >= 8
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  const rules: PasswordStrengthRule[] = [
    { label: "At least 8 characters", met: hasMinLength },
    { label: "Upper and lowercase letters", met: hasMixedCase },
    { label: "At least one number", met: hasNumber },
    { label: "At least one symbol", met: hasSymbol },
  ]

  const signals = [
    hasMinLength,
    hasMixedCase,
    hasNumber,
    hasSymbol,
    password.length >= 12,
  ]

  const strength = (
    password ? signals.filter(Boolean).length : 0
  ) as StrengthLevel

  return { strength, rules }
}

export default function PasswordStrengthDemo() {
  const [password, setPassword] = React.useState(
    "Correct-horse-battery-staple-7"
  )
  const { strength, rules } = evaluate(password)

  return (
    <Field className="w-[350px] max-w-full">
      <FieldLabel htmlFor="password-strength-demo-input">Password</FieldLabel>
      <InputGroup>
        <InputGroupSlot>
          <RiLock2Line />
          <InputGroupControl
            id="password-strength-demo-input"
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputGroupSlot>
      </InputGroup>
      <PasswordStrength size="sm" strength={strength} rules={rules} />
    </Field>
  )
}
