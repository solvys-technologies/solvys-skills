"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import { Example, ExampleWrapper } from "@/registry/components/example"
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
import { Label } from "@/registry/ui/label"

type Shape = "rounded" | "pill" | "underline" | "square"
type Variant = "outline" | "filled"
type Size = "lg" | "sm" | "xs"

const SHAPES: { id: Shape; label: string }[] = [
  { id: "rounded", label: "Rounded" },
  { id: "pill", label: "Pill" },
  { id: "underline", label: "Underline" },
  { id: "square", label: "Square" },
]

function OtpSample({
  shape,
  variant,
  size,
}: {
  shape: Shape
  variant: Variant
  size?: Size
}) {
  return (
    <InputOTP
      maxLength={6}
      shape={shape}
      variant={variant}
      size={size}
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
  )
}

function ShapeMatrix({ variant }: { variant: Variant }) {
  return (
    <div className="flex flex-col gap-6">
      {SHAPES.map((shape) => (
        <div key={shape.id} className="flex items-center gap-6">
          <Label className="text-disabled w-24">{shape.label}</Label>
          <OtpSample shape={shape.id} variant={variant} />
        </div>
      ))}
    </div>
  )
}

export default function InputOTPExample() {
  const [value, setValue] = React.useState("")
  const [errorValue, setErrorValue] = React.useState("12")

  return (
    <ExampleWrapper>
      {/* Outlined variant — all 4 shapes */}
      <Example title="Outline">
        <ShapeMatrix variant="outline" />
      </Example>

      {/* Filled variant — all 4 shapes */}
      <Example title="Filled">
        <ShapeMatrix variant="filled" />
      </Example>

      {/* Sizes */}
      <Example title="Sizes — Outline / Rounded">
        <div className="flex flex-col gap-6">
          {(["lg", "sm", "xs"] as const).map((s) => (
            <div key={s} className="flex items-center gap-6">
              <Label className="text-disabled w-16 uppercase">{s}</Label>
              <OtpSample shape="rounded" variant="outline" size={s} />
            </div>
          ))}
        </div>
      </Example>

      <Example title="Sizes — Filled / Rounded">
        <div className="flex flex-col gap-6">
          {(["lg", "sm", "xs"] as const).map((s) => (
            <div key={s} className="flex items-center gap-6">
              <Label className="text-disabled w-16 uppercase">{s}</Label>
              <OtpSample shape="rounded" variant="filled" size={s} />
            </div>
          ))}
        </div>
      </Example>

      {/* Digit counts */}
      <Example title="Digit Counts">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <Label className="text-disabled w-24">4 Digits</Label>
            <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-center gap-6">
            <Label className="text-disabled w-24">5 Digits</Label>
            <InputOTP maxLength={5} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-center gap-6">
            <Label className="text-disabled w-24">8 Digits</Label>
            <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSeparator />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </Example>

      {/* Disabled */}
      <Example title="Disabled">
        <InputOTP
          maxLength={6}
          disabled
          value="123456"
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
      </Example>

      {/* Error */}
      <Example title="Error State">
        <Field invalid>
          <InputOTP
            maxLength={6}
            value={errorValue}
            onChange={setErrorValue}
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
        </Field>
      </Example>

      {/* Field + Label */}
      <Example title="With Field & Label">
        <Field size="sm" invalid={value.length > 0 && value.length < 6}>
          <FieldLabel>Verification Code</FieldLabel>
          <FieldContent>
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
            <FieldDescription>
              Enter the 6-digit code sent to your phone.
            </FieldDescription>
            <FieldError>Please enter a valid 6-digit code.</FieldError>
          </FieldContent>
        </Field>
      </Example>

      {/* Controlled */}
      <Example title="Controlled">
        <div className="flex flex-col gap-2">
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
          <p className="text-ui-control-sm text-placeholder">
            Current value: {value || "(empty)"}
          </p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
