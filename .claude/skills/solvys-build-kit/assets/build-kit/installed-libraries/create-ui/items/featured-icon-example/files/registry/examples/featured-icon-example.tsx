import * as React from "react"
import { RiFlashlightFill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { FeaturedIcon } from "@/registry/pro/ui/featured-icon"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "neutral",
  "danger",
  "success",
  "warning",
  "info",
  "away",
] as const
const appearances = ["solid", "soft", "neutral", "outline"] as const
const types = ["stylish", "plain"] as const
const sizes = ["2xs", "xs", "sm", "md", "lg", "xl"] as const
const shapes = ["rounded", "circle"] as const

const labelClass = "text-disabled text-[10px] font-medium uppercase"
const headingClass =
  "text-body text-[10px] font-semibold tracking-wider uppercase"

// ---------------------------------------------------------------------------

const VariantAppearanceMatrix = React.memo(function VariantAppearanceMatrix({
  type,
}: {
  type: (typeof types)[number]
}) {
  return (
    <SectionFrame title={`Variants × Appearances — ${type}`}>
      <table className="border-separate border-spacing-x-5 border-spacing-y-2">
        <thead>
          <tr>
            <th />
            {appearances.map((appearance) => (
              <th
                key={appearance}
                className={cn("pb-1 text-center", labelClass)}
              >
                {appearance}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant}>
              <td
                className={cn(
                  "text-strongest pr-4 text-right align-middle text-[11px] font-semibold uppercase"
                )}
              >
                {variant}
              </td>
              {appearances.map((appearance) => (
                <td key={appearance} className="text-center">
                  <FeaturedIcon
                    variant={variant}
                    appearance={appearance}
                    type={type}
                    size="md"
                  >
                    <RiFlashlightFill />
                  </FeaturedIcon>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const SizesSection = React.memo(function SizesSection() {
  return (
    <SectionFrame title="Sizes">
      <div className="flex flex-col gap-8">
        {types.map((type) => (
          <div key={type} className="flex flex-col gap-4">
            <p className={headingClass}>{type}</p>
            <div className="flex flex-col gap-4">
              {appearances.map((appearance) => (
                <div key={appearance} className="flex items-center gap-5">
                  <span className={cn("w-14 shrink-0", labelClass)}>
                    {appearance}
                  </span>
                  <div className="flex items-center gap-5">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <FeaturedIcon
                          appearance={appearance}
                          type={type}
                          size={size}
                        >
                          <RiFlashlightFill />
                        </FeaturedIcon>
                        <span className={labelClass}>{size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const ShapesSection = React.memo(function ShapesSection() {
  return (
    <SectionFrame title="Shapes">
      <div className="flex flex-col gap-4">
        {shapes.map((shape) => (
          <div key={shape} className="flex items-center gap-5">
            <span className={cn("w-14 shrink-0", labelClass)}>{shape}</span>
            <div className="flex items-center gap-5">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <FeaturedIcon variant="danger" shape={shape} size={size}>
                    <RiFlashlightFill />
                  </FeaturedIcon>
                  <span className={labelClass}>{size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function FeaturedIconExample() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-16">
        {types.map((type) => (
          <VariantAppearanceMatrix key={type} type={type} />
        ))}
      </div>
      <SizesSection />
      <ShapesSection />
    </div>
  )
}
