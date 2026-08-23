"use client"

import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const SIDES = ["top", "left", "bottom", "right"] as const

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {SIDES.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button appearance="outline" size="sm">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side} showArrow>
            Tooltip on {side}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
