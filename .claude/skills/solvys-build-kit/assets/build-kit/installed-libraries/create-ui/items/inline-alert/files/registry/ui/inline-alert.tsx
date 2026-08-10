"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { CloseButton } from "@/registry/ui/close-button"

type Variant =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "away"

type Appearance = "solid" | "soft" | "outline" | "default"

type Layout = "horizontal" | "vertical"

const variantSlots: Record<Variant, string> = {
  primary: "",
  neutral: "",
  danger: "",
  success: "",
  warning: "",
  info: "",
  away: "",
}

type InlineAlertContextValue = {
  variant: Variant
  appearance: Appearance
  layout: Layout
  dismiss: () => void
}

const InlineAlertContext = React.createContext<InlineAlertContextValue>({
  variant: "primary",
  appearance: "default",
  layout: "horizontal",
  dismiss: () => {},
})

function useInlineAlertContext() {
  return React.useContext(InlineAlertContext)
}

const inlineAlertVariants = cva(
  "gap-3 relative flex items-start overflow-clip rounded-xl border border-transparent",
  {
    variants: {
      variant: variantSlots,
      appearance: {
        solid: "text-static",
        soft: "text-strongest backdrop-blur-3xl",
        outline: "bg-static",
        default: "bg-weakest text-strongest border-light shadow-neutral-xs",
      },
      layout: {
        horizontal: [
          // base
          "w-full px-section-sm py-component-lg",
          // has-[close]
          "has-[[data-slot=inline-alert-close]]:pr-12",
        ],
        vertical: [
          // base
          "p-component-lg",
          // has-[close]
          "has-[[data-slot=inline-alert-close]]:[&_[data-slot=inline-alert-title]]:pr-6",
        ],
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        appearance: "solid",
        className: "bg-primary-strong border-primary-strongest",
      },
      {
        variant: "neutral",
        appearance: "solid",
        className: "bg-stable-strong border-stable-strongest",
      },
      {
        variant: "danger",
        appearance: "solid",
        className: "bg-error-strong border-error-strongest",
      },
      {
        variant: "success",
        appearance: "solid",
        className: "bg-success-strong border-success-strongest",
      },
      {
        variant: "warning",
        appearance: "solid",
        className: "bg-warning-strong border-warning-strongest",
      },
      {
        variant: "info",
        appearance: "solid",
        className: "bg-info-strong border-info-strongest",
      },
      {
        variant: "away",
        appearance: "solid",
        className: "bg-away-strong border-away-strongest",
      },

      {
        variant: "primary",
        appearance: "soft",
        className: "bg-primary-weakest",
      },
      {
        variant: "neutral",
        appearance: "soft",
        className: "bg-stable-weak",
      },
      { variant: "danger", appearance: "soft", className: "bg-error-weak" },
      {
        variant: "success",
        appearance: "soft",
        className: "bg-success-weak",
      },
      {
        variant: "warning",
        appearance: "soft",
        className: "bg-warning-weak",
      },
      { variant: "info", appearance: "soft", className: "bg-info-weak" },
      { variant: "away", appearance: "soft", className: "bg-away-weak" },

      {
        variant: "primary",
        appearance: "outline",
        className: "text-primary-strong border-primary-weakest",
      },
      {
        variant: "neutral",
        appearance: "outline",
        className: "text-stable-strong border-stable-weak",
      },
      {
        variant: "danger",
        appearance: "outline",
        className: "text-error-strong border-error-weak",
      },
      {
        variant: "success",
        appearance: "outline",
        className: "text-success-strong border-success-weak",
      },
      {
        variant: "warning",
        appearance: "outline",
        className: "text-warning-strong border-warning-weak",
      },
      {
        variant: "info",
        appearance: "outline",
        className: "text-info-strong border-info-weak",
      },
      {
        variant: "away",
        appearance: "outline",
        className: "text-away-strong border-away-weak",
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "default",
      layout: "horizontal",
    },
  }
)

const softOutlineIconColors: Record<Variant, string> = {
  primary: "text-primary-strong",
  neutral: "text-stable-strong",
  danger: "text-error-strong",
  success: "text-success-strong",
  warning: "text-warning-strong",
  info: "text-info-strong",
  away: "text-away-strong",
}

const iconColors: Record<Appearance, Record<Variant, string>> = {
  default: {
    primary: "text-primary-base",
    neutral: "text-stable-base",
    danger: "text-error-base",
    success: "text-success-base",
    warning: "text-warning-base",
    info: "text-info-base",
    away: "text-away-base",
  },
  solid: {
    primary: "text-static",
    neutral: "text-static",
    danger: "text-static",
    success: "text-static",
    warning: "text-static",
    info: "text-static",
    away: "text-static",
  },
  soft: softOutlineIconColors,
  outline: softOutlineIconColors,
}

type InlineAlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof inlineAlertVariants> & {
    onDismiss?: () => void
  }

function InlineAlert({
  className,
  variant = "primary",
  appearance = "default",
  layout = "horizontal",
  children,
  onDismiss,
  ...props
}: InlineAlertProps) {
  const [dismissed, setDismissed] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  const dismiss = React.useCallback(() => {
    setDismissed(true)
  }, [])

  const handleTransitionEnd = React.useCallback(() => {
    if (dismissed) {
      setHidden(true)
      onDismiss?.()
    }
  }, [dismissed, onDismiss])

  if (hidden) return null

  return (
    <InlineAlertContext.Provider
      value={{
        variant: variant!,
        appearance: appearance!,
        layout: layout!,
        dismiss,
      }}
    >
      <div
        data-slot="inline-alert"
        data-variant={variant}
        data-appearance={appearance}
        data-layout={layout}
        data-dismissed={dismissed || undefined}
        role="alert"
        className={cn(
          inlineAlertVariants({ variant, appearance, layout }),
          "transition-all duration-300 ease-out",
          dismissed && "scale-95 opacity-0",
          className
        )}
        onTransitionEnd={handleTransitionEnd}
        {...props}
      >
        {children}
      </div>
    </InlineAlertContext.Provider>
  )
}

function InlineAlertIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { variant, appearance } = useInlineAlertContext()

  return (
    <span
      data-slot="inline-alert-icon"
      className={cn(
        "shrink-0 [&_svg]:size-5",
        iconColors[appearance][variant],
        className
      )}
      {...props}
    />
  )
}

function InlineAlertContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { layout } = useInlineAlertContext()

  return (
    <div
      data-slot="inline-alert-content"
      className={cn(
        "gap-component-md flex min-w-0 flex-1",
        layout === "horizontal" && "flex-row items-center",
        layout === "vertical" && "flex-col",
        className
      )}
      {...props}
    />
  )
}

function InlineAlertHeading({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { layout } = useInlineAlertContext()

  return (
    <div
      data-slot="inline-alert-heading"
      className={cn(
        "flex flex-col items-start gap-1",
        layout === "horizontal" && "flex-1",
        layout === "vertical" && "w-full",
        className
      )}
      {...props}
    />
  )
}

function InlineAlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  const { layout } = useInlineAlertContext()

  return (
    <p
      data-slot="inline-alert-title"
      className={cn(
        "text-ui-control-md font-semibold",
        layout === "horizontal" && "min-w-0 truncate",
        className
      )}
      {...props}
    />
  )
}

function InlineAlertDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { appearance, layout } = useInlineAlertContext()

  return (
    <p
      data-slot="inline-alert-description"
      className={cn(
        "text-paragraph-xs w-full",
        layout === "horizontal" && "line-clamp-2",
        layout === "vertical" && "line-clamp-5",
        appearance === "default" && "text-body",
        className
      )}
      {...props}
    />
  )
}

function InlineAlertActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { layout } = useInlineAlertContext()

  return (
    <div
      data-slot="inline-alert-actions"
      className={cn(
        "gap-component-xs flex items-center",
        layout === "horizontal" && "shrink-0",
        layout === "vertical" && "w-full flex-wrap",
        className
      )}
      {...props}
    />
  )
}

function InlineAlertClose({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof CloseButton>) {
  const { appearance, dismiss } = useInlineAlertContext()
  const closeVariant = appearance === "solid" ? "inverse" : "neutral"

  return (
    <CloseButton
      data-slot="inline-alert-close"
      variant={closeVariant}
      appearance="soft"
      size="md"
      shape="pill"
      className={cn(
        "right-component-lg top-component-lg absolute shrink-0",
        className
      )}
      onClick={(e) => {
        dismiss()
        onClick?.(e)
      }}
      {...props}
    />
  )
}

export {
  InlineAlert,
  InlineAlertIcon,
  InlineAlertContent,
  InlineAlertHeading,
  InlineAlertTitle,
  InlineAlertDescription,
  InlineAlertActions,
  InlineAlertClose,
  inlineAlertVariants,
  useInlineAlertContext,
}
