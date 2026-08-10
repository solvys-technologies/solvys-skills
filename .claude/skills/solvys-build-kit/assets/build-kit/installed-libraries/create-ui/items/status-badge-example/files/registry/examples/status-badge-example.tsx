import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "danger",
  "success",
  "warning",
  "info",
  "highlighted",
  "away",
  "verified",
  "cyan",
  "lime",
  "neutral",
  "white",
] as const

const sizes = ["md", "sm", "xs"] as const

// ---------------------------------------------------------------------------

const VariantSizeMatrix = React.memo(function VariantSizeMatrix() {
  return (
    <SectionFrame title="Variants × Sizes">
      <table className="border-separate border-spacing-x-8 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            {variants.map((v) => (
              <th
                key={v}
                className={cn(
                  "text-body px-1 pb-2 text-center text-[9px] font-semibold tracking-wider uppercase"
                )}
              >
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size}>
              <td className="text-strongest pr-4 text-right align-middle text-[10px] font-semibold uppercase">
                {size}
              </td>
              {variants.map((v) => (
                <td key={v} className="text-center align-middle">
                  <div
                    className={cn(
                      "flex justify-center rounded-sm p-1",
                      v === "white" && "bg-strongest"
                    )}
                  >
                    <StatusBadge variant={v} size={size} />
                  </div>
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
// Main export
// ---------------------------------------------------------------------------

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-col gap-16">
      <VariantSizeMatrix />
    </div>
  )
}
