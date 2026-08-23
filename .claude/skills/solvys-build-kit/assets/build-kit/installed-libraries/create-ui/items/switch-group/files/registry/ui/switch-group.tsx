"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { Field } from "@/registry/ui/field"
import {
  SwitchContext,
  type SwitchShape,
  type SwitchSize,
  type SwitchThumbType,
  type SwitchVariant,
} from "@/registry/ui/switch"

const switchGroupVariants = cva("", {
  variants: {
    placement: {
      left: "",
      right: "flex-row-reverse",
    },
  },
  defaultVariants: {
    placement: "left",
  },
})

type SwitchGroupSize = "xs" | "sm" | "md"

const groupSizeToSwitchSize: Record<SwitchGroupSize, SwitchSize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
}

type SwitchGroupPlacement = NonNullable<
  VariantProps<typeof switchGroupVariants>["placement"]
>

type SwitchGroupProps = Omit<
  React.ComponentProps<typeof Field>,
  "orientation" | "size"
> & {
  variant?: SwitchVariant
  size?: SwitchGroupSize
  shape?: SwitchShape
  thumbType?: SwitchThumbType
  ioTrigger?: boolean
  placement?: SwitchGroupPlacement
}

function SwitchGroup({
  className,
  variant = "primary",
  size = "sm",
  shape = "pill",
  thumbType = "short",
  ioTrigger = false,
  placement = "left",
  children,
  ...props
}: SwitchGroupProps) {
  const switchSize = groupSizeToSwitchSize[size]
  const ctx = React.useMemo(
    () => ({
      variant,
      size: switchSize,
      shape,
      thumbType,
      ioTrigger,
    }),
    [variant, switchSize, shape, thumbType, ioTrigger]
  )

  return (
    <SwitchContext.Provider value={ctx}>
      <Field
        orientation="horizontal"
        size={size}
        data-slot="switch-group"
        data-variant={variant}
        data-placement={placement}
        data-shape={shape}
        data-thumb-type={thumbType}
        className={cn(switchGroupVariants({ placement }), className)}
        {...props}
      >
        {children}
      </Field>
    </SwitchContext.Provider>
  )
}

export { SwitchGroup, switchGroupVariants }
export type { SwitchGroupProps, SwitchGroupSize, SwitchGroupPlacement }
