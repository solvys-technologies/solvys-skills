"use client"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipExample() {
  return (
    <ExampleWrapper>
      <TooltipBasic />
      <TooltipVariants />
      <TooltipSides />
      <TooltipWithoutArrow />
      <TooltipLongContent />
    </ExampleWrapper>
  )
}

function TooltipBasic() {
  return (
    <Example title="Basic">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            Hover me
          </Button>
        </TooltipTrigger>
        <TooltipContent showArrow>Add to library</TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipVariants() {
  const variants = ["primary", "neutral", "inverse", "danger", "info"] as const
  return (
    <Example title="Variants">
      <div className="flex flex-wrap gap-4">
        {variants.map((variant) => (
          <Tooltip key={variant}>
            <TooltipTrigger asChild>
              <Button appearance="outline" size="sm">
                {variant}
              </Button>
            </TooltipTrigger>
            <TooltipContent variant={variant} showArrow>
              This is a {variant} tooltip
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Example>
  )
}

function TooltipSides() {
  const sides = ["top", "right", "bottom", "left"] as const
  return (
    <Example title="Sides">
      <div className="flex flex-wrap gap-4">
        {sides.map((side) => (
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
    </Example>
  )
}

function TooltipWithoutArrow() {
  return (
    <Example title="Without Arrow">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            No arrow
          </Button>
        </TooltipTrigger>
        <TooltipContent>This tooltip has no arrow</TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipLongContent() {
  return (
    <Example title="Long Content">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button appearance="outline" size="sm">
            Hover for details
          </Button>
        </TooltipTrigger>
        <TooltipContent showArrow>
          To learn more about how this works, check out the docs. If you have
          any questions, please reach out to us.
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}
