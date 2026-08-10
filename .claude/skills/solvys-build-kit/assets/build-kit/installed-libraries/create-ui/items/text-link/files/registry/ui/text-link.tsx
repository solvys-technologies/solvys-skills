import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const textLinkVariants = cva(
  [
    // base
    "group inline-flex items-center font-body outline outline-transparent no-underline cursor-pointer",
    // transition
    "transition-colors",
    // hover
    "hover:no-underline",
    // aria-invalid
    "aria-invalid:outline-error-base aria-invalid:text-error-base",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          // base
          "text-primary-base",
          // hover
          "hover:text-primary-strong",
          // active
          "active:text-primary-strong",
          // focus-visible
          "focus-visible:outline-primary-base",
        ],
        neutral: [
          // base
          "text-body",
          // hover
          "hover:text-strongest",
          // active
          "active:text-strongest",
          // focus-visible
          "focus-visible:outline-stable-base",
        ],
        inverse: [
          // base
          "text-static",
          // hover
          "hover:text-disabled",
          // active
          "active:text-disabled",
          // focus-visible
          "focus-visible:text-disabled focus-visible:outline-stable-base",
        ],
        danger: [
          // base
          "text-error-base",
          // hover
          "hover:text-error-strong",
          // active
          "active:text-error-strong",
          // focus-visible
          "focus-visible:outline-error-base",
        ],
        success: [
          // base
          "text-success-base",
          // hover
          "hover:text-success-strong",
          // active
          "active:text-success-strong",
          // focus-visible
          "focus-visible:outline-success-base",
        ],
        info: [
          // base
          "text-info-base",
          // hover
          "hover:text-info-strong",
          // active
          "active:text-info-strong",
          // focus-visible
          "focus-visible:outline-info-base",
        ],
      },
      size: {
        xs: "rounded-sm text-paragraph-xs [&>[data-slot=text-link-content]]:px-0.5 [&_[data-slot=text-link-icon]_svg]:size-3.5",
        sm: "rounded-md text-paragraph-sm [&>[data-slot=text-link-content]]:px-0.5 [&_[data-slot=text-link-icon]_svg]:size-4",
        md: "rounded-md text-paragraph-md [&>[data-slot=text-link-content]]:px-1 [&_[data-slot=text-link-icon]_svg]:size-4.5",
        lg: "rounded-lg text-paragraph-lg [&>[data-slot=text-link-content]]:px-1.5 [&_[data-slot=text-link-icon]_svg]:size-5",
      },
      visited: {
        true: "text-purple-500",
        false: "",
      },
      disabled: {
        true: "pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        disabled: true,
        variant: "inverse",
        className: "text-body",
      },
      {
        disabled: true,
        variant: ["primary", "neutral", "danger", "success", "info"],
        className: "text-disabled",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "xs",
      visited: false,
      disabled: false,
    },
  }
)

const textLinkUnderlineVariants = cva(
  [
    // base
    "absolute right-0 bottom-0 left-0 h-px",
    // group-invalid
    "group-aria-invalid:bg-error-weak",
    // transition
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        primary: [
          // base
          "bg-primary-weak",
          // group-hover
          "group-hover:bg-primary-strong",
          // group-active
          "group-active:bg-primary-strong",
        ],
        neutral: [
          // base
          "bg-stable-strongest",
          // group-hover
          "group-hover:bg-strongest",
          // group-active
          "group-active:bg-strongest",
          // group-focus-visible
          "group-focus-visible:bg-stable-base",
        ],
        inverse: [
          // base
          "bg-stable-weak",
          // group-hover
          "group-hover:bg-stable-weakest",
          // group-active
          "group-active:bg-stable-weakest",
        ],
        danger: [
          // base
          "bg-error-weak",
          // group-hover
          "group-hover:bg-error-strong",
          // group-active
          "group-active:bg-error-strong",
        ],
        success: [
          // base
          "bg-success-weak",
          // group-hover
          "group-hover:bg-success-strong",
          // group-active
          "group-active:bg-success-strong",
        ],
        info: [
          // base
          "bg-info-weak",
          // group-hover
          "group-hover:bg-info-strong",
          // group-active
          "group-active:bg-info-strong",
        ],
      },
      visited: { true: "", false: "" },
      disabled: { true: "", false: "" },
    },
    compoundVariants: [
      {
        visited: true,
        disabled: false,
        className: "bg-violet-alpha-32",
      },
      {
        disabled: true,
        variant: "inverse",
        className: [
          // base
          "bg-body",
          // group-hover
          "group-hover:bg-body",
          // group-active
          "group-active:bg-body",
        ],
      },
      {
        disabled: true,
        variant: ["primary", "neutral", "danger", "success", "info"],
        className: [
          // base
          "bg-disabled",
          // group-hover
          "group-hover:bg-disabled",
          // group-active
          "group-active:bg-disabled",
        ],
      },
    ],
    defaultVariants: {
      variant: "primary",
      visited: false,
      disabled: false,
    },
  }
)

type TextLinkProps = Omit<React.ComponentProps<"a">, "color"> &
  VariantProps<typeof textLinkVariants> & {
    asChild?: boolean
    leading?: React.ReactNode
    trailing?: React.ReactNode
    underline?: boolean
    visited?: boolean
    disabled?: boolean
  }

function TextLink({
  className,
  variant = "primary",
  size = "xs",
  leading,
  trailing,
  underline = false,
  visited = false,
  disabled = false,
  asChild = false,
  children,
  ...props
}: TextLinkProps) {
  const Comp = asChild ? Slot.Root : "a"

  const slot =
    asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
      ? children
      : null
  const labelContent = slot ? slot.props.children : children

  const content = (
    <>
      {leading && <span data-slot="text-link-icon">{leading}</span>}
      <span
        data-slot="text-link-content"
        className="relative inline-flex items-center whitespace-nowrap"
      >
        {labelContent}
        {underline && (
          <span
            data-slot="text-link-underline"
            className={cn(
              textLinkUnderlineVariants({ variant, visited, disabled })
            )}
          />
        )}
      </span>
      {trailing && <span data-slot="text-link-icon">{trailing}</span>}
    </>
  )

  const inner = slot ? React.cloneElement(slot, undefined, content) : content

  return (
    <Comp
      data-slot="text-link"
      data-variant={variant}
      data-size={size}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      className={cn(
        textLinkVariants({ variant, size, visited, disabled, className })
      )}
      {...props}
    >
      {inner}
    </Comp>
  )
}

export { TextLink, textLinkVariants }
