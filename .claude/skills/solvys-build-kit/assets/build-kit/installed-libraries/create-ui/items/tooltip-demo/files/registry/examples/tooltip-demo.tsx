"use client"

import { RiFileCopyLine, RiSidebarFoldLine } from "@remixicon/react"

import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipDemo() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-24">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="neutral-light" appearance="ghost" size="md">
              <RiFileCopyLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent showArrow variant="neutral" side="left">
            Copy to clipboard
          </TooltipContent>
        </Tooltip>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="primary" appearance="soft" size="md">
              Publish
            </Button>
          </TooltipTrigger>
          <TooltipContent showArrow variant="primary" side="top">
            Complete all required fields to publish
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-24">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="primary" appearance="soft" size="md">
              ⌘B
            </Button>
          </TooltipTrigger>
          <TooltipContent showArrow variant="primary" side="bottom">
            Bold ⌘B
          </TooltipContent>
        </Tooltip>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button
              variant="neutral-light"
              appearance="ghost"
              size="md"
              iconOnly
            >
              <RiSidebarFoldLine />
            </Button>
          </TooltipTrigger>
          <TooltipContent showArrow variant="neutral" side="right">
            Close Sidebar
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
