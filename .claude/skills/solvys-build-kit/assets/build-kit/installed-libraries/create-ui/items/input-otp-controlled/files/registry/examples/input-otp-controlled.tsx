"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/ui/input-otp"

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
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
      <p className="text-placeholder text-ui-control-sm">
        Current value: {value || "(empty)"}
      </p>
    </div>
  )
}
