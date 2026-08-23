"use client"

import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipLongContent() {
  return (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button appearance="outline" size="sm">
          Hover for details
        </Button>
      </TooltipTrigger>
      <TooltipContent showArrow>
        To learn more about how this works, check out the docs. If you have any
        questions, please reach out to us.
      </TooltipContent>
    </Tooltip>
  )
}
