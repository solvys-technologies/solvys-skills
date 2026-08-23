"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

type SegmentedControlVariant = "primary" | "neutral"
type SegmentedControlShape = "rounded" | "pill"
type SegmentedControlSize = "xs" | "sm" | "md" | "lg" | "xl"
type SegmentedControlAppearance = "flat" | "grouped"

type SegmentedControlContextValue = {
  variant: SegmentedControlVariant
  shape: SegmentedControlShape
  size: SegmentedControlSize
  appearance: SegmentedControlAppearance
  value: string | undefined
  onValueChange: ((value: string) => void) | undefined
  indicatorReady: boolean
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue>({
    variant: "primary",
    shape: "rounded",
    size: "md",
    appearance: "flat",
    value: undefined,
    onValueChange: undefined,
    indicatorReady: false,
  })

function useSegmentedControlContext() {
  return React.useContext(SegmentedControlContext)
}

const segmentedControlVariants = cva(
  "relative isolate inline-flex items-center",
  {
    variants: {
      variant: { primary: "", neutral: "" },
      shape: { rounded: "", pill: "" },
      size: { xs: "", sm: "", md: "", lg: "", xl: "" },
      appearance: { flat: "", grouped: "" },
    },
    compoundVariants: [
      { appearance: "grouped", className: "bg-weak" },
      { appearance: "grouped", size: "xs", className: "rounded-lg p-0.5" },
      { appearance: "grouped", size: "sm", className: "rounded-lg p-0.5" },
      { appearance: "grouped", size: "md", className: "rounded-xl p-1" },
      { appearance: "grouped", size: "lg", className: "rounded-2xl p-1" },
      { appearance: "grouped", size: "xl", className: "rounded-3xl p-2" },
      { appearance: "grouped", shape: "pill", className: "rounded-full" },
    ],
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
      size: "md",
      appearance: "flat",
    },
  }
)

const segmentedControlIndicatorVariants = cva(
  [
    // base
    "pointer-events-none absolute z-1",
    // transition
    "transition-all duration-400 ease-out",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary-base shadow-component-primary-default",
        neutral: "bg-static shadow-neutral-md",
      },
      shape: { rounded: "", pill: "rounded-full" },
      size: { xs: "", sm: "", md: "", lg: "", xl: "" },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-md" },
      { shape: "rounded", size: "sm", className: "rounded-md" },
      { shape: "rounded", size: "md", className: "rounded-lg" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },
    ],
  }
)

const segmentedControlItemVariants = cva(
  [
    // base
    "relative inline-flex shrink-0 items-center justify-center cursor-pointer [&_[data-slot=segmented-control-item-icon]]:shrink-0",
    // transition
    "transition-colors delay-100 duration-150 ease-out",
    // focus-visible
    "focus-visible:outline-2 focus-visible:outline-strong focus-visible:outline-offset-0",
    // disabled
    "disabled:cursor-not-allowed disabled:bg-transparent! disabled:text-disabled! disabled:shadow-none!",
    // aria-disabled
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent! aria-disabled:text-disabled! aria-disabled:shadow-none!",
    // data-[active=false]
    "data-[active=false]:text-body",
    // data-[active=false]:hover
    "data-[active=false]:hover:text-strongest",
  ],
  {
    variants: {
      variant: { primary: "", neutral: "" },
      shape: { rounded: "", pill: "rounded-full" },
      size: {
        xs:
          "text-ui-control-xs font-semibold " +
          "[&_[data-slot=segmented-control-item-icon]>svg]:size-3",
        sm:
          "text-ui-control-sm font-semibold " +
          "[&_[data-slot=segmented-control-item-icon]>svg]:size-4",
        md:
          "text-ui-control-md font-semibold " +
          "[&_[data-slot=segmented-control-item-icon]>svg]:size-5",
        lg:
          "text-ui-control-md font-semibold " +
          "[&_[data-slot=segmented-control-item-icon]>svg]:size-5",
        xl:
          "text-ui-control-xl font-semibold " +
          "[&_[data-slot=segmented-control-item-icon]>svg]:size-6",
      },
      appearance: { flat: "", grouped: "" },
      iconOnly: { true: "", false: "" },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-md" },
      { shape: "rounded", size: "sm", className: "rounded-md" },
      { shape: "rounded", size: "md", className: "rounded-lg" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },

      {
        size: "xs",
        iconOnly: false,
        className:
          "gap-0.5 h-6 px-1.5 " +
          "[&_[data-slot=segmented-control-item-content]]:gap-1 " +
          "[&_[data-slot=segmented-control-item-content]]:px-0.5",
      },
      {
        size: "sm",
        iconOnly: false,
        className:
          "gap-0.5 h-7 px-1.5 " +
          "[&_[data-slot=segmented-control-item-content]]:gap-1 " +
          "[&_[data-slot=segmented-control-item-content]]:px-0.5",
      },
      {
        size: "md",
        iconOnly: false,
        className:
          "gap-0.5 h-8 px-1.5 " +
          "[&_[data-slot=segmented-control-item-content]]:gap-1 " +
          "[&_[data-slot=segmented-control-item-content]]:px-component-xs",
      },
      {
        size: "lg",
        iconOnly: false,
        className:
          "gap-1 h-10 px-2.5 " +
          "[&_[data-slot=segmented-control-item-content]]:gap-1.5 " +
          "[&_[data-slot=segmented-control-item-content]]:px-component-xs",
      },
      {
        size: "xl",
        iconOnly: false,
        className:
          "gap-1 h-12 px-3 " +
          "[&_[data-slot=segmented-control-item-content]]:gap-1.5 " +
          "[&_[data-slot=segmented-control-item-content]]:px-component-xs",
      },

      { size: "xs", iconOnly: true, className: "size-6" },
      { size: "sm", iconOnly: true, className: "size-7" },
      { size: "md", iconOnly: true, className: "size-8" },
      { size: "lg", iconOnly: true, className: "size-10" },
      { size: "xl", iconOnly: true, className: "size-12" },

      {
        variant: "primary",
        appearance: "flat",
        className: [
          // data-[active=false]
          "data-[active=false]:bg-weak",
          // data-[active=true]
          "data-[active=true]:bg-primary-base data-[active=true]:text-white data-[active=true]:shadow-component-primary-default",
        ],
      },
      {
        variant: "neutral",
        appearance: "flat",
        className: [
          // data-[active=false]
          "data-[active=false]:bg-weak",
          // data-[active=true]
          "data-[active=true]:bg-static data-[active=true]:text-body data-[active=true]:shadow-neutral-md",
        ],
      },
      {
        variant: "primary",
        appearance: "grouped",
        className: "data-[active=true]:text-white",
      },
      {
        variant: "neutral",
        appearance: "grouped",
        className: "data-[active=true]:text-body",
      },
    ],
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
      size: "md",
      appearance: "flat",
      iconOnly: false,
    },
  }
)

type SegmentedControlProps = React.ComponentProps<"div"> &
  VariantProps<typeof segmentedControlVariants> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }

function SegmentedControl({
  className,
  variant = "primary",
  shape = "rounded",
  size = "md",
  appearance = "flat",
  value: valueProp,
  defaultValue,
  onValueChange,
  children,
  ...props
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue
  )
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState<{
    left: number
    top: number
    width: number
    height: number
    variant?: SegmentedControlVariant
    shape?: SegmentedControlShape
    size?: SegmentedControlSize
  }>({ left: 0, top: 0, width: 0, height: 0 })
  const [indicatorReady, setIndicatorReady] = React.useState(false)
  const indicatorReadyRef = React.useRef(false)

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const activeItem = container.querySelector<HTMLElement>(
        '[data-slot="segmented-control-item"][data-active="true"]'
      )
      if (!activeItem) {
        if (indicatorReadyRef.current) {
          indicatorReadyRef.current = false
          setIndicatorReady(false)
        }
        return
      }
      const containerRect = container.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      setIndicator({
        left: itemRect.left - containerRect.left,
        top: itemRect.top - containerRect.top,
        width: itemRect.width,
        height: itemRect.height,
        variant: activeItem.dataset.variant as
          | SegmentedControlVariant
          | undefined,
        shape: activeItem.dataset.shape as SegmentedControlShape | undefined,
        size: activeItem.dataset.size as SegmentedControlSize | undefined,
      })
      if (!indicatorReadyRef.current) {
        indicatorReadyRef.current = true
        setIndicatorReady(true)
      }
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(container)
    container
      .querySelectorAll<HTMLElement>('[data-slot="segmented-control-item"]')
      .forEach((el) => ro.observe(el))

    const mo = new MutationObserver(update)
    mo.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-active"],
      childList: true,
    })

    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [children])

  return (
    <SegmentedControlContext.Provider
      value={{
        variant: variant!,
        shape: shape!,
        size: size!,
        appearance: appearance!,
        value,
        onValueChange: handleValueChange,
        indicatorReady,
      }}
    >
      <div
        ref={containerRef}
        data-slot="segmented-control"
        data-variant={variant}
        data-shape={shape}
        data-size={size}
        data-appearance={appearance}
        role="group"
        className={cn(
          segmentedControlVariants({ variant, shape, size, appearance }),
          className
        )}
        {...props}
      >
        {indicatorReady && (
          <span
            data-slot="segmented-control-indicator"
            aria-hidden="true"
            className={cn(
              segmentedControlIndicatorVariants({
                variant: indicator.variant ?? variant,
                shape: indicator.shape ?? shape,
                size: indicator.size ?? size,
              })
            )}
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
            }}
          />
        )}
        {children}
      </div>
    </SegmentedControlContext.Provider>
  )
}

type SegmentedControlItemProps = Omit<React.ComponentProps<"button">, "value"> &
  VariantProps<typeof segmentedControlItemVariants> & {
    asChild?: boolean
    value?: string
    selected?: boolean
    leading?: React.ReactNode
    trailing?: React.ReactNode
  }

function SegmentedControlItem({
  className,
  variant: variantProp,
  shape: shapeProp,
  size: sizeProp,
  appearance: appearanceProp,
  iconOnly = false,
  asChild = false,
  value,
  selected: selectedProp,
  disabled,
  leading,
  trailing,
  onClick,
  children,
  ...props
}: SegmentedControlItemProps) {
  const ctx = useSegmentedControlContext()
  const variant = variantProp ?? ctx.variant
  const shape = shapeProp ?? ctx.shape
  const size = sizeProp ?? ctx.size
  const appearance = appearanceProp ?? ctx.appearance

  const selected =
    selectedProp ??
    (value !== undefined && ctx.value !== undefined && ctx.value === value)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick?.(event)
    if (!event.defaultPrevented && value !== undefined) {
      ctx.onValueChange?.(value)
    }
  }

  const Comp = asChild ? Slot.Root : "button"

  const showFallbackIndicator =
    appearance === "grouped" && selected && !ctx.indicatorReady
  const hideStaticSelectedBg = appearance === "flat" && ctx.indicatorReady

  return (
    <Comp
      data-slot="segmented-control-item"
      data-variant={variant}
      data-shape={shape}
      data-size={size}
      data-appearance={appearance}
      data-state={selected ? "on" : "off"}
      data-active={selected ? "true" : "false"}
      data-value={value}
      aria-pressed={asChild ? undefined : selected}
      aria-disabled={asChild ? disabled || undefined : undefined}
      disabled={asChild ? undefined : disabled}
      tabIndex={asChild && disabled ? -1 : undefined}
      type={asChild ? undefined : "button"}
      onClick={handleClick}
      className={cn(
        segmentedControlItemVariants({
          variant,
          shape,
          size,
          appearance,
          iconOnly,
        }),
        showFallbackIndicator &&
          (variant === "primary"
            ? "bg-primary-base shadow-component-primary-default"
            : "bg-static shadow-neutral-md"),
        hideStaticSelectedBg &&
          "data-[active=true]:bg-transparent data-[active=true]:shadow-none",
        className
      )}
      {...props}
    >
      {iconOnly ? (
        children != null && (
          <span
            data-slot="segmented-control-item-icon"
            className="relative z-2"
          >
            {children}
          </span>
        )
      ) : (
        <>
          {leading && (
            <span
              data-slot="segmented-control-item-icon"
              className="relative z-2"
            >
              {leading}
            </span>
          )}
          {children != null && (
            <span
              data-slot="segmented-control-item-content"
              className="relative z-2 inline-flex items-center"
            >
              {children}
            </span>
          )}
          {trailing && (
            <span
              data-slot="segmented-control-item-icon"
              className="relative z-2"
            >
              {trailing}
            </span>
          )}
        </>
      )}
    </Comp>
  )
}

export {
  SegmentedControl,
  SegmentedControlItem,
  segmentedControlVariants,
  segmentedControlItemVariants,
  segmentedControlIndicatorVariants,
}
