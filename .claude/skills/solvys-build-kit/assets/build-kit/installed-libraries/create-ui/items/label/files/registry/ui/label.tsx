"use client"

import * as React from "react"
import { Label as LabelPrimitive, Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"
import { useOptionalFieldContext } from "@/registry/ui/field"

type LabelSize = "xs" | "sm" | "md"

const LabelSizeContext = React.createContext<{ size: LabelSize } | null>(null)

function useLabelSize(explicitSize?: LabelSize): LabelSize {
  const labelCtx = React.useContext(LabelSizeContext)
  const fieldCtx = useOptionalFieldContext()
  return explicitSize ?? labelCtx?.size ?? fieldCtx?.size ?? "sm"
}

type LabelBlockProps = React.ComponentProps<"div"> & {
  size?: LabelSize
  asChild?: boolean
}

function LabelBlock({
  className,
  size,
  asChild = false,
  ...props
}: LabelBlockProps) {
  const resolved = useLabelSize(size)
  const Comp = asChild ? Slot.Root : "div"
  return (
    <LabelSizeContext.Provider value={{ size: resolved }}>
      <Comp
        data-slot="label-block"
        data-size={resolved}
        className={cn("group/label flex w-full items-end gap-3", className)}
        {...props}
      />
    </LabelSizeContext.Provider>
  )
}

function LabelMain({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="label-main"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-start gap-1",
        className
      )}
      {...props}
    />
  )
}

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  size?: LabelSize
}

function Label({ className, size, htmlFor, ...props }: LabelProps) {
  const resolved = useLabelSize(size)
  const commonClassName = cn(
    // base
    "group/label flex w-full items-center gap-1 font-semibold text-body select-none",
    // disabled
    "group-data-[disabled=true]/field:cursor-not-allowed group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:text-placeholder",
    // invalid
    "group-data-[invalid=true]/field:text-error-base",
    // size
    "data-[size=xs]:text-ui-control-sm data-[size=sm]:text-ui-control-md data-[size=md]:text-ui-control-xl",
    className
  )
  const inner =
    htmlFor === undefined ? (
      <span
        data-slot="label"
        data-size={resolved}
        className={commonClassName}
        {...(props as React.ComponentProps<"span">)}
      />
    ) : (
      <LabelPrimitive.Root
        data-slot="label"
        data-size={resolved}
        htmlFor={htmlFor}
        className={commonClassName}
        {...props}
      />
    )
  return (
    <LabelSizeContext.Provider value={{ size: resolved }}>
      {inner}
    </LabelSizeContext.Provider>
  )
}

type LabelIconProps = React.ComponentProps<"span"> & {
  size?: LabelSize
}

function LabelIcon({ className, size, ...props }: LabelIconProps) {
  const resolved = useLabelSize(size)
  return (
    <span
      data-slot="label-icon"
      aria-hidden="true"
      data-size={resolved}
      className={cn(
        "text-body group-data-[invalid=true]/field:text-error-base group-data-[disabled=true]/field:text-placeholder inline-flex shrink-0 items-center justify-center [&_svg]:size-full",
        "data-[size=md]:size-6 data-[size=sm]:size-5 data-[size=xs]:size-4",
        className
      )}
      {...props}
    />
  )
}

type LabelRequiredProps = React.ComponentProps<"span"> & {
  size?: LabelSize
}

function LabelRequired({
  className,
  size,
  children = "*",
  ...props
}: LabelRequiredProps) {
  const resolved = useLabelSize(size)
  return (
    <span
      data-slot="label-required"
      aria-hidden="true"
      data-size={resolved}
      className={cn(
        "text-primary-base group-data-[invalid=true]/field:text-error-base shrink-0 font-medium",
        "data-[size=xs]:text-ui-control-sm data-[size=sm]:text-ui-control-md data-[size=md]:text-ui-control-lg",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

type LabelOptionalProps = React.ComponentProps<"span"> & {
  size?: LabelSize
}

function LabelOptional({
  className,
  size,
  children = "(Optional)",
  ...props
}: LabelOptionalProps) {
  const resolved = useLabelSize(size)
  return (
    <span
      data-slot="label-optional"
      data-size={resolved}
      className={cn(
        "text-placeholder group-data-[invalid=true]/field:text-error-base group-data-[disabled=true]/field:text-disabled shrink-0 font-medium",
        "data-[size=xs]:text-ui-control-sm data-[size=sm]:text-ui-control-md data-[size=md]:text-ui-control-lg",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

type LabelDescriptionProps = React.ComponentProps<"p"> & {
  size?: LabelSize
}

function LabelDescription({
  className,
  size,
  ...props
}: LabelDescriptionProps) {
  const resolved = useLabelSize(size)
  return (
    <p
      data-slot="label-description"
      data-size={resolved}
      className={cn(
        "text-placeholder group-data-[invalid=true]/field:text-error-base group-data-[disabled=true]/field:text-disabled w-full group-data-[disabled=true]/field:pointer-events-none",
        "data-[size=xs]:text-ui-control-sm data-[size=sm]:text-ui-control-md data-[size=md]:text-ui-control-lg",
        className
      )}
      {...props}
    />
  )
}

function LabelBadgeSlot({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="label-badge-slot"
      className={cn("inline-flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  )
}

type LabelInfoSlotProps = React.ComponentProps<"span"> & {
  size?: LabelSize
}

function LabelInfoSlot({ className, size, ...props }: LabelInfoSlotProps) {
  const resolved = useLabelSize(size)
  return (
    <span
      data-slot="label-info-slot"
      data-size={resolved}
      className={cn(
        "text-placeholder group-data-[invalid=true]/field:text-error-base group-data-[disabled=true]/field:text-placeholder inline-flex shrink-0 items-center [&_svg]:size-full",
        "data-[size=md]:size-4 data-[size=sm]:size-3.5 data-[size=xs]:size-3",
        className
      )}
      {...props}
    />
  )
}

type LabelCountProps = React.ComponentProps<"span"> & {
  size?: LabelSize
}

function LabelCount({ className, size, ...props }: LabelCountProps) {
  const resolved = useLabelSize(size)
  return (
    <span
      data-slot="label-count"
      data-size={resolved}
      className={cn(
        "text-placeholder group-data-[invalid=true]/field:text-error-base group-data-[disabled=true]/field:text-disabled shrink-0 font-medium",
        "data-[size=xs]:text-ui-control-sm data-[size=sm]:text-ui-control-md data-[size=md]:text-ui-control-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Label,
  LabelBlock,
  LabelMain,
  LabelIcon,
  LabelRequired,
  LabelOptional,
  LabelDescription,
  LabelBadgeSlot,
  LabelInfoSlot,
  LabelCount,
  useLabelSize,
}
export type { LabelSize }
