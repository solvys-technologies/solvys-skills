import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkSizes() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <TextLink href="#" size="xs" underline>
        Extra small
      </TextLink>
      <TextLink href="#" size="sm" underline>
        Small
      </TextLink>
      <TextLink href="#" size="md" underline>
        Medium
      </TextLink>
      <TextLink href="#" size="lg" underline>
        Large
      </TextLink>
    </div>
  )
}
