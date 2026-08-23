import * as React from "react"
import {
  RiAddLine,
  RiCalendarFill,
  RiCheckFill,
  RiHeartFill,
  RiPhoneFill,
  RiSparklingFill,
  RiStarFill,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import {
  Avatar,
  AvatarBadge,
  AvatarBadgeFlag,
  AvatarBadgeIcon,
  AvatarBadgeLogo,
  AvatarBadgePolygon,
  AvatarBadgeStatus,
  AvatarBadgeText,
  AvatarGroup,
  AvatarGroupAction,
  AvatarIcon,
  AvatarImage,
  AvatarRing,
  AvatarText,
  type AvatarBadgeIconColor,
  type AvatarBadgePolygonColor,
  type AvatarBadgeSize,
  type AvatarBadgeStatusVariant,
  type AvatarShape,
  type AvatarSize,
} from "@/registry/ui/avatar"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const sizes = ["2xl", "xl", "lg", "md", "sm", "xs", "2xs"] as const
const shapes: AvatarShape[] = ["circle", "rounded"]

const avatarImages = [
  "https://createui.co/avatars/ayla-karagoz.webp",
  "https://createui.co/avatars/luca-moretti.webp",
  "https://createui.co/avatars/yuki-tanaka.webp",
  "https://createui.co/avatars/liam-obrien.webp",
  "https://createui.co/avatars/sofia-reis.webp",
  "https://createui.co/avatars/dimitri-volkov.webp",
  "https://createui.co/avatars/fatou-diallo.webp",
  "https://createui.co/avatars/tomas-herrera.webp",
  "https://createui.co/avatars/mei-lin-chen.webp",
  "https://createui.co/avatars/erik-lindqvist.webp",
  "https://createui.co/avatars/priya-sharma.webp",
  "https://createui.co/avatars/marcus-okafor.webp",
]

const bgColors = [
  "inverse",
  "neutral",
  "red",
  "green",
  "orange",
  "blue",
  "sky",
  "indigo",
  "fuchsia",
  "yellow",
  "stable",
] as const

const bgVariants = ["gradient", "strong", "base", "weak", "alpha"] as const

const badgeSizes: AvatarBadgeSize[] = ["lg", "md", "sm", "xs"]

// ---------------------------------------------------------------------------
// Avatar Component — Appearance × Size × Shape
// ---------------------------------------------------------------------------

const AvatarComponentSection = React.memo(function AvatarComponentSection() {
  return (
    <>
      {shapes.map((shape) => (
        <SectionFrame key={shape} title={`Shape: ${shape}`}>
          <div className="flex flex-col items-center gap-8 p-8">
            {/* Image */}
            <div className="flex items-end justify-center gap-6">
              {sizes.map((size, i) => (
                <Avatar
                  key={size}
                  size={size}
                  shape={shape}
                  variant="weak-orange"
                >
                  {shape === "circle" && <AvatarRing />}
                  <AvatarImage
                    src={avatarImages[i % avatarImages.length]}
                    alt="User"
                  />
                  <AvatarBadge position="bottom">
                    <AvatarBadgeStatus variant="online" shape={shape} />
                  </AvatarBadge>
                </Avatar>
              ))}
            </div>

            {/* Text */}
            <div className="flex items-end justify-center gap-6">
              {sizes.map((size) => (
                <Avatar
                  key={size}
                  size={size}
                  shape={shape}
                  variant="weak-blue"
                >
                  {shape === "circle" && <AvatarRing />}
                  <AvatarText>AK</AvatarText>
                  <AvatarBadge position="top">
                    <AvatarBadgeText color="rose">9</AvatarBadgeText>
                  </AvatarBadge>
                </Avatar>
              ))}
            </div>

            {/* Blank */}
            <div className="flex items-end justify-center gap-6">
              {sizes.map((size) => (
                <Avatar
                  key={size}
                  size={size}
                  shape={shape}
                  variant="alpha-indigo"
                >
                  {shape === "circle" && <AvatarRing />}
                  <AvatarIcon variant="base-neutral" />
                  <AvatarBadge position="bottom">
                    <AvatarBadgeIcon shape={shape} color="violet">
                      <RiCalendarFill />
                    </AvatarBadgeIcon>
                  </AvatarBadge>
                </Avatar>
              ))}
            </div>
          </div>
        </SectionFrame>
      ))}
    </>
  )
})

// ---------------------------------------------------------------------------
// Text Avatar — Sizes × Colors
// ---------------------------------------------------------------------------

const TextSection = React.memo(function TextSection() {
  return (
    <SectionFrame title="Text Avatar — Sizes × Colors">
      <div className="flex items-start justify-center gap-6 rounded-xl bg-[#E5E5E5] p-6">
        {bgColors.map((color) => (
          <div key={color} className="flex flex-col items-center gap-3">
            {sizes.map((size) => (
              <Avatar
                key={size}
                size={size}
                variant={`weak-${color}`}
                background={false}
              >
                <AvatarText>AK</AvatarText>
              </Avatar>
            ))}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Variant — Colors × Fills (background + text from one prop)
// ---------------------------------------------------------------------------

const VariantSection = React.memo(function VariantSection() {
  return (
    <SectionFrame title="Variant — Colors × Fills">
      <div className="flex flex-col items-center gap-4 p-6">
        {bgVariants.map((fill) => (
          <div key={fill} className="space-y-1">
            <p className="text-disabled text-center text-[9px] font-medium uppercase">
              {fill}
            </p>
            <div className="flex items-center justify-center gap-3">
              {bgColors.map((color) => (
                <Avatar key={color} size="lg" variant={`${fill}-${color}`}>
                  <AvatarText>AK</AvatarText>
                </Avatar>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Ring Variants — Full, Progress, Loading
// ---------------------------------------------------------------------------

const ringColors = [
  "strongest",
  "static",
  "error",
  "success",
  "info",
  "away",
  "linear-1",
  "linear-2",
  "linear-3",
] as const

const RingSection = React.memo(function RingSection() {
  return (
    <SectionFrame title="Ring Variants">
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Full
          </p>
          <div className="flex items-end justify-center gap-6">
            {ringColors.map((color, i) => (
              <Avatar key={color} size="xl">
                <AvatarRing color={color} />
                <AvatarImage
                  src={avatarImages[i % avatarImages.length]}
                  alt="User"
                />
              </Avatar>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Progress (65%)
          </p>
          <div className="flex items-end justify-center gap-6">
            {ringColors.map((color, i) => (
              <Avatar key={color} size="xl">
                <AvatarRing variant="progress" value={65} color={color} />
                <AvatarImage
                  src={avatarImages[i % avatarImages.length]}
                  alt="User"
                />
              </Avatar>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Loading
          </p>
          <div className="flex items-end justify-center gap-6">
            {ringColors.map((color, i) => (
              <Avatar key={color} size="xl">
                <AvatarRing variant="loading" color={color} />
                <AvatarImage
                  src={avatarImages[i % avatarImages.length]}
                  alt="User"
                />
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Status Badges — All 8 variants × 4 sizes × 2 shapes
// ---------------------------------------------------------------------------

const statusVariants: AvatarBadgeStatusVariant[] = [
  "invisible",
  "online",
  "busy",
  "offline",
  "away",
  "do-not-disturb",
  "recording",
  "typing",
]

const BadgeStatusSection = React.memo(function BadgeStatusSection() {
  return (
    <SectionFrame title="Status Badges">
      <div className="flex flex-col items-center gap-8 p-8">
        {shapes.map((shape) => (
          <div key={shape} className="space-y-3">
            <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
              {shape}
            </p>
            <div className="flex flex-col items-start gap-3">
              {badgeSizes.map((size) => (
                <div key={size} className="flex items-center gap-4">
                  <span className="text-disabled w-6 text-[10px] uppercase">
                    {size}
                  </span>
                  {statusVariants.map((variant) => (
                    <div
                      key={variant}
                      className="flex flex-col items-center gap-1"
                    >
                      <AvatarBadgeStatus
                        size={size}
                        shape={shape}
                        variant={variant}
                      />
                      {size === "lg" && (
                        <span className="text-disabled text-[7px]">
                          {variant}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Status badge composed with avatar */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            On Avatar
          </p>
          <div className="flex items-end justify-center gap-6">
            {statusVariants.map((variant, i) => (
              <div key={variant} className="flex flex-col items-center gap-1">
                <Avatar size="xl">
                  <AvatarImage
                    src={avatarImages[i % avatarImages.length]}
                    alt="User"
                  />
                  <AvatarBadge position="bottom">
                    <AvatarBadgeStatus variant={variant} />
                  </AvatarBadge>
                </Avatar>
                <span className="text-disabled text-[8px]">{variant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Text / Number Badges — rose-500 | blue-600, sizes lg/md/sm/xs
// ---------------------------------------------------------------------------

const TextBadgeSection = React.memo(function TextBadgeSection() {
  return (
    <SectionFrame title="Text / Number Badges">
      <div className="flex flex-col items-center gap-8 p-8">
        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Sizes (font 12 / 10 / 8 / 6 px)
          </p>
          <div className="flex items-end justify-center gap-6">
            {badgeSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <AvatarBadgeText size={size} color="rose">
                  9
                </AvatarBadgeText>
                <span className="text-disabled text-[8px]">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Colors
          </p>
          <div className="flex items-end justify-center gap-6">
            {(["rose", "blue"] as const).map((color) => (
              <div key={color} className="flex flex-col items-center gap-1">
                <AvatarBadgeText color={color}>99</AvatarBadgeText>
                <span className="text-disabled text-[8px]">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* On Avatar */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            On Avatar
          </p>
          <div className="flex items-end justify-center gap-6">
            {[
              { label: "Single", value: "9", color: "rose" as const },
              { label: "Multiple", value: "99", color: "rose" as const },
              { label: "New", value: "NEW", color: "blue" as const },
              { label: "Live", value: "LIVE", color: "blue" as const },
            ].map((b, i) => (
              <div key={b.label} className="flex flex-col items-center gap-1">
                <Avatar size="xl">
                  <AvatarImage
                    src={avatarImages[i % avatarImages.length]}
                    alt="User"
                  />
                  <AvatarBadge position="top">
                    <AvatarBadgeText color={b.color}>{b.value}</AvatarBadgeText>
                  </AvatarBadge>
                </Avatar>
                <span className="text-disabled text-[8px]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Icon Badges — 11 colors × 4 sizes × 2 shapes
// ---------------------------------------------------------------------------

const iconColors: AvatarBadgeIconColor[] = [
  "yellow",
  "green",
  "violet",
  "blue",
  "sky",
  "red",
  "amber",
  "heavy",
  "strongest",
  "light",
  "static-white",
]

const IconBadgeSection = React.memo(function IconBadgeSection() {
  return (
    <SectionFrame title="Icon Badges">
      <div className="flex flex-col items-center gap-8 p-8">
        {/* All colors */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Colors (circle · lg)
          </p>
          <div className="flex flex-wrap items-end justify-center gap-4">
            {iconColors.map((color) => (
              <div key={color} className="flex flex-col items-center gap-1">
                <AvatarBadgeIcon color={color}>
                  <RiStarFill />
                </AvatarBadgeIcon>
                <span className="text-disabled text-[8px]">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Sizes (icon 12 / 9.6 / 7.2 / 4.8 px)
          </p>
          <div className="flex items-end justify-center gap-6">
            {badgeSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <AvatarBadgeIcon size={size} color="blue">
                  <RiCheckFill />
                </AvatarBadgeIcon>
                <span className="text-disabled text-[8px]">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shapes */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Shapes
          </p>
          <div className="flex items-end justify-center gap-6">
            {shapes.map((shape) => (
              <div key={shape} className="flex flex-col items-center gap-1">
                <AvatarBadgeIcon shape={shape} color="violet">
                  <RiSparklingFill />
                </AvatarBadgeIcon>
                <span className="text-disabled text-[8px]">{shape}</span>
              </div>
            ))}
          </div>
        </div>

        {/* On Avatar */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            On Avatar
          </p>
          <div className="flex items-end justify-center gap-6">
            {[
              {
                icon: <RiCheckFill />,
                color: "blue" as const,
                label: "Verified",
              },
              {
                icon: <RiStarFill />,
                color: "amber" as const,
                label: "Starred",
              },
              {
                icon: <RiHeartFill />,
                color: "red" as const,
                label: "Favourite",
              },
              {
                icon: <RiPhoneFill />,
                color: "green" as const,
                label: "On Call",
              },
              {
                icon: <RiCalendarFill />,
                color: "violet" as const,
                label: "Meeting",
              },
            ].map((b, i) => (
              <div key={b.label} className="flex flex-col items-center gap-1">
                <Avatar size="xl">
                  <AvatarImage
                    src={avatarImages[i % avatarImages.length]}
                    alt="User"
                  />
                  <AvatarBadge position="bottom">
                    <AvatarBadgeIcon color={b.color}>{b.icon}</AvatarBadgeIcon>
                  </AvatarBadge>
                </Avatar>
                <span className="text-disabled text-[8px]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Flag Badges — image-only, 20/16/12/8 px
// ---------------------------------------------------------------------------

const FlagBadgeSection = React.memo(function FlagBadgeSection() {
  return (
    <SectionFrame title="Flag Badges">
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Sizes (20 / 16 / 12 / 8 px)
          </p>
          <div className="flex items-end justify-center gap-6">
            {badgeSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <AvatarBadgeFlag size={size}>
                  <img
                    src="https://createui.co/images/avatar-flag.svg"
                    alt="Flag"
                  />
                </AvatarBadgeFlag>
                <span className="text-disabled text-[8px]">{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            On Avatar
          </p>
          <div className="flex items-end justify-center gap-6">
            <Avatar size="xl">
              <AvatarImage src={avatarImages[0]} alt="User" />
              <AvatarBadge position="bottom">
                <AvatarBadgeFlag>
                  <img
                    src="https://createui.co/images/avatar-flag.svg"
                    alt="Flag"
                  />
                </AvatarBadgeFlag>
              </AvatarBadge>
            </Avatar>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Logo Badges — image-only, 16/12.8/9.6/6.4 px
// ---------------------------------------------------------------------------

const LogoBadgeSection = React.memo(function LogoBadgeSection() {
  return (
    <SectionFrame title="Logo Badges">
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Sizes (16 / 12.8 / 9.6 / 6.4 px)
          </p>
          <div className="flex items-end justify-center gap-6">
            {badgeSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <AvatarBadgeLogo size={size}>
                  <img
                    src="https://createui.co/images/avatar-logo.svg"
                    alt="Logo"
                  />
                </AvatarBadgeLogo>
                <span className="text-disabled text-[8px]">{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            On Avatar
          </p>
          <div className="flex items-end justify-center gap-6">
            <Avatar size="xl">
              <AvatarImage src={avatarImages[1]} alt="User" />
              <AvatarBadge position="bottom">
                <AvatarBadgeLogo>
                  <img
                    src="https://createui.co/images/avatar-logo.svg"
                    alt="Logo"
                  />
                </AvatarBadgeLogo>
              </AvatarBadge>
            </Avatar>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Polygon Badges — SVG-shaped badge with icon
// ---------------------------------------------------------------------------

const polygonColors: AvatarBadgePolygonColor[] = [
  "sky",
  "yellow",
  "neutral-100",
  "neutral-700",
  "light",
]

const PolygonBadgeSection = React.memo(function PolygonBadgeSection() {
  return (
    <SectionFrame title="Polygon Badges">
      <div className="flex flex-col items-center gap-8 p-8">
        {/* Colors */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Colors (lg)
          </p>
          <div className="flex items-end justify-center gap-6">
            {polygonColors.map((color) => (
              <div key={color} className="flex flex-col items-center gap-1">
                <AvatarBadgePolygon color={color}>
                  <RiCheckFill />
                </AvatarBadgePolygon>
                <span className="text-disabled text-[8px]">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            Sizes (20 / 16 / 12 / 8 px)
          </p>
          <div className="flex items-end justify-center gap-6">
            {badgeSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <AvatarBadgePolygon size={size} color="sky">
                  <RiCheckFill />
                </AvatarBadgePolygon>
                <span className="text-disabled text-[8px]">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* On Avatar */}
        <div className="space-y-2">
          <p className="text-body text-center text-[10px] font-semibold tracking-wider uppercase">
            On Avatar
          </p>
          <div className="flex items-end justify-center gap-6">
            <Avatar size="xl">
              <AvatarImage src={avatarImages[0]} alt="User" />
              <AvatarBadge position="bottom">
                <AvatarBadgePolygon color="sky">
                  <RiCheckFill />
                </AvatarBadgePolygon>
              </AvatarBadge>
            </Avatar>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Avatar Icon — User Symbol × Colors × Variants
// ---------------------------------------------------------------------------

const iconVariants = ["base", "weak", "strong"] as const

const IconSymbolSection = React.memo(function IconSymbolSection() {
  return (
    <SectionFrame title="Avatar Icon — User Symbol × Colors × Variants">
      <div className="flex flex-col items-center gap-4 p-6">
        {iconVariants.map((variant) => (
          <div key={variant} className="space-y-1">
            <p className="text-disabled text-center text-[9px] font-medium uppercase">
              {variant}
            </p>
            <div className="flex items-center justify-center gap-3">
              {bgColors.map((color) => (
                <Avatar key={color} size="lg" variant="weak-neutral">
                  <AvatarIcon variant={`${variant}-${color}`} />
                </Avatar>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Avatar Group — Sizes × Shapes × Action (icon | number)
// ---------------------------------------------------------------------------

const groupImages = [
  avatarImages[0],
  avatarImages[1],
  avatarImages[2],
  avatarImages[3],
  avatarImages[4],
  avatarImages[5],
  avatarImages[6],
  avatarImages[7],
] as const

const AvatarGroupSection = React.memo(function AvatarGroupSection() {
  return (
    <SectionFrame title="Avatar Group — Sizes × Shapes × Action">
      <div className="flex flex-col items-start gap-10 p-8">
        {shapes.map((shape) => (
          <div key={shape} className="space-y-6">
            <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
              Shape: {shape}
            </p>

            {(["icon", "number"] as const).map((action) => (
              <div key={action} className="space-y-3">
                <p className="text-disabled text-[9px] uppercase">
                  Action: {action}
                </p>
                <div className="flex flex-col items-start gap-4">
                  {sizes.map((size: AvatarSize) => (
                    <AvatarGroup key={size} size={size} shape={shape}>
                      {groupImages.map((src, i) => (
                        <Avatar key={i}>
                          <AvatarImage src={src} alt="User" />
                        </Avatar>
                      ))}
                      <AvatarGroupAction>
                        {action === "icon" ? <RiAddLine /> : "+7"}
                      </AvatarGroupAction>
                    </AvatarGroup>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function AvatarExample() {
  return (
    <div className="flex flex-col gap-16">
      <AvatarComponentSection />
      <TextSection />
      <VariantSection />
      <RingSection />
      <BadgeStatusSection />
      <TextBadgeSection />
      <IconBadgeSection />
      <FlagBadgeSection />
      <LogoBadgeSection />
      <PolygonBadgeSection />
      <IconSymbolSection />
      <AvatarGroupSection />
    </div>
  )
}
