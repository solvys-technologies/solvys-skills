"use client"

import * as React from "react"

import { ExampleWrapper, SectionFrame } from "@/registry/components/example"
import { InputStepper } from "@/registry/pro/ui/input-stepper"
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field"

type Variant = "end-controls" | "split" | "vertical-stepper" | "detached"
type Size = "xs" | "sm" | "md"

const VARIANT_LABELS: Record<Variant, string> = {
  "end-controls": "End Controls",
  split: "Split",
  "vertical-stepper": "Vertical Stepper",
  detached: "Detached",
}

type Row = {
  id: string
  label: string
  /** Seed value. When undefined the input renders empty and the placeholder shows. */
  value?: number
  invalid?: boolean
  disabled?: boolean
}

// Mirrors the Figma frame's state matrix (per layout column).
// "default" intentionally has no value — it shows the placeholder in placeholder
// color, matching Figma. "filled" / "error" / "disabled" carry an actual value.
const ROWS: Row[] = [
  { id: "default", label: "Default" },
  { id: "filled", label: "Filled", value: 3 },
  {
    id: "disabled",
    label: "Disabled",
    value: 3,
    disabled: true,
  },
  { id: "error", label: "Error", value: 3, invalid: true },
]

export default function InputStepperExample() {
  return (
    <ExampleWrapper>
      <StateMatrix variant="end-controls" />
      <StateMatrix variant="split" />
      <StateMatrix variant="vertical-stepper" />
      <StateMatrix variant="detached" />
      <SizeShowcase variant="end-controls" />
      <SizeShowcase variant="split" />
      <SizeShowcase variant="vertical-stepper" />
      <SizeShowcase variant="detached" />
      <WithPrefix />
      <WithField />
    </ExampleWrapper>
  )
}

// ---------------------------------------------------------------------------
// State matrix — mirrors the Figma frame
// ---------------------------------------------------------------------------

function StateMatrix({ variant }: { variant: Variant }) {
  return (
    <SectionFrame title={`Input Stepper — ${VARIANT_LABELS[variant]} (md)`}>
      <div className="flex w-[350px] flex-col gap-6">
        {ROWS.map((row) => (
          <StateRow key={row.id} variant={variant} row={row} />
        ))}
      </div>
    </SectionFrame>
  )
}

function StateRow({ variant, row }: { variant: Variant; row: Row }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-ui-control-sm text-disabled font-medium">
        {row.label}
      </span>
      {row.value === undefined ? (
        <InputStepper
          size="md"
          variant={variant}
          invalid={row.invalid}
          disabled={row.disabled}
          placeholder="3"
          min={0}
          max={99}
        />
      ) : (
        <ControlledStepper variant={variant} row={row} initial={row.value} />
      )}
    </div>
  )
}

function ControlledStepper({
  variant,
  row,
  initial,
}: {
  variant: Variant
  row: Row
  initial: number
}) {
  const [value, setValue] = React.useState<number>(initial)
  return (
    <InputStepper
      size="md"
      variant={variant}
      value={value}
      onValueChange={setValue}
      invalid={row.invalid}
      disabled={row.disabled}
      placeholder="3"
      min={0}
      max={99}
    />
  )
}

// ---------------------------------------------------------------------------
// Size showcase — xs / sm / md side by side
// ---------------------------------------------------------------------------

function SizeShowcase({ variant }: { variant: Variant }) {
  const sizes: Size[] = ["xs", "sm", "md"]

  return (
    <SectionFrame title={`Sizes — ${VARIANT_LABELS[variant]}`}>
      <div className="flex w-[350px] flex-col gap-6">
        {sizes.map((size) => (
          <SizeRow key={size} variant={variant} size={size} />
        ))}
      </div>
    </SectionFrame>
  )
}

function SizeRow({ variant, size }: { variant: Variant; size: Size }) {
  const [value, setValue] = React.useState(2)
  return (
    <div className="flex flex-col gap-2">
      <span className="text-ui-control-sm text-disabled font-medium uppercase">
        {size}
      </span>
      <InputStepper
        size={size}
        variant={variant}
        value={value}
        onValueChange={setValue}
        min={0}
        max={99}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Prefix — display-only adornment, folded into the cell before the value
// ---------------------------------------------------------------------------

function WithPrefix() {
  const [amount, setAmount] = React.useState(99)

  return (
    <SectionFrame title="With prefix">
      <div className="flex w-[350px] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-ui-control-sm text-disabled font-medium">
            End Controls
          </span>
          <InputStepper
            size="md"
            variant="end-controls"
            prefix="$"
            value={amount}
            onValueChange={setAmount}
            min={0}
            max={999}
            aria-label="Amount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-ui-control-sm text-disabled font-medium">
            Vertical Stepper
          </span>
          <InputStepper
            size="md"
            variant="vertical-stepper"
            prefix="$"
            placeholder="99"
            min={0}
            max={999}
            aria-label="Amount (empty)"
          />
        </div>
      </div>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Wrapped in <Field /> — shows label, description, and FieldContext inheritance
// ---------------------------------------------------------------------------

function WithField() {
  const [quantity, setQuantity] = React.useState(1)

  return (
    <SectionFrame title="With Field wrapper">
      <div className="flex w-[350px] flex-col gap-6">
        <Field size="md">
          <FieldLabel htmlFor="qty">Quantity</FieldLabel>
          <InputStepper
            id="qty"
            value={quantity}
            onValueChange={setQuantity}
            min={1}
            max={10}
          />
          <FieldDescription>
            Inherits size from <code>{'<Field size="md" />'}</code>.
          </FieldDescription>
        </Field>

        <Field size="sm" invalid>
          <FieldLabel htmlFor="qty-invalid">Quantity (invalid)</FieldLabel>
          <InputStepper id="qty-invalid" defaultValue={3} />
          <FieldDescription>
            Inherits <code>invalid</code> from Field.
          </FieldDescription>
        </Field>

        <Field size="xs" disabled>
          <FieldLabel htmlFor="qty-disabled">Quantity (disabled)</FieldLabel>
          <InputStepper id="qty-disabled" defaultValue={3} variant="detached" />
        </Field>
      </div>
    </SectionFrame>
  )
}
