"use client"

import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithoutArrow() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            With arrow
          </Button>
        </TooltipTrigger>
        <TooltipContent showArrow>Pointer attached</TooltipContent>
      </Tooltip>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            No arrow
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clean floating chip</TooltipContent>
      </Tooltip>
    </div>
  )
}
