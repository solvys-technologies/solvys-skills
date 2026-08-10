import * as React from "react"
import {
  RiAddFill,
  RiAddLine,
  RiFlashlightLine,
  RiFolderAddLine,
  RiFunctionAddLine,
  RiStickyNoteAddLine,
  RiUploadCloud2Line,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import {
  FabButton,
  FabGroup,
  FabGroupItem,
  FabGroupList,
  FabGroupTrigger,
} from "@/registry/pro/ui/fab-button"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = ["primary", "neutral", "inverse"] as const
const appearances = ["default", "soft"] as const
const sizes = ["md", "lg"] as const
const shapes = ["rounded", "pill"] as const
const states = [
  { key: "default", label: "Default", props: {} },
  { key: "disabled", label: "Disabled", props: { disabled: true } },
] as const

const MemoIcon = React.memo(function MemoIcon() {
  return <RiAddFill />
})

// Implemented combinations so far (lg · rounded). hover / active /
// focus-visible are live interaction states (hover, click & hold, tab to
// focus) — only default & disabled can be shown statically.
const implemented = [
  { variant: "primary", appearance: "default" },
  { variant: "primary", appearance: "soft" },
  { variant: "neutral", appearance: "default" },
  { variant: "neutral", appearance: "soft" },
  { variant: "inverse", appearance: "default" },
  { variant: "inverse", appearance: "soft" },
] as const

const StatesShowcase = React.memo(function StatesShowcase() {
  return (
    <SectionFrame title="Implemented · lg · rounded">
      <div className="flex flex-col gap-6">
        {implemented.map(({ variant, appearance }) => (
          <div key={`${variant}-${appearance}`} className="flex flex-col gap-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {variant} · {appearance}
            </p>
            <Surface variant={variant}>
              {states.map((s) => (
                <div key={s.key} className="flex flex-col items-center gap-1.5">
                  <span className="text-disabled text-[9px] font-medium uppercase">
                    {s.label}
                  </span>
                  <FabButton
                    variant={variant}
                    appearance={appearance}
                    size="lg"
                    shape="rounded"
                    leading={<MemoIcon />}
                    {...s.props}
                  >
                    FAB Core
                  </FabButton>
                </div>
              ))}
            </Surface>
          </div>
        ))}
        <p className="text-body text-[11px]">
          Hover, press &amp; hold, and Tab-to-focus the Default buttons to
          verify hover / active / focus-visible.
        </p>
      </div>
    </SectionFrame>
  )
})

// Inverse FABs are designed for inverted/dark surfaces, so render those cells
// on a dark panel; primary/neutral live on the default surface.
function Surface({
  variant,
  className,
  children,
}: {
  variant: (typeof variants)[number]
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl p-4",
        variant === "inverse" ? "bg-static-black" : "bg-transparent",
        className
      )}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------

const VariantAppearanceMatrix = React.memo(function VariantAppearanceMatrix() {
  return (
    <SectionFrame title="Variants × Appearances">
      <div className="flex flex-col gap-6">
        {variants.map((v) => (
          <div key={v} className="flex flex-col gap-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {v}
            </p>
            <Surface variant={v}>
              {appearances.map((a) => (
                <div key={a} className="flex flex-col items-center gap-1.5">
                  <span className="text-disabled text-[9px] font-medium uppercase">
                    {a}
                  </span>
                  <div className="flex items-center gap-3">
                    {states.map((s) => (
                      <FabButton
                        key={s.key}
                        variant={v}
                        appearance={a}
                        size="lg"
                        leading={<MemoIcon />}
                        {...s.props}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Surface>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const SizesSection = React.memo(function SizesSection() {
  return (
    <SectionFrame title="Sizes">
      <div className="space-y-6">
        {variants.map((v) => (
          <div key={v} className="space-y-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {v}
            </p>
            <Surface variant={v}>
              {appearances.map((a) => (
                <div key={a} className="flex items-end gap-3">
                  {sizes.map((size) => (
                    <FabButton
                      key={size}
                      variant={v}
                      appearance={a}
                      size={size}
                      leading={<MemoIcon />}
                    />
                  ))}
                </div>
              ))}
            </Surface>
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
      <div className="space-y-6">
        {variants.map((v) => (
          <div key={v} className="space-y-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {v}
            </p>
            <Surface variant={v}>
              {shapes.map((shape) => (
                <div key={shape} className="flex items-center gap-3">
                  {appearances.map((a) => (
                    <FabButton
                      key={a}
                      variant={v}
                      appearance={a}
                      size="lg"
                      shape={shape}
                      leading={<MemoIcon />}
                    />
                  ))}
                </div>
              ))}
            </Surface>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// FAB Group (vertical) — the trigger toggles an expandable action cluster.
// The trigger is always `default` appearance (variant-driven); items follow
// the group's `appearance` (default `soft`) and are always `md`.
// ---------------------------------------------------------------------------

const fabGroupActions = [
  { key: "upload", label: "Upload file", icon: <RiUploadCloud2Line /> },
  { key: "project", label: "New project", icon: <RiFolderAddLine /> },
  { key: "note", label: "New note", icon: <RiStickyNoteAddLine /> },
  { key: "task", label: "New task", icon: <RiFunctionAddLine /> },
] as const

// Radial demos vary the item count, so use a 5-item pool and slice as needed.
const radialActions = [
  ...fabGroupActions,
  { key: "boost", label: "Boost", icon: <RiFlashlightLine /> },
]

type FabGroupAction = { key: string; label: string; icon: React.ReactNode }

function FabGroupDemo({
  variant,
  size,
  appearance,
  placement = "vertical",
  actions = fabGroupActions,
  defaultOpen,
}: {
  variant?: (typeof variants)[number]
  size: (typeof sizes)[number]
  appearance?: (typeof appearances)[number]
  placement?: "center" | "left" | "right" | "vertical"
  actions?: ReadonlyArray<FabGroupAction>
  defaultOpen?: boolean
}) {
  return (
    <FabGroup
      placement={placement}
      variant={variant}
      appearance={appearance}
      size={size}
      defaultOpen={defaultOpen}
    >
      <FabGroupTrigger leading={<RiAddLine />} />
      <FabGroupList>
        {actions.map((action) => (
          <FabGroupItem key={action.key} icon={action.icon}>
            {action.label}
          </FabGroupItem>
        ))}
      </FabGroupList>
    </FabGroup>
  )
}

// Fixed-width, bottom-right-anchored cell: tall enough for the expanded items
// to float above the trigger, wide enough that the right-aligned items don't
// spill past the (dark, for inverse) surface. Label sits below the open items.
function GroupCell({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-44 flex-col gap-3">
      <div className="flex min-h-64 items-end justify-end">{children}</div>
      <span className="text-disabled text-center text-[9px] font-medium uppercase">
        {label}
      </span>
    </div>
  )
}

const FabGroupSection = React.memo(function FabGroupSection() {
  return (
    <SectionFrame title="FAB Group · Vertical">
      <div className="flex flex-col gap-8">
        {/* Trigger stays solid (variant-driven); items follow the group's
            appearance. Inverse renders on a dark surface. */}
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {variant}
            </p>
            <Surface variant={variant} className="flex-wrap items-end gap-12">
              {appearances.map((appearance) => (
                <GroupCell key={appearance} label={`lg · ${appearance}`}>
                  <FabGroupDemo
                    variant={variant}
                    size="lg"
                    appearance={appearance}
                    defaultOpen
                  />
                </GroupCell>
              ))}
              <GroupCell label="md · soft">
                <FabGroupDemo variant={variant} size="md" defaultOpen />
              </GroupCell>
            </Surface>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// FAB Group (radial) — icon-only items fan out on an arc around the trigger.
// `center` (default), `left` and `right` use different slices of the circle.
// ---------------------------------------------------------------------------

const radialAnchor: Record<"center" | "left" | "right", string> = {
  center: "justify-center",
  left: "justify-end",
  right: "justify-start",
}

// Bottom-anchored box with room around the trigger for the arc of items.
function RadialCell({
  label,
  placement,
  children,
}: {
  label: string
  placement: "center" | "left" | "right"
  children: React.ReactNode
}) {
  return (
    <div className="flex w-60 flex-col gap-3">
      <div className={cn("flex h-44 items-end", radialAnchor[placement])}>
        {children}
      </div>
      <span className="text-disabled text-center text-[9px] font-medium uppercase">
        {label}
      </span>
    </div>
  )
}

const radialCounts = [1, 2, 3, 4, 5] as const

const RadialSection = React.memo(function RadialSection() {
  return (
    <SectionFrame title="FAB Group · Radial · Primary">
      <div className="flex flex-col gap-10">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-3">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              {size}
            </p>

            {/* Center supports 1–5 items; whatever the count, items stay
                centred (symmetric around the top). center is the default. */}
            <div className="flex flex-wrap gap-8">
              {radialCounts.map((count) => (
                <RadialCell
                  key={count}
                  placement="center"
                  label={`center · ${count}${count === 5 ? " (max)" : ""}`}
                >
                  <FabGroupDemo
                    variant="primary"
                    size={size}
                    placement="center"
                    actions={radialActions.slice(0, count)}
                    defaultOpen
                  />
                </RadialCell>
              ))}
            </div>

            {/* left / right support up to 3 items. */}
            <div className="flex flex-wrap gap-8">
              <RadialCell placement="left" label="left · 3 (max)">
                <FabGroupDemo
                  variant="primary"
                  size={size}
                  placement="left"
                  actions={radialActions.slice(0, 3)}
                  defaultOpen
                />
              </RadialCell>
              <RadialCell placement="right" label="right · 3 (max)">
                <FabGroupDemo
                  variant="primary"
                  size={size}
                  placement="right"
                  actions={radialActions.slice(0, 3)}
                  defaultOpen
                />
              </RadialCell>
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

export default function FabButtonExample() {
  return (
    <div className="flex flex-col gap-16">
      <StatesShowcase />
      <VariantAppearanceMatrix />
      <div className="flex flex-wrap gap-16">
        <SizesSection />
        <ShapesSection />
      </div>
      <FabGroupSection />
      <RadialSection />
    </div>
  )
}
