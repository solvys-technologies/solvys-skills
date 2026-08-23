"use client"

import * as React from "react"
import { RiArrowRightLine, RiErrorWarningLine } from "@create-ui/assets/icons"
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/registry/hooks/use-mobile"
import { cn } from "@/registry/lib/utils"

type StepperOrientation = "horizontal" | "vertical"
type StepperSize = "sm" | "md"
type StepperStatus = "active" | "completed" | "error" | "locked"
type StepperLayout = "default" | "compact" | "badge"
type StepperTextTone = "default" | "accent" | "inherit"

function layoutTextTone(layout: StepperLayout): StepperTextTone {
  if (layout === "compact") return "accent"
  if (layout === "badge") return "inherit"
  return "default"
}

type StepperDotVariant = "neutral" | "primary" | "inverse"
type StepperDotAppearance = "solid" | "outline"
type StepperDotShape = "circle" | "pill" | "bar"
type StepperDotSize = "xs" | "sm" | "md"

type StepperContextValue = {
  orientation: StepperOrientation
  size: StepperSize
  layout: StepperLayout
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepperContext(): StepperContextValue {
  return (
    React.useContext(StepperContext) ?? {
      orientation: "vertical",
      size: "sm",
      layout: "default",
    }
  )
}

type StepperItemContextValue = {
  status: StepperStatus
  disabled: boolean
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(
  null
)

function useStepperItemContext(): StepperItemContextValue {
  return (
    React.useContext(StepperItemContext) ?? {
      status: "locked",
      disabled: false,
    }
  )
}

const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-start",
    },
    size: { sm: "", md: "" },
    layout: { default: "", compact: "", badge: "" },
  },
  compoundVariants: [
    { orientation: "vertical", size: "sm", className: "gap-component-sm" },
    { orientation: "vertical", size: "md", className: "gap-component-lg" },
    { orientation: "horizontal", size: "sm", className: "gap-component-lg" },
    { orientation: "horizontal", size: "md", className: "gap-section-lg" },
    { layout: "badge", className: "gap-2.5" },
  ],
  defaultVariants: {
    orientation: "vertical",
    size: "sm",
    layout: "default",
  },
})

const stepperTriggerVariants = cva(
  [
    // base
    "group/stepper-trigger inline-flex gap-2 text-left outline-none",
    // disabled
    "aria-disabled:pointer-events-none disabled:pointer-events-none",
    // focus-visible
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      orientation: {
        vertical: "flex-row",
        horizontal: "flex-col",
      },
    },
    defaultVariants: { orientation: "vertical" },
  }
)

const stepperDotVariants = cva(
  "inline-block shrink-0 rounded-full outline-transparent outline-offset-0",
  {
    variants: {
      variant: { neutral: "", primary: "", inverse: "" },
      appearance: { solid: "", outline: "" },
      active: { true: "", false: "" },
      highlighted: { true: "", false: "" },
      shape: { circle: "", pill: "", bar: "" },
      size: { xs: "outline-1", sm: "outline-1", md: "outline-2" },
    },
    compoundVariants: [
      { appearance: "outline", size: "xs", className: "border-1" },
      { appearance: "outline", size: "md", className: "border-2" },
      { appearance: "outline", size: "sm", className: "border-1" },
      {
        shape: "bar",
        appearance: "outline",
        size: "md",
        className: "border-1",
      },
      {
        shape: "bar",
        appearance: "outline",
        size: "sm",
        className: "border-1",
      },
      {
        shape: "bar",
        appearance: "outline",
        size: "xs",
        className: "border-1",
      },
      {
        appearance: "solid",
        active: false,
        className: "bg-light group-hover/dot:bg-medium",
      },
      {
        appearance: "outline",
        active: false,
        className: "border-light group-hover/dot:border-medium",
      },
      // ── solid ──
      {
        variant: "neutral",
        appearance: "solid",
        active: true,
        className: "bg-primary-base",
      },
      {
        variant: "primary",
        appearance: "solid",
        active: true,
        className: "bg-heavy",
      },
      {
        variant: "inverse",
        appearance: "solid",
        active: true,
        className: "bg-weak",
      },
      {
        variant: "inverse",
        appearance: "solid",
        active: false,
        className: "bg-heavy group-hover/dot:bg-strong",
      },
      // ── outline ──
      {
        variant: "neutral",
        appearance: "outline",
        active: true,
        className: "border-heavy bg-heavy",
      },
      {
        variant: "primary",
        appearance: "outline",
        active: true,
        className: "border-primary-base bg-primary-base",
      },
      {
        variant: "inverse",
        appearance: "outline",
        active: true,
        className: "bg-weak border-weak",
      },
      {
        variant: "inverse",
        appearance: "outline",
        active: false,
        className: "border-heavy group-hover/dot:border-strong",
      },
      // ── Highlighted ──
      {
        variant: "neutral",
        active: true,
        highlighted: true,
        className: "outline-weakest",
      },
      {
        variant: "primary",
        active: true,
        highlighted: true,
        className: "outline-light",
      },
      {
        variant: "inverse",
        active: true,
        highlighted: true,
        className: "outline-heavy",
      },
      // ── Dimensions: shape × size ──
      { shape: "circle", size: "xs", className: "size-1.5" },
      { shape: "circle", size: "sm", className: "size-2" },
      { shape: "circle", size: "md", className: "size-3" },
      { shape: "pill", size: "xs", className: "h-1.5 w-3" },
      { shape: "pill", size: "sm", className: "h-2 w-4" },
      { shape: "pill", size: "md", className: "h-3 w-6" },
      { shape: "bar", size: "xs", className: "h-0.5 w-2" },
      { shape: "bar", size: "sm", className: "h-1 w-4" },
      { shape: "bar", size: "md", className: "h-1.5 w-6" },
    ],
    defaultVariants: {
      variant: "neutral",
      appearance: "solid",
      active: false,
      highlighted: false,
      shape: "circle",
      size: "sm",
    },
  }
)

const stepperHeadingVariants = cva(
  "flex w-full [&>[data-slot=stepper-title]]:min-w-0 [&>[data-slot=stepper-title]]:flex-1",
  {
    variants: {
      size: {
        sm: "gap-component-xs items-start",
        md: "py-1 gap-component-sm items-center",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

const stepperTitleVariants = cva("font-semibold", {
  variants: {
    status: {
      active: "text-body",
      completed: "text-placeholder",
      error: "text-body",
      locked: "text-placeholder",
    },
    size: { sm: "", md: "" },
    tone: {
      default: "",
      accent: "whitespace-nowrap",
      inherit: "text-current whitespace-nowrap",
    },
  },
  compoundVariants: [
    { tone: "default", size: "sm", className: "text-body-md" },
    { tone: "default", size: "md", className: "text-body-xl" },
    { tone: "accent", status: "active", className: "text-info-strong" },
    { tone: "accent", status: "completed", className: "text-success-strong" },
    { tone: "accent", status: "error", className: "text-error-strong" },
    { tone: "accent", status: "locked", className: "text-body" },
    { tone: "accent", size: "sm", className: "text-body-sm" },
    { tone: "accent", size: "md", className: "text-body-md" },
  ],
  defaultVariants: { status: "locked", size: "sm", tone: "default" },
})

type StepperProps = React.ComponentProps<"ol"> & {
  orientation?: StepperOrientation
  size?: StepperSize
  layout?: StepperLayout
  responsive?: boolean
}

function Stepper({
  className,
  orientation = "vertical",
  size = "sm",
  layout = "default",
  responsive = true,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: StepperProps) {
  const isMobile = useIsMobile()
  // A horizontal default/compact stepper can't fit its row of steps on mobile,
  // so stack it vertically below the `md` breakpoint (reuses the vertical mode).
  const effectiveOrientation: StepperOrientation =
    responsive &&
    (layout === "default" || layout === "compact") &&
    orientation === "horizontal" &&
    isMobile
      ? "vertical"
      : orientation
  const value = React.useMemo<StepperContextValue>(
    () => ({ orientation: effectiveOrientation, size, layout }),
    [effectiveOrientation, size, layout]
  )
  return (
    <StepperContext.Provider value={value}>
      <ol
        data-slot="stepper"
        data-orientation={effectiveOrientation}
        data-size={size}
        data-layout={layout}
        aria-label={ariaLabelledby ? undefined : (ariaLabel ?? "Progress")}
        aria-labelledby={ariaLabelledby}
        className={cn(
          stepperVariants({ orientation: effectiveOrientation, size, layout }),
          className
        )}
        {...props}
      />
    </StepperContext.Provider>
  )
}

type StepperTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean
}

function StepperTrigger({
  className,
  asChild = false,
  type,
  children,
  ...props
}: StepperTriggerProps) {
  const ctx = useStepperContext()
  const { status, disabled } = useStepperItemContext()
  const isDisabled = disabled
  const Comp = asChild ? Slot.Root : "button"
  const statusLabel =
    status === "completed"
      ? "Completed"
      : status === "error"
        ? "Error"
        : undefined
  return (
    <Comp
      data-slot="stepper-trigger"
      data-status={status}
      data-disabled={isDisabled || undefined}
      aria-current={status === "active" ? "step" : undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : undefined}
      type={asChild ? undefined : (type ?? "button")}
      disabled={asChild ? undefined : isDisabled || undefined}
      className={cn(
        stepperTriggerVariants({ orientation: ctx.orientation }),
        className
      )}
      {...props}
    >
      {children}
      {!asChild && statusLabel && (
        <span className="sr-only">{statusLabel}</span>
      )}
    </Comp>
  )
}

const STEPPER_CHECK_KEYFRAMES =
  "@keyframes stepper-check-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}"

function StepperCheck({
  className,
  strokeWidth = 3,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <>
      <style href="createui-stepper-check-draw" precedence="medium">
        {STEPPER_CHECK_KEYFRAMES}
      </style>
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path
          d="M5 12.5 10 17 20 6.5"
          pathLength={1}
          className="[animation:stepper-check-draw_0.42s_ease-out_0.09s_backwards] [stroke-dasharray:1] [stroke-dashoffset:0] motion-reduce:[animation:none]"
        />
      </svg>
    </>
  )
}

type StepperDotProps = React.ComponentProps<"span"> & {
  variant?: StepperDotVariant
  appearance?: StepperDotAppearance
  shape?: StepperDotShape
  size?: StepperDotSize
  active?: boolean
  highlighted?: boolean
}

function StepperDot({
  className,
  variant: variantProp,
  appearance = "solid",
  shape = "circle",
  size: sizeProp,
  active: activeProp,
  highlighted = false,
  ...props
}: StepperDotProps) {
  const ctx = useStepperContext()
  const { status } = useStepperItemContext()
  const active = activeProp ?? (status === "active" || status === "completed")
  const variant: StepperDotVariant =
    variantProp ?? (active ? "primary" : "neutral")
  const size: StepperDotSize = sizeProp ?? (ctx.size === "sm" ? "sm" : "md")
  return (
    <span
      data-slot="stepper-dot"
      data-variant={variant}
      data-appearance={appearance}
      data-shape={shape}
      data-size={size}
      data-active={active || undefined}
      data-highlighted={highlighted || undefined}
      className={cn(
        stepperDotVariants({
          variant,
          appearance,
          active,
          highlighted,
          shape,
          size,
        }),
        "transition-all duration-300 ease-out motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

function stepperDotsGap(size: StepperDotSize): string {
  return size === "xs" ? "gap-0.5" : size === "sm" ? "gap-1" : "gap-1.5"
}

type StepperDotsProps = React.ComponentProps<"div"> & {
  count: number
  activeIndex?: number
  defaultActiveIndex?: number
  onActiveIndexChange?: (index: number) => void
  interactive?: boolean
  shape?: StepperDotShape
  variant?: StepperDotVariant
  appearance?: StepperDotAppearance
  highlighted?: boolean
  size?: StepperDotSize
  label?: string
}

function StepperDots({
  className,
  count,
  activeIndex: activeIndexProp,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  interactive = true,
  shape = "circle",
  variant = "primary",
  appearance = "solid",
  highlighted = false,
  size: sizeProp,
  label = "Progress",
  ...props
}: StepperDotsProps) {
  const ctx = useStepperContext()
  const size: StepperDotSize = sizeProp ?? (ctx.size === "sm" ? "sm" : "md")
  const [internal, setInternal] = React.useState(defaultActiveIndex)
  const activeIndex = activeIndexProp ?? internal
  const setActive = (i: number) => {
    if (activeIndexProp == null) setInternal(i)
    onActiveIndexChange?.(i)
  }

  const current = Math.min(count, Math.max(1, activeIndex + 1))
  return (
    <div
      data-slot="stepper-dots"
      data-shape={shape}
      role={interactive ? "group" : "progressbar"}
      aria-label={label}
      aria-valuemin={interactive ? undefined : 1}
      aria-valuemax={interactive ? undefined : count}
      aria-valuenow={interactive ? undefined : current}
      aria-valuetext={interactive ? undefined : `Step ${current} of ${count}`}
      className={cn("flex items-center", stepperDotsGap(size), className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex
        const dotShape: StepperDotShape =
          shape === "pill" ? (isActive ? "pill" : "circle") : shape
        const node = (
          <StepperDot
            variant={variant}
            appearance={appearance}
            size={size}
            active={isActive}
            highlighted={isActive && highlighted}
            shape={dotShape}
          />
        )
        if (!interactive) return <React.Fragment key={i}>{node}</React.Fragment>
        return (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Step ${i + 1} of ${count}`}
            aria-current={isActive ? "step" : undefined}
            className="group/dot focus-visible:outline-primary-base inline-flex cursor-pointer rounded-full outline-offset-2 outline-none focus-visible:outline-2"
          >
            {node}
          </button>
        )
      })}
    </div>
  )
}

function StepperHeading({ className, ...props }: React.ComponentProps<"div">) {
  const ctx = useStepperContext()
  return (
    <div
      data-slot="stepper-heading"
      data-size={ctx.size}
      className={cn(stepperHeadingVariants({ size: ctx.size }), className)}
      {...props}
    />
  )
}

type StepperTitleProps = React.ComponentProps<"span"> & {
  status?: StepperStatus
  size?: StepperSize
  tone?: StepperTextTone
}

function StepperTitle({
  className,
  status: statusProp,
  size: sizeProp,
  tone: toneProp,
  ...props
}: StepperTitleProps) {
  const ctx = useStepperContext()
  const { status: itemStatus, disabled } = useStepperItemContext()
  const status = statusProp ?? itemStatus
  const size = sizeProp ?? ctx.size
  const tone = toneProp ?? layoutTextTone(ctx.layout)
  return (
    <span
      data-slot="stepper-title"
      data-status={status}
      data-size={size}
      className={cn(
        stepperTitleVariants({ status, size, tone }),
        disabled && "text-disabled",
        className
      )}
      {...props}
    />
  )
}

const stepperBadgeItemVariants = cva(
  "group/stepper-item relative flex items-center gap-2.5 transition-colors duration-300 ease-out motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      status: {
        active: "bg-info-weakest text-info-strong",
        completed: "bg-success-weakest text-success-strong",
        error: "bg-error-weakest text-error-strong",
        locked: "bg-weak text-body",
      },
      size: {
        sm: "rounded-component-lg px-component-md py-component-sm text-ui-control-md [&_svg]:size-4",
        md: "rounded-component-xl px-component-lg py-component-md text-ui-control-lg [&_svg]:size-5",
      },
    },
    defaultVariants: { status: "locked", size: "sm" },
  }
)

function badgeStatusIcon(status: StepperStatus): React.ReactNode {
  switch (status) {
    case "active":
      return <RiArrowRightLine />
    case "completed":
      return <StepperCheck />
    case "error":
      return <RiErrorWarningLine />
    default:
      return null // locked
  }
}

type StepperBadgeItemProps = Omit<React.ComponentProps<"li">, "onClick"> & {
  status?: StepperStatus
  size?: StepperSize
  leadIcon?: React.ReactNode
  number?: React.ReactNode
  title?: React.ReactNode
  statusIcon?: React.ReactNode
  showStatusIcon?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function StepperBadgeItem({
  className,
  status: statusProp,
  size: sizeProp,
  leadIcon,
  number,
  title,
  statusIcon: statusIconProp,
  showStatusIcon = true,
  disabled: disabledProp,
  onClick,
  ...props
}: StepperBadgeItemProps) {
  const ctx = useStepperContext()
  const status = statusProp ?? "locked"
  const size = sizeProp ?? ctx.size
  const disabled = status === "active" ? false : !!disabledProp
  const interactive = !disabled && onClick != null
  const statusIcon = showStatusIcon
    ? (statusIconProp ?? badgeStatusIcon(status))
    : null
  const autoStatusLabel =
    showStatusIcon && statusIconProp == null
      ? status === "completed"
        ? "Completed"
        : status === "error"
          ? "Error"
          : undefined
      : undefined
  const value = React.useMemo<StepperItemContextValue>(
    () => ({ status, disabled }),
    [status, disabled]
  )

  const heading = (
    <StepperHeading className="items-center gap-2.5 py-0">
      {leadIcon != null && <span className="shrink-0">{leadIcon}</span>}
      {number != null && (
        <span className="shrink-0 font-semibold whitespace-nowrap">
          {number}
        </span>
      )}
      {title != null && (
        <StepperTitle tone="inherit" size={size} className="truncate">
          {title}
        </StepperTitle>
      )}
      {statusIcon != null && <span className="shrink-0">{statusIcon}</span>}
      {autoStatusLabel && <span className="sr-only">{autoStatusLabel}</span>}
    </StepperHeading>
  )

  const barClass = cn(
    stepperBadgeItemVariants({ status, size }),
    disabled && "bg-weakest text-disabled",
    className
  )
  const liSemantics = {
    "data-slot": "stepper-item",
    "data-status": status,
    "data-layout": "badge",
    "data-size": size,
    "data-disabled": disabled || undefined,
    "aria-current": (status === "active" ? "step" : undefined) as
      | "step"
      | undefined,
  }

  return (
    <StepperItemContext.Provider value={value}>
      {interactive ? (
        <li {...liSemantics} {...props}>
          <StepperTrigger
            onClick={onClick}
            className={cn(barClass, "w-full cursor-pointer flex-row")}
          >
            {heading}
          </StepperTrigger>
        </li>
      ) : (
        <li {...liSemantics} className={barClass} {...props}>
          {heading}
        </li>
      )}
    </StepperItemContext.Provider>
  )
}

export {
  Stepper,
  StepperTrigger,
  StepperDot,
  StepperDots,
  StepperHeading,
  StepperTitle,
  StepperBadgeItem,
  useStepperContext,
  useStepperItemContext,
  stepperVariants,
  stepperTriggerVariants,
  stepperDotVariants,
  stepperHeadingVariants,
  stepperTitleVariants,
  stepperBadgeItemVariants,
}

export type {
  StepperProps,
  StepperTriggerProps,
  StepperDotProps,
  StepperDotsProps,
  StepperTitleProps,
  StepperBadgeItemProps,
  StepperOrientation,
  StepperSize,
  StepperStatus,
  StepperLayout,
  StepperTextTone,
  StepperDotVariant,
  StepperDotAppearance,
  StepperDotShape,
  StepperDotSize,
  StepperContextValue,
  StepperItemContextValue,
}
