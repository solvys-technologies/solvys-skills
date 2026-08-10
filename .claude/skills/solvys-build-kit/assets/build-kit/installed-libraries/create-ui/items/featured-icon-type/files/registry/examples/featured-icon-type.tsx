import { RiFlashlightFill } from "@create-ui/assets/icons"

import { FeaturedIcon } from "@/registry/pro/ui/featured-icon"

const appearances = ["solid", "soft", "neutral", "outline"] as const

export default function FeaturedIconType() {
  return (
    <div className="gap-layout-xs flex flex-col">
      <div className="gap-component-xl flex flex-wrap items-center">
        {appearances.map((appearance) => (
          <FeaturedIcon
            key={appearance}
            variant="primary"
            appearance={appearance}
            type="stylish"
            size="lg"
          >
            <RiFlashlightFill />
          </FeaturedIcon>
        ))}
      </div>
      <div className="gap-component-xl flex flex-wrap items-center">
        {appearances.map((appearance) => (
          <FeaturedIcon
            key={appearance}
            variant="primary"
            appearance={appearance}
            type="plain"
            size="lg"
          >
            <RiFlashlightFill />
          </FeaturedIcon>
        ))}
      </div>
    </div>
  )
}
