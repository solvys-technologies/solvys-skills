import { RiFlashlightFill } from "@create-ui/assets/icons"

import { FeaturedIcon } from "@/registry/ui/featured-icon"

const shapes = ["rounded", "circle"] as const
const sizes = ["sm", "md", "lg", "xl"] as const

export default function FeaturedIconShapes() {
  return (
    <div className="gap-component-lg flex flex-col">
      {shapes.map((shape) => (
        <div key={shape} className="gap-component-lg flex items-center">
          {sizes.map((size) => (
            <FeaturedIcon
              key={size}
              variant="primary"
              appearance="soft"
              shape={shape}
              size={size}
            >
              <RiFlashlightFill />
            </FeaturedIcon>
          ))}
        </div>
      ))}
    </div>
  )
}
