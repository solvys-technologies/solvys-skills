import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

const separatorVariants = cva("border-light", {
  variants: {
    variant: {
      solid: "border-solid",
    },
    direction: {
      horizontal: "h-0 border-t",
      vertical: "w-0 border-l",
    },
  },
  defaultVariants: {
    variant: "solid",
    direction: "horizontal",
  },
})

type SeparatorProps = React.ComponentProps<"div"> &
  VariantProps<typeof separatorVariants> & {
    align?: "start" | "center" | "end"
  }

function Separator({
  className,
  align = "center",
  variant = "solid",
  direction = "horizontal",
  children,
  ...props
}: SeparatorProps) {
  const isVertical = direction === "vertical"

  if (!children) {
    return (
      <div
        data-slot="separator"
        role="separator"
        data-variant={variant}
        data-direction={direction}
        aria-orientation={isVertical ? "vertical" : "horizontal"}
        className={cn(
          separatorVariants({ variant, direction }),
          isVertical ? "h-full" : "w-full",
          className
        )}
        {...props}
      />
    )
  }

  const lineClass = separatorVariants({
    variant,
    direction,
    className: "flex-1",
  })

  return (
    <div
      data-slot="separator"
      role="separator"
      data-variant={variant}
      data-direction={direction}
      aria-orientation="horizontal"
      className={cn(
        "flex items-center gap-3",
        isVertical ? "h-full flex-col" : "w-full",
        className
      )}
      {...props}
    >
      {align !== "start" && <span aria-hidden="true" className={lineClass} />}
      <span
        data-slot="separator-content"
        className="text-placeholder text-ui-control-md inline-flex shrink-0 items-center [&>svg]:size-6"
      >
        {children}
      </span>
      {align !== "end" && <span aria-hidden="true" className={lineClass} />}
    </div>
  )
}

export { Separator, separatorVariants }
