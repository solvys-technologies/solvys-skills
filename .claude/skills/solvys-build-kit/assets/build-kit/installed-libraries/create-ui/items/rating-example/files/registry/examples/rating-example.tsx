"use client"

import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import {
  Rating,
  RatingSummary,
  RatingSummaryDot,
  RatingSummaryReviews,
  RatingSummaryScore,
  type RatingType,
} from "@/registry/pro/ui/rating"
import {
  Avatar,
  AvatarGroup,
  AvatarGroupAction,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const types = ["star", "heart", "emoji", "number"] as const
const colorVariants = ["colorful", "primary", "neutral"] as const
const sizes = ["xs", "md"] as const

const people = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
  { src: "https://createui.co/avatars/yuki-tanaka.webp", name: "Yuki Tanaka" },
  { src: "https://createui.co/avatars/sofia-reis.webp", name: "Sofia Reis" },
] as const

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-disabled text-[9px] font-medium tracking-wider uppercase">
    {children}
  </span>
)

const RowLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-body w-16 shrink-0 text-[10px] font-semibold tracking-wider uppercase">
    {children}
  </span>
)

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-body text-[11px] font-semibold tracking-wider uppercase">
    {children}
  </span>
)

// ---------------------------------------------------------------------------
// Types overview (boxed, empty vs selected) — mirrors the design's item table
// ---------------------------------------------------------------------------

const TypesOverview = React.memo(function TypesOverview() {
  return (
    <SectionFrame title="Types">
      <div className="flex gap-10">
        {types.map((type) => (
          <div key={type} className="flex flex-col items-center gap-3">
            <Label>{type}</Label>
            <Rating type={type} container="rounded" readOnly value={0} />
            <Rating type={type} container="rounded" readOnly value={1} />
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Star & Heart — variant × appearance × shape (read-only at 3 / 5)
// ---------------------------------------------------------------------------

const GlyphMatrix = React.memo(function GlyphMatrix() {
  const combos = [
    { appearance: "filled", shape: "sharp", label: "Filled · Sharp" },
    { appearance: "filled", shape: "rounded", label: "Filled · Rounded" },
    { appearance: "outline", shape: "sharp", label: "Outline · Sharp" },
    { appearance: "outline", shape: "rounded", label: "Outline · Rounded" },
  ] as const

  return (
    <SectionFrame title="Star & Heart — variant × appearance × shape">
      <div className="flex flex-col gap-8">
        {(["star", "heart"] as const).map((type) => (
          <div key={type} className="flex flex-col gap-3">
            <RowLabel>{type}</RowLabel>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {colorVariants.map((variant) => (
                <div key={variant} className="flex flex-col gap-2">
                  <Label>{variant}</Label>
                  <div className="flex flex-col gap-2">
                    {combos.map((c) => (
                      <div key={c.label} className="flex items-center gap-3">
                        <Rating
                          type={type}
                          variant={variant}
                          appearance={c.appearance}
                          shape={c.shape}
                          readOnly
                          value={3}
                        />
                        <span className="text-disabled text-[10px]">
                          {c.label}
                        </span>
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
// Containers — rounded-square vs circle, empty vs selected
// ---------------------------------------------------------------------------

const Containers = React.memo(function Containers() {
  return (
    <SectionFrame title="Containers">
      <div className="flex flex-col gap-6">
        {(["rounded", "circle"] as const).map((container) => (
          <div key={container} className="flex flex-col gap-3">
            <RowLabel>{container}</RowLabel>
            <div className="flex flex-wrap gap-8">
              {types.map((type) => (
                <Rating
                  key={type}
                  type={type}
                  container={container}
                  readOnly
                  value={2}
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
// Fractional display (read-only) — 3.6 / 5
// ---------------------------------------------------------------------------

const Fractional = React.memo(function Fractional() {
  return (
    <SectionFrame title="Fractional display (read-only)">
      <div className="flex flex-col gap-4">
        {(["star", "heart"] as const).map((type) =>
          (["filled", "outline"] as const).map((appearance) => (
            <div
              key={`${type}-${appearance}`}
              className="flex items-center gap-6"
            >
              <RowLabel>
                {type}/{appearance === "filled" ? "fill" : "line"}
              </RowLabel>
              <Rating
                type={type}
                variant="primary"
                appearance={appearance}
                shape="sharp"
                readOnly
                value={1.6}
              />
              <Rating
                type={type}
                variant="primary"
                appearance={appearance}
                shape="rounded"
                readOnly
                value={3.6}
              />
              <Rating
                type={type}
                variant="colorful"
                appearance={appearance}
                shape="rounded"
                readOnly
                value={3.6}
              />
            </div>
          ))
        )}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

const Sizes = React.memo(function Sizes() {
  return (
    <SectionFrame title="Sizes">
      <div className="flex flex-col gap-5">
        {sizes.map((size) => (
          <div key={size} className="flex items-center gap-6">
            <RowLabel>{size}</RowLabel>
            <Rating size={size} readOnly value={4} />
            <Rating size={size} container="rounded" readOnly value={4} />
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Interactive (controlled)
// ---------------------------------------------------------------------------

const appShapeCombos = [
  { appearance: "filled", shape: "sharp", label: "Filled · Sharp" },
  { appearance: "filled", shape: "rounded", label: "Filled · Rounded" },
  { appearance: "outline", shape: "sharp", label: "Outline · Sharp" },
  { appearance: "outline", shape: "rounded", label: "Outline · Rounded" },
] as const

/** A self-contained interactive Rating that tracks its own value. */
function IRating(props: React.ComponentProps<typeof Rating>) {
  const [value, setValue] = React.useState(0)
  return <Rating value={value} onValueChange={setValue} {...props} />
}

// Star / Heart — every variant × appearance × shape, at every size (bare)
const GlyphInteractive = React.memo(function GlyphInteractive({
  type,
}: {
  type: "star" | "heart"
}) {
  return (
    <div className="flex flex-col gap-7">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-3">
          <RowLabel>{size}</RowLabel>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {colorVariants.map((variant) => (
              <div key={variant} className="flex flex-col gap-2">
                <Label>{variant}</Label>
                <div className="flex flex-col gap-2">
                  {appShapeCombos.map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <IRating
                        type={type}
                        variant={variant}
                        appearance={c.appearance}
                        shape={c.shape}
                        size={size}
                      />
                      <span className="text-disabled text-[10px]">
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

// Emoji / Number — every container, at every size
const SimpleInteractive = React.memo(function SimpleInteractive({
  type,
}: {
  type: RatingType
}) {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-start gap-8">
          <RowLabel>{size}</RowLabel>
          {(["rounded", "circle"] as const).map((container) => (
            <div key={container} className="flex flex-col items-center gap-2">
              <Label>{container}</Label>
              <IRating type={type} size={size} container={container} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

// Star / Heart inside containers — every container × size
const ContainerInteractive = React.memo(function ContainerInteractive() {
  return (
    <div className="flex flex-col gap-8">
      {(["star", "heart"] as const).map((type) => (
        <div key={type} className="flex flex-col gap-3">
          <RowLabel>{type}</RowLabel>
          <div className="flex flex-col gap-5">
            {sizes.map((size) => (
              <div key={size} className="flex flex-wrap items-start gap-8">
                <span className="text-disabled w-8 shrink-0 text-[10px] uppercase">
                  {size}
                </span>
                {(["rounded", "circle"] as const).map((container) => (
                  <div
                    key={container}
                    className="flex flex-col items-center gap-2"
                  >
                    <Label>{container}</Label>
                    <IRating type={type} container={container} size={size} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

const Interactive = React.memo(function Interactive() {
  return (
    <div className="flex flex-col gap-16">
      <SectionFrame title="Interactive — Animation (fade vs sweep)">
        <div className="flex flex-col gap-6">
          {(
            [
              { key: "fade (default)", animation: "fade" },
              { key: "sweep", animation: "sweep" },
            ] as const
          ).map(({ key, animation }) => (
            <div key={key} className="flex flex-col gap-3">
              <SectionLabel>{key}</SectionLabel>
              <div className="flex flex-wrap items-center gap-8">
                <IRating type="star" animation={animation} />
                <IRating
                  type="star"
                  container="rounded"
                  animation={animation}
                />
                <IRating type="heart" animation={animation} />
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
      <SectionFrame title="Interactive — Star (variant × appearance × shape × size)">
        <GlyphInteractive type="star" />
      </SectionFrame>
      <SectionFrame title="Interactive — Heart (variant × appearance × shape × size)">
        <GlyphInteractive type="heart" />
      </SectionFrame>
      <div className="flex flex-wrap gap-16">
        <SectionFrame title="Interactive — Emoji (container × size)">
          <SimpleInteractive type="emoji" />
        </SectionFrame>
        <SectionFrame title="Interactive — Number (container × size)">
          <SimpleInteractive type="number" />
        </SectionFrame>
      </div>
      <SectionFrame title="Interactive — Star & Heart containers (container × size)">
        <ContainerInteractive />
      </SectionFrame>
    </div>
  )
})

// ---------------------------------------------------------------------------
// Summary (composable) — vertical Group/Single layouts in md + xs
// ---------------------------------------------------------------------------

type SummarySize = "xs" | "md"

const ReviewerPile = ({ size }: { size: SummarySize }) => (
  <AvatarGroup size={size === "md" ? "xs" : "2xs"}>
    {people.map((p) => (
      <Avatar key={p.name}>
        <AvatarImage src={p.src} alt={p.name} />
      </Avatar>
    ))}
    <AvatarGroupAction>+7</AvatarGroupAction>
  </AvatarGroup>
)

const TopRated = ({ size }: { size: SummarySize }) => (
  <Badge
    variant="warning"
    appearance="solid"
    size={size === "md" ? "md" : "xs"}
  >
    Top Rated
  </Badge>
)

// Content-wrapper row — size-aware gap (xs=component-xs, md=component-sm)
const SummaryRow = ({
  size,
  children,
}: {
  size: SummarySize
  children: React.ReactNode
}) => (
  <div
    className={cn(
      "flex items-center",
      size === "xs" ? "gap-component-sm" : "gap-component-sm"
    )}
  >
    {children}
  </div>
)

// Group · Type 1 — stars / score · reviews · badge / avatars
const GroupType1 = ({ size }: { size: SummarySize }) => (
  <RatingSummary layout="stacked" size={size}>
    <Rating readOnly value={3.6} size={size} />
    <SummaryRow size={size}>
      <RatingSummaryScore value={3.6} />
      <RatingSummaryDot />
      <RatingSummaryReviews count={2341} href="#" />
      <TopRated size={size} />
    </SummaryRow>
    <ReviewerPile size={size} />
  </RatingSummary>
)

// Group · Type 2 — stars / score badge / avatars reviews
const GroupType2 = ({ size }: { size: SummarySize }) => (
  <RatingSummary layout="stacked" size={size}>
    <Rating readOnly value={3.6} size={size} />
    <SummaryRow size={size}>
      <RatingSummaryScore value={3.6} />
      <TopRated size={size} />
    </SummaryRow>
    <SummaryRow size={size}>
      <ReviewerPile size={size} />
      <RatingSummaryReviews count={2341} href="#" />
    </SummaryRow>
  </RatingSummary>
)

// Group · Type 3 — (stars score badge) / (avatars reviews)
const GroupType3 = ({ size }: { size: SummarySize }) => (
  <RatingSummary layout="stacked" size={size}>
    <SummaryRow size={size}>
      <Rating readOnly value={3.6} size={size} />
      <RatingSummaryScore value={3.6} />
      <TopRated size={size} />
    </SummaryRow>
    <SummaryRow size={size}>
      <ReviewerPile size={size} />
      <RatingSummaryReviews count={2341} href="#" />
    </SummaryRow>
  </RatingSummary>
)

// Single Rating — (★ score badge) / (avatars reviews)
const SingleRating = ({ size }: { size: SummarySize }) => (
  <RatingSummary layout="stacked" size={size}>
    <SummaryRow size={size}>
      <Rating readOnly value={1} max={1} size={size} />
      <RatingSummaryScore value={3.6} />
      <TopRated size={size} />
    </SummaryRow>
    <SummaryRow size={size}>
      <ReviewerPile size={size} />
      <RatingSummaryReviews count={2341} href="#" />
    </SummaryRow>
  </RatingSummary>
)

const summaryLayouts = [
  { key: "Group · Type 1", Comp: GroupType1 },
  { key: "Group · Type 2", Comp: GroupType2 },
  { key: "Group · Type 3", Comp: GroupType3 },
  { key: "Single Rating", Comp: SingleRating },
] as const

const Summary = React.memo(function Summary() {
  return (
    <SectionFrame title="Summary (vertical)">
      <div className="flex flex-col gap-10">
        {summaryLayouts.map(({ key, Comp }) => (
          <div key={key} className="flex flex-col gap-3">
            <SectionLabel>{key}</SectionLabel>
            <div className="flex flex-wrap items-start gap-x-16 gap-y-6">
              <div className="flex flex-col gap-2">
                <Label>md</Label>
                <Comp size="md" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>xs</Label>
                <Comp size="xs" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Summary (horizontal) — single-row Group/Single in md + xs
// ---------------------------------------------------------------------------

// order: rating · score · avatars · "·" · reviews · badge
const HorizontalSummary = ({
  size,
  single,
}: {
  size: SummarySize
  single?: boolean
}) => (
  <RatingSummary layout="row" size={size}>
    <Rating
      readOnly
      value={single ? 1 : 3.6}
      max={single ? 1 : 5}
      size={size}
    />
    <RatingSummaryScore value={3.6} />
    <ReviewerPile size={size} />
    <RatingSummaryDot />
    <RatingSummaryReviews count={2341} href="#" />
    <TopRated size={size} />
  </RatingSummary>
)

const SummaryHorizontal = React.memo(function SummaryHorizontal() {
  return (
    <SectionFrame title="Summary (horizontal)">
      <div className="flex flex-col gap-8">
        {[
          { key: "Group", single: false },
          { key: "Single Rating", single: true },
        ].map(({ key, single }) => (
          <div key={key} className="flex flex-col gap-3">
            <SectionLabel>{key}</SectionLabel>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-2">
                <Label>md</Label>
                <HorizontalSummary size="md" single={single} />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label>xs</Label>
                <HorizontalSummary size="xs" single={single} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Summary (tinted containers) — 4 colors × rounded/pill × content types
// ---------------------------------------------------------------------------

const tintColors = [
  { tint: "primary", label: "primary" },
  { tint: "neutral-soft", label: "neutral (soft)" },
  { tint: "neutral-outline", label: "neutral (outline)" },
  { tint: "yellow", label: "yellow" },
] as const

type TintedType = "avatar" | "badge" | "text" | "group"

const TintedContent = ({
  type,
  size,
}: {
  type: TintedType
  size: SummarySize
}) => {
  if (type === "group") {
    return (
      <>
        <Rating readOnly value={3.6} size={size} />
        <RatingSummaryScore value={3.6} />
      </>
    )
  }
  return (
    <>
      <Rating readOnly value={1} max={1} size={size} />
      <RatingSummaryScore value={3.6} />
      {type === "avatar" && <ReviewerPile size={size} />}
      {type === "badge" && <TopRated size={size} />}
      {type === "text" && (
        <>
          <RatingSummaryDot />
          <RatingSummaryReviews count={2341} />
        </>
      )}
    </>
  )
}

const tintedTypes = [
  { key: "Avatar", type: "avatar" },
  { key: "Badge", type: "badge" },
  { key: "Text", type: "text" },
  { key: "Group Rating", type: "group" },
] as const

const SummaryTinted = React.memo(function SummaryTinted() {
  return (
    <SectionFrame title="Summary (tinted containers)">
      <div className="flex flex-col gap-10">
        {tintedTypes.map(({ key, type }) => (
          <div key={key} className="flex flex-col gap-4">
            <SectionLabel>{key}</SectionLabel>
            {(["md", "xs"] as const).flatMap((size) =>
              (["rounded", "pill"] as const).map((shape) => (
                <div key={`${size}-${shape}`} className="flex flex-col gap-2">
                  <Label>
                    {size} · {shape}
                  </Label>
                  <div className="flex flex-wrap items-center gap-4">
                    {tintColors.map(({ tint }) => (
                      <RatingSummary
                        key={tint}
                        tint={tint}
                        shape={shape}
                        size={size}
                      >
                        <TintedContent type={type} size={size} />
                      </RatingSummary>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function RatingExample() {
  return (
    <div className="flex flex-col gap-16">
      <TypesOverview />
      <GlyphMatrix />
      <div className="flex flex-wrap gap-16">
        <Containers />
        <Sizes />
      </div>
      <Fractional />
      <Interactive />
      <Summary />
      <SummaryHorizontal />
      <SummaryTinted />
    </div>
  )
}
