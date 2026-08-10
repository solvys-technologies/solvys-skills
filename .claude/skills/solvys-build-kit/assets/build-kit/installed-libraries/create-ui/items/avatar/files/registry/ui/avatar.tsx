"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

const avatarVariants = cva(
  "group/avatar text-primary-base relative inline-flex shrink-0 select-none items-center justify-center",
  {
    variants: {
      size: {
        "2xs": "size-5",
        xs: "size-6",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-14",
        "2xl": "size-16",
      },
      shape: {
        circle: "rounded-full",
        rounded: "",
      },

      variant: {
        "gradient-inverse":
          "bg-gradient-to-b from-medium to-static-white text-static-black",
        "strong-inverse": "bg-static-white text-static-black",
        "base-inverse": "bg-medium text-static-black",
        "weak-inverse": "bg-weak text-static-black",
        "alpha-inverse": "bg-static-white/48 text-static-black",
        "gradient-neutral":
          "bg-gradient-to-b from-static-black to-heavy text-static-white",
        "strong-neutral": "bg-static-black text-static-white",
        "base-neutral": "bg-heavy text-static-white",
        "weak-neutral": "bg-light text-static-black",
        "alpha-neutral": "bg-static-black/48 text-static-white",
        "gradient-red":
          "bg-gradient-to-b from-error-base to-error-strongest text-static-white",
        "strong-red": "bg-error-strongest text-static-white",
        "base-red": "bg-error-base text-static-white",
        "weak-red": "bg-error-weakest text-error-base",
        "alpha-red": "bg-red-500/48 text-error-base",
        "gradient-green":
          "bg-gradient-to-b from-success-base to-success-strongest text-static-white",
        "strong-green": "bg-success-strongest text-static-white",
        "base-green": "bg-success-base text-static-white",
        "weak-green": "bg-success-weakest text-success-base",
        "alpha-green": "bg-green-500/48 text-success-strong",
        "gradient-orange":
          "bg-gradient-to-b from-warning-base to-warning-strongest text-static-white",
        "strong-orange": "bg-warning-strongest text-static-white",
        "base-orange": "bg-warning-base text-static-white",
        "weak-orange": "bg-warning-weakest text-warning-base",
        "alpha-orange": "bg-orange-500/48 text-warning-strong",
        "gradient-blue":
          "bg-gradient-to-b from-info-base to-info-strongest text-static-white",
        "strong-blue": "bg-info-strongest text-static-white",
        "base-blue": "bg-info-base text-static-white",
        "weak-blue": "bg-info-weakest text-info-base",
        "alpha-blue": "bg-blue-500/48 text-info-strong",
        "gradient-sky":
          "bg-gradient-to-b from-verified-base to-verified-strongest text-static-white",
        "strong-sky": "bg-verified-strongest text-static-white",
        "base-sky": "bg-verified-base text-static-white",
        "weak-sky": "bg-verified-weakest text-verified-base",
        "alpha-sky": "bg-sky-500/48 text-verified-base",
        "gradient-indigo":
          "bg-gradient-to-b from-feature-base to-feature-strongest text-static-white",
        "strong-indigo": "bg-feature-strongest text-static-white",
        "base-indigo": "bg-feature-base text-static-white",
        "weak-indigo": "bg-feature-weakest text-feature-base",
        "alpha-indigo": "bg-indigo-500/48 text-feature-base",
        "gradient-fuchsia":
          "bg-gradient-to-b from-highlighted-base to-highlighted-strongest text-static-white",
        "strong-fuchsia": "bg-highlighted-strongest text-static-white",
        "base-fuchsia": "bg-highlighted-base text-static-white",
        "weak-fuchsia": "bg-highlighted-weakest text-highlighted-base",
        "alpha-fuchsia": "bg-fuchsia-500/48 text-highlighted-base",
        "gradient-yellow":
          "bg-gradient-to-b from-away-base to-away-strongest text-static-white",
        "strong-yellow": "bg-away-strongest text-static-white",
        "base-yellow": "bg-away-base text-static-white",
        "weak-yellow": "bg-away-weakest text-away-base",
        "alpha-yellow": "bg-yellow-500/48 text-away-base",
        "gradient-stable":
          "bg-gradient-to-b from-stable-strongest to-stable-base text-static-white",
        "strong-stable": "bg-stable-strongest text-static-white",
        "base-stable": "bg-stable-base text-static-white",
        "weak-stable": "bg-stable-weakest text-static-black",
        "alpha-stable": "bg-neutral-500/48 text-static-black",
      },

      background: {
        true: "",
        false: "bg-none bg-transparent",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "2xs", className: "rounded-sm" },
      { shape: "rounded", size: "xs", className: "rounded-md" },
      { shape: "rounded", size: "sm", className: "rounded-lg" },
      { shape: "rounded", size: "md", className: "rounded-xl" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },
      { shape: "rounded", size: "2xl", className: "rounded-2xl" },
    ],
    defaultVariants: {
      size: "md",
      shape: "circle",
      background: true,
    },
  }
)

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>
type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>["shape"]>

const AVATAR_SIZE_PX: Record<AvatarSize, number> = {
  "2xs": 20,
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
}

const AVATAR_STROKE_CLASS: Record<AvatarSize, string> = {
  "2xs": "outline-[0.5px] outline-offset-[-0.5px]",
  xs: "outline-[0.5px] outline-offset-[-0.5px]",
  sm: "outline-[0.75px] outline-offset-[-0.75px]",
  md: "outline-[1px] outline-offset-[-1px]",
  lg: "outline-[1px] outline-offset-[-1px]",
  xl: "outline-[1px] outline-offset-[-1px]",
  "2xl": "outline-[1px] outline-offset-[-1px]",
}

type AvatarImageStatus = "idle" | "loaded" | "error"

type AvatarContextValue = {
  size: AvatarSize
  shape: AvatarShape
  imageStatus: AvatarImageStatus
  setImageStatus: (status: AvatarImageStatus) => void
}
const AvatarContext = React.createContext<AvatarContextValue | null>(null)

type AvatarProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> & {
    stroke?: boolean
  }

function Avatar({
  className,
  size: sizeProp,
  shape: shapeProp,
  variant: variantProp,
  background,
  stroke: strokeProp,
  children,
  ...props
}: AvatarProps) {
  const groupCtx = React.useContext(AvatarGroupContext)
  const size = sizeProp ?? groupCtx?.size ?? "md"
  const shape = shapeProp ?? groupCtx?.shape ?? "circle"
  const variant = variantProp ?? groupCtx?.variant

  const stroke = strokeProp ?? !groupCtx
  const [imageStatus, setImageStatus] =
    React.useState<AvatarImageStatus>("idle")
  return (
    <AvatarContext.Provider
      value={{ size, shape, imageStatus, setImageStatus }}
    >
      <div
        data-slot="avatar"
        data-size={size}
        data-shape={shape}
        data-stroke={stroke}
        data-variant={variant}
        className={cn(
          avatarVariants({ size, shape, variant, background }),
          stroke && ["outline-medium outline", AVATAR_STROKE_CLASS[size]],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  )
}
Avatar.displayName = "Avatar"

type AvatarImageProps = React.ComponentProps<"img">

function AvatarImage({
  className,
  alt = "",
  onLoad,
  onError,
  ...props
}: AvatarImageProps) {
  const ctx = React.useContext(AvatarContext)
  const setImageStatus = ctx?.setImageStatus
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.currentSrc) {
      setImageStatus?.(img.naturalWidth > 0 ? "loaded" : "error")
    }
  }, [setImageStatus, props.src])
  return (
    <img
      ref={imgRef}
      data-slot="avatar-image"
      alt={alt}
      onLoad={(event) => {
        ctx?.setImageStatus("loaded")
        onLoad?.(event)
      }}
      onError={(event) => {
        ctx?.setImageStatus("error")
        onError?.(event)
      }}
      className={cn(
        "pointer-events-none absolute inset-0 size-full overflow-hidden rounded-[inherit] object-cover",
        ctx?.imageStatus !== "loaded" && "opacity-0",
        className
      )}
      {...props}
    />
  )
}

type AvatarTextProps = React.ComponentProps<"span">

function AvatarText({ className, children, ...props }: AvatarTextProps) {
  const ctx = React.useContext(AvatarContext)

  if (ctx?.imageStatus === "loaded") return null
  return (
    <span
      data-slot="avatar-text"
      className={cn(
        // base
        "z-10 flex size-full items-center justify-center overflow-hidden rounded-[inherit] font-medium",
        // group-data-[size]
        "group-data-[size=2xl]/avatar:text-heading-h4",
        "group-data-[size=xl]/avatar:text-heading-h5",
        "group-data-[size=lg]/avatar:text-heading-h6",
        "group-data-[size=md]/avatar:text-heading-h6",
        "group-data-[size=sm]/avatar:text-body-md",
        "group-data-[size=xs]/avatar:text-body-xs",
        "group-data-[size=2xs]/avatar:text-body-xs group-data-[size=2xs]/avatar:[letter-spacing:0px]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

const iconColorMap = {
  "base-inverse": "text-static-black",
  "weak-inverse": "text-heavy",
  "strong-inverse": "text-weakest",
  "base-neutral": "text-static-white",
  "weak-neutral": "text-weak",
  "strong-neutral": "text-strongest",
  "base-red": "text-error-base",
  "weak-red": "text-error-weak",
  "strong-red": "text-error-strongest",
  "base-green": "text-success-base",
  "weak-green": "text-success-weak",
  "strong-green": "text-success-strongest",
  "base-orange": "text-warning-base",
  "weak-orange": "text-warning-weak",
  "strong-orange": "text-warning-strongest",
  "base-blue": "text-info-base",
  "weak-blue": "text-info-weak",
  "strong-blue": "text-info-strongest",
  "base-sky": "text-verified-base",
  "weak-sky": "text-verified-weak",
  "strong-sky": "text-verified-strongest",
  "base-indigo": "text-feature-base",
  "weak-indigo": "text-feature-weak",
  "strong-indigo": "text-feature-strongest",
  "base-fuchsia": "text-highlighted-base",
  "weak-fuchsia": "text-highlighted-weak",
  "strong-fuchsia": "text-highlighted-strongest",
  "base-yellow": "text-away-base",
  "weak-yellow": "text-away-weak",
  "strong-yellow": "text-away-strongest",
  "base-stable": "text-stable-base",
  "weak-stable": "text-stable-weak",
  "strong-stable": "text-stable-strongest",
} satisfies Record<string, string>

type AvatarIconVariant = keyof typeof iconColorMap

type AvatarIconProps = Omit<React.ComponentProps<"span">, "children"> & {
  variant?: AvatarIconVariant
}

function AvatarIcon({ className, variant, ...props }: AvatarIconProps) {
  const ctx = React.useContext(AvatarContext)

  if (ctx?.imageStatus === "loaded") return null
  return (
    <span
      data-slot="avatar-icon"
      data-variant={variant}
      className={cn(
        "text-static-white pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]",
        variant && iconColorMap[variant],
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-[14.06%_29.69%_45.31%_29.69%] rounded-full bg-current"
      />
      <span
        aria-hidden
        className="absolute inset-[59.38%_14.06%_-31.25%_14.06%] rounded-full bg-current"
      />
    </span>
  )
}

type AvatarRingVariant = "full" | "progress" | "loading"

type AvatarRingColor =
  | "strongest"
  | "static"
  | "error"
  | "success"
  | "info"
  | "away"
  | "linear-1"
  | "linear-2"
  | "linear-3"

type AvatarRingGradientColor = "linear-1" | "linear-2" | "linear-3"

const ringColorMap: Partial<Record<AvatarRingColor, string>> = {
  strongest: "text-strongest",
  static: "text-static-white",
  error: "text-error-base",
  success: "text-success-base",
  info: "text-info-base",
  away: "text-away-base",
}

const ringGradientStops: Record<
  AvatarRingGradientColor,
  [string, string, string]
> = {
  "linear-1": ["#fde047", "#f97316", "#dc2626"],
  "linear-2": ["#a3e635", "#10b981", "#2563eb"],
  "linear-3": ["#c4b5fd", "#a855f7", "#db2777"],
}

const isGradientColor = (c: AvatarRingColor): c is AvatarRingGradientColor =>
  c in ringGradientStops

const RING_SIZE_MAP: Record<AvatarSize, { sw: number; gap: number }> = {
  "2xs": { sw: 0.5, gap: 0.4 },
  xs: { sw: 0.6, gap: 0.4 },
  sm: { sw: 0.85, gap: 0.4 },
  md: { sw: 1, gap: 0.5 },
  lg: { sw: 1.4, gap: 0.9 },
  xl: { sw: 1.4, gap: 0.9 },
  "2xl": { sw: 1.6, gap: 1.1 },
}

type AvatarRingProps = React.ComponentProps<"div"> & {
  variant?: AvatarRingVariant
  value?: number
  color?: AvatarRingColor
  strokeWidth?: number
  gap?: number
  size?: AvatarSize
}

function AvatarRing({
  className,
  variant = "full",
  value = 100,
  color = "info",
  strokeWidth: strokeWidthProp,
  gap: gapProp,
  size: sizeProp,
  ...props
}: AvatarRingProps) {
  const ctx = React.useContext(AvatarContext)
  const size = sizeProp ?? ctx?.size ?? "md"
  const preset = RING_SIZE_MAP[size]
  const strokeWidth = strokeWidthProp ?? preset.sw
  const gap = gapProp ?? preset.gap

  const avatarPx = AVATAR_SIZE_PX[size]
  const outerOffset = strokeWidth + gap
  const totalPx = avatarPx + 2 * outerOffset
  const svStrokeUnits = (strokeWidth * 100) / totalPx
  const radius = 50 - svStrokeUnits / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(Math.max(variant === "full" ? 100 : value, 0), 100)
  const offset = circumference - (progress / 100) * circumference

  const isGradient = isGradientColor(color)
  const gradientId = isGradient ? `ring-${color}` : undefined
  const gradientStops = isGradient ? ringGradientStops[color] : undefined

  return (
    <div
      data-slot="avatar-ring"
      className={cn(
        "pointer-events-none absolute inset-0",
        !isGradient && ringColorMap[color],
        className
      )}
      style={{ margin: `-${outerOffset}px` }}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className={cn("size-full!", variant !== "loading" && "-rotate-90")}
      >
        {isGradient && gradientStops && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientStops[0]} />
              <stop offset="50%" stopColor={gradientStops[1]} />
              <stop offset="100%" stopColor={gradientStops[2]} />
            </linearGradient>
          </defs>
        )}
        {variant === "progress" && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--color-light)"
            strokeWidth={svStrokeUnits}
            fill="none"
          />
        )}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={isGradient ? `url(#${gradientId})` : "currentColor"}
          strokeWidth={svStrokeUnits}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={variant === "loading" ? undefined : circumference}
          strokeDashoffset={variant === "loading" ? undefined : offset}
          className={
            variant !== "loading"
              ? "transition-[stroke-dashoffset] duration-300"
              : undefined
          }
        >
          {variant === "loading" && (
            <>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dasharray"
                values="1,320;246,320;246,320"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                calcMode="spline"
                dur="2.25s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0;-37;-308"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                calcMode="spline"
                dur="2.25s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      </svg>
    </div>
  )
}

type AvatarBadgeProps = React.ComponentProps<"span"> & {
  position?: "top" | "bottom"
}

function AvatarBadge({
  className,
  position = "bottom",
  children,
  ...props
}: AvatarBadgeProps) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute z-10 flex items-center justify-center",
        position === "top" && "top-[-1px] right-[-1px]",
        position === "bottom" && "right-[-1px] bottom-[-1px]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

type AvatarBadgeSize = "xs" | "sm" | "md" | "lg"
type AvatarBadgeShape = "circle" | "rounded"

const AVATAR_BADGE_SIZE: Record<AvatarSize, AvatarBadgeSize> = {
  "2xs": "xs",
  xs: "xs",
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "md",
  "2xl": "lg",
}

function useBadgeSize(sizeProp: AvatarBadgeSize | null | undefined) {
  const ctx = React.useContext(AvatarContext)
  return sizeProp ?? (ctx ? AVATAR_BADGE_SIZE[ctx.size] : undefined)
}

const badgeTextVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold leading-none text-white ring-static-white",
  {
    variants: {
      size: {
        xs: "h-2 min-w-2 px-0.5 text-[6px] ring-[0.5px]",
        sm: "h-3 min-w-3 px-0.5 text-[8px] ring-1",
        md: "h-4 min-w-4 px-1 text-[10px] ring-1",
        lg: "h-5 min-w-5 px-1 text-[12px] ring-1",
      },
      color: {
        rose: "bg-rose-500",
        blue: "bg-blue-600",
      },
    },
    defaultVariants: { size: "lg", color: "rose" },
  }
)

type AvatarBadgeTextColor = NonNullable<
  VariantProps<typeof badgeTextVariants>["color"]
>

type AvatarBadgeTextProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeTextVariants>

function AvatarBadgeText({
  className,
  size: sizeProp,
  color,
  children,
  ...props
}: AvatarBadgeTextProps) {
  const size = useBadgeSize(sizeProp)
  return (
    <span
      data-slot="avatar-badge-text"
      className={cn(badgeTextVariants({ size, color, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

const badgeIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden ring-static-white",
  {
    variants: {
      size: {
        xs: "size-2 [&_svg]:size-1.25 ring-[0.5px]",
        sm: "size-3 [&_svg]:size-2 ring-1",
        md: "size-4 [&_svg]:size-2.5 ring-1",
        lg: "size-5 [&_svg]:size-3 ring-1",
      },
      shape: {
        circle: "rounded-full",
        rounded: "",
      },
      color: {
        yellow: "bg-yellow-500 text-white",
        green: "bg-green-600 text-white",
        violet: "bg-violet-500 text-white",
        blue: "bg-blue-600 text-white",
        sky: "bg-sky-500 text-white",
        red: "bg-red-600 text-white",
        amber: "bg-amber-500 text-white",
        heavy: "bg-heavy text-static-white",
        strongest: "bg-strongest text-static-white",
        light: "bg-light text-static-black",
        "static-white": "bg-static-white text-static-black",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-xs" },
      { shape: "rounded", size: "sm", className: "rounded-xs" },
      { shape: "rounded", size: "md", className: "rounded-sm" },
      { shape: "rounded", size: "lg", className: "rounded-md" },
    ],
    defaultVariants: { size: "lg", shape: "circle", color: "blue" },
  }
)

type AvatarBadgeIconColor = NonNullable<
  VariantProps<typeof badgeIconVariants>["color"]
>

type AvatarBadgeIconProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeIconVariants>

function AvatarBadgeIcon({
  className,
  size: sizeProp,
  shape,
  color,
  children,
  ...props
}: AvatarBadgeIconProps) {
  const size = useBadgeSize(sizeProp)
  return (
    <span
      data-slot="avatar-badge-icon"
      className={cn(badgeIconVariants({ size, shape, color, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

const badgeFlagVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden ring-static-white [&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
  {
    variants: {
      size: {
        xs: "size-2 ring-[0.5px]",
        sm: "size-3 ring-1",
        md: "size-4 ring-1",
        lg: "size-5 ring-1",
      },
      shape: {
        circle: "rounded-full",
        rounded: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-xs" },
      { shape: "rounded", size: "sm", className: "rounded-xs" },
      { shape: "rounded", size: "md", className: "rounded-sm" },
      { shape: "rounded", size: "lg", className: "rounded-md" },
    ],
    defaultVariants: { size: "lg", shape: "circle" },
  }
)

type AvatarBadgeFlagProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeFlagVariants>

function AvatarBadgeFlag({
  className,
  size: sizeProp,
  shape,
  children,
  ...props
}: AvatarBadgeFlagProps) {
  const size = useBadgeSize(sizeProp)
  return (
    <span
      data-slot="avatar-badge-flag"
      className={cn(badgeFlagVariants({ size, shape, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

const badgeLogoVariants = cva(
  "bg-white inline-flex shrink-0 items-center justify-center overflow-hidden ring-static-white [&_img]:object-contain [&_svg]:object-contain",
  {
    variants: {
      size: {
        xs: "size-2 [&_img]:size-1.25 [&_svg]:size-1.5 ring-[0.5px]",
        sm: "size-3 [&_img]:size-2 [&_svg]:size-2.5 ring-1",
        md: "size-4 [&_img]:size-2.5 [&_svg]:size-3 ring-1",
        lg: "size-5 [&_img]:size-4 [&_svg]:size-4 ring-1",
      },
      shape: {
        circle: "rounded-full",
        rounded: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-xs" },
      { shape: "rounded", size: "sm", className: "rounded-xs" },
      { shape: "rounded", size: "md", className: "rounded-sm" },
      { shape: "rounded", size: "lg", className: "rounded-md" },
    ],
    defaultVariants: { size: "lg", shape: "circle" },
  }
)

type AvatarBadgeLogoProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeLogoVariants>

function AvatarBadgeLogo({
  className,
  size: sizeProp,
  shape,
  children,
  ...props
}: AvatarBadgeLogoProps) {
  const size = useBadgeSize(sizeProp)
  return (
    <span
      data-slot="avatar-badge-logo"
      className={cn(badgeLogoVariants({ size, shape, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

type AvatarBadgePolygonColor =
  | "sky"
  | "yellow"
  | "neutral-100"
  | "neutral-700"
  | "light"

const polygonColorMap: Record<
  AvatarBadgePolygonColor,
  { fill: string; stroke: string; icon: string }
> = {
  sky: {
    fill: "fill-sky-500",
    stroke: "stroke-static-white",
    icon: "text-white",
  },
  yellow: {
    fill: "fill-yellow-500",
    stroke: "stroke-static-white",
    icon: "text-white",
  },
  "neutral-100": {
    fill: "fill-neutral-100",
    stroke: "stroke-static-white",
    icon: "text-black",
  },
  "neutral-700": {
    fill: "fill-neutral-700",
    stroke: "stroke-static-white",
    icon: "text-white",
  },
  light: {
    fill: "fill-light",
    stroke: "stroke-static-white",
    icon: "text-placeholder",
  },
}

const badgePolygonVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      xs: "size-2 [&_.polygon-icon]:size-1.5",
      sm: "size-3 [&_.polygon-icon]:size-2.5",
      md: "size-4 [&_.polygon-icon]:size-3",
      lg: "size-5 [&_.polygon-icon]:size-4",
    },
  },
  defaultVariants: { size: "lg" },
})

type AvatarBadgePolygonProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgePolygonVariants> & {
    color?: AvatarBadgePolygonColor
  }

function AvatarBadgePolygon({
  className,
  size: sizeProp,
  color = "sky",
  children,
  ...props
}: AvatarBadgePolygonProps) {
  const size = useBadgeSize(sizeProp)
  const { fill, icon, stroke } = polygonColorMap[color]
  return (
    <span
      data-slot="avatar-badge-polygon"
      className={cn(badgePolygonVariants({ size, className }))}
      {...props}
    >
      <svg
        viewBox="0 0 23 23"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("absolute inset-0 size-full!", fill, stroke)}
      >
        <path d="M8.67969 1.70801C10.1852 0.0971513 12.7406 0.0971515 14.2461 1.70801C14.7998 2.30036 15.5822 2.62497 16.3926 2.59766C18.5962 2.52318 20.4026 4.32958 20.3281 6.5332C20.3008 7.34359 20.6254 8.12599 21.2178 8.67969C22.8286 10.1852 22.8286 12.7406 21.2178 14.2461C20.6254 14.7998 20.3008 15.5822 20.3281 16.3926C20.4026 18.5962 18.5962 20.4026 16.3926 20.3281C15.5822 20.3008 14.7998 20.6254 14.2461 21.2178C12.7406 22.8286 10.1852 22.8286 8.67969 21.2178C8.12599 20.6254 7.34359 20.3008 6.5332 20.3281C4.32958 20.4026 2.52318 18.5962 2.59766 16.3926C2.62497 15.5822 2.30036 14.7998 1.70801 14.2461C0.0971513 12.7406 0.0971515 10.1852 1.70801 8.67969C2.30036 8.12599 2.62497 7.34359 2.59766 6.5332C2.52318 4.32958 4.32958 2.52318 6.5332 2.59766C7.34359 2.62497 8.12599 2.30036 8.67969 1.70801Z" />
      </svg>
      <span
        className={cn(
          "polygon-icon relative z-10 m-auto inline-flex items-center justify-center [&_svg]:size-full",
          icon
        )}
      >
        {children}
      </span>
    </span>
  )
}

type AvatarBadgeStatusVariant =
  | "invisible"
  | "online"
  | "busy"
  | "offline"
  | "away"
  | "do-not-disturb"
  | "recording"
  | "typing"

const statusSizeMap: Record<
  AvatarBadgeSize,
  {
    container: string
    dotRing: string
    invisibleRing: string
    recordingRing: string
    typingRing: string
    dndLine: string
    typingSize: string
    typingGap: string
    typingDot: string
    recordingDot: string
    invisibleInner: string
  }
> = {
  xs: {
    container: "size-1.5",
    dotRing: "ring-1",
    invisibleRing: "ring-1",
    recordingRing: "ring-[0.5px]",
    typingRing: "ring-[0.5px]",
    dndLine: "h-px",
    typingSize: "h-2 w-3",
    typingGap: "gap-0.25",
    typingDot: "size-0.5",
    recordingDot: "size-2",
    invisibleInner: "size-1.5 border-[0.75px]",
  },
  sm: {
    container: "size-3",
    dotRing: "ring-[1.5px]",
    invisibleRing: "ring-1",
    recordingRing: "ring-1",
    typingRing: "ring-1",
    dndLine: "h-px",
    typingSize: "h-3 w-4.5",
    typingGap: "gap-[1.5px]",
    typingDot: "size-1.25",
    recordingDot: "size-1.5",
    invisibleInner: "size-2.5 border",
  },
  md: {
    container: "size-4",
    dotRing: "ring-2",
    invisibleRing: "ring-[1.5px]",
    recordingRing: "ring-[1.5px]",
    typingRing: "ring-1",
    dndLine: "h-[1.5px]",
    typingSize: "h-4 w-6",
    typingGap: "gap-0.5",
    typingDot: "size-1",
    recordingDot: "size-2",
    invisibleInner: "size-3 border-[1.5px]",
  },
  lg: {
    container: "size-5",
    dotRing: "ring-[2.5px]",
    invisibleRing: "ring-2",
    recordingRing: "ring-2",
    typingRing: "ring-1",
    dndLine: "h-[2px]",
    typingSize: "h-5 w-7.5",
    typingGap: "gap-[2.5px]",
    typingDot: "size-1.25",
    recordingDot: "size-2.5",
    invisibleInner: "size-4 border-2",
  },
}

const statusShapeMap: Record<AvatarBadgeSize, string> = {
  xs: "rounded-xs",
  sm: "rounded-xs",
  md: "rounded-xs",
  lg: "rounded-sm",
}

const statusTypingShapeMap: Record<AvatarBadgeSize, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-md",
}

const statusDotColorMap: Partial<Record<AvatarBadgeStatusVariant, string>> = {
  online: "bg-emerald-500",
  busy: "bg-rose-600",
  offline: "bg-medium",
  away: "bg-yellow-500",
  "do-not-disturb": "bg-rose-600",
}

type AvatarBadgeStatusProps = React.ComponentProps<"span"> & {
  variant?: AvatarBadgeStatusVariant
  size?: AvatarBadgeSize
  shape?: AvatarBadgeShape
}

function AvatarBadgeStatus({
  className,
  variant = "online",
  size: sizeProp,
  shape = "circle",
  ...props
}: AvatarBadgeStatusProps) {
  const size = useBadgeSize(sizeProp) ?? "lg"
  const sizes = statusSizeMap[size]
  const radius = shape === "circle" ? "rounded-full" : statusShapeMap[size]
  const base = cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
    radius
  )

  if (variant === "typing") {
    const typingRadius =
      shape === "circle" ? "rounded-full" : statusTypingShapeMap[size]
    return (
      <span
        data-slot="avatar-badge-status"
        data-variant="typing"
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
          "shadow-neutral-xs ring-static-white bg-emerald-500",
          typingRadius,
          sizes.typingRing,
          sizes.typingSize,
          sizes.typingGap,
          className
        )}
        {...props}
      >
        <span className={cn("rounded-full bg-white", sizes.typingDot)} />
        <span className={cn("rounded-full bg-white", sizes.typingDot)} />
        <span className={cn("rounded-full bg-white", sizes.typingDot)} />
      </span>
    )
  }

  if (variant === "recording") {
    return (
      <span
        data-slot="avatar-badge-status"
        data-variant="recording"
        className={cn(
          base,
          "shadow-neutral-xs bg-static-white ring-rose-600",
          sizes.recordingRing,
          sizes.container,
          className
        )}
        {...props}
      >
        <span className={cn("bg-rose-600", radius, sizes.recordingDot)} />
      </span>
    )
  }

  if (variant === "invisible") {
    return (
      <span
        data-slot="avatar-badge-status"
        data-variant="invisible"
        className={cn(
          base,
          "bg-static-white ring-static-white",
          sizes.invisibleRing,
          sizes.container,
          className
        )}
        {...props}
      >
        <span className={cn("border-heavy", radius, sizes.invisibleInner)} />
      </span>
    )
  }

  const dotColor = statusDotColorMap[variant]

  return (
    <span
      data-slot="avatar-badge-status"
      data-variant={variant}
      className={cn(
        base,
        "shadow-neutral-xs ring-static-white",
        dotColor,
        sizes.dotRing,
        sizes.container,
        className
      )}
      {...props}
    >
      {variant === "do-not-disturb" && (
        <span className={cn("w-1/2 rounded-full bg-white", sizes.dndLine)} />
      )}
    </span>
  )
}

const avatarGroupVariants = cva(
  [
    // base
    "flex items-center *:ring-static-white",
    // data-[slot=avatar]
    "*:data-[slot=avatar]:bg-gradient-to-b *:data-[slot=avatar]:from-medium *:data-[slot=avatar]:to-static-white",
  ],
  {
    variants: {
      size: {
        "2xs": "-space-x-1 *:ring-1",
        xs: "-space-x-1.5 *:ring-1",
        sm: "-space-x-2 *:ring-[1.5px]",
        md: "-space-x-2.5 *:ring-2",
        lg: "-space-x-3 *:ring-2",
        xl: "-space-x-3.5 *:ring-[3px]",
        "2xl": "-space-x-4 *:ring-[3px]",
      },
    },
    defaultVariants: { size: "md" },
  }
)

type AvatarGroupContextValue = {
  size: AvatarSize
  shape: AvatarShape
  variant?: VariantProps<typeof avatarVariants>["variant"]
}
const AvatarGroupContext = React.createContext<AvatarGroupContextValue | null>(
  null
)

type AvatarGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupVariants> & {
    shape?: AvatarShape
    variant?: VariantProps<typeof avatarVariants>["variant"]
  }

function AvatarGroup({
  className,
  size = "md",
  shape = "circle",
  variant,
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <AvatarGroupContext.Provider value={{ size: size!, shape, variant }}>
      <div
        data-slot="avatar-group"
        data-size={size}
        data-shape={shape}
        className={cn(avatarGroupVariants({ size, className }))}
        {...props}
      >
        {children}
      </div>
    </AvatarGroupContext.Provider>
  )
}

const avatarGroupActionVariants = cva(
  "bg-strongest text-static-white relative inline-flex shrink-0 items-center justify-center overflow-hidden font-medium",
  {
    variants: {
      size: {
        "2xs": "size-5 text-ui-control-xs [&_svg]:size-3",
        xs: "size-6 text-ui-control-sm [&_svg]:size-4",
        sm: "size-8 text-body-sm [&_svg]:size-5",
        md: "size-10 text-body-md [&_svg]:size-6",
        lg: "size-12 text-body-lg [&_svg]:size-7",
        xl: "size-14 text-heading-h6 [&_svg]:size-8",
        "2xl": "size-16 text-heading-h5 [&_svg]:size-8",
      },
      shape: {
        circle: "rounded-full",
        rounded: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "2xs", className: "rounded-sm" },
      { shape: "rounded", size: "xs", className: "rounded-md" },
      { shape: "rounded", size: "sm", className: "rounded-lg" },
      { shape: "rounded", size: "md", className: "rounded-xl" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },
      { shape: "rounded", size: "2xl", className: "rounded-2xl" },
    ],
    defaultVariants: { size: "md", shape: "circle" },
  }
)

type AvatarGroupActionProps = React.ComponentProps<"span"> &
  VariantProps<typeof avatarGroupActionVariants>

function AvatarGroupAction({
  className,
  size: sizeProp,
  shape: shapeProp,
  children,
  ...props
}: AvatarGroupActionProps) {
  const groupCtx = React.useContext(AvatarGroupContext)
  const size = sizeProp ?? groupCtx?.size
  const shape = shapeProp ?? groupCtx?.shape

  const hasAccessibleName =
    props["aria-label"] != null || props["aria-labelledby"] != null
  return (
    <span
      data-slot="avatar-group-action"
      data-size={size}
      data-shape={shape}
      role={hasAccessibleName ? "img" : undefined}
      className={cn(avatarGroupActionVariants({ size, shape, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

export {
  Avatar,
  avatarVariants,
  AvatarImage,
  AvatarText,
  AvatarIcon,
  AvatarRing,
  AvatarBadge,
  AvatarBadgeText,
  AvatarBadgeIcon,
  AvatarBadgeFlag,
  AvatarBadgeLogo,
  AvatarBadgePolygon,
  AvatarBadgeStatus,
  badgeTextVariants,
  badgeIconVariants,
  badgeFlagVariants,
  badgeLogoVariants,
  badgePolygonVariants,
  AvatarGroup,
  avatarGroupVariants,
  AvatarGroupAction,
  avatarGroupActionVariants,
}

export type {
  AvatarIconVariant,
  AvatarRingColor,
  AvatarSize,
  AvatarShape,
  AvatarBadgeSize,
  AvatarBadgeShape,
  AvatarBadgeStatusVariant,
  AvatarBadgeTextColor,
  AvatarBadgeIconColor,
  AvatarBadgePolygonColor,
}
