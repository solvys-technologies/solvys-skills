import * as React from "react"
import { Google } from "@create-ui/assets/brands"
import { UnitedKingdom } from "@create-ui/assets/flags"
import { RiFilter3Fill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Chip } from "@/registry/ui/chip"

// ---------------------------------------------------------------------------
// Constants – mirrors the Figma variant matrix
// ---------------------------------------------------------------------------

const sizes = ["xl", "lg", "md", "sm", "xs"] as const
const colors = ["info", "danger", "success", "neutral"] as const

const appearanceShapeGroups = [
  { appearance: "outline", shape: "pill" },
  { appearance: "outline", shape: "rounded" },
  { appearance: "soft", shape: "pill" },
  { appearance: "soft", shape: "rounded" },
] as const

const states = [
  { label: "Default", props: {} },
  { label: "Selected", props: { selected: true } },
  { label: "Dragging", props: { dragging: true } },
  { label: "Disabled", props: { disabled: true } },
] as const

// ---------------------------------------------------------------------------
// 7 chips in a group (Icon×4 colors + Avatar + Country + Brand)
// ---------------------------------------------------------------------------

function ChipGroup({
  appearance,
  shape,
  size,
  stateProps,
}: {
  appearance: "outline" | "soft"
  shape: "pill" | "rounded"
  size: "xs" | "sm" | "md" | "lg" | "xl"
  stateProps: Record<string, boolean>
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {colors.map((color) => (
        <Chip
          key={color}
          appearance={appearance}
          variant={color}
          size={size}
          shape={shape}
          closable
          {...stateProps}
        >
          <RiFilter3Fill />
          Chips
        </Chip>
      ))}
      <Chip
        appearance={appearance}
        variant="neutral"
        size={size}
        shape={shape}
        closable
        {...stateProps}
      >
        <Avatar
          shape={shape === "pill" ? "circle" : "rounded"}
          size={size === "xl" ? "xs" : "2xs"}
          stroke={false}
        >
          <AvatarImage
            src="https://createui.co/avatars/ayla-karagoz.webp"
            alt="Avatar"
          />
        </Avatar>
        Avatar
      </Chip>
      <Chip
        appearance={appearance}
        variant="neutral"
        size={size}
        shape={shape}
        closable
        {...stateProps}
      >
        <UnitedKingdom />
        United Kingdom
      </Chip>
      <Chip
        appearance={appearance}
        variant="neutral"
        size={size}
        shape={shape}
        closable
        {...stateProps}
      >
        <Google />
        Google
      </Chip>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

export default function ChipExample() {
  return (
    <div className="space-y-12">
      {sizes.map((size) => (
        <SectionFrame key={size} title={`Size: ${size.toUpperCase()}`}>
          <div className="flex flex-col gap-8">
            {appearanceShapeGroups.map((group) => (
              <div
                key={`${group.appearance}-${group.shape}`}
                className="space-y-3"
              >
                <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
                  {group.appearance} · {group.shape}
                </p>
                {states.map((state) => (
                  <div key={state.label} className="flex items-center gap-4">
                    <span className="text-disabled w-16 shrink-0 text-[10px] font-medium uppercase">
                      {state.label}
                    </span>
                    <ChipGroup
                      appearance={group.appearance}
                      shape={group.shape}
                      size={size}
                      stateProps={state.props}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SectionFrame>
      ))}
    </div>
  )
}
