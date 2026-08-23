"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"
import { Field } from "@/registry/ui/field"
import {
  RadioContext,
  type RadioSize,
  type RadioVariant,
} from "@/registry/ui/radio"

const radioGroupVariants = cva("", {
  variants: {
    placement: {
      left: "",
      right: "flex-row-reverse",
    },
    variant: {
      primary: "",
      neutral: "",
      danger: [
        // base
        "[&_[data-slot=field-footer]]:text-error-base",
        // hover
        "[&_[data-slot=field-footer]_a:hover]:text-error-base",
      ],
    },
  },
  defaultVariants: {
    placement: "left",
    variant: "primary",
  },
})

type RadioGroupSize = "xs" | "sm" | "md"

const groupSizeToRadioSize: Record<RadioGroupSize, RadioSize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
}

type RadioGroupVariant = NonNullable<
  VariantProps<typeof radioGroupVariants>["variant"]
>
type RadioGroupPlacement = NonNullable<
  VariantProps<typeof radioGroupVariants>["placement"]
>

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  variant?: RadioGroupVariant
  size?: RadioGroupSize
  placement?: RadioGroupPlacement
  disabled?: boolean
  invalid?: boolean
  fieldClassName?: string
}

function RadioGroup({
  className,
  fieldClassName,
  variant = "primary",
  size = "sm",
  placement = "left",
  disabled,
  invalid,
  children,
  ...rootProps
}: RadioGroupProps) {
  const radioVariant: RadioVariant = variant === "danger" ? "danger" : variant
  const radioSize = groupSizeToRadioSize[size]
  const ctx = React.useMemo(
    () => ({ variant: radioVariant, size: radioSize, invalid }),
    [radioVariant, radioSize, invalid]
  )

  return (
    <RadioContext.Provider value={ctx}>
      <RadioGroupPrimitive.Root
        data-slot="radio-group"
        data-variant={variant}
        data-size={size}
        data-placement={placement}
        disabled={disabled}
        className={cn("flex", className)}
        {...rootProps}
      >
        <Field
          orientation="horizontal"
          size={size}
          disabled={disabled}
          invalid={invalid}
          className={cn(
            radioGroupVariants({ placement, variant }),
            fieldClassName
          )}
        >
          {children}
        </Field>
      </RadioGroupPrimitive.Root>
    </RadioContext.Provider>
  )
}

export { RadioGroup, radioGroupVariants }
export type {
  RadioGroupProps,
  RadioGroupSize,
  RadioGroupVariant,
  RadioGroupPlacement,
}
