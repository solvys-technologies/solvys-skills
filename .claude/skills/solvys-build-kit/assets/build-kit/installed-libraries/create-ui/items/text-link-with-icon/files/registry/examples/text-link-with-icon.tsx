import { RiArrowRightSLine, RiExternalLinkLine } from "@create-ui/assets/icons"

import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <TextLink href="#" leading={<RiExternalLinkLine />} underline>
        Leading icon
      </TextLink>
      <TextLink href="#" trailing={<RiArrowRightSLine />} underline>
        Trailing icon
      </TextLink>
      <TextLink
        href="#"
        leading={<RiExternalLinkLine />}
        trailing={<RiArrowRightSLine />}
        underline
      >
        Both icons
      </TextLink>
    </div>
  )
}
