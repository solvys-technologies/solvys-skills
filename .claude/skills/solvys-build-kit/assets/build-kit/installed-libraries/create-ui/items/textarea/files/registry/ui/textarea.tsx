"use client"

import * as React from "react"
import { RiErrorWarningLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { useOptionalFieldContext } from "@/registry/ui/field"
import { Spinner, type SpinnerProps } from "@/registry/ui/spinner"

type TextareaSize = "xs" | "sm" | "md"

const textareaVariants = cva(
  [
    // base
    "flex min-h-[132px] w-full resize-none border border-weak outline-2 outline-transparent outline-offset-0 bg-static font-medium text-body shadow-neutral-xs",
    // transition
    "transition-colors",
    // placeholder
    "placeholder:text-placeholder",
    // hover
    "hover:bg-weakest",
    // focus-within
    "focus-within:outline-light focus-within:border-heavy",
    // focus-visible
    "focus-visible:outline-light focus-visible:border-heavy",
    // disabled
    "disabled:cursor-not-allowed disabled:bg-weakest disabled:text-disabled disabled:placeholder:text-disabled",
    // aria-[invalid=true]
    "aria-[invalid=true]:border-error-base aria-[invalid=true]:outline-error-weak aria-[invalid=true]:text-error-base aria-[invalid=true]:placeholder:text-error-base",
    // aria-[invalid=true]:hover
    "aria-[invalid=true]:hover:bg-static",
    // data-[loading]
    "data-[loading]:pointer-events-none data-[loading]:border-info-base data-[loading]:outline-info-weak data-[loading]:text-disabled data-[loading]:placeholder:text-disabled data-[loading]:bg-weakest",
  ],
  {
    variants: {
      size: {
        xs: "p-3 text-ui-control-md rounded-lg shadow-neutral-2xs",
        sm: "p-3 text-ui-control-lg rounded-xl",
        md: "p-3 text-ui-control-xl rounded-2xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function TextareaResizerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="10"
        x2="10"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="10"
        x2="10"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const resizeClassMap = {
  x: "resize-x",
  y: "resize-y",
  both: "resize",
} as const

const SPINNER_SIZE: Record<TextareaSize, SpinnerProps["size"]> = {
  xs: "sm",
  sm: "md",
  md: "lg",
}

const INVALID_ICON_SIZE: Record<TextareaSize, string> = {
  xs: "size-4",
  sm: "size-4",
  md: "size-4",
}

function Textarea({
  className,
  size,
  resizable,
  loading: loadingProp,
  "aria-invalid": ariaInvalidProp,
  disabled: disabledProp,
  readOnly,
  ...props
}: Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaVariants> & {
    resizable?: "x" | "y" | "both"
    loading?: boolean
  }) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedSize: TextareaSize =
    (size as TextareaSize | undefined) ??
    (fieldCtx?.size as TextareaSize | undefined) ??
    "sm"
  const resolvedLoading = loadingProp ?? fieldCtx?.loading ?? false
  const resolvedDisabled = disabledProp ?? fieldCtx?.disabled
  const resolvedInvalid =
    ariaInvalidProp === true ||
    ariaInvalidProp === "true" ||
    fieldCtx?.invalid ||
    false

  const showStatusIcon = resolvedLoading || resolvedInvalid

  const textarea = (
    <textarea
      data-slot="textarea"
      data-size={resolvedSize}
      data-loading={resolvedLoading || undefined}
      aria-invalid={resolvedInvalid || undefined}
      aria-busy={resolvedLoading || undefined}
      disabled={resolvedDisabled}
      readOnly={resolvedLoading || readOnly || undefined}
      className={cn(
        textareaVariants({ size: resolvedSize }),
        resizable &&
          `${resizeClassMap[resizable]} col-start-1 row-start-1 [&::-webkit-resizer]:hidden`,
        className
      )}
      {...props}
    />
  )

  if (!resizable && !showStatusIcon) return textarea

  return (
    <div
      data-slot="textarea-wrapper"
      className={cn("relative w-full", resizable && "grid")}
    >
      {textarea}
      {showStatusIcon && (
        <span
          aria-hidden="true"
          data-slot="textarea-status-icon"
          className={cn(
            "pointer-events-none absolute bottom-3 left-3 z-[1] flex items-center justify-center",
            !resolvedLoading &&
              cn(
                "text-error-base [&_svg]:size-full",
                INVALID_ICON_SIZE[resolvedSize]
              )
          )}
        >
          {resolvedLoading ? (
            <Spinner variant="info" size={SPINNER_SIZE[resolvedSize]} />
          ) : (
            <RiErrorWarningLine />
          )}
        </span>
      )}
      {resizable && (
        <span className="pointer-events-none z-[1] col-start-1 row-start-1 self-end justify-self-end p-3">
          <TextareaResizerIcon className="text-placeholder" />
        </span>
      )}
    </div>
  )
}

export { Textarea, textareaVariants }
