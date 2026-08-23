"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  Field,
  FieldDescription,
  FieldHelper,
  FieldLabel,
} from "@/registry/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/ui/input-otp"

export default function InputOTPDemo() {
  const [value, setValue] = React.useState("777")

  return (
    <div className="flex items-center">
      <Field size="md">
        <FieldLabel htmlFor="input-otp-demo-code">Verification Code</FieldLabel>
        <FieldDescription>
          We sent a 6-digit code to hi@createui.co
        </FieldDescription>
        <InputOTP
          id="input-otp-demo-code"
          size="sm"
          maxLength={6}
          value={value}
          onChange={setValue}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSeparator />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FieldHelper>Enter verification code.</FieldHelper>
      </Field>
    </div>
  )
}
