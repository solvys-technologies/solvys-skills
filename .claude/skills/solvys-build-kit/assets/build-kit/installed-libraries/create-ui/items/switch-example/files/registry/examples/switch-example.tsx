import * as React from "react"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { Switch } from "@/registry/ui/switch"

const variants = ["primary", "info", "neutral", "inverse", "semantic"] as const
const sizes = ["md", "sm", "xs"] as const
const shapes = ["pill", "rounded"] as const
const thumbTypes = ["short", "long"] as const

type Variant = (typeof variants)[number]

export default function SwitchExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1 2xl:grid-cols-1">
      <VariantsSection />
      <SizesSection />
      <ShapesSection />
      <ThumbTypesSection />
      <IOTriggerSection />
      <ThumbIconSection />
      <IOTriggerAndThumbIconSection />
      <StatesSection />
      <InvalidSection />
    </ExampleWrapper>
  )
}

// ─── Helpers ─────────────────────────────────────────────────
function VariantRow({
  variant,
  children,
}: {
  variant: Variant
  children: React.ReactNode
}) {
  const label = variant.charAt(0).toUpperCase() + variant.slice(1)
  const isInverse = variant === "inverse"
  const row = (
    <div className="flex flex-wrap items-center gap-4">
      <p
        className={`w-16 text-xs font-medium uppercase ${
          isInverse ? "text-static" : "text-strongest"
        }`}
      >
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )

  if (isInverse) {
    return <div className="bg-strongest -mx-4 rounded-lg px-4 py-3">{row}</div>
  }
  return row
}

function GroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-strongest text-xs font-semibold tracking-wider uppercase">
      {children}
    </p>
  )
}

function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-medium text-[10px] font-medium tracking-wider uppercase">
      {children}
    </p>
  )
}

// ─── 1. Variants ─────────────────────────────────────────────
function VariantsSection() {
  return (
    <Example title="Variants">
      <div className="space-y-2">
        {variants.map((variant) => (
          <VariantRow key={variant} variant={variant}>
            <Switch variant={variant} defaultChecked />
            <Switch variant={variant} />
          </VariantRow>
        ))}
      </div>
    </Example>
  )
}

// ─── 2. Sizes ────────────────────────────────────────────────
function SizesSection() {
  return (
    <Example title="Sizes">
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <GroupHeader>{size}</GroupHeader>
            {variants.map((variant) => (
              <VariantRow key={variant} variant={variant}>
                <Switch variant={variant} size={size} defaultChecked />
                <Switch variant={variant} size={size} />
              </VariantRow>
            ))}
          </div>
        ))}
      </div>
    </Example>
  )
}

// ─── 3. Shapes ───────────────────────────────────────────────
function ShapesSection() {
  return (
    <Example title="Shapes">
      <div className="space-y-8">
        {shapes.map((shape) => (
          <div key={shape} className="space-y-4">
            <GroupHeader>{shape}</GroupHeader>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <SubHeader>{size}</SubHeader>
                {variants.map((variant) => (
                  <VariantRow key={variant} variant={variant}>
                    <Switch
                      variant={variant}
                      shape={shape}
                      size={size}
                      defaultChecked
                    />
                    <Switch variant={variant} shape={shape} size={size} />
                  </VariantRow>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Example>
  )
}

// ─── 4. Thumb Types ──────────────────────────────────────────
function ThumbTypesSection() {
  return (
    <Example title="Thumb Types">
      <div className="space-y-8">
        {thumbTypes.map((thumbType) => (
          <div key={thumbType} className="space-y-4">
            <GroupHeader>{thumbType}</GroupHeader>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <SubHeader>{size}</SubHeader>
                {variants.map((variant) => (
                  <VariantRow key={variant} variant={variant}>
                    {shapes.map((shape) => (
                      <Switch
                        key={`c-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`u-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                      />
                    ))}
                  </VariantRow>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Example>
  )
}

// ─── 5. I/O Trigger ──────────────────────────────────────────
function IOTriggerSection() {
  return (
    <Example title="I/O Trigger">
      <div className="space-y-8">
        {thumbTypes.map((thumbType) => (
          <div key={thumbType} className="space-y-4">
            <GroupHeader>{thumbType}</GroupHeader>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <SubHeader>{size}</SubHeader>
                {variants.map((variant) => (
                  <VariantRow key={variant} variant={variant}>
                    {shapes.map((shape) => (
                      <Switch
                        key={`c-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`u-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`dc-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        disabled
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`du-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        disabled
                      />
                    ))}
                  </VariantRow>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Example>
  )
}

// ─── 6. Thumb Icon ───────────────────────────────────────────
function ThumbIconSection() {
  return (
    <Example title="Thumb Icon">
      <div className="space-y-8">
        {thumbTypes.map((thumbType) => (
          <div key={thumbType} className="space-y-4">
            <GroupHeader>{thumbType}</GroupHeader>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <SubHeader>{size}</SubHeader>
                {variants.map((variant) => (
                  <VariantRow key={variant} variant={variant}>
                    {shapes.map((shape) => (
                      <Switch
                        key={`c-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        thumbIcon
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`u-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        thumbIcon
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`dc-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        thumbIcon
                        disabled
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`du-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        thumbIcon
                        disabled
                      />
                    ))}
                  </VariantRow>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Example>
  )
}

// ─── 7. I/O Trigger + Thumb Icon ─────────────────────────────
function IOTriggerAndThumbIconSection() {
  return (
    <Example title="I/O Trigger + Thumb Icon">
      <div className="space-y-8">
        {thumbTypes.map((thumbType) => (
          <div key={thumbType} className="space-y-4">
            <GroupHeader>{thumbType}</GroupHeader>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <SubHeader>{size}</SubHeader>
                {variants.map((variant) => (
                  <VariantRow key={variant} variant={variant}>
                    {shapes.map((shape) => (
                      <Switch
                        key={`c-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        thumbIcon
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`u-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        thumbIcon
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`dc-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        thumbIcon
                        disabled
                        defaultChecked
                      />
                    ))}
                    {shapes.map((shape) => (
                      <Switch
                        key={`du-${shape}`}
                        variant={variant}
                        thumbType={thumbType}
                        shape={shape}
                        size={size}
                        ioTrigger
                        thumbIcon
                        disabled
                      />
                    ))}
                  </VariantRow>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Example>
  )
}

// ─── 8. States ───────────────────────────────────────────────
function StatesSection() {
  return (
    <Example title="States">
      <div className="space-y-2">
        {variants.map((variant) => (
          <VariantRow key={variant} variant={variant}>
            <Switch variant={variant} defaultChecked />
            <Switch variant={variant} />
            <Switch variant={variant} disabled defaultChecked />
            <Switch variant={variant} disabled />
          </VariantRow>
        ))}
      </div>
    </Example>
  )
}

// ─── 9. Invalid ──────────────────────────────────────────────
function InvalidSection() {
  return (
    <Example title="Invalid">
      <div className="space-y-2">
        {variants.map((variant) => (
          <VariantRow key={variant} variant={variant}>
            <Switch variant={variant} aria-invalid defaultChecked />
            <Switch variant={variant} aria-invalid />
          </VariantRow>
        ))}
      </div>
    </Example>
  )
}
