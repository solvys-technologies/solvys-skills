"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/ui/input-otp"
import { Label } from "@/registry/ui/label"

export default function InputOTPVariants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Label className="text-disabled w-20">Outline</Label>
        <InputOTP maxLength={6} variant="outline" pattern={REGEXP_ONLY_DIGITS}>
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
      </div>
      <div className="flex items-center gap-6">
        <Label className="text-disabled w-20">Filled</Label>
        <InputOTP maxLength={6} variant="filled" pattern={REGEXP_ONLY_DIGITS}>
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
      </div>
    </div>
  )
}
