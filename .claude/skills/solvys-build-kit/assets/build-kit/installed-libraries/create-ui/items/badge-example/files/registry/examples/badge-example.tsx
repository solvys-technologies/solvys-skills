import * as React from "react"
import { RiSparklingFill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"

// ---------------------------------------------------------------------------
// Constants — order mirrors Figma node 3252-58246
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "neutral",
  "neutral-static",
  "inverse",
  "inverse-static",
  "success",
  "danger",
  "info",
  "warning",
  "verified",
  "away",
  "highlighted",
] as const
const appearances = ["solid", "outline", "soft", "ghost"] as const
const sizes = ["md", "sm", "xs"] as const
const shapes = ["rounded", "pill"] as const
const contentModes = ["text", "number", "icon"] as const

type Variant = (typeof variants)[number]
type Appearance = (typeof appearances)[number]
type Size = (typeof sizes)[number]
type Shape = (typeof shapes)[number]
type ContentMode = (typeof contentModes)[number]

const MemoIcon = React.memo(function MemoIcon() {
  return <RiSparklingFill />
})

// ---------------------------------------------------------------------------

function BadgeCell({
  variant,
  appearance,
  size,
  shape,
  mode,
  disabled,
}: {
  variant: Variant
  appearance: Appearance
  size: Size
  shape: Shape
  mode: ContentMode
  disabled?: boolean
}) {
  if (mode === "icon") {
    return (
      <Badge
        variant={variant}
        appearance={appearance}
        size={size}
        shape={shape}
        disabled={disabled}
        iconOnly
      >
        <MemoIcon />
      </Badge>
    )
  }

  if (mode === "number") {
    return (
      <Badge
        variant={variant}
        appearance={appearance}
        size={size}
        shape={shape}
        disabled={disabled}
        numberOnly
      >
        9
      </Badge>
    )
  }

  return (
    <Badge
      variant={variant}
      appearance={appearance}
      size={size}
      shape={shape}
      disabled={disabled}
      leading={<MemoIcon />}
    >
      Badge
    </Badge>
  )
}

// ---------------------------------------------------------------------------

const SizeTable = React.memo(function SizeTable({
  size,
  shape,
  disabled,
}: {
  size: Size
  shape: Shape
  disabled?: boolean
}) {
  return (
    <div className="space-y-3">
      <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
        {size}
      </p>
      <table className="border-collapse">
        <thead>
          <tr>
            <th />
            {appearances.map((a) => (
              <th
                key={a}
                colSpan={contentModes.length}
                className="text-strongest px-3 pt-3 pb-2 text-center text-[10px] font-semibold tracking-wider uppercase"
              >
                {a}
              </th>
            ))}
          </tr>
          <tr>
            <th />
            {appearances.map((a) =>
              contentModes.map((m) => (
                <th
                  key={`${a}-${m}`}
                  className="text-disabled px-2 pb-2 text-center text-[9px] font-medium uppercase"
                >
                  {m}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => {
            const isInverse = v === "inverse" || v === "inverse-static"
            return (
              <tr key={v}>
                <td
                  className={cn(
                    "pr-4 pl-3 text-right align-middle text-[11px] font-semibold whitespace-nowrap uppercase",
                    isInverse
                      ? "bg-strongest text-weakest rounded-l-xl"
                      : "text-strongest"
                  )}
                >
                  {v}
                </td>
                {appearances.map((a, ai) =>
                  contentModes.map((m, mi) => {
                    const isLastCell =
                      ai === appearances.length - 1 &&
                      mi === contentModes.length - 1
                    return (
                      <td
                        key={`${a}-${m}`}
                        className={cn(
                          "px-4 py-2 text-center align-middle",
                          isInverse && "bg-strongest",
                          isInverse && isLastCell && "rounded-r-xl"
                        )}
                      >
                        <BadgeCell
                          variant={v}
                          appearance={a}
                          size={size}
                          shape={shape}
                          mode={m}
                          disabled={disabled}
                        />
                      </td>
                    )
                  })
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
})

// ---------------------------------------------------------------------------

const ShapeSection = React.memo(function ShapeSection({
  shape,
}: {
  shape: Shape
}) {
  return (
    <SectionFrame title={shape === "rounded" ? "Rounded" : "Pill"}>
      <div className="flex flex-col gap-10 overflow-x-auto">
        {sizes.map((size) => (
          <SizeTable key={size} size={size} shape={shape} />
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function BadgeExample() {
  return (
    <div className="flex flex-col gap-16">
      {shapes.map((shape) => (
        <ShapeSection key={shape} shape={shape} />
      ))}
      <SectionFrame title="Disabled">
        <div className="flex flex-col gap-10 overflow-x-auto">
          {sizes.map((size) => (
            <SizeTable key={size} size={size} shape="rounded" disabled />
          ))}
        </div>
      </SectionFrame>
    </div>
  )
}
