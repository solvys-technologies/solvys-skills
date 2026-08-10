"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const radioVariants = cva(
  [
    // base
    "group relative shrink-0 transition inline-flex items-center justify-center rounded-full border-solid border-medium outline-solid outline-2 outline-transparent cursor-pointer",
    // transition
    "transition-[color,background-color,border-color,outline-color,scale]",
    // hover
    "hover:bg-weak",
    // active
    "active:bg-weak",
    // active (unchecked): press-scale the whole control
    "state-unchecked:active:scale-[0.96]",
    // focus-visible
    "focus-visible:bg-static-white",
    // disabled
    "disabled:cursor-not-allowed disabled:bg-weak disabled:border-light",
    // aria-invalid
    "aria-invalid:outline-red-600 aria-invalid:border-red-600 aria-invalid:pointer-events-none",
    // state-checked:hover
    "state-checked:hover:bg-transparent",
    // state-checked:active
    "state-checked:active:bg-transparent",
    // state-checked:disabled
    "state-checked:disabled:border-light",
  ],
  {
    variants: {
      variant: {
        primary: [
          // focus-visible
          "focus-visible:outline-primary-500",
          // state-checked
          "state-checked:border-primary-500",
          // state-checked:hover
          "state-checked:hover:border-primary-600",
          // state-checked:active
          "state-checked:active:border-primary-600",
        ],
        neutral: [
          // focus-visible
          "focus-visible:outline-strong",
          // state-checked
          "state-checked:border-strong",
          // state-checked:hover
          "state-checked:hover:border-strongest",
          // state-checked:active
          "state-checked:active:border-strongest",
        ],
        danger: [
          // focus-visible
          "focus-visible:outline-red-600",
          // state-checked
          "state-checked:border-red-600",
          // state-checked:hover
          "state-checked:hover:border-red-500",
          // state-checked:active
          "state-checked:active:border-red-500",
        ],
        success: [
          // focus-visible
          "focus-visible:outline-green-600",
          // state-checked
          "state-checked:border-green-600",
          // state-checked:hover
          "state-checked:hover:border-green-500",
          // state-checked:active
          "state-checked:active:border-green-500",
        ],
        inverse: [
          // base
          "border-heavy",
          // hover
          "hover:bg-strong",
          // active
          "active:bg-strong",
          // focus-visible
          "focus-visible:bg-static-black focus-visible:outline-weakest",
          // disabled
          "disabled:bg-strong",
          // state-checked
          "state-checked:border-weakest",
          // state-checked:hover
          "state-checked:hover:border-weak",
          // state-checked:active
          "state-checked:active:border-weak",
          // state-checked:disabled
          "state-checked:disabled:border-heavy",
        ],
      },
      size: {
        xs: "size-4 border outline-offset-1",
        sm: "size-5 border-[1.5px] outline-offset-1",
        md: "size-6 border-2 outline-offset-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
)

const radioIndicatorVariants = cva(
  [
    // base
    "rounded-full pointer-events-none shrink-0",
    // transition
    "transition",
    // group-active
    "group-active:scale-[1.07]",
    // group-invalid
    "group-aria-invalid:bg-red-600 group-aria-invalid:shadow-component-error-default",
    // group-disabled
    "group-disabled:bg-medium group-disabled:shadow-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          // base
          "bg-primary-500 shadow-component-primary-default",
          // group-hover
          "group-hover:bg-primary-600 group-hover:shadow-component-primary-hover",
          // group-active
          "group-active:bg-primary-600 group-active:shadow-component-primary-hover",
        ],
        neutral: [
          // base
          "bg-strong shadow-component-neutral-default",
          // group-hover
          "group-hover:bg-strongest group-hover:shadow-component-neutral-hover",
          // group-active
          "group-active:bg-strongest group-active:shadow-component-neutral-hover",
        ],
        danger: [
          // base
          "bg-red-600 shadow-component-error-default",
          // group-hover
          "group-hover:bg-red-500 group-hover:shadow-component-error-hover",
          // group-active
          "group-active:bg-red-500 group-active:shadow-component-error-hover",
        ],
        success: [
          // base
          "bg-green-600 shadow-component-success-default",
          // group-hover
          "group-hover:bg-green-500 group-hover:shadow-component-success-hover",
          // group-active
          "group-active:bg-green-500 group-active:shadow-component-success-hover",
        ],
        inverse: [
          // base
          "bg-weakest shadow-component-inverted-default",
          // group-hover
          "group-hover:bg-weak group-hover:shadow-component-inverted-hover",
          // group-active
          "group-active:bg-weak group-active:shadow-component-inverted-hover",
          // group-disabled
          "group-disabled:bg-heavy",
        ],
      },
      size: {
        xs: "size-2",
        sm: "size-2.5",
        md: "size-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
)

type RadioVariant = NonNullable<VariantProps<typeof radioVariants>["variant"]>
type RadioSize = NonNullable<VariantProps<typeof radioVariants>["size"]>

type RadioContextValue = {
  variant?: RadioVariant
  size?: RadioSize
  invalid?: boolean
}

const RadioContext = React.createContext<RadioContextValue | null>(null)

type RadioProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioVariants>

function Radio({ className, variant, size, ...props }: RadioProps) {
  const ctx = React.useContext(RadioContext)
  const resolvedVariant = variant ?? ctx?.variant ?? "primary"
  const resolvedSize = size ?? ctx?.size ?? "sm"

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      aria-invalid={ctx?.invalid || undefined}
      className={cn(
        radioVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-indicator"
        className="flex items-center justify-center"
      >
        <span
          className={cn(
            radioIndicatorVariants({
              variant: resolvedVariant,
              size: resolvedSize,
            })
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { Radio, RadioContext, radioVariants, radioIndicatorVariants }
export type { RadioContextValue, RadioVariant, RadioSize }
