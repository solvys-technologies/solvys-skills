"use client"

import { RiAddCircleFill } from "@create-ui/assets/icons"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"
import { Button } from "@/registry/ui/button"

export default function InfoTooltipExample() {
  return (
    <ExampleWrapper>
      <InfoTooltipBasic />
      <InfoTooltipVariants />
      <InfoTooltipSizes />
      <InfoTooltipSides />
      <InfoTooltipArrowPositions />
      <InfoTooltipLongContent />
    </ExampleWrapper>
  )
}

function InfoTooltipBasic() {
  return (
    <Example title="Basic">
      <InfoTooltip variant="primary" size="sm" defaultOpen showArrow>
        Need help? Use the example format shown for guidance.
        <Button appearance="solid" size="md" iconOnly>
          <RiAddCircleFill />
        </Button>
      </InfoTooltip>
    </Example>
  )
}

function InfoTooltipVariants() {
  const variants = ["primary", "neutral", "inverse", "danger", "info"] as const
  return (
    <Example title="Variants">
      <div className="flex flex-wrap gap-4">
        {variants.map((variant) => (
          <InfoTooltip key={variant} variant={variant} size="sm" showArrow>
            This is a {variant} tooltip
          </InfoTooltip>
        ))}
      </div>
    </Example>
  )
}

function InfoTooltipSizes() {
  const sizes = ["sm", "md", "lg"] as const
  return (
    <Example title="Sizes">
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <InfoTooltip key={size} variant="primary" size={size} showArrow>
            This is a {size} tooltip
          </InfoTooltip>
        ))}
      </div>
    </Example>
  )
}

function InfoTooltipSides() {
  const sides = ["top", "right", "bottom", "left"] as const
  return (
    <Example title="Sides">
      <div className="flex flex-wrap gap-4">
        {sides.map((side) => (
          <InfoTooltip
            key={side}
            variant="primary"
            size="sm"
            side={side}
            showArrow
          >
            Tooltip on {side}
          </InfoTooltip>
        ))}
      </div>
    </Example>
  )
}

function InfoTooltipArrowPositions() {
  const positions = [
    { side: "top", align: "start", label: "Top Start" },
    { side: "top", align: "center", label: "Top Center" },
    { side: "top", align: "end", label: "Top End" },
    { side: "right", align: "start", label: "Right Start" },
    { side: "right", align: "center", label: "Right Center" },
    { side: "right", align: "end", label: "Right End" },
    { side: "bottom", align: "start", label: "Bottom Start" },
    { side: "bottom", align: "center", label: "Bottom Center" },
    { side: "bottom", align: "end", label: "Bottom End" },
    { side: "left", align: "start", label: "Left Start" },
    { side: "left", align: "center", label: "Left Center" },
    { side: "left", align: "end", label: "Left End" },
  ] as const
  return (
    <Example title="Arrow Positions">
      <div className="flex flex-wrap gap-8">
        {positions.map(({ side, align, label }) => (
          <InfoTooltip
            key={label}
            variant="primary"
            size="sm"
            side={side}
            align={align}
            showArrow
          >
            {label}
          </InfoTooltip>
        ))}
      </div>
    </Example>
  )
}

function InfoTooltipLongContent() {
  const positions = [
    { side: "top", align: "start", label: "Top Start" },
    { side: "top", align: "center", label: "Top Center" },
    { side: "top", align: "end", label: "Top End" },
    { side: "right", align: "start", label: "Right Start" },
    { side: "right", align: "center", label: "Right Center" },
    { side: "right", align: "end", label: "Right End" },
    { side: "bottom", align: "start", label: "Bottom Start" },
    { side: "bottom", align: "center", label: "Bottom Center" },
    { side: "bottom", align: "end", label: "Bottom End" },
    { side: "left", align: "start", label: "Left Start" },
    { side: "left", align: "center", label: "Left Center" },
    { side: "left", align: "end", label: "Left End" },
  ] as const
  return (
    <Example title="Long Content">
      <div className="flex flex-wrap gap-8">
        {positions.map(({ side, align, label }) => (
          <InfoTooltip
            key={label}
            variant="primary"
            size="sm"
            side={side}
            align={align}
            showArrow
          >
            {label} — to learn more about how this works, check out the docs. If
            you have any questions, please reach out to us.
          </InfoTooltip>
        ))}
      </div>
    </Example>
  )
}
