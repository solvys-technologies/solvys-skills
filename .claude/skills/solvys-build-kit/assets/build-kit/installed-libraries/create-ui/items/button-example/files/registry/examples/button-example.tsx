"use client"

import * as React from "react"
import { RiAddCircleFill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { Button, ButtonLabel } from "@/registry/ui/button"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "neutral-solid",
  "neutral-light",
  "inverse-solid",
  "inverse-light",
  "danger",
  "success",
] as const
const appearances = ["solid", "outline", "soft", "ghost"] as const
const sizes = ["xs", "sm", "md", "lg", "xl"] as const
const shapes = ["rounded", "pill", "square"] as const
const states = [
  { key: "default", label: "Default", props: {} },
  { key: "loading", label: "Loading", props: { loading: true } },
  { key: "disabled", label: "Disabled", props: { disabled: true } },
] as const

type Variant = (typeof variants)[number]

function vProps(v: Variant) {
  return v === "primary" ? {} : ({ variant: v } as const)
}

const MemoIcon = React.memo(function MemoIcon() {
  return <RiAddCircleFill />
})

// ---------------------------------------------------------------------------
// Shared matrix renderer
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Variant × Appearance × State matrix
// ---------------------------------------------------------------------------

const VariantStateMatrix = React.memo(function VariantStateMatrix() {
  return (
    <SectionFrame title="Variants × Appearances × States">
      <div className="flex flex-col gap-4">
        {variants.map((v) => {
          const inverse = v === "inverse-solid" || v === "inverse-light"
          return (
            <div
              key={v}
              className={cn(
                "rounded-xl border p-5",
                inverse ? "bg-strongest border-transparent" : "border-weak"
              )}
            >
              <p
                className={cn(
                  "mb-4 text-[11px] font-semibold tracking-wider uppercase",
                  inverse ? "text-weakest" : "text-strongest"
                )}
              >
                {v}
              </p>
              <table className="border-separate border-spacing-x-6 border-spacing-y-0">
                <thead>
                  <tr>
                    <th />
                    {appearances.map((a) => (
                      <th
                        key={a}
                        className={cn(
                          "px-4 pb-3 text-center text-[9px] font-medium tracking-wider uppercase",
                          inverse ? "text-weak" : "text-disabled"
                        )}
                      >
                        {a}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {states.map((s, si) => (
                    <tr key={s.key}>
                      <td
                        className={cn(
                          "pr-6 text-right align-middle text-[10px] font-semibold uppercase",
                          inverse ? "text-weak" : "text-body",
                          si > 0 && "pt-4"
                        )}
                      >
                        {s.label}
                      </td>
                      {appearances.map((a) => (
                        <td
                          key={a}
                          className={cn("px-4 text-center", si > 0 && "pt-4")}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              {...vProps(v)}
                              appearance={a}
                              size="md"
                              {...s.props}
                            >
                              {s.key !== "loading" && <MemoIcon />}
                              <ButtonLabel>Button</ButtonLabel>
                            </Button>
                            <Button
                              {...vProps(v)}
                              appearance={a}
                              size="md"
                              iconOnly
                              {...s.props}
                            >
                              <MemoIcon />
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
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
        {appearances.map((a) => (
          <div key={a} className="space-y-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {a}
            </p>
            <div className="flex flex-wrap items-end gap-2">
              {sizes.map((size) => (
                <Button key={size} appearance={a} size={size}>
                  <MemoIcon />
                  <ButtonLabel>{size.toUpperCase()}</ButtonLabel>
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-2">
              {sizes.map((size) => (
                <Button key={size} appearance={a} size={size} iconOnly>
                  <MemoIcon />
                </Button>
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
            <div className="flex flex-wrap items-center gap-2">
              {appearances.map((a) => (
                <Button key={a} appearance={a} size="md" shape={shape}>
                  <MemoIcon />
                  <ButtonLabel>Button</ButtonLabel>
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {appearances.map((a) => (
                <Button key={a} appearance={a} size="md" shape={shape} iconOnly>
                  <MemoIcon />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// asChild — slot through to an anchor / Link
// ---------------------------------------------------------------------------

const AsChildSection = React.memo(function AsChildSection() {
  return (
    <SectionFrame title="asChild — slot into anchor">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Leading icon
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild>
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Primary link</ButtonLabel>
              </a>
            </Button>
            <Button asChild appearance="outline">
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Outline link</ButtonLabel>
              </a>
            </Button>
            <Button asChild variant="neutral-solid" appearance="soft">
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Neutral soft link</ButtonLabel>
              </a>
            </Button>
            <Button asChild variant="danger" appearance="ghost">
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>danger ghost link</ButtonLabel>
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Trailing icon
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild>
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <ButtonLabel>Continue</ButtonLabel>
                <MemoIcon />
              </a>
            </Button>
            <Button asChild appearance="outline">
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <ButtonLabel>Read more</ButtonLabel>
                <MemoIcon />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Leading + trailing
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild>
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Both icons</ButtonLabel>
                <MemoIcon />
              </a>
            </Button>
            <Button asChild variant="success" appearance="soft">
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Success</ButtonLabel>
                <MemoIcon />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Icon only
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {sizes.map((size) => (
              <Button key={size} asChild iconOnly size={size}>
                <a
                  href="https://createui.co"
                  aria-label={`Open createui ${size}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MemoIcon />
                </a>
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                asChild
                iconOnly
                size={size}
                appearance="outline"
              >
                <a
                  href="https://createui.co"
                  aria-label={`Open createui outline ${size}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MemoIcon />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Disabled (aria-disabled on anchor)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild disabled>
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Disabled link</ButtonLabel>
              </a>
            </Button>
            <Button asChild disabled iconOnly appearance="outline">
              <a
                href="https://createui.co"
                aria-label="Disabled icon link"
                target="_blank"
                rel="noreferrer"
              >
                <MemoIcon />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Invalid
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild aria-invalid>
              <a href="https://createui.co" target="_blank" rel="noreferrer">
                <MemoIcon />
                <ButtonLabel>Invalid link</ButtonLabel>
              </a>
            </Button>
            <Button asChild aria-invalid iconOnly appearance="outline">
              <a
                href="https://createui.co"
                aria-label="Invalid icon link"
                target="_blank"
                rel="noreferrer"
              >
                <MemoIcon />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function ButtonExample() {
  return (
    <div className="flex flex-col gap-16">
      <VariantStateMatrix />
      <div className="flex gap-16">
        <SizesSection />
        <ShapesSection />
      </div>
      <AsChildSection />
    </div>
  )
}
