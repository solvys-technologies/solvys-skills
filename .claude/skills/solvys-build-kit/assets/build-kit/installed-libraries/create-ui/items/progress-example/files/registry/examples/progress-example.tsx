import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import {
  Progress,
  type ProgressAppearance,
  type ProgressShape,
  type ProgressSize,
  type ProgressType,
  type ProgressVariant,
} from "@/registry/ui/progress"

const variants: ProgressVariant[] = [
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "away",
  "neutral",
  "neutral-static",
  "neutral-soft",
  "inverse",
  "inverse-static",
  "inverse-soft",
]

const appearances: ProgressAppearance[] = ["solid", "gradient"]
const sizes: ProgressSize[] = ["xs", "sm", "md", "lg"]
// `round` only renders distinctly on the line (rounded track, flat fill edge);
// on a circle it matches `sharp` (flat caps), so the circle showcases omit it.
const lineShapes: ProgressShape[] = ["sharp", "round", "pill"]
const circleShapes: ProgressShape[] = ["sharp", "pill"]
const types: ProgressType[] = ["line", "circle"]

const SAMPLE_VALUE = 42
const VALUE_STEPS = [0, 25, 50, 75, 100]
const LINE_DEMO_WIDTH = 420
const LINE_MATRIX_WIDTH = 160

const isInverse = (variant: ProgressVariant) => variant.startsWith("inverse")

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
      {children}
    </p>
  )
}

function ItemLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`text-disabled text-[10px] font-medium uppercase ${className ?? ""}`}
    >
      {children}
    </span>
  )
}

function DemoCanvas({
  variant,
  children,
}: {
  variant: ProgressVariant
  children: React.ReactNode
}) {
  return (
    <div
      className={
        isInverse(variant)
          ? "bg-strongest flex items-center justify-center rounded-md p-3"
          : "flex items-center justify-center"
      }
    >
      {children}
    </div>
  )
}

function LineDemo({
  width = LINE_MATRIX_WIDTH,
  ...props
}: React.ComponentProps<typeof Progress> & { width?: number }) {
  return (
    <div style={{ width }}>
      <Progress type="line" {...props} />
    </div>
  )
}

function SizesShowcase({ type }: { type: ProgressType }) {
  const isLine = type === "line"

  return (
    <SectionFrame title={`${type} · sizes — primary solid`}>
      <div className="flex flex-col gap-6">
        {(isLine ? lineShapes : circleShapes).map((shape) => (
          <div key={shape} className="flex flex-col gap-3">
            <GroupLabel>{shape}</GroupLabel>
            {isLine ? (
              <div
                className="flex flex-col gap-4"
                style={{ width: LINE_DEMO_WIDTH }}
              >
                {sizes.map((size) => (
                  <div key={size} className="flex items-center gap-3">
                    <ItemLabel className="w-6">{size}</ItemLabel>
                    <Progress
                      type="line"
                      size={size}
                      shape={shape}
                      value={SAMPLE_VALUE}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-end gap-6">
                {sizes.map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <Progress
                      type="circle"
                      size={size}
                      shape={shape}
                      value={SAMPLE_VALUE}
                    />
                    <ItemLabel>{size}</ItemLabel>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

function ShapesShowcase() {
  return (
    <SectionFrame title="Shapes — primary md solid">
      <div className="flex flex-col gap-8">
        {types.map((type) => (
          <div key={type} className="flex flex-col gap-3">
            <GroupLabel>{type}</GroupLabel>
            <div className="flex items-center gap-10">
              {(type === "line" ? lineShapes : circleShapes).map((shape) => (
                <div key={shape} className="flex flex-col items-center gap-2">
                  {type === "line" ? (
                    <LineDemo shape={shape} value={SAMPLE_VALUE} />
                  ) : (
                    <Progress
                      type="circle"
                      size="lg"
                      shape={shape}
                      value={SAMPLE_VALUE}
                    />
                  )}
                  <ItemLabel>{shape}</ItemLabel>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

function ValueRange() {
  return (
    <SectionFrame title="Value range — primary md pill solid">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <GroupLabel>line</GroupLabel>
          <div
            className="flex flex-col gap-3"
            style={{ width: LINE_DEMO_WIDTH }}
          >
            {VALUE_STEPS.map((v) => (
              <div key={v} className="flex items-center gap-3">
                <span className="text-disabled w-8 text-right text-[10px] font-medium tabular-nums">
                  {v}%
                </span>
                <Progress type="line" value={v} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <GroupLabel>circle</GroupLabel>
          <div className="flex items-end gap-6">
            {VALUE_STEPS.map((v) => (
              <div key={v} className="flex flex-col items-center gap-2">
                <Progress type="circle" size="lg" value={v} />
                <span className="text-disabled text-[10px] font-medium tabular-nums">
                  {v}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

function VariantsMatrix({ type }: { type: ProgressType }) {
  return (
    <SectionFrame title={`${type} · variants × appearances — md pill`}>
      <table className="border-separate border-spacing-x-8 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            {appearances.map((a) => (
              <th
                key={a}
                className="text-disabled text-[10px] font-medium tracking-wider uppercase"
              >
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant}>
              <td className="text-strongest pr-2 text-right text-[11px] font-semibold whitespace-nowrap uppercase">
                {variant}
              </td>
              {appearances.map((appearance) => (
                <td key={appearance} className="align-middle">
                  <DemoCanvas variant={variant}>
                    {type === "line" ? (
                      <LineDemo
                        variant={variant}
                        appearance={appearance}
                        value={SAMPLE_VALUE}
                      />
                    ) : (
                      <Progress
                        type="circle"
                        variant={variant}
                        appearance={appearance}
                        size="lg"
                        value={SAMPLE_VALUE}
                      />
                    )}
                  </DemoCanvas>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
}

export default function ProgressExample() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-12">
        {types.map((type) => (
          <SizesShowcase key={type} type={type} />
        ))}
      </div>
      <ShapesShowcase />
      <ValueRange />
      {types.map((type) => (
        <VariantsMatrix key={type} type={type} />
      ))}
    </div>
  )
}
