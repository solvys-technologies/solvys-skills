"use client"

import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const VARIANTS = ["primary", "neutral", "inverse", "danger", "info"] as const

export default function TooltipVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {VARIANTS.map((variant) => (
        <Tooltip key={variant}>
          <TooltipTrigger asChild>
            <Button appearance="outline" size="sm">
              {variant}
            </Button>
          </TooltipTrigger>
          <TooltipContent variant={variant} showArrow>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} tooltip
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
