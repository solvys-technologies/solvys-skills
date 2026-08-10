import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import { Spinner } from "@/registry/ui/spinner"

// ---------------------------------------------------------------------------
// Matrix: 6 appearance + line combos × 3 animations (spin, pulse, tick)
// rendered per variant.
// ---------------------------------------------------------------------------

type Variant =
  | "primary"
  | "neutral"
  | "neutral-static"
  | "neutral-soft"
  | "inverse"
  | "inverse-static"
  | "inverse-soft"
  | "info"
  | "danger"
  | "success"
  | "warning"
  | "away"

type Combo = {
  key: string
  label: string
  appearance: "solid" | "gradient"
  cap: "sharp" | "rounded"
  line: "short" | "long"
}

const variants: Variant[] = [
  "primary",
  "neutral",
  "neutral-static",
  "neutral-soft",
  "inverse",
  "inverse-static",
  "inverse-soft",
  "info",
  "danger",
  "success",
  "warning",
  "away",
]

const combos: Combo[] = [
  {
    key: "sharp-solid-short",
    label: "Sharp (Solid) · Short",
    appearance: "solid",
    cap: "sharp",
    line: "short",
  },
  {
    key: "sharp-solid-long",
    label: "Sharp (Solid) · Long",
    appearance: "solid",
    cap: "sharp",
    line: "long",
  },
  {
    key: "rounded-solid-short",
    label: "Rounded (Solid) · Short",
    appearance: "solid",
    cap: "rounded",
    line: "short",
  },
  {
    key: "rounded-solid-long",
    label: "Rounded (Solid) · Long",
    appearance: "solid",
    cap: "rounded",
    line: "long",
  },
  {
    key: "sharp-gradient-short",
    label: "Sharp (Gradient) · Short",
    appearance: "gradient",
    cap: "sharp",
    line: "short",
  },
  {
    key: "sharp-gradient-long",
    label: "Sharp (Gradient) · Long",
    appearance: "gradient",
    cap: "sharp",
    line: "long",
  },
]

const animations = ["spin", "pulse", "tick"] as const

function VariantMatrix({ variant }: { variant: Variant }) {
  return (
    <SectionFrame title={`${variant} · lg — all appearances × animations`}>
      <table className="border-separate border-spacing-x-10 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            {animations.map((anim) => (
              <th
                key={anim}
                className="text-disabled text-[10px] font-medium tracking-wider uppercase"
              >
                {anim}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {combos.map((c) => (
            <tr key={c.key}>
              <td className="text-strongest pr-4 text-right text-[11px] font-semibold whitespace-nowrap uppercase">
                {c.label}
              </td>
              {animations.map((anim) => (
                <td key={anim} className="text-center">
                  <div
                    className={
                      variant.startsWith("inverse")
                        ? "bg-strongest flex justify-center rounded-md p-2"
                        : "flex justify-center"
                    }
                  >
                    <Spinner
                      variant={variant}
                      appearance={c.appearance}
                      cap={c.cap}
                      line={c.line}
                      animation={anim}
                      size="lg"
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
}

const sizes = ["xs", "sm", "md", "lg"] as const

function SizesShowcase() {
  return (
    <SectionFrame title="Sizes — primary · sharp solid · short">
      <table className="border-separate border-spacing-x-10 border-spacing-y-3">
        <thead>
          <tr>
            {sizes.map((s) => (
              <th
                key={s}
                className="text-disabled text-[10px] font-medium tracking-wider uppercase"
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {sizes.map((s) => (
              <td key={s} className="text-center">
                <div className="flex items-center justify-center">
                  <Spinner
                    variant="primary"
                    appearance="solid"
                    cap="sharp"
                    line="short"
                    animation="spin"
                    size={s}
                  />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function SpinnerExample() {
  return (
    <div className="flex flex-col gap-12">
      <SizesShowcase />
      {variants.map((v) => (
        <VariantMatrix key={v} variant={v} />
      ))}
    </div>
  )
}
