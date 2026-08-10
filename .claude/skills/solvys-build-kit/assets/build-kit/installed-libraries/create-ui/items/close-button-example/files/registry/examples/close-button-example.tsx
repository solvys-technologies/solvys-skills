import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { CloseButton } from "@/registry/ui/close-button"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = ["neutral", "inverse"] as const
const appearances = ["solid", "outline", "soft", "ghost"] as const
const sizes = ["2xl", "xl", "lg", "md", "sm", "xs"] as const
const shapes = ["pill", "rounded", "square"] as const

// ---------------------------------------------------------------------------
// Shape section — one per shape, showing all sizes × states × variants × appearances
// ---------------------------------------------------------------------------

function ShapeSection({ shape }: { shape: (typeof shapes)[number] }) {
  return (
    <SectionFrame title={shape.charAt(0).toUpperCase() + shape.slice(1)}>
      <table className="border-collapse">
        <thead>
          <tr>
            <th />
            <th />
            {variants.map((v) => (
              <th
                key={v}
                colSpan={4}
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
          <tr>
            <th />
            <th />
            {variants.map((v) =>
              appearances.map((a) => (
                <th
                  key={`${v}-${a}`}
                  className={cn(
                    "px-2 pb-2 text-center text-[9px] font-medium uppercase",
                    v === "inverse" ? "bg-strongest text-weak" : "text-disabled"
                  )}
                >
                  {a}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, sizeIdx) => (
            <React.Fragment key={size}>
              {/* Default state */}
              <tr>
                <td
                  rowSpan={2}
                  className={cn(
                    "text-strongest pr-4 text-right align-middle text-[11px] font-semibold uppercase",
                    sizeIdx > 0 && "pt-6"
                  )}
                >
                  {size}
                </td>
                <td
                  className={cn(
                    "text-body pr-3 text-right align-middle text-[9px] font-medium uppercase",
                    sizeIdx > 0 && "pt-6"
                  )}
                >
                  Default
                </td>
                {variants.map((v) =>
                  appearances.map((a) => (
                    <td
                      key={`${v}-${a}`}
                      className={cn(
                        "px-4 py-3 text-center",
                        sizeIdx > 0 && "pt-6",
                        v === "inverse" && "bg-strongest"
                      )}
                    >
                      <div className="flex justify-center">
                        <CloseButton
                          variant={v}
                          appearance={a}
                          size={size}
                          shape={shape}
                        />
                      </div>
                    </td>
                  ))
                )}
              </tr>
              {/* Disabled state */}
              <tr>
                <td className="text-body pr-3 text-right align-middle text-[9px] font-medium uppercase">
                  Disabled
                </td>
                {variants.map((v) =>
                  appearances.map((a, ai) => (
                    <td
                      key={`${v}-${a}`}
                      className={cn(
                        "px-4 py-3 text-center",
                        v === "inverse" && "bg-strongest",
                        v === "inverse" &&
                          size === "xs" &&
                          ai === 0 &&
                          "rounded-bl-xl",
                        v === "inverse" &&
                          size === "xs" &&
                          ai === appearances.length - 1 &&
                          "rounded-br-xl"
                      )}
                    >
                      <div className="flex justify-center">
                        <CloseButton
                          variant={v}
                          appearance={a}
                          size={size}
                          shape={shape}
                          disabled
                        />
                      </div>
                    </td>
                  ))
                )}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function CloseButtonExample() {
  return (
    <div className="flex flex-col gap-16">
      {shapes.map((shape) => (
        <ShapeSection key={shape} shape={shape} />
      ))}
    </div>
  )
}
