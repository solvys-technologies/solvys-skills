import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkVariants() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <TextLink href="#" variant="primary" underline>
        Primary link
      </TextLink>
      <TextLink href="#" variant="neutral" underline>
        Neutral link
      </TextLink>
      <TextLink href="#" variant="danger" underline>
        Danger link
      </TextLink>
      <TextLink href="#" variant="success" underline>
        Success link
      </TextLink>
      <TextLink href="#" variant="info" underline>
        Info link
      </TextLink>
      <div className="bg-strongest flex items-center rounded-md px-4 py-2">
        <TextLink href="#" variant="inverse" underline>
          Inverse link
        </TextLink>
      </div>
    </div>
  )
}
