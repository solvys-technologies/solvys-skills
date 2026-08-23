"use client"

import * as React from "react"
import {
  RiCommandFill,
  RiErrorWarningFill,
  RiEyeFill,
  RiEyeOffFill,
} from "@create-ui/assets/icons"
import { cva } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  useOptionalFieldContext,
} from "@/registry/ui/field"
import {
  Input,
  InputAffix,
  InputProvider,
  InputShell,
  inputSlotSizeClasses,
  useInputContext,
  type InputContextValue,
  type InputSize,
} from "@/registry/ui/input"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Spinner } from "@/registry/ui/spinner"

type InputGroupContextValue = Pick<
  InputContextValue,
  "size" | "invalid" | "disabled" | "loading"
>

function useInputGroup(): InputGroupContextValue {
  const ctx = useInputContext()
  if (ctx === null) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[InputGroup] sub-component used outside <InputGroup>. Falling back to defaults; wrap your usage in <InputGroup> or <InputGroupProvider>."
      )
    }
    return { size: "sm", invalid: false, disabled: false, loading: false }
  }
  return {
    size: ctx.size,
    invalid: ctx.invalid,
    disabled: ctx.disabled,
    loading: ctx.loading,
  }
}

function useOptionalInputGroup(): InputGroupContextValue | null {
  const ctx = useInputContext()
  if (ctx === null) return null
  return {
    size: ctx.size,
    invalid: ctx.invalid,
    disabled: ctx.disabled,
    loading: ctx.loading,
  }
}

function applyGroupStyles(
  base: string,
  ctx: InputGroupContextValue,
  opts?: {
    error?: string
    disabled?: string
    loading?: string
  }
) {
  return cn(
    base,
    ctx.invalid && (opts?.error ?? "text-error-base"),
    ctx.disabled && (opts?.disabled ?? "text-disabled"),
    ctx.loading && (opts?.loading ?? "text-placeholder")
  )
}

function InputGroupProvider({
  size,
  invalid: invalidProp,
  disabled,
  loading,
  children,
}: {
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  const fieldCtx = useOptionalFieldContext()

  const resolvedSize = size ?? fieldCtx?.size ?? "sm"
  const resolvedInvalid = invalidProp ?? fieldCtx?.invalid ?? false
  const resolvedDisabled = disabled ?? fieldCtx?.disabled ?? false
  const resolvedLoading = loading ?? fieldCtx?.loading ?? false

  return (
    <InputProvider
      size={resolvedSize}
      invalid={resolvedInvalid}
      disabled={resolvedDisabled}
      loading={resolvedLoading}
    >
      {children}
    </InputProvider>
  )
}

function InputGroupShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = useInputGroup()

  return (
    <InputShell
      data-slot="input-group"
      className={cn(
        "[&>*+*]:border-l-weak flex items-stretch [&>*+*]:border-l",
        className
      )}
      {...props}
    >
      {children}
    </InputShell>
  )
}

function InputGroup({
  className,
  size,
  invalid,
  disabled,
  loading,
  multiline,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  multiline?: boolean
}) {
  return (
    <InputGroupProvider
      size={size}
      invalid={invalid}
      disabled={disabled}
      loading={loading}
    >
      <InputGroupShell
        className={cn(multiline && "flex-col items-stretch", className)}
        data-multiline={multiline || undefined}
        {...props}
      >
        {children}
      </InputGroupShell>
    </InputGroupProvider>
  )
}

const inputGroupSlotVariants = cva(
  [
    // base
    "flex min-h-px min-w-px flex-1 items-center bg-transparent font-medium [&>svg]:shrink-0 [&>svg]:text-placeholder",
    // transition
    "transition-colors",
  ],
  {
    variants: {
      size: inputSlotSizeClasses,
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function InputGroupSlot({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = useInputGroup()

  return (
    <div
      data-slot="input-group-slot"
      className={cn(
        inputGroupSlotVariants({ size: ctx.size }),
        ctx.invalid &&
          "[&_input]:border-error-base [&_input]:text-error-base [&_input]:placeholder:text-error-base [&>svg]:text-error-base",
        ctx.disabled &&
          "bg-weakest [&_input]:text-disabled [&_input]:placeholder:text-disabled [&>svg]:text-disabled",
        ctx.loading &&
          "bg-weakest [&_input]:text-disabled [&_input]:placeholder:text-disabled [&>svg]:text-disabled",
        className
      )}
      {...props}
    >
      {children}
      {ctx.loading && <Spinner variant="info" size={ctx.size} />}
    </div>
  )
}

function InputGroupAffix(props: React.ComponentProps<typeof InputAffix>) {
  return <InputAffix data-slot="input-group-affix" {...props} />
}

const PASSWORD_TOGGLE_SIZE: Record<InputSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
}

function InputGroupControl({
  className,
  type,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "size">) {
  const ctx = useInputGroup()
  const [visible, setVisible] = React.useState(false)

  if (type === "password") {
    return (
      <>
        <Input
          data-slot="input-group-control"
          type={visible ? "text" : "password"}
          className={cn("h-auto p-0", className)}
          {...props}
        />
        {!ctx.loading && (
          <button
            type="button"
            data-slot="input-group-password-toggle"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((v) => !v)}
            disabled={ctx.disabled}
            className={cn(
              "flex shrink-0 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed [&>svg]:size-full",
              PASSWORD_TOGGLE_SIZE[ctx.size],
              applyGroupStyles("text-placeholder hover:text-strongest", ctx, {
                error: "text-error-base",
                disabled: "text-disabled",
              })
            )}
          >
            {visible ? <RiEyeOffFill /> : <RiEyeFill />}
          </button>
        )}
      </>
    )
  }

  return (
    <Input
      data-slot="input-group-control"
      type={type}
      className={cn("h-auto p-0", className)}
      {...props}
    />
  )
}

const inputGroupTextareaVariants = cva(
  [
    // base
    "flex min-h-px min-w-0 w-full resize-none bg-transparent font-medium text-body",
    // transition
    "transition-colors",
    // placeholder
    "placeholder:text-placeholder",
    // focus-visible
    "focus-visible:outline-none",
    // aria-invalid
    "aria-invalid:text-error-base",
    // disabled
    "disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled",
  ],
  {
    variants: {
      size: {
        xs: "px-2 py-1.5 text-ui-control-md",
        sm: "px-2.5 py-2 text-ui-control-lg",
        md: "px-3 py-2 text-ui-control-xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function InputGroupTextarea({
  className,
  rows = 3,
  readOnly,
  ...props
}: React.ComponentProps<"textarea">) {
  const ctx = useInputGroup()

  return (
    <textarea
      data-slot="input-group-textarea"
      rows={rows}
      disabled={ctx.disabled}
      readOnly={ctx.loading || readOnly || undefined}
      aria-invalid={ctx.invalid || undefined}
      className={cn(
        inputGroupTextareaVariants({ size: ctx.size }),
        ctx.invalid && "text-error-base placeholder:text-error-base",
        ctx.disabled && "bg-weakest text-disabled placeholder:text-disabled",
        className
      )}
      {...props}
    />
  )
}

const inputGroupToolbarVariants = cva(
  "flex items-center bg-transparent [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "gap-1 px-2 py-1.5",
        sm: "gap-1.5 px-2.5 py-2",
        md: "gap-2 px-3 py-2.5",
      },
      position: {
        start: "justify-start",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      size: "sm",
      position: "start",
    },
  }
)

function InputGroupToolbar({
  className,
  position,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  position?: "start" | "end" | "between"
}) {
  const ctx = useInputGroup()

  return (
    <div
      data-slot="input-group-toolbar"
      className={cn(
        inputGroupToolbarVariants({ size: ctx.size, position }),
        ctx.disabled && "bg-weakest",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const inputGroupLeadingIconVariants = cva(
  "flex shrink-0 items-center justify-center bg-weakest [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "size-8 p-y-3 px-2 text-ui-control-md [&_svg]:size-4",
        sm: "size-10 p-2.5 text-ui-control-lg [&_svg]:size-4.5",
        md: "size-12 p-3 text-ui-control-xl [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function InputGroupLeadingIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = useInputGroup()

  return (
    <div
      data-slot="input-group-leading-icon"
      className={cn(
        inputGroupLeadingIconVariants({ size: ctx.size }),
        applyGroupStyles("text-placeholder", ctx, {
          error: "bg-error-weakest text-error-base border-error-base border-r",
          loading: "text-disabled",
          disabled: "text-disabled",
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const inputGroupAddonVariants = cva(
  "flex shrink-0 items-center bg-weakest font-medium [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "gap-1 px-2 py-1.5 text-ui-control-sm [&_svg]:size-4",
        sm: "gap-1 px-3 py-2 text-ui-control-md [&_svg]:size-5",
        md: "gap-1 px-4 py-3 text-ui-control-xl [&_svg]:size-6",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function InputGroupAddon({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = useInputGroup()

  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        inputGroupAddonVariants({ size: ctx.size }),
        applyGroupStyles("text-placeholder", ctx, {
          error: "bg-error-weakest text-error-base border-error-base border-r",
          disabled: "text-disabled",
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type InputGroupSelectProps = React.ComponentProps<typeof Select> & {
  className?: string
  triggerClassName?: string
  placeholder?: React.ReactNode
  prefix?: React.ReactNode
  valueChildren?: React.ReactNode
  "aria-label"?: string
  "aria-labelledby"?: string
}

function InputGroupSelect({
  className,
  triggerClassName,
  placeholder,
  prefix,
  valueChildren,
  children,
  isDisabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...selectProps
}: InputGroupSelectProps) {
  const ctx = useInputGroup()

  return (
    <Select
      size={ctx.size}
      variant="compact"
      isInvalid={ctx.invalid}
      isDisabled={isDisabled ?? (ctx.disabled || ctx.loading)}
      {...selectProps}
    >
      <SelectTrigger
        data-slot="input-group-select"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(
          "bg-static hover:bg-weakest",
          ctx.invalid && "!border-weak hover:bg-static",
          ctx.disabled && "bg-weakest !pointer-events-none",
          ctx.loading && "bg-weakest !pointer-events-none",
          className,
          triggerClassName
        )}
      >
        {prefix}
        <SelectValue placeholder={placeholder}>{valueChildren}</SelectValue>
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
}

const INPUT_GROUP_TO_BUTTON_SIZE = {
  xs: "md",
  sm: "lg",
  md: "xl",
} as const satisfies Record<InputSize, "md" | "lg" | "xl">

type InputGroupButtonProps = Omit<React.ComponentProps<typeof Button>, "size">

function InputGroupButton({
  className,
  iconOnly = false,
  shape = "square",
  variant = "neutral-solid",
  appearance = "soft",
  children,
  ...props
}: InputGroupButtonProps) {
  const ctx = useInputGroup()

  return (
    <Button
      data-slot="input-group-button"
      variant={variant}
      appearance={appearance}
      shape={shape}
      size={INPUT_GROUP_TO_BUTTON_SIZE[ctx.size]}
      iconOnly={iconOnly}
      disabled={ctx.disabled || ctx.invalid || ctx.loading}
      className={cn(
        "active:scale-100",
        ctx.invalid && "!border-weak",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

const inputGroupCardVariants = cva(
  [
    // base
    "flex shrink-0 bg-static border-weak items-center justify-center overflow-hidden [&>svg]:w-auto",
    // transition
    "transition-opacity",
  ],
  {
    variants: {
      size: {
        xs: "h-8 w-[51px] [&>svg]:h-6",
        sm: "h-10 w-[63px] [&>svg]:h-[30px]",
        md: "h-12 w-[76px] [&>svg]:h-9",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function InputGroupCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = useInputGroup()

  return (
    <div
      data-slot="input-group-card"
      data-loading={ctx.loading || undefined}
      className={cn(
        inputGroupCardVariants({ size: ctx.size }),
        "bg-static-white",
        ctx.invalid && "!border-weak",
        ctx.loading && "[&>*]:opacity-30",
        ctx.disabled && "[&>*]:opacity-30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function InputGroupKbd({
  className,
  leading = <RiCommandFill />,
  children,
  ...props
}: React.ComponentProps<typeof Badge>) {
  const ctx = useInputGroup()

  return (
    <Badge
      data-slot="input-group-kbd"
      variant="neutral"
      appearance="soft"
      size={ctx.size}
      leading={leading}
      className={cn(
        ctx.invalid && "bg-error-weakest text-error-base",
        ctx.loading && "text-disabled opacity-60",
        ctx.disabled && "text-disabled opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}

const HELPER_ICON_SIZE = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
} as const

function InputGroupHelperIcon({
  className,
  children,
  invalidIcon = <RiErrorWarningFill />,
  ref,
  ...props
}: React.ComponentProps<"span"> & {
  invalidIcon?: React.ReactNode
}) {
  const ctx = useInputGroup()

  return (
    <span
      ref={ref}
      data-slot="input-group-helper-icon"
      className={cn(
        "flex shrink-0 items-center justify-center [&_svg]:size-full",
        HELPER_ICON_SIZE[ctx.size],
        applyGroupStyles("text-body", ctx, {
          error: "text-error-base",
          disabled: "text-disabled",
          loading: "text-disabled",
        }),
        className
      )}
      {...props}
    >
      {ctx.invalid && invalidIcon ? invalidIcon : children}
    </span>
  )
}

function InputGroupField({
  label,
  description,
  error,
  size = "sm",
  disabled,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  size?: InputSize
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <Field size={size} invalid={!!error} disabled={disabled} {...props}>
      {label && <FieldLabel>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <InputGroup>{children}</InputGroup>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}

export {
  InputGroup,
  InputGroupProvider,
  InputGroupShell,
  InputGroupSlot,
  InputGroupAffix,
  InputGroupControl,
  InputGroupTextarea,
  InputGroupToolbar,
  InputGroupLeadingIcon,
  InputGroupAddon,
  InputGroupSelect,
  InputGroupButton,
  InputGroupCard,
  InputGroupKbd,
  InputGroupHelperIcon,
  InputGroupField,
  useInputGroup,
  useOptionalInputGroup,
}
