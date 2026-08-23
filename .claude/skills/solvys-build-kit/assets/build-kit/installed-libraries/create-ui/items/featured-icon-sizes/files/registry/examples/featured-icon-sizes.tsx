import { RiFlashlightFill } from "@create-ui/assets/icons"

import { FeaturedIcon } from "@/registry/ui/featured-icon"

const sizes = ["2xs", "xs", "sm", "md", "lg", "xl"] as const

export default function FeaturedIconSizes() {
  return (
    <div className="gap-component-lg flex flex-wrap items-center">
      {sizes.map((size) => (
        <FeaturedIcon
          key={size}
          variant="primary"
          appearance="soft"
          size={size}
        >
          <RiFlashlightFill />
        </FeaturedIcon>
      ))}
    </div>
  )
}
