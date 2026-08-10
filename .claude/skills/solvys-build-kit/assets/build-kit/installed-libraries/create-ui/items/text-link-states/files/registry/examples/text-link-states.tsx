import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkStates() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <TextLink href="#" underline>
        Default
      </TextLink>
      <TextLink href="#" underline visited>
        Visited
      </TextLink>
      <TextLink href="#" underline disabled>
        Disabled
      </TextLink>
    </div>
  )
}
