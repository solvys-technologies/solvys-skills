import { RiFlashlightFill } from "@create-ui/assets/icons"

import { FeaturedIcon } from "@/registry/ui/featured-icon"

const appearances = ["solid", "soft", "neutral", "outline"] as const

export default function FeaturedIconAppearances() {
  return (
    <div className="gap-component-lg flex flex-wrap items-center">
      {appearances.map((appearance) => (
        <FeaturedIcon
          key={appearance}
          variant="primary"
          appearance={appearance}
        >
          <RiFlashlightFill />
        </FeaturedIcon>
      ))}
    </div>
  )
}
