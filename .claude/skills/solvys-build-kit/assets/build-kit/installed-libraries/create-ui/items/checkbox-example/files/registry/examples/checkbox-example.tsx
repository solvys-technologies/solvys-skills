"use client"

import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { Checkbox } from "@/registry/ui/checkbox"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "neutral",
  "inverse",
  "danger",
  "success",
  "info",
] as const
const sizes = ["xs", "sm", "md"] as const
const shapes = ["rounded", "pill", "square"] as const
const states = [
  { key: "default", label: "Default", props: {} },
  { key: "disabled", label: "Disabled", props: { disabled: true } },
] as const
const checkedStates = [
  { key: "unchecked", label: "Unchecked", checked: false as const },
  { key: "checked", label: "Checked", checked: true as const },
  {
    key: "indeterminate",
    label: "Indeterminate",
    checked: "indeterminate" as const,
  },
]

// ---------------------------------------------------------------------------
// Variant × State matrix
// ---------------------------------------------------------------------------

const VariantStateMatrix = React.memo(function VariantStateMatrix() {
  return (
    <SectionFrame title="Variants × States">
      <table className="border-separate border-spacing-x-6 border-spacing-y-0">
        <thead>
          <tr>
            <th />
            {variants.map((v) => (
              <th
                key={v}
                className={cn(
                  "px-4 pt-4 pb-3 text-center text-[10px] font-semibold tracking-wider uppercase",
                  v === "inverse"
                    ? "bg-strongest text-weakest rounded-t-xl"
                    : "text-body"
                )}
              >
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((s, si) =>
            checkedStates.map((cs, ci) => {
              const isLastRow =
                si === states.length - 1 && ci === checkedStates.length - 1
              return (
                <tr key={`${s.key}-${cs.key}`}>
                  <td
                    className={cn(
                      "text-strongest pr-6 text-right align-middle text-[11px] font-semibold uppercase",
                      (si > 0 || ci > 0) && "pt-4"
                    )}
                  >
                    {s.label} / {cs.label}
                  </td>
                  {variants.map((v) => (
                    <td
                      key={v}
                      className={cn(
                        "px-4 py-1.5 text-center",
                        (si > 0 || ci > 0) && "pt-4",
                        v === "inverse" && "bg-strongest",
                        v === "inverse" && isLastRow && "rounded-b-xl"
                      )}
                    >
                      <Checkbox
                        variant={v}
                        checked={cs.checked}
                        onCheckedChange={() => undefined}
                        {...s.props}
                      />
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

const SizesSection = React.memo(function SizesSection() {
  return (
    <SectionFrame title="Sizes">
      <div className="space-y-6">
        {checkedStates.map((cs) => (
          <div key={cs.key} className="space-y-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {cs.label}
            </p>
            <div className="flex flex-wrap items-end gap-3">
              {sizes.map((size) => (
                <Checkbox
                  key={size}
                  size={size}
                  checked={cs.checked}
                  onCheckedChange={() => undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

const ShapesSection = React.memo(function ShapesSection() {
  return (
    <SectionFrame title="Shapes">
      <div className="space-y-4">
        {shapes.map((shape) => (
          <div key={shape} className="space-y-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {shape}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {checkedStates.map((cs) => (
                <Checkbox
                  key={cs.key}
                  shape={shape}
                  checked={cs.checked}
                  onCheckedChange={() => undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Invalid
// ---------------------------------------------------------------------------

const InvalidSection = React.memo(function InvalidSection() {
  return (
    <SectionFrame title="Invalid">
      <div className="space-y-6">
        {states.map((s) => (
          <div key={s.key} className="space-y-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {s.label}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {checkedStates.map((cs) => (
                <Checkbox
                  key={cs.key}
                  checked={cs.checked}
                  onCheckedChange={() => undefined}
                  aria-invalid
                  {...s.props}
                />
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

export default function CheckboxExample() {
  return (
    <div className="flex flex-col gap-16">
      <VariantStateMatrix />
      <div className="flex gap-16">
        <SizesSection />
        <ShapesSection />
        <InvalidSection />
      </div>
    </div>
  )
}
