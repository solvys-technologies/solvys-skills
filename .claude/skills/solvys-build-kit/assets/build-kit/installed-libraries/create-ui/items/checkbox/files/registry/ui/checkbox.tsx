"use client"

import * as React from "react"
import { RiSubtractFill } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const checkboxVariants = cva(
  [
    // base
    "group peer relative shrink-0 grid place-content-center bg-transparent border-medium text-transparent outline-solid outline-2 outline-transparent cursor-pointer",
    // transition
    "transition-all duration-200",
    // hover
    "hover:bg-weak hover:border-medium",
    // active
    "active:bg-weak active:border-medium",
    // focus-visible
    "focus-visible:bg-static-white focus-visible:border-medium",
    // disabled
    "disabled:cursor-not-allowed disabled:shadow-none disabled:bg-weak disabled:!text-disabled",
    // aria-invalid
    "aria-invalid:outline-red-600 aria-invalid:state-on:bg-red-600 aria-invalid:state-on:shadow-component-error-default  aria-invalid:state-on:outline-transparent",
    // state-on
    "state-on:border-none",
    // state-on:hover
    "state-on:hover:border-none",
    // state-on:active
    "state-on:active:border-none",
    // state-on:focus-visible
    "state-on:focus-visible:border-none",
    // state-on:disabled
    "state-on:disabled:bg-weak state-on:disabled:!border-light state-on:disabled:shadow-none",
    // state-checked:focus-visible
    "state-checked:focus-visible:border-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          // focus-visible
          "focus-visible:outline-primary-500",
          // state-on
          "state-on:bg-primary-500 state-on:shadow-component-primary-default",
          // state-on:hover
          "state-on:hover:bg-primary-600 state-on:hover:shadow-component-primary-hover",
          // state-on:focus-visible
          "state-on:focus-visible:bg-primary-500 state-on:focus-visible:outline-primary-700 state-on:focus-visible:shadow-component-primary-focused",
        ],
        neutral: [
          // focus-visible
          "focus-visible:outline-strong",
          // state-on
          "state-on:bg-strong state-on:shadow-component-neutral-default",
          // state-on:hover
          "state-on:hover:bg-strongest state-on:hover:shadow-component-neutral-hover",
          // state-on:active
          "state-on:active:bg-strongest state-on:active:shadow-component-neutral-hover",
          // state-on:focus-visible
          "state-on:focus-visible:bg-strong state-on:focus-visible:outline-strongest state-on:focus-visible:shadow-component-neutral-focused",
        ],
        inverse: [
          // base
          "border-heavy",
          // hover
          "hover:bg-strong hover:border-heavy",
          // active
          "active:bg-strong active:border-heavy",
          // focus-visible
          "focus-visible:bg-static-black focus-visible:border-heavy focus-visible:outline-weakest",
          // disabled
          "disabled:bg-static-black disabled:border-strong disabled:!text-body",
          // state-on
          "state-on:bg-weakest state-on:shadow-component-inverted-default",
          // state-on:hover
          "state-on:hover:bg-weak state-on:hover:shadow-component-inverted-hover",
          // state-on:active
          "state-on:active:bg-weak state-on:active:shadow-component-inverted-hover",
          // state-on:focus-visible
          "state-on:focus-visible:bg-weakest state-on:focus-visible:shadow-component-inverted-focused state-on:focus-visible:outline-medium",
          // state-on:disabled
          "state-on:disabled:bg-strong state-on:disabled:!border-heavy",
        ],
        danger: [
          // focus-visible
          "focus-visible:outline-red-600",
          // state-on
          "state-on:bg-red-600 state-on:shadow-component-error-default",
          // state-on:hover
          "state-on:hover:bg-red-500 state-on:hover:shadow-component-error-hover",
          // state-on:active
          "state-on:active:bg-red-500 state-on:active:shadow-component-error-hover",
          // state-on:focus-visible
          "state-on:focus-visible:bg-red-600 state-on:focus-visible:outline-error-strongest state-on:focus-visible:shadow-component-error-focused",
        ],
        success: [
          // focus-visible
          "focus-visible:outline-green-600",
          // state-on
          "state-on:bg-green-600 state-on:shadow-component-success-default",
          // state-on:hover
          "state-on:hover:bg-green-500 state-on:hover:shadow-component-success-hover",
          // state-on:active
          "state-on:active:bg-green-500 state-on:active:shadow-component-success-hover",
          // state-on:focus-visible
          "state-on:focus-visible:bg-green-600 state-on:focus-visible:outline-success-strongest state-on:focus-visible:shadow-component-success-focused",
        ],
        info: [
          // focus-visible
          "focus-visible:outline-blue-600",
          // state-on
          "state-on:bg-blue-600 state-on:shadow-component-info-default",
          // state-on:hover
          "state-on:hover:bg-blue-500 state-on:hover:shadow-component-info-hover",
          // state-on:active
          "state-on:active:bg-blue-500 state-on:active:shadow-component-info-hover",
          // state-on:focus-visible
          "state-on:focus-visible:bg-blue-600 state-on:focus-visible:outline-info-strongest state-on:focus-visible:shadow-component-info-focused",
        ],
      },
      size: {
        xs: "size-4 [&_svg]:size-3! border-1",
        sm: "size-5 [&_svg]:size-4! border-[1.5px]",
        md: "size-6 [&_svg]:size-5! border-2",
      },
      shape: {
        rounded: "",
        pill: "rounded-[50%]",
        square: "rounded-none",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "md", className: "rounded-[8px]" },
      { shape: "rounded", size: "sm", className: "rounded-[6px]" },
      { shape: "rounded", size: "xs", className: "rounded-[4px]" },
      { variant: "primary", className: "state-on:text-white" },
      { variant: "neutral", className: "state-on:text-static-white" },
      { variant: "inverse", className: "state-on:text-strongest" },
      { variant: "danger", className: "state-on:text-white" },
      { variant: "success", className: "state-on:text-white" },
      { variant: "info", className: "state-on:text-white" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "sm",
      shape: "rounded",
    },
  }
)

type CheckboxVariant = NonNullable<
  VariantProps<typeof checkboxVariants>["variant"]
>
type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>
type CheckboxShape = NonNullable<VariantProps<typeof checkboxVariants>["shape"]>

type CheckboxContextValue = {
  variant?: CheckboxVariant
  size?: CheckboxSize
  shape?: CheckboxShape
}

const CheckboxContext = React.createContext<CheckboxContextValue | null>(null)

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>

function Checkbox({
  className,
  variant,
  size,
  shape,
  ...props
}: CheckboxProps) {
  const ctx = React.useContext(CheckboxContext)
  const resolvedVariant = variant ?? ctx?.variant ?? "primary"
  const resolvedSize = size ?? ctx?.size ?? "sm"
  const resolvedShape = shape ?? ctx?.shape ?? "rounded"
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-shape={resolvedShape}
      className={cn(
        checkboxVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          shape: resolvedShape,
          className,
        })
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="col-start-1 row-start-1 group-data-[state=indeterminate]:hidden"
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            pathLength={1}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            className="transition-[stroke-dashoffset] duration-300 ease-out [stroke-dashoffset:1] group-data-[state=checked]:[stroke-dashoffset:0] motion-reduce:transition-none"
          />
        </svg>
        <RiSubtractFill className="col-start-1 row-start-1 hidden group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, CheckboxContext, checkboxVariants }
export type {
  CheckboxContextValue,
  CheckboxVariant,
  CheckboxSize,
  CheckboxShape,
}
