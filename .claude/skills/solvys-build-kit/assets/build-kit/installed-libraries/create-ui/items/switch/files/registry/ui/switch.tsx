"use client"

import * as React from "react"
import { RiCheckFill, RiCloseLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const trackVariants = cva(
  [
    // base
    "group/switch peer relative inline-flex shrink-0 items-center overflow-clip p-0.5 outline-2 outline-transparent outline-offset-1 cursor-pointer",
    // transition
    "transition-colors",
    // after
    "after:absolute after:-inset-x-3 after:-inset-y-2",
    // aria-invalid
    "aria-invalid:outline-red-600 aria-invalid:bg-red-600 aria-invalid:data-[state=checked]:bg-red-600",
    // disabled
    "disabled:cursor-not-allowed disabled:bg-weak",
    // data-[state=checked]:disabled
    "data-[state=checked]:disabled:bg-weak",
  ],
  {
    variants: {
      variant: {
        primary: [
          // base
          "bg-light",
          // hover
          "hover:bg-medium",
          // active
          "active:bg-medium",
          // focus-visible
          "focus-visible:outline-primary-500",
          // data-[state=checked]
          "data-[state=checked]:bg-primary-500",
          // data-[state=checked]:hover
          "data-[state=checked]:hover:bg-primary-600",
          // data-[state=checked]:active
          "data-[state=checked]:active:bg-primary-600",
        ],
        info: [
          // base
          "bg-light",
          // hover
          "hover:bg-medium",
          // active
          "active:bg-medium",
          // focus-visible
          "focus-visible:outline-blue-600",
          // data-[state=checked]
          "data-[state=checked]:bg-blue-600",
          // data-[state=checked]:hover
          "data-[state=checked]:hover:bg-blue-500",
          // data-[state=checked]:active
          "data-[state=checked]:active:bg-blue-500",
        ],
        neutral: [
          // base
          "bg-light",
          // hover
          "hover:bg-medium",
          // active
          "active:bg-medium",
          // focus-visible
          "focus-visible:outline-strong",
          // data-[state=checked]
          "data-[state=checked]:bg-strong",
          // data-[state=checked]:hover
          "data-[state=checked]:hover:bg-strongest",
          // data-[state=checked]:active
          "data-[state=checked]:active:bg-strongest",
        ],
        inverse: [
          // base
          "bg-strong",
          // hover
          "hover:bg-heavy",
          // active
          "active:bg-heavy",
          // focus-visible
          "focus-visible:outline-weakest",
          // disabled
          "disabled:bg-strong",
          // data-[state=checked]
          "data-[state=checked]:bg-weakest",
          // data-[state=checked]:hover
          "data-[state=checked]:hover:bg-weak",
          // data-[state=checked]:active
          "data-[state=checked]:active:bg-weak",
          // data-[state=checked]:disabled
          "data-[state=checked]:disabled:bg-strong",
        ],
        semantic: [
          // base
          "bg-red-600",
          // hover
          "hover:bg-red-400",
          // active
          "active:bg-red-500",
          // focus-visible
          "focus-visible:outline-red-600",
          // data-[state=checked]
          "data-[state=checked]:bg-green-600",
          // data-[state=checked]:hover
          "data-[state=checked]:hover:bg-green-500",
          // data-[state=checked]:active
          "data-[state=checked]:active:bg-green-500",
          // data-[state=checked]:focus-visible
          "data-[state=checked]:focus-visible:outline-green-600",
        ],
      },
      size: {
        md: "h-6",
        sm: "h-5",
        xs: "h-4",
      },
      shape: {
        pill: "rounded-full",
        rounded: "",
      },
      thumbType: {
        short: "",
        long: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "md", class: "rounded-lg" },
      { shape: "rounded", size: "sm", class: "rounded-md" },
      { shape: "rounded", size: "xs", class: "rounded-sm" },
      { thumbType: "short", size: "md", class: "w-[46px]" },
      { thumbType: "short", size: "sm", class: "w-[38px]" },
      { thumbType: "short", size: "xs", class: "w-[30px]" },
      { thumbType: "long", size: "md", class: "w-[54px]" },
      { thumbType: "long", size: "sm", class: "w-[46px]" },
      { thumbType: "long", size: "xs", class: "w-[38px]" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "sm",
      shape: "pill",
      thumbType: "short",
    },
  }
)

const thumbVariants = cva(
  [
    // base
    "pointer-events-none relative block shadow-neutral-xs ring-0",
    // transition
    "transition-transform",
    // group-disabled
    "group-disabled/switch:shadow-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          // base
          "bg-white",
          // group-disabled
          "group-disabled/switch:bg-disabled!",
        ],
        info: [
          // base
          "bg-white",
          // group-disabled
          "group-disabled/switch:bg-disabled!",
        ],
        neutral: [
          // base
          "bg-static-white",
          // group-disabled
          "group-disabled/switch:bg-disabled!",
        ],
        inverse: [
          // base
          "bg-static-black",
          // group-disabled
          "group-disabled/switch:bg-body!",
        ],
        semantic: [
          // base
          "bg-white",
          // group-disabled
          "group-disabled/switch:bg-disabled!",
        ],
      },
      size: {
        md: [
          // data-[state=checked]
          "data-[state=checked]:translate-x-[22px]",
          // data-[state=unchecked]
          "data-[state=unchecked]:translate-x-0",
        ],
        sm: [
          // data-[state=checked]
          "data-[state=checked]:translate-x-[18px]",
          // data-[state=unchecked]
          "data-[state=unchecked]:translate-x-0",
        ],
        xs: [
          // data-[state=checked]
          "data-[state=checked]:translate-x-[14px]",
          // data-[state=unchecked]
          "data-[state=unchecked]:translate-x-0",
        ],
      },
      shape: {
        pill: "rounded-full",
        rounded: "",
      },
      thumbType: {
        short: "",
        long: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "md", class: "rounded-md" },
      { shape: "rounded", size: "sm", class: "rounded-sm" },
      { shape: "rounded", size: "xs", class: "rounded-xs" },
      { thumbType: "short", size: "md", class: "size-5" },
      { thumbType: "short", size: "sm", class: "size-4" },
      { thumbType: "short", size: "xs", class: "size-3" },
      { thumbType: "long", size: "md", class: "h-5 w-7" },
      { thumbType: "long", size: "sm", class: "h-4 w-6" },
      { thumbType: "long", size: "xs", class: "h-3 w-5" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "sm",
      shape: "pill",
      thumbType: "short",
    },
  }
)

const ioAreaVariants = cva(
  "pointer-events-none absolute inset-y-0 flex items-center justify-center transition-opacity",
  {
    variants: {
      size: {
        md: "w-5",
        sm: "w-4",
        xs: "w-3",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

const ioLineVariants = cva("w-px", {
  variants: {
    variant: {
      primary: [
        // base
        "bg-neutral-50",
        // group-disabled
        "group-disabled/switch:bg-disabled",
      ],
      info: [
        // base
        "bg-neutral-50",
        // group-disabled
        "group-disabled/switch:bg-disabled",
      ],
      neutral: [
        // base
        "bg-static-white",
        // group-disabled
        "group-disabled/switch:bg-disabled",
      ],
      inverse: [
        // base
        "bg-static-black",
        // group-disabled
        "group-disabled/switch:bg-body",
      ],
      semantic: [
        // base
        "bg-white",
        // group-disabled
        "group-disabled/switch:bg-disabled",
      ],
    },
    size: {
      md: "h-2",
      sm: "h-2",
      xs: "h-1.5",
    },
  },
  defaultVariants: { variant: "primary", size: "sm" },
})

const ioCircleVariants = cva("size-2!", {
  variants: {
    variant: {
      primary: [
        // base
        "text-placeholder",
        // group-hover
        "group-hover/switch:text-body",
        // group-active
        "group-active/switch:text-body",
        // group-disabled
        "group-disabled/switch:text-disabled",
      ],
      info: [
        // base
        "text-placeholder",
        // group-hover
        "group-hover/switch:text-body",
        // group-active
        "group-active/switch:text-body",
        // group-disabled
        "group-disabled/switch:text-disabled",
      ],
      neutral: [
        // base
        "text-placeholder",
        // group-hover
        "group-hover/switch:text-body",
        // group-active
        "group-active/switch:text-body",
        // group-disabled
        "group-disabled/switch:text-disabled",
      ],
      inverse: [
        // base
        "text-placeholder",
        // group-hover
        "group-hover/switch:text-placeholder",
        // group-active
        "group-active/switch:text-placeholder",
        // group-disabled
        "group-disabled/switch:text-body",
      ],
      semantic: [
        // base
        "text-white",
        // group-hover
        "group-hover/switch:text-white",
        // group-active
        "group-active/switch:text-white",
        // group-disabled
        "group-disabled/switch:text-disabled",
      ],
    },
  },
  defaultVariants: { variant: "primary" },
})

const thumbIconBaseVariants = cva(
  "pointer-events-none absolute inset-0 m-auto transition-opacity",
  {
    variants: {
      size: {
        md: "size-3!",
        sm: "size-2.5!",
        xs: "size-2!",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

const checkIconVariants = cva("group-disabled/switch:text-placeholder", {
  variants: {
    variant: {
      primary: [
        // base
        "text-primary-500",
        // group-hover
        "group-hover/switch:text-primary-600",
        // group-active
        "group-active/switch:text-primary-600",
      ],
      info: [
        // base
        "text-blue-600",
        // group-hover
        "group-hover/switch:text-blue-400",
        // group-active
        "group-active/switch:text-blue-400",
      ],
      neutral: [
        // base
        "text-strong",
        // group-hover
        "group-hover/switch:text-strongest",
        // group-active
        "group-active/switch:text-strongest",
      ],
      inverse: [
        // base
        "text-weakest",
        // group-hover
        "group-hover/switch:text-weak",
        // group-active
        "group-active/switch:text-weak",
      ],
      semantic: [
        // base
        "text-green-600",
        // group-hover
        "group-hover/switch:text-green-500",
        // group-active
        "group-active/switch:text-green-500",
      ],
    },
  },
  defaultVariants: { variant: "primary" },
})

const closeIconVariants = cva("", {
  variants: {
    variant: {
      primary: "text-placeholder",
      info: "text-placeholder",
      neutral: "text-placeholder",
      inverse: "text-placeholder",
      semantic: [
        // base
        "text-red-600",
        // group-hover
        "group-hover/switch:text-red-400",
        // group-active
        "group-active/switch:text-red-400",
        // group-disabled
        "group-disabled/switch:text-placeholder",
      ],
    },
  },
  defaultVariants: { variant: "primary" },
})

type SwitchVariantProps = VariantProps<typeof trackVariants>
type SwitchVariant = NonNullable<SwitchVariantProps["variant"]>
type SwitchSize = NonNullable<SwitchVariantProps["size"]>
type SwitchShape = NonNullable<SwitchVariantProps["shape"]>
type SwitchThumbType = NonNullable<SwitchVariantProps["thumbType"]>

type Variant = SwitchVariant
type Size = SwitchSize
type Shape = SwitchShape
type ThumbType = SwitchThumbType

type SwitchContextValue = {
  variant?: SwitchVariant
  size?: SwitchSize
  shape?: SwitchShape
  thumbType?: SwitchThumbType
  ioTrigger?: boolean
  thumbIcon?: boolean
}

const SwitchContext = React.createContext<SwitchContextValue | null>(null)

function switchVariants({
  variant,
  size = "sm",
  shape = "pill",
  thumbType = "short",
  className,
}: {
  variant?: Variant
  size?: Size
  shape?: Shape
  thumbType?: ThumbType
  className?: string
}) {
  return cn(trackVariants({ variant, size, shape, thumbType }), className)
}

function IOTrigger({ variant, size }: { variant: Variant; size: Size }) {
  return (
    <>
      <span
        aria-hidden="true"
        data-slot="switch-io"
        className={cn(
          ioAreaVariants({ size }),
          "left-0.5 opacity-0 group-data-[state=checked]/switch:opacity-100"
        )}
      >
        <span className={ioLineVariants({ variant, size })} />
      </span>
      <span
        aria-hidden="true"
        data-slot="switch-io"
        className={cn(
          ioAreaVariants({ size }),
          "right-0.5 opacity-0 group-data-[state=unchecked]/switch:opacity-100"
        )}
      >
        <svg
          viewBox="0 0 8 8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(ioCircleVariants({ variant }))}
        >
          <path d="M4 7C2.34667 7 1 5.65333 1 4C1 2.34667 2.34667 1 4 1C5.65333 1 7 2.34667 7 4C7 5.65333 5.65333 7 4 7ZM4 1.66667C2.71333 1.66667 1.66667 2.71333 1.66667 4C1.66667 5.28667 2.71333 6.33333 4 6.33333C5.28667 6.33333 6.33333 5.28667 6.33333 4C6.33333 2.71333 5.28667 1.66667 4 1.66667Z" />
        </svg>
      </span>
    </>
  )
}

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  variant?: Variant
  size?: Size
  shape?: Shape
  thumbType?: ThumbType
  ioTrigger?: boolean
  thumbIcon?: boolean
}

function Switch({
  className,
  variant,
  size,
  shape,
  thumbType,
  ioTrigger,
  thumbIcon,
  ...props
}: SwitchProps) {
  const ctx = React.useContext(SwitchContext)
  const resolvedVariant: Variant = variant ?? ctx?.variant ?? "primary"
  const resolvedSize: Size = size ?? ctx?.size ?? "sm"
  const resolvedShape: Shape = shape ?? ctx?.shape ?? "pill"
  const resolvedThumbType: ThumbType = thumbType ?? ctx?.thumbType ?? "short"
  const resolvedIoTrigger = ioTrigger ?? ctx?.ioTrigger ?? false
  const resolvedThumbIcon = thumbIcon ?? ctx?.thumbIcon ?? false

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-shape={resolvedShape}
      data-thumb-type={resolvedThumbType}
      className={switchVariants({
        variant: resolvedVariant,
        size: resolvedSize,
        shape: resolvedShape,
        thumbType: resolvedThumbType,
        className,
      })}
      {...props}
    >
      {resolvedIoTrigger && (
        <IOTrigger variant={resolvedVariant} size={resolvedSize} />
      )}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={thumbVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          shape: resolvedShape,
          thumbType: resolvedThumbType,
        })}
      >
        {resolvedThumbIcon && (
          <>
            <RiCheckFill
              aria-hidden="true"
              data-slot="switch-thumb-icon"
              className={cn(
                thumbIconBaseVariants({ size: resolvedSize }),
                checkIconVariants({ variant: resolvedVariant }),
                "opacity-0 group-data-[state=checked]/switch:opacity-100"
              )}
            />
            <RiCloseLine
              aria-hidden="true"
              data-slot="switch-thumb-icon"
              className={cn(
                thumbIconBaseVariants({ size: resolvedSize }),
                closeIconVariants({ variant: resolvedVariant }),
                "opacity-0 group-data-[state=unchecked]/switch:opacity-100"
              )}
            />
          </>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch, SwitchContext, switchVariants }
export type {
  SwitchContextValue,
  SwitchVariant,
  SwitchSize,
  SwitchShape,
  SwitchThumbType,
}
