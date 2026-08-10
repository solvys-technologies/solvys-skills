"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { useOptionalFieldContext } from "@/registry/ui/field"

type InputSize = "xs" | "sm" | "md"

type InputContextValue = {
  size: InputSize
  invalid: boolean
  disabled: boolean
  loading: boolean
  hasShell?: boolean
  controlRef?: React.RefObject<HTMLElement | null>
  registerControl?: (el: HTMLElement | null) => void
}

const InputContext = React.createContext<InputContextValue | null>(null)

function useInputContext() {
  return React.useContext(InputContext)
}

function InputProvider({
  size,
  invalid,
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
  const resolvedSize: InputSize = size ?? fieldCtx?.size ?? "sm"
  const resolvedInvalid = invalid ?? fieldCtx?.invalid ?? false
  const resolvedDisabled = disabled ?? fieldCtx?.disabled ?? false
  const resolvedLoading = loading ?? fieldCtx?.loading ?? false

  const value = React.useMemo<InputContextValue>(
    () => ({
      size: resolvedSize,
      invalid: resolvedInvalid,
      disabled: resolvedDisabled,
      loading: resolvedLoading,
    }),
    [resolvedSize, resolvedInvalid, resolvedDisabled, resolvedLoading]
  )

  return <InputContext.Provider value={value}>{children}</InputContext.Provider>
}

const inputShellVariants = cva(
  [
    // base
    "flex w-full outline-4 outline-transparent items-center overflow-clip border bg-static shadow-neutral-xs",
    // transition
    "transition-[color,background-color,border-color,outline-color,box-shadow] duration-150 ease-out",
  ],
  {
    variants: {
      size: {
        xs: "h-8 rounded-lg",
        sm: "h-10 rounded-xl",
        md: "h-12 rounded-2xl",
      },
      invalid: {
        true: "shadow-none border-error-base outline-error-weak",
        false: [
          // base
          "border-weak",
          // hover
          "hover:bg-weakest",
          // focus-within
          "focus-within:bg-static focus-within:shadow-none focus-within:border-heavy focus-within:outline-light",
          // focus-within:hover
          "focus-within:hover:bg-static",
          // focus-visible
          "focus-visible:bg-static focus-visible:border-heavy focus-visible:outline-light",
          // focus-visible:hover
          "focus-visible:hover:bg-static",
        ],
      },
      disabled: {
        true: [
          // base
          "bg-weakest",
          // hover
          "hover:bg-weakest",
        ],
        false: "",
      },
      loading: {
        true: "shadow-none border-info-base bg-weakest outline-info-weak pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "sm",
      invalid: false,
      disabled: false,
      loading: false,
    },
    compoundVariants: [
      {
        loading: true,
        invalid: true,
        className: [
          // base
          "border-info-base outline-4 outline-info-weak",
          // focus-within
          "focus-within:outline-info-weak",
        ],
      },
    ],
  }
)

function InputShell({
  className,
  children,
  onMouseDown,
  ...props
}: React.ComponentProps<"div">) {
  const parentCtx = useInputContext()
  const ctx = React.useMemo<InputContextValue>(
    () =>
      parentCtx ?? {
        size: "sm" as InputSize,
        invalid: false,
        disabled: false,
        loading: false,
      },
    [parentCtx]
  )

  const controlRef = React.useRef<HTMLElement | null>(null)
  const registerControl = React.useCallback((el: HTMLElement | null) => {
    controlRef.current = el
  }, [])

  const shellCtx = React.useMemo<InputContextValue>(
    () => ({ ...ctx, hasShell: true, controlRef, registerControl }),
    [ctx, registerControl]
  )

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(event)
      if (event.defaultPrevented) return
      if (ctx.disabled || ctx.loading) return

      const target = event.target as HTMLElement
      const interactive = target.closest(
        "input, textarea, select, button, a, [role='button'], [contenteditable='true'], [data-input-control]"
      )
      if (interactive) return

      const isFocusable = (el: HTMLElement | null): el is HTMLElement =>
        !!el && !el.matches("[disabled], [readonly]")

      const shell = event.currentTarget
      const focusable = isFocusable(controlRef.current)
        ? controlRef.current
        : shell.querySelector<HTMLElement>(
            "input:not([disabled]):not([readonly]), textarea:not([disabled]):not([readonly])"
          )

      if (focusable) {
        event.preventDefault()
        focusable.focus()
      }
    },
    [ctx.disabled, ctx.loading, onMouseDown]
  )

  return (
    <InputContext.Provider value={shellCtx}>
      <div
        data-slot="input-shell"
        data-size={ctx.size}
        data-invalid={ctx.invalid || undefined}
        data-disabled={ctx.disabled || undefined}
        data-loading={ctx.loading || undefined}
        role="group"
        aria-busy={ctx.loading || undefined}
        onMouseDown={handleMouseDown}
        className={cn(
          inputShellVariants({
            size: ctx.size,
            invalid: ctx.invalid,
            disabled: ctx.disabled,
            loading: ctx.loading,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    </InputContext.Provider>
  )
}

const inputVariants = cva(
  [
    // base
    "flex min-w-0 flex-1 items-center bg-transparent font-medium text-body",
    // transition
    "transition-[color,background-color,border-color,outline-color] duration-150 ease-out",
    // placeholder
    "placeholder:text-placeholder",
    // autofill (kill the browser's blue/yellow background, keep text readable)
    "autofill:[-webkit-text-fill-color:var(--color-body)]",
    "autofill:[transition:background-color_9999s_ease-in-out_0s]",
    // search: hide the native webkit clear (X) button and decoration
    "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:[-webkit-appearance:none]",
    "[&::-webkit-search-decoration]:appearance-none [&::-webkit-search-decoration]:[-webkit-appearance:none]",
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
        xs: "h-8 gap-2 px-2 py-1.5 text-ui-control-md",
        sm: "h-10 gap-2 px-2.5 py-2 text-ui-control-lg",
        md: "h-12 gap-3 px-3 py-2 text-ui-control-xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

const inputSlotSizeClasses: Record<InputSize, string> = {
  xs: "h-8 gap-2 px-2 py-1.5 text-ui-control-md [&>svg]:size-5",
  sm: "h-10 gap-2 px-2.5 py-2 text-ui-control-lg [&>svg]:size-5.5",
  md: "h-12 gap-3 px-3 py-2 text-ui-control-xl [&>svg]:size-6",
}

function InputAffix({ className, ...props }: React.ComponentProps<"span">) {
  const ctx = useInputContext()

  return (
    <span
      data-slot="input-affix"
      className={cn(
        "text-disabled shrink-0 transition-colors",
        ctx?.invalid && "text-error-base",
        ctx?.disabled && "text-disabled",
        className
      )}
      {...props}
    />
  )
}

function Input({
  className,
  size,
  type,
  disabled,
  readOnly,
  ref,
  "aria-invalid": ariaInvalidProp,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  const ctx = useInputContext()
  const fieldCtx = useOptionalFieldContext()
  const resolvedSize: InputSize = size ?? ctx?.size ?? fieldCtx?.size ?? "sm"
  const resolvedDisabled = disabled ?? ctx?.disabled ?? fieldCtx?.disabled
  const resolvedLoading = ctx?.loading ?? fieldCtx?.loading
  const resolvedInvalid =
    ariaInvalidProp ?? ctx?.invalid ?? fieldCtx?.invalid ?? undefined

  const internalRef = React.useRef<HTMLInputElement | null>(null)
  const setRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const registerControl = ctx?.registerControl
  React.useEffect(() => {
    if (!registerControl) return
    registerControl(internalRef.current)
    return () => registerControl(null)
  }, [registerControl])

  const inputElement = (
    <input
      ref={setRef}
      type={type}
      data-slot="input"
      data-size={resolvedSize}
      disabled={resolvedDisabled}
      readOnly={resolvedLoading || readOnly || undefined}
      aria-invalid={resolvedInvalid || undefined}
      className={cn(inputVariants({ size: resolvedSize }), className)}
      {...props}
    />
  )

  if (ctx) {
    return inputElement
  }

  return (
    <InputProvider
      size={resolvedSize}
      invalid={
        typeof resolvedInvalid === "boolean" ? resolvedInvalid : undefined
      }
      disabled={resolvedDisabled}
      loading={fieldCtx?.loading}
    >
      <InputShell>{inputElement}</InputShell>
    </InputProvider>
  )
}

export {
  Input,
  InputAffix,
  InputProvider,
  InputShell,
  inputVariants,
  inputShellVariants,
  inputSlotSizeClasses,
  useInputContext,
}
export type { InputSize, InputContextValue }
