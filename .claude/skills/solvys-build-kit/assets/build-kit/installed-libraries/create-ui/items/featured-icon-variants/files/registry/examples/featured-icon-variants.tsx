import { RiFlashlightFill } from "@create-ui/assets/icons"

import { FeaturedIcon } from "@/registry/ui/featured-icon"

const variants = [
  { variant: "primary", icon: <RiFlashlightFill /> },
  { variant: "neutral", icon: <RiFlashlightFill /> },
  { variant: "danger", icon: <RiFlashlightFill /> },
  { variant: "success", icon: <RiFlashlightFill /> },
  { variant: "warning", icon: <RiFlashlightFill /> },
  { variant: "info", icon: <RiFlashlightFill /> },
  { variant: "away", icon: <RiFlashlightFill /> },
] as const

export default function FeaturedIconVariants() {
  return (
    <div className="gap-component-lg flex flex-wrap items-center">
      {variants.map(({ variant, icon }) => (
        <FeaturedIcon key={variant} variant={variant} appearance="soft">
          {icon}
        </FeaturedIcon>
      ))}
    </div>
  )
}
