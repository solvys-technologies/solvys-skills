"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { Label, LabelDescription, type LabelSize } from "@/registry/ui/label"
import { Separator } from "@/registry/ui/separator"

type FieldSize = "xs" | "sm" | "md"
type FieldOrientation = "vertical" | "horizontal" | "responsive"

type FieldContextValue = {
  size: FieldSize
  invalid: boolean
  disabled: boolean
  loading: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldContext(): FieldContextValue {
  return (
    React.useContext(FieldContext) ?? {
      size: "sm",
      invalid: false,
      disabled: false,
      loading: false,
    }
  )
}

function useOptionalFieldContext(): FieldContextValue | null {
  return React.useContext(FieldContext)
}

const fieldVariants = cva("group/field flex w-full", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
    },
    orientation: {
      vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
      horizontal: [
        // base
        "flex-row items-center [&>[data-slot=field-label]]:flex-auto",
        // field-content alignment
        "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
      responsive: [
        // base (stacked)
        "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
        // @md (inline)
        "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
    },
  },
  compoundVariants: [
    { orientation: "vertical", size: "xs", class: "gap-1" },
    { orientation: "vertical", size: "sm", class: "gap-2" },
    { orientation: "vertical", size: "md", class: "gap-3" },
    { orientation: "horizontal", size: "xs", class: "gap-component-xs" },
    { orientation: "horizontal", size: "sm", class: "gap-1.5" },
    { orientation: "horizontal", size: "md", class: "gap-2" },
    { orientation: "responsive", size: "xs", class: "gap-1" },
    {
      orientation: "responsive",
      size: "sm",
      class: "gap-2 @md/field-group:gap-1.5",
    },
    {
      orientation: "responsive",
      size: "md",
      class: "gap-3 @md/field-group:gap-component-sm",
    },
  ],
  defaultVariants: {
    size: "sm",
    orientation: "vertical",
  },
})

type FieldProps = Omit<React.ComponentProps<"div">, "size"> &
  VariantProps<typeof fieldVariants> & {
    invalid?: boolean
    disabled?: boolean
    loading?: boolean
  }

function Field({
  className,
  size = "sm",
  orientation = "vertical",
  invalid,
  disabled,
  loading,
  ...props
}: FieldProps) {
  const dataInvalidAttr = (props as Record<string, unknown>)["data-invalid"]
  const dataDisabledAttr = (props as Record<string, unknown>)["data-disabled"]
  const dataLoadingAttr = (props as Record<string, unknown>)["data-loading"]
  const isInvalid =
    invalid ?? (dataInvalidAttr !== undefined && dataInvalidAttr !== false)
  const isDisabled =
    disabled ?? (dataDisabledAttr !== undefined && dataDisabledAttr !== false)
  const isLoading =
    loading ?? (dataLoadingAttr !== undefined && dataLoadingAttr !== false)

  const value = React.useMemo<FieldContextValue>(
    () => ({
      size: size ?? "sm",
      invalid: !!isInvalid,
      disabled: !!isDisabled,
      loading: !!isLoading,
    }),
    [size, isInvalid, isDisabled, isLoading]
  )

  return (
    <FieldContext.Provider value={value}>
      <div
        role="group"
        data-slot="field"
        data-size={size ?? "sm"}
        data-orientation={orientation}
        data-invalid={isInvalid ? true : undefined}
        data-disabled={isDisabled ? true : undefined}
        data-loading={isLoading ? true : undefined}
        className={cn(fieldVariants({ size, orientation }), className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

const fieldLegendVariants = cva("w-full font-semibold text-body", {
  variants: {
    variant: {
      legend: "text-ui-control-xl",
      label: "text-ui-control-md",
    },
  },
  defaultVariants: {
    variant: "legend",
  },
})

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(fieldLegendVariants({ variant }), className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-4",
        className
      )}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  const ctx = useOptionalFieldContext()
  const size = ctx?.size ?? "sm"
  return (
    <div
      data-slot="field-content"
      data-size={size}
      className={cn(
        // base
        "group/field-content my-auto flex flex-1 flex-col leading-snug",
        // data-size
        "data-[size=md]:gap-2 data-[size=sm]:gap-1.5 data-[size=xs]:gap-1",
        className
      )}
      {...props}
    />
  )
}

const fieldLabelVariants = cva(
  [
    // base
    "group/field-label peer/field-label flex w-fit",
    // disabled
    "group-data-[disabled=true]/field:cursor-not-allowed group-data-[disabled=true]/field:pointer-events-none",
    // nested field
    "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
)

type FieldLabelProps = React.ComponentProps<typeof Label>

function FieldLabel({ className, size, ...props }: FieldLabelProps) {
  const ctx = useFieldContext()
  const labelSize = size ?? (ctx.size as LabelSize)
  return (
    <Label
      data-slot="field-label"
      size={labelSize}
      className={cn(fieldLabelVariants(), className)}
      {...props}
    />
  )
}

const fieldTitleVariants = cva(
  "flex w-fit items-center gap-1 font-semibold text-body select-none group-data-[disabled=true]/field:cursor-not-allowed group-data-[disabled=true]/field:opacity-70",
  {
    variants: {
      size: {
        xs: "text-ui-control-sm",
        sm: "text-ui-control-sm",
        md: "text-ui-control-md",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

type FieldTitleProps = React.ComponentProps<"div"> &
  VariantProps<typeof fieldTitleVariants>

function FieldTitle({ className, size, ...props }: FieldTitleProps) {
  const ctx = useFieldContext()
  const resolved = size ?? ctx.size
  return (
    <div
      data-slot="field-label"
      data-size={resolved}
      className={cn(fieldTitleVariants({ size: resolved }), className)}
      {...props}
    />
  )
}

const fieldDescriptionVariants = cva(
  [
    // base
    "text-placeholder group-has-[[data-orientation=horizontal]]/field:text-balance",
    // link
    "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-base",
    // invalid / disabled
    "group-data-[invalid=true]/field:text-error-base group-data-[disabled=true]/field:text-disabled",
  ],
  {
    variants: {
      size: {
        xs: "text-ui-control-sm",
        sm: "text-ui-control-md",
        md: "text-ui-control-lg",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

type FieldDescriptionProps = React.ComponentProps<"p"> &
  VariantProps<typeof fieldDescriptionVariants>

function FieldDescription({
  className,
  size,
  ...props
}: FieldDescriptionProps) {
  const ctx = useFieldContext()
  const resolved = size ?? ctx.size
  return (
    <p
      data-slot="field-description"
      className={cn(
        fieldDescriptionVariants({ size: resolved }),
        "last:mt-0 nth-last-2:-mt-1",
        className
      )}
      {...props}
    />
  )
}

const fieldHelperVariants = cva(
  "flex w-full items-center font-medium group-data-[disabled=true]/field:text-disabled",
  {
    variants: {
      size: {
        xs: "gap-1 text-ui-control-sm [&_svg]:size-4",
        sm: "gap-1 text-ui-control-md [&_svg]:size-5",
        md: "gap-2 text-ui-control-lg [&_svg]:size-[22px]",
      },
      tone: {
        neutral: "text-placeholder",
        error: "text-error-base",
      },
    },
    defaultVariants: {
      size: "sm",
      tone: "neutral",
    },
  }
)

type FieldHelperProps = React.ComponentProps<"div"> &
  VariantProps<typeof fieldHelperVariants> & {
    icon?: React.ReactNode
  }

function FieldHelper({
  className,
  size,
  tone,
  icon,
  children,
  ...props
}: FieldHelperProps) {
  const ctx = useFieldContext()
  const resolvedSize = size ?? ctx.size
  const resolvedTone = tone ?? (ctx.invalid ? "error" : "neutral")
  return (
    <div
      data-slot="field-helper"
      data-tone={resolvedTone}
      className={cn(
        fieldHelperVariants({ size: resolvedSize, tone: resolvedTone }),
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </div>
  )
}

const fieldErrorVariants = cva("font-medium text-error-base", {
  variants: {
    size: {
      xs: "text-ui-control-xs",
      sm: "text-ui-control-sm",
      md: "text-ui-control-md",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

type FieldErrorProps = React.ComponentProps<"div"> &
  VariantProps<typeof fieldErrorVariants> & {
    errors?: Array<{ message?: string } | undefined>
  }

function FieldError({
  className,
  children,
  errors,
  size,
  ...props
}: FieldErrorProps) {
  const ctx = useFieldContext()
  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(fieldErrorVariants({ size: size ?? ctx.size }), className)}
      {...props}
    >
      {content}
    </div>
  )
}

const fieldFooterVariants = cva(
  "inline-flex w-fit items-center gap-1 font-medium text-primary-base [&>a]:inline-flex [&>a]:items-center [&>a]:gap-1 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "text-ui-control-xs [&_svg]:size-3",
        sm: "text-ui-control-sm [&_svg]:size-3.5",
        md: "text-ui-control-md [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

type FieldFooterProps = React.ComponentProps<"div"> &
  VariantProps<typeof fieldFooterVariants>

function FieldFooter({ className, size, ...props }: FieldFooterProps) {
  const ctx = useFieldContext()
  const resolved = size ?? ctx.size
  return (
    <div
      data-slot="field-footer"
      data-size={resolved}
      className={cn(fieldFooterVariants({ size: resolved }), className)}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn("relative py-2", className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-static text-placeholder text-ui-control-sm relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldTitle,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldFooter,
  FieldGroup,
  FieldHelper,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  LabelDescription,
  fieldVariants,
  fieldLabelVariants,
  fieldTitleVariants,
  fieldDescriptionVariants,
  fieldHelperVariants,
  fieldErrorVariants,
  fieldFooterVariants,
  fieldLegendVariants,
  useFieldContext,
  useOptionalFieldContext,
}
export type { FieldSize, FieldOrientation, FieldContextValue }
