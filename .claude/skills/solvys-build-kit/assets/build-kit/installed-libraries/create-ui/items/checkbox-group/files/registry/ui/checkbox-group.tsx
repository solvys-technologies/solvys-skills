"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import {
  CheckboxContext,
  type CheckboxShape,
  type CheckboxSize,
  type CheckboxVariant,
} from "@/registry/ui/checkbox"
import { Field } from "@/registry/ui/field"

const checkboxGroupVariants = cva("", {
  variants: {
    placement: {
      left: "",
      right: "flex-row-reverse",
    },
    variant: {
      primary: "",
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

type CheckboxGroupSize = "xs" | "sm" | "md"

const groupSizeToCheckboxSize: Record<CheckboxGroupSize, CheckboxSize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
}
type CheckboxGroupVariant = NonNullable<
  VariantProps<typeof checkboxGroupVariants>["variant"]
>
type CheckboxGroupPlacement = NonNullable<
  VariantProps<typeof checkboxGroupVariants>["placement"]
>

type CheckboxGroupProps = Omit<
  React.ComponentProps<typeof Field>,
  "orientation" | "size"
> & {
  variant?: CheckboxGroupVariant
  size?: CheckboxGroupSize
  shape?: CheckboxShape
  placement?: CheckboxGroupPlacement
}

function CheckboxGroup({
  className,
  variant = "primary",
  size = "sm",
  shape = "rounded",
  placement = "left",
  children,
  ...props
}: CheckboxGroupProps) {
  const checkboxVariant: CheckboxVariant =
    variant === "danger" ? "danger" : variant
  const checkboxSize = groupSizeToCheckboxSize[size]
  const ctx = React.useMemo(
    () => ({ variant: checkboxVariant, size: checkboxSize, shape }),
    [checkboxVariant, checkboxSize, shape]
  )

  return (
    <CheckboxContext.Provider value={ctx}>
      <Field
        orientation="horizontal"
        size={size}
        data-slot="checkbox-group"
        data-variant={variant}
        data-placement={placement}
        data-shape={shape}
        className={cn(checkboxGroupVariants({ placement, variant }), className)}
        {...props}
      >
        {children}
      </Field>
    </CheckboxContext.Provider>
  )
}

export { CheckboxGroup, checkboxGroupVariants }
export type {
  CheckboxGroupProps,
  CheckboxGroupSize,
  CheckboxGroupVariant,
  CheckboxGroupPlacement,
}
