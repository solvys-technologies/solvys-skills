import * as React from "react"
import {
  AddOn,
  AddOnBlack,
  AddOnWhite,
  AmazonStore,
  AmazonStoreBlack,
  AmazonStoreWhite,
  Appgallery,
  AppgalleryBlack,
  AppgalleryWhite,
  AppStore,
  AppStoreBlack,
  AppStoreWhite,
  ChromeWebStore,
  ChromeWebStoreBlack,
  ChromeWebStoreWhite,
  GalaxyStore,
  GalaxyStoreBlack,
  GalaxyStoreWhite,
  GooglePlay,
  GooglePlayBlack,
  GooglePlayWhite,
  Microsoft,
  MicrosoftBlack,
  MicrosoftWhite,
  ShopifyStore,
  ShopifyStoreBlack,
  ShopifyStoreWhite,
  Spotify,
  SpotifyBlack,
  SpotifyWhite,
  Windows,
  WindowsBlack,
  WindowsWhite,
  YoutubeMusic,
  YoutubeMusicBlack,
  YoutubeMusicWhite,
} from "@create-ui/assets/badges"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const appStoreBadgeVariants = cva(
  [
    // base
    "inline-flex w-fit items-center rounded-lg select-none",
    // transition
    "transition-[color,background-color,border-color,box-shadow,opacity,scale]",
    // hover
    "hover:opacity-90",
    // active
    "active:scale-[0.98]",
    // svg
    "[&_svg]:transform-gpu",
  ],
  {
    variants: {
      variant: {
        black: "",
        white: "",
      },
      appearance: {
        filled: "",
        outline: "border",
      },
      iconOnly: {
        true: "p-2",
        false: "gap-1.5 py-1.5 pl-2 pr-2.5",
      },
    },
    compoundVariants: [
      {
        variant: "black",
        appearance: "filled",
        className: "bg-neutral-950 text-neutral-50",
      },
      {
        variant: "white",
        appearance: "filled",
        className: "bg-neutral-50 text-neutral-950",
      },
      {
        variant: "black",
        appearance: "outline",
        className: "border-strongest text-strongest",
      },
      {
        variant: "white",
        appearance: "outline",
        className: "border-weakest text-static",
      },
    ],
    defaultVariants: {
      variant: "black",
      appearance: "filled",
      iconOnly: false,
    },
  }
)

type Brand =
  | "app-store"
  | "google-play"
  | "galaxy-store"
  | "shopify-store"
  | "spotify"
  | "add-on"
  | "chrome-web-store"
  | "app-gallery"
  | "windows"
  | "amazon-store"
  | "microsoft"
  | "youtube-music"

type BrandConfig = {
  subtitle: string
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconBlack: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconWhite: React.ComponentType<React.SVGProps<SVGSVGElement>>
  monochrome?: boolean
}

const brandConfigs: Record<Brand, BrandConfig> = {
  "app-store": {
    subtitle: "Download on the",
    title: "App Store",
    icon: AppStore,
    iconBlack: AppStoreBlack,
    iconWhite: AppStoreWhite,
    monochrome: true,
  },
  "google-play": {
    subtitle: "Get it on",
    title: "Google Play",
    icon: GooglePlay,
    iconBlack: GooglePlayBlack,
    iconWhite: GooglePlayWhite,
  },
  "galaxy-store": {
    subtitle: "Available on",
    title: "Galaxy Store",
    icon: GalaxyStore,
    iconBlack: GalaxyStoreBlack,
    iconWhite: GalaxyStoreWhite,
  },
  "shopify-store": {
    subtitle: "Find it on the",
    title: "Shopify Store",
    icon: ShopifyStore,
    iconBlack: ShopifyStoreBlack,
    iconWhite: ShopifyStoreWhite,
  },
  spotify: {
    subtitle: "Listen on",
    title: "Spotify",
    icon: Spotify,
    iconBlack: SpotifyBlack,
    iconWhite: SpotifyWhite,
  },
  "add-on": {
    subtitle: "Get the",
    title: "Add On",
    icon: AddOn,
    iconBlack: AddOnBlack,
    iconWhite: AddOnWhite,
  },
  "chrome-web-store": {
    subtitle: "Available in the",
    title: "Chrome Web Store",
    icon: ChromeWebStore,
    iconBlack: ChromeWebStoreBlack,
    iconWhite: ChromeWebStoreWhite,
  },
  "app-gallery": {
    subtitle: "Explore it on",
    title: "AppGallery",
    icon: Appgallery,
    iconBlack: AppgalleryBlack,
    iconWhite: AppgalleryWhite,
  },
  windows: {
    subtitle: "Download",
    title: "Windows",
    icon: Windows,
    iconBlack: WindowsBlack,
    iconWhite: WindowsWhite,
  },
  "amazon-store": {
    subtitle: "Available at",
    title: "Amazon Store",
    icon: AmazonStore,
    iconBlack: AmazonStoreBlack,
    iconWhite: AmazonStoreWhite,
    monochrome: true,
  },
  microsoft: {
    subtitle: "Get it from",
    title: "Microsoft",
    icon: Microsoft,
    iconBlack: MicrosoftBlack,
    iconWhite: MicrosoftWhite,
  },
  "youtube-music": {
    subtitle: "Listen on",
    title: "YouTube Music",
    icon: YoutubeMusic,
    iconBlack: YoutubeMusicBlack,
    iconWhite: YoutubeMusicWhite,
  },
}

function renderIcon(
  brand: Brand,
  variant: "black" | "white",
  appearance: "filled" | "outline"
) {
  const config = brandConfigs[brand]
  let Icon = config.icon
  if (appearance === "outline") {
    Icon = variant === "white" ? config.iconWhite : config.iconBlack
  } else if (config.monochrome) {
    Icon = variant === "white" ? config.iconBlack : config.iconWhite
    return (
      <Icon className="size-6 shrink-0 [--color-static-black:#000] [--color-static-white:#fff]" />
    )
  }
  return <Icon className="size-6 shrink-0" />
}

type AppStoreBadgeProps = React.ComponentProps<"a"> &
  VariantProps<typeof appStoreBadgeVariants> & {
    brand: Brand
    asChild?: boolean
  }

function AppStoreBadge({
  className,
  brand,
  variant = "black",
  appearance = "filled",
  iconOnly = false,
  asChild = false,
  children,
  ...props
}: AppStoreBadgeProps) {
  const Comp = asChild ? Slot.Root : "a"
  const config = brandConfigs[brand]

  const slot =
    asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
      ? children
      : null

  const content = (
    <>
      {renderIcon(brand, variant!, appearance!)}
      {!iconOnly && (
        <span className="flex flex-col">
          <span className="text-[10px] leading-3 font-normal">
            {config.subtitle}
          </span>
          <span className="text-base leading-4 font-medium tracking-tight">
            {config.title}
          </span>
        </span>
      )}
    </>
  )

  const inner = slot ? React.cloneElement(slot, undefined, content) : content

  return (
    <Comp
      data-slot="app-store-badge"
      className={cn(
        appStoreBadgeVariants({ variant, appearance, iconOnly, className })
      )}
      {...props}
    >
      {inner}
    </Comp>
  )
}

export { AppStoreBadge, appStoreBadgeVariants }
