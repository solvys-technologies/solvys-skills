"use client"

import * as React from "react"
import { RiCloseLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

const chipVariants = cva(
  [
    // base
    "group inline-flex w-fit items-center justify-center !font-semibold whitespace-nowrap select-none",
    // transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "",
        info: "",
        danger: "",
        success: "",
      },
      appearance: {
        outline: "bg-static border",
        soft: "",
      },
      size: {
        xs:
          "h-4 px-1 gap-0.5 text-ui-control-xs " +
          "[&_[data-slot=chip-lead]>svg]:size-3 " +
          "[&_[data-slot=chip-lead]_[data-slot=avatar]]:size-3 " +
          "[&_[data-slot=chip-close]_svg]:size-3",
        sm:
          "h-5 px-1.5 gap-0.5 text-ui-control-xs " +
          "[&_[data-slot=chip-lead]>svg]:size-3 " +
          "[&_[data-slot=chip-lead]_[data-slot=avatar]]:size-3 " +
          "[&_[data-slot=chip-close]_svg]:size-3",
        md:
          "h-6 px-1.5 gap-0.5 text-ui-control-sm " +
          "[&_[data-slot=chip-lead]>svg]:size-4 " +
          "[&_[data-slot=chip-lead]_[data-slot=avatar]]:size-4 " +
          "[&_[data-slot=chip-close]_svg]:size-3",
        lg:
          "h-7 px-2 gap-1 text-ui-control-md " +
          "[&_[data-slot=chip-lead]>svg]:size-5 " +
          "[&_[data-slot=chip-lead]_[data-slot=avatar]]:size-5 " +
          "[&_[data-slot=chip-close]_svg]:size-4",
        xl:
          "h-9 px-2.5 gap-1 text-ui-control-xl " +
          "[&_[data-slot=chip-lead]>svg]:size-6 " +
          "[&_[data-slot=chip-lead]_[data-slot=avatar]]:size-6 " +
          "[&_[data-slot=chip-close]_svg]:size-5",
      },
      shape: {
        pill: "rounded-full",
        rounded: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-md" },
      { shape: "rounded", size: "sm", className: "rounded-md" },
      { shape: "rounded", size: "md", className: "rounded-md" },
      { shape: "rounded", size: "lg", className: "rounded-lg" },
      { shape: "rounded", size: "xl", className: "rounded-lg" },
      {
        variant: "neutral",
        appearance: "outline",
        className: [
          // base
          "bg-static border-medium text-body",
          // hover
          "hover:bg-weak hover:border-strongest",
          // data-[selected]
          "data-[selected]:bg-weak data-[selected]:border-strongest data-[selected]:text-strongest",
          // data-[dragging]
          "data-[dragging]:border-strongest",
        ],
      },
      {
        variant: "info",
        appearance: "outline",
        className: [
          // base
          "bg-static border-info-weak text-info-base",
          // hover
          "hover:bg-info-weakest",
          // data-[selected]
          "data-[selected]:border-info-base data-[selected]:bg-info-weakest",
        ],
      },
      {
        variant: "danger",
        appearance: "outline",
        className: [
          // base
          "bg-static border-error-weak text-error-base",
          // hover
          "hover:bg-error-weakest",
          // data-[selected]
          "data-[selected]:border-error-base data-[selected]:bg-error-weakest",
        ],
      },
      {
        variant: "success",
        appearance: "outline",
        className: [
          // base
          "bg-static border-success-weak text-success-base",
          // hover
          "hover:bg-success-weakest",
          // data-[selected]
          "data-[selected]:border-success-base data-[selected]:bg-success-weakest",
        ],
      },
      {
        variant: "info",
        className: [
          // focus-visible
          "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600",
          // chip-close
          "[&:not([aria-disabled])_[data-slot=chip-close]]:text-info-base",
        ],
      },
      {
        variant: "danger",
        className: [
          // focus-visible
          "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-600",
          // chip-close
          "[&:not([aria-disabled])_[data-slot=chip-close]]:text-error-base",
        ],
      },
      {
        variant: "success",
        className: [
          // focus-visible
          "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-600",
          // chip-close
          "[&:not([aria-disabled])_[data-slot=chip-close]]:text-success-base",
        ],
      },
      {
        variant: "neutral",
        className: [
          // focus-visible
          "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-strong",
          // chip-close
          "[&:not([aria-disabled])_[data-slot=chip-close]]:text-placeholder",
        ],
      },
      {
        variant: "neutral",
        appearance: "soft",
        className: [
          // base
          "bg-weak text-body",
          // hover
          "hover:bg-light",
          // data-[selected]
          "data-[selected]:bg-strongest data-[selected]:text-static",
          // data-[dragging]
          "data-[dragging]:bg-static",
        ],
      },
      {
        variant: "info",
        appearance: "soft",
        className: [
          // base
          "bg-info-weakest text-info-base",
          // hover
          "hover:bg-info-weak",
          // data-[selected]
          "data-[selected]:bg-blue-600 data-[selected]:text-white data-[selected]:[&:not([aria-disabled])_[data-slot=chip-close]]:text-white",
        ],
      },
      {
        variant: "danger",
        appearance: "soft",
        className: [
          // base
          "bg-error-weakest text-error-base",
          // hover
          "hover:bg-error-weak",
          // data-[selected]
          "data-[selected]:bg-red-600 data-[selected]:text-white data-[selected]:[&:not([aria-disabled])_[data-slot=chip-close]]:text-white",
        ],
      },
      {
        variant: "success",
        appearance: "soft",
        className: [
          // base
          "bg-success-weakest text-success-base",
          // hover
          "hover:bg-success-weak",
          // data-[selected]
          "data-[selected]:bg-green-600 data-[selected]:text-white data-[selected]:[&:not([aria-disabled])_[data-slot=chip-close]]:text-white",
        ],
      },
    ],
    defaultVariants: {
      variant: "neutral",
      appearance: "outline",
      size: "lg",
      shape: "rounded",
    },
  }
)

const mediaPaddingMap: Record<
  NonNullable<VariantProps<typeof chipVariants>["size"]>,
  string
> = {
  xs: "p-0.5",
  sm: "p-1",
  md: "p-1",
  lg: "p-1",
  xl: "p-1.5",
}

function isChipLead(node: React.ReactNode): boolean {
  return React.isValidElement(node)
}

function isMediaLead(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false
  const type = (node as React.ReactElement).type
  if (typeof type === "object" && type !== null) return true
  if (
    typeof type === "function" &&
    (type as { displayName?: string }).displayName === "Avatar"
  ) {
    return true
  }
  return false
}

type ChipProps = React.ComponentProps<"div"> &
  VariantProps<typeof chipVariants> & {
    selected?: boolean
    disabled?: boolean
    dragging?: boolean
    onClose?: (e: React.MouseEvent) => void
    closable?: boolean
  }

function Chip({
  className,
  variant = "neutral",
  appearance = "outline",
  size = "lg",
  shape = "rounded",
  selected = false,
  disabled = false,
  dragging = false,
  closable,
  onClose,
  children,
  onClick,
  ...props
}: ChipProps) {
  const showClose = closable ?? !!onClose

  const childArray = React.Children.toArray(children)
  const leadIndex = childArray.findIndex(isChipLead)
  const leadElement = leadIndex >= 0 ? childArray[leadIndex] : null
  const labelChildren =
    leadIndex >= 0
      ? [...childArray.slice(0, leadIndex), ...childArray.slice(leadIndex + 1)]
      : childArray
  const isMedia = isMediaLead(leadElement)

  return (
    <div
      data-slot="chip"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      data-selected={selected || undefined}
      data-dragging={dragging || undefined}
      aria-disabled={disabled || undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? (disabled ? -1 : 0) : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                e.currentTarget.click()
              }
            }
          : undefined
      }
      className={cn(
        chipVariants({ variant, appearance, size, shape, className }),
        isMedia && mediaPaddingMap[size ?? "lg"],
        dragging && !disabled && "shadow-neutral-md",
        disabled &&
          "bg-weak text-disabled pointer-events-none border-transparent",
        onClick && !disabled && "cursor-pointer"
      )}
      {...props}
    >
      {leadElement && (
        <span
          data-slot="chip-lead"
          className={cn(
            "inline-flex shrink-0 items-center justify-center",
            isMedia && "overflow-hidden",
            isMedia && shape === "pill" && "rounded-full"
          )}
        >
          {leadElement}
        </span>
      )}
      {labelChildren.length > 0 && (
        <span data-slot="chip-label" className="px-0.5">
          {labelChildren}
        </span>
      )}
      {showClose && (
        <span
          data-slot="chip-close"
          role="button"
          aria-label="Remove"
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          onPointerDown={(e) => {
            if (disabled) return
            e.stopPropagation()
          }}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              e.currentTarget.click()
            }
          }}
          onClick={(e) => {
            if (disabled) return
            e.stopPropagation()
            onClose?.(e)
          }}
          className="group-aria-disabled:text-disabled inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full"
        >
          <RiCloseLine />
        </span>
      )}
    </div>
  )
}

export { Chip, chipVariants }
