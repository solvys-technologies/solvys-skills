"use client"

import * as React from "react"
import { RiSubtractLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/registry/lib/utils"
import { useOptionalFieldContext } from "@/registry/ui/field"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

const inputOTPSlotVariants = cva(
  [
    // base
    "relative flex shrink-0 items-center justify-center border-solid lg:outline-4 outline-transparent text-strongest",
    // transition
    "transition",
    // data-[state=filled]
    "data-[state=filled]:text-body",
    // data-[state=error]
    "data-[state=error]:text-error-base data-[state=error]:outline-error-weak",
    // data-[state=disabled]
    "data-[state=disabled]:cursor-not-allowed data-[state=disabled]:text-disabled",
  ],
  {
    variants: {
      shape: {
        rounded: "",
        pill: "rounded-full",
        square: "rounded-none",
        underline: "rounded-none shadow-none",
      },
      size: {
        lg: "size-10 lg:size-15 p-3 1 lg:p-3 outline-2 text-heading-h6 lg:text-heading-h5 font-medium",
        sm: "size-9 lg:size-10 p-1.5 outline-1 text-ui-control-h6 font-medium",
        xs: "size-8 p-1 outline-1 text-ui-control-md lg:text-ui-control-lg font-semibold tracking-[-0.5px]",
      },
      variant: {
        outline: [
          // base
          "border-light bg-static shadow-neutral-sm",
          // data-[state=default]:hover
          "data-[state=default]:hover:bg-weakest",
          // data-[state=default]:focus-visible
          "data-[state=default]:focus-visible:bg-weakest data-[state=default]:focus-visible:shadow-none data-[state=default]:focus-visible:border-primary-base data-[state=default]:focus-visible:outline-info-weak",
          // data-[state=filled]
          "data-[state=filled]:bg-weakest",
          // data-[state=typing]
          "data-[state=typing]:bg-weakest data-[state=typing]:border-primary-base",
          // data-[state=focused]
          "data-[state=focused]:bg-weakest data-[state=focused]:border-primary-base data-[state=focused]:shadow-neutral-lg",
          // data-[state=error]
          "data-[state=error]:bg-weakest data-[state=error]:border-error-base data-[state=error]:shadow-none",
          // data-[state=disabled]
          "data-[state=disabled]:bg-weakest data-[state=disabled]:border-weak",
        ],
        filled: [
          // base
          "border-weak bg-weakest shadow-neutral-sm",
          // data-[state=default]:hover
          "data-[state=default]:hover:bg-weak data-[state=default]:hover:border-light",
          // data-[state=default]:focus-visible
          "data-[state=default]:focus-visible:bg-weakest data-[state=default]:focus-visible:shadow-none data-[state=default]:focus-visible:border-primary-base data-[state=default]:focus-visible:outline-info-weak",
          // data-[state=filled]
          "data-[state=filled]:bg-weak data-[state=filled]:border-light",
          // data-[state=typing]
          "data-[state=typing]:bg-weak data-[state=typing]:border-primary-base",
          // data-[state=focused]
          "data-[state=focused]:bg-weak data-[state=focused]:border-primary-base data-[state=focused]:shadow-neutral-lg",
          // data-[state=error]
          "data-[state=error]:bg-weak data-[state=error]:border-error-base data-[state=error]:shadow-none",
          // data-[state=disabled]
          "data-[state=disabled]:bg-weak data-[state=disabled]:border-light",
        ],
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "lg", className: "rounded-xl lg:rounded-2xl" },
      { shape: "rounded", size: "sm", className: "rounded-lg lg:rounded-xl" },
      { shape: "rounded", size: "xs", className: "rounded-lg" },
      { shape: "rounded", size: "lg", className: "border-[1.5px] lg:border-2" },
      { shape: "rounded", size: "sm", className: "border-[1.5px] lg:border-2" },
      { shape: "rounded", size: "xs", className: "border" },
      { shape: "pill", size: "lg", className: "border-[1.5px] lg:border-2" },
      { shape: "pill", size: "sm", className: "border-[1.5px] lg:border-2" },
      { shape: "pill", size: "xs", className: "border" },
      { shape: "square", size: "lg", className: "border-[1.5px] lg:border-2" },
      { shape: "square", size: "sm", className: "border-[1.5px] lg:border-2" },
      { shape: "square", size: "xs", className: "border" },
      {
        shape: "underline",
        size: "lg",
        className: "border-b-[1.5px] lg:border-b-2",
      },
      {
        shape: "underline",
        size: "sm",
        className: "border-b-[1.5px] lg:border-b-2",
      },
      { shape: "underline", size: "xs", className: "border-b" },
    ],
    defaultVariants: {
      shape: "rounded",
      size: "lg",
      variant: "outline",
    },
  }
)

type InputOTPContextValue = {
  shape?: "underline" | "square" | "rounded" | "pill"
  size?: "lg" | "sm" | "xs"
  variant?: "outline" | "filled"
  disabled?: boolean
  invalid?: boolean
}

const InputOTPInternalContext = React.createContext<InputOTPContextValue>({})

function useInputOTPContext() {
  return React.useContext(InputOTPInternalContext)
}

interface InputOTPProps
  extends Omit<
      React.ComponentProps<typeof OTPInput>,
      "containerClassName" | "size" | "render" | "ref"
    >,
    VariantProps<typeof inputOTPSlotVariants> {
  containerClassName?: string
  invalid?: boolean
  children: React.ReactNode
}

function InputOTP({
  className,
  containerClassName,
  shape = "rounded",
  size,
  variant = "outline",
  disabled,
  invalid,
  ...props
}: InputOTPProps) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedSize =
    size ?? (fieldCtx?.size as "lg" | "sm" | "xs" | undefined) ?? "lg"
  const resolvedDisabled = disabled ?? fieldCtx?.disabled ?? false
  const resolvedInvalid = invalid ?? fieldCtx?.invalid ?? false

  return (
    <InputOTPInternalContext.Provider
      value={{
        shape: shape ?? undefined,
        size: resolvedSize,
        variant: variant ?? undefined,
        disabled: resolvedDisabled,
        invalid: resolvedInvalid,
      }}
    >
      <OTPInput
        data-slot="input-otp"
        data-shape={shape}
        data-size={resolvedSize}
        data-variant={variant}
        data-invalid={resolvedInvalid ? true : undefined}
        data-disabled={resolvedDisabled ? true : undefined}
        aria-invalid={resolvedInvalid || undefined}
        containerClassName={cn(
          "gap-component-md lg:gap-component-lg flex items-center",
          resolvedDisabled && "opacity-50",
          containerClassName
        )}
        className={className}
        disabled={resolvedDisabled}
        {...props}
      />
    </InputOTPInternalContext.Provider>
  )
}

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-group"
    className={cn(
      "gap-component-xs lg:gap-component-sm flex items-center",
      className
    )}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

type SlotState =
  | "default"
  | "filled"
  | "typing"
  | "focused"
  | "error"
  | "disabled"

function animateCharIn(node: HTMLSpanElement | null) {
  if (!node || typeof node.animate !== "function") return
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
  node.animate(
    [
      { opacity: 0, transform: "translateY(0.75em)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 200, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
  )
}

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const ctx = useInputOTPContext()
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  const charRef = React.useRef<HTMLSpanElement | null>(null)
  const prevCharRef = React.useRef(char)
  useIsomorphicLayoutEffect(() => {
    const prev = prevCharRef.current
    prevCharRef.current = char
    if (!prev && char) animateCharIn(charRef.current)
  }, [char])

  const isDisabled = !!ctx.disabled
  const isInvalid = !!ctx.invalid

  let state: SlotState
  if (isDisabled) state = "disabled"
  else if (isInvalid) state = "error"
  else if (isActive && hasFakeCaret) state = "typing"
  else if (isActive) state = "focused"
  else if (char) state = "filled"
  else state = "default"

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-state={state}
      className={cn(
        inputOTPSlotVariants({
          shape: ctx.shape,
          size: ctx.size,
          variant: ctx.variant,
        }),
        state === "typing" && "shadow-neutral-lg z-10",
        state === "focused" && "outline-info-weak z-10",
        state === "error" && isActive && "z-10",
        ctx.shape === "underline" && state !== "typing" && "shadow-none",
        className
      )}
      {...props}
    >
      {char && (
        <span ref={charRef} data-slot="input-otp-char">
          {char}
        </span>
      )}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="animate-pulse">|</span>
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const ctx = useInputOTPContext()
  return (
    <div
      ref={ref}
      data-slot="input-otp-separator"
      role="separator"
      className={cn(
        "text-placeholder flex items-center justify-center [&>svg]:size-6",
        ctx.size === "lg" && "text-ui-control-xl",
        ctx.size === "sm" && "text-ui-control-lg",
        ctx.size === "xs" && "text-ui-control-md",
        className
      )}
      {...props}
    >
      {children ?? <RiSubtractLine />}
    </div>
  )
})
InputOTPSeparator.displayName = "InputOTPSeparator"

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  inputOTPSlotVariants,
}
