"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/ui/input-otp"

export default function InputOTPWithField() {
  const [value, setValue] = React.useState("")
  const invalid = value.length > 0 && value.length < 6

  return (
    <Field size="md" invalid={invalid}>
      <FieldLabel htmlFor="input-otp-code">Verification code</FieldLabel>
      <FieldContent>
        <InputOTP
          id="input-otp-code"
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
        <FieldDescription>
          Enter the 6-digit code sent to your phone.
        </FieldDescription>
        <FieldError>Please enter all 6 digits.</FieldError>
      </FieldContent>
    </Field>
  )
}
