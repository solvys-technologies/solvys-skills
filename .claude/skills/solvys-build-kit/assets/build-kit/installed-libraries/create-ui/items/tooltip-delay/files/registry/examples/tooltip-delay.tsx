"use client"

import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            Instant
          </Button>
        </TooltipTrigger>
        <TooltipContent showArrow>Opens with no delay</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            Delayed 400ms
          </Button>
        </TooltipTrigger>
        <TooltipContent showArrow>Opens after a pause</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={800}>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            Delayed 800ms
          </Button>
        </TooltipTrigger>
        <TooltipContent showArrow>Opens after a longer pause</TooltipContent>
      </Tooltip>
    </div>
  )
}
