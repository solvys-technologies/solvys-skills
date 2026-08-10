import * as React from "react"
import { RiGlobalLine } from "@create-ui/assets/icons"
import {
  Apple,
  AppleBlack,
  AppleWhite,
  Behance,
  BehanceWhite,
  Discord,
  DiscordWhite,
  Dribbble,
  DribbbleWhite,
  Facebook,
  FacebookWhite,
  Github,
  GithubBlack,
  GithubWhite,
  Gitlab,
  GitlabWhite,
  Google,
  GoogleWhite,
  Linkedin,
  LinkedinWhite,
  Microsoft,
  MicrosoftWhite,
  Slack,
  SlackWhite,
  X,
  XBlack,
  XWhite,
} from "@create-ui/assets/social"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const socialLoginButtonVariants = cva(
  [
    // base
    "inline-flex items-center justify-center relative select-none !font-semibold text-ui-control-md whitespace-nowrap cursor-pointer",
    // transition
    "transition-[color,background-color,border-color,box-shadow,opacity,scale]",
    // disabled
    "disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    // focus-visible
    "focus-visible:outline-2 focus-visible:outline-strong focus-visible:outline-offset-2",
    // svg
    "[&_svg]:transform-gpu",
  ],
  {
    variants: {
      size: {
        lg: "gap-1 px-3 h-11",
        md: "gap-0.5 px-2 h-9",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
        square: "rounded-none",
      },
      iconOnly: {
        true: "active:scale-[0.96]",
        false: "active:scale-[0.99]",
      },
    },
    compoundVariants: [
      { size: "lg", shape: "rounded", className: "rounded-xl" },
      { size: "md", shape: "rounded", className: "rounded-lg" },
      { size: "lg", iconOnly: false, className: "w-[300px] max-w-full" },
      { size: "md", iconOnly: false, className: "w-[250px] max-w-full" },
      { size: "lg", iconOnly: true, className: "px-0 size-11" },
      { size: "md", iconOnly: true, className: "px-0 size-9" },
    ],
    defaultVariants: {
      size: "lg",
      shape: "rounded",
      iconOnly: false,
    },
  }
)

type IconComponent = React.ComponentType<{ className?: string }>

type Appearance = "colorful" | "black" | "white"

type Brand =
  | "apple"
  | "behance"
  | "discord"
  | "dribbble"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "linkedin"
  | "microsoft"
  | "slack"
  | "sso"
  | "x"

type BrandConfig = {
  label: string
  color: string
  darkColor?: string
  icon: IconComponent
  iconWhite: IconComponent
  iconBlack?: IconComponent
}

const brandConfigs: Record<Brand, BrandConfig> = {
  apple: {
    label: "Apple",
    color: "#000000",
    icon: Apple,
    iconWhite: AppleWhite,
    iconBlack: AppleBlack,
  },
  behance: {
    label: "Behance",
    color: "#105dfb",
    icon: Behance,
    iconWhite: BehanceWhite,
  },
  discord: {
    label: "Discord",
    color: "#5865f2",
    icon: Discord,
    iconWhite: DiscordWhite,
  },
  dribbble: {
    label: "Dribbble",
    color: "#e94c89",
    icon: Dribbble,
    iconWhite: DribbbleWhite,
  },
  facebook: {
    label: "Facebook",
    color: "#1877f2",
    icon: Facebook,
    iconWhite: FacebookWhite,
  },
  github: {
    label: "Github",
    color: "#000000",
    icon: Github,
    iconWhite: GithubWhite,
    iconBlack: GithubBlack,
  },
  gitlab: {
    label: "Gitlab",
    color: "#fc6d26",
    icon: Gitlab,
    iconWhite: GitlabWhite,
  },
  google: {
    label: "Google",
    color: "#EA4335",
    icon: Google,
    iconWhite: GoogleWhite,
  },
  linkedin: {
    label: "LinkedIn",
    color: "#2867b2",
    icon: Linkedin,
    iconWhite: LinkedinWhite,
  },
  microsoft: {
    label: "Microsoft",
    color: "#05A6F0",
    icon: Microsoft,
    iconWhite: MicrosoftWhite,
  },
  slack: {
    label: "Slack",
    color: "#4a154b",
    icon: Slack,
    iconWhite: SlackWhite,
  },
  sso: {
    label: "SSO",
    color: "#030712",
    darkColor: "#F9FAFB",
    icon: RiGlobalLine,
    iconWhite: RiGlobalLine,
  },
  x: {
    label: "X",
    color: "#000000",
    icon: X,
    iconWhite: XWhite,
    iconBlack: XBlack,
  },
}

const appearanceClassMap: Record<Appearance, string> = {
  colorful:
    "bg-[var(--sl-bg)] dark:bg-[var(--sl-bg-dark)] text-white dark:text-[var(--sl-fg-dark)] hover:opacity-80 text-shadow-2xs [--color-static-black:#000] [--color-static-white:#fff]",
  black: "bg-strong text-static hover:bg-strongest",
  white: "bg-static border border-medium text-strongest hover:bg-weakest",
}

type SocialLoginButtonBaseProps = React.ComponentProps<"button"> &
  VariantProps<typeof socialLoginButtonVariants> & {
    appearance?: Appearance
    asChild?: boolean
  }

type BrandProps = SocialLoginButtonBaseProps & {
  brand: Brand
}

type CustomBrandProps = SocialLoginButtonBaseProps & {
  brand: "custom"
  config: {
    icon: IconComponent
    label?: string
    color?: string
  }
}

type SocialLoginButtonProps = BrandProps | CustomBrandProps

function resolveConfig(props: SocialLoginButtonProps): BrandConfig {
  if (props.brand === "custom") {
    return {
      label: props.config.label ?? "SSO",
      color: props.config.color ?? "#000000",
      icon: props.config.icon,
      iconWhite: props.config.icon,
    }
  }
  return brandConfigs[props.brand]
}

function SocialLoginButton(allProps: SocialLoginButtonProps) {
  const { label, color, darkColor, icon, iconWhite, iconBlack } =
    resolveConfig(allProps)
  const {
    className,
    brand,
    config: _config,
    appearance = "colorful",
    size = "lg",
    shape = "rounded",
    iconOnly = false,
    asChild = false,
    children,
    ...restProps
  } = allProps as SocialLoginButtonBaseProps & {
    brand: string
    config?: unknown
  }

  const Comp = asChild ? Slot.Root : "button"
  const Icon =
    appearance === "colorful"
      ? iconWhite
      : iconBlack
        ? appearance === "black"
          ? iconWhite
          : iconBlack
        : icon
  const hasDarkColor = darkColor !== undefined && darkColor !== color
  const colorfulStyle =
    appearance === "colorful"
      ? ({
          "--sl-bg": color,
          "--sl-bg-dark": darkColor ?? color,
          "--sl-fg-dark": hasDarkColor ? color : "#fff",
        } as React.CSSProperties)
      : undefined

  const slot =
    asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
      ? children
      : null

  const content = (
    <>
      <Icon className="size-5 shrink-0" />
      {!iconOnly && (
        <span className="px-component-xs">Continue with {label}</span>
      )}
      {appearance === "colorful" && (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[inherit]",
              hasDarkColor && "dark:hidden"
            )}
            style={{
              boxShadow: `inset 0px 0px 0px 1px ${color}, inset 0px 2px 0px 0px rgba(255,255,255,0.16)`,
            }}
          />
          {hasDarkColor && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden rounded-[inherit] dark:block"
              style={{
                boxShadow: `inset 0px 0px 0px 1px ${darkColor}, inset 0px 2px 0px 0px rgba(255,255,255,0.16)`,
              }}
            />
          )}
        </>
      )}
    </>
  )

  const inner = slot ? React.cloneElement(slot, undefined, content) : content

  return (
    <Comp
      data-slot="social-login-button"
      className={cn(
        socialLoginButtonVariants({ size, shape, iconOnly }),
        appearanceClassMap[appearance],
        className
      )}
      style={colorfulStyle}
      {...(restProps as React.ComponentProps<"button">)}
    >
      {inner}
    </Comp>
  )
}

export { SocialLoginButton, socialLoginButtonVariants }
