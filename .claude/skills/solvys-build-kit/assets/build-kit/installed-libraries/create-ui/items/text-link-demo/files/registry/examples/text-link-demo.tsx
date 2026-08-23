import {
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiCopperDiamondFill,
} from "@create-ui/assets/icons"

import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkDemo() {
  return (
    <div className="flex max-w-89">
      <p className="text-paragraph-sm">
        Exploring design systems takes more than reading documentation, the best
        way to learn is to{" "}
        <TextLink href="#" size="sm" trailing={<RiArrowRightUpLine />}>
          view the source
        </TextLink>{" "}
        and experiment directly. Browse the full{" "}
        <TextLink
          href="#"
          size="sm"
          leading={<RiCopperDiamondFill />}
          trailing={<RiArrowRightSLine />}
          underline
        >
          Read the documentation
        </TextLink>{" "}
        to see how each piece connects, or dive into the code to understand the
        implementation behind every interaction.
      </p>
    </div>
  )
}
