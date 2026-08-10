import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

const statusBadgeVariants = cva(
  "outline-static-white inline-block shrink-0 rounded-full outline",
  {
    variants: {
      variant: {
        primary: "bg-primary-500",
        danger: "bg-red-500",
        success: "bg-green-500",
        warning: "bg-orange-500",
        info: "bg-blue-500",
        highlighted: "bg-fuchsia-500",
        away: "bg-yellow-500",
        verified: "bg-sky-500",
        cyan: "bg-cyan-500",
        lime: "bg-lime-500",
        neutral: "bg-gray-500",
        white: "outline-0 bg-white",
      },
      size: {
        xs: "size-1",
        sm: "size-1.5",
        md: "size-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type StatusBadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof statusBadgeVariants>

function StatusBadge({
  className,
  variant = "primary",
  size = "md",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      data-slot="status-badge"
      role="status"
      className={cn(statusBadgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
