"use client"

import * as React from "react"
import { RiAddFill, RiSubtractFill } from "@create-ui/assets/icons"

import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import {
  InputGroupControl,
  InputGroupProvider,
  InputGroupShell,
  InputGroupSlot,
  useInputGroup,
} from "@/registry/ui/input-group"

type InputStepperSize = "xs" | "sm" | "md"
type InputStepperVariant = "split" | "detached"

const stepperSizeToButtonSize = {
  xs: "md",
  sm: "lg",
  md: "xl",
} as const

const stepperVariantToButtonAppearance = {
  split: "ghost",
  detached: "soft",
} as const

type InputStepperProps = Omit<
  React.ComponentProps<"input">,
  "size" | "value" | "defaultValue" | "onChange"
> & {
  variant?: InputStepperVariant
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  size?: InputStepperSize
  invalid?: boolean
  disabled?: boolean
  decrementLabel?: string
  incrementLabel?: string
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min === -Infinity ? 0 : min
  return Math.min(Math.max(value, min), max)
}

function InputStepper({ size, invalid, disabled, ...rest }: InputStepperProps) {
  return (
    <InputGroupProvider size={size} invalid={invalid} disabled={disabled}>
      <InputStepperContent {...rest} />
    </InputGroupProvider>
  )
}

function InputStepperContent({
  className,
  variant = "split",
  value,
  defaultValue,
  onValueChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
  ref,
  ...props
}: Omit<InputStepperProps, "size" | "invalid" | "disabled">) {
  const ctx = useInputGroup()
  const resolvedSize = ctx.size
  const resolvedInvalid = ctx.invalid
  const resolvedDisabled = ctx.disabled

  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<number | undefined>(() =>
    defaultValue === undefined ? undefined : clamp(defaultValue, min, max)
  )
  const current: number | undefined = isControlled
    ? clamp(value!, min, max)
    : internal

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const setInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )
  const commit = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, min, max)
      if (!isControlled) setInternal(clamped)
      if (clamped !== current) onValueChange?.(clamped)
    },
    [current, isControlled, max, min, onValueChange]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    if (raw === "") {
      if (!isControlled) setInternal(undefined)
      return
    }
    const parsed = Number(raw)
    if (Number.isNaN(parsed)) return
    commit(parsed)
  }

  const seed = current ?? clamp(0, min, max)
  const decrement = () => commit(seed - step)
  const increment = () => commit(seed + step)

  const keepFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const decrementDisabled =
    resolvedDisabled || (current !== undefined && current <= min)
  const incrementDisabled =
    resolvedDisabled || (current !== undefined && current >= max)

  const buttonAppearance = stepperVariantToButtonAppearance[variant]
  const buttonShape = variant === "detached" ? "rounded" : "square"
  const buttonSize = stepperSizeToButtonSize[resolvedSize]
  const pressScaleClass =
    variant === "detached" ? undefined : "active:scale-100"

  const decrementButton = (
    <Button
      type="button"
      data-slot="input-stepper-decrement"
      aria-label={decrementLabel}
      tabIndex={-1}
      disabled={decrementDisabled}
      onMouseDown={keepFocus}
      onClick={decrement}
      variant="neutral-solid"
      appearance={buttonAppearance}
      size={buttonSize}
      shape={buttonShape}
      iconOnly
      className={cn("shrink-0 border-0", pressScaleClass)}
    >
      <RiSubtractFill aria-hidden="true" />
    </Button>
  )

  const incrementButton = (
    <Button
      type="button"
      data-slot="input-stepper-increment"
      aria-label={incrementLabel}
      tabIndex={-1}
      disabled={incrementDisabled}
      onMouseDown={keepFocus}
      onClick={increment}
      variant="neutral-solid"
      appearance={buttonAppearance}
      size={buttonSize}
      shape={buttonShape}
      iconOnly
      className={cn("shrink-0 border-0", pressScaleClass)}
    >
      <RiAddFill aria-hidden="true" />
    </Button>
  )

  const cell = (
    <InputGroupSlot
      data-slot="input-stepper-cell"
      className={cn(
        "justify-center",
        variant !== "detached" &&
          "bg-static hover:bg-weakest focus-within:bg-static focus-within:hover:bg-static transition-[background-color]",
        variant !== "detached" && resolvedInvalid && "hover:bg-static"
      )}
    >
      <InputGroupControl
        ref={setInputRef}
        type="number"
        inputMode="numeric"
        data-slot="input-stepper-control"
        value={
          current === undefined || !Number.isFinite(current) ? "" : current
        }
        onChange={handleChange}
        min={min === -Infinity ? undefined : min}
        max={max === Infinity ? undefined : max}
        step={step}
        className={cn(
          "text-center",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        )}
        {...props}
      />
    </InputGroupSlot>
  )

  const shellClasses =
    "hover:bg-static data-[disabled]:hover:bg-weakest data-[loading]:hover:bg-weakest"

  if (variant === "split") {
    return (
      <InputGroupShell
        data-slot="input-stepper"
        data-variant="split"
        className={cn(shellClasses, className)}
      >
        {decrementButton}
        {cell}
        {incrementButton}
      </InputGroupShell>
    )
  }

  return (
    <div
      data-slot="input-stepper"
      data-variant="detached"
      role="group"
      className={cn("flex w-full items-center gap-1.5", className)}
    >
      {decrementButton}
      <InputGroupShell data-slot="input-stepper-cell-shell" role={undefined}>
        {cell}
      </InputGroupShell>
      {incrementButton}
    </div>
  )
}

export { InputStepper }
