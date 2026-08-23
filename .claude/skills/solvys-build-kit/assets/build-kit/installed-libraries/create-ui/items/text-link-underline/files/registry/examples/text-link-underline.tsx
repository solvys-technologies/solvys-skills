import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkUnderline() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <TextLink href="#" underline>
        With underline
      </TextLink>
      <TextLink href="#">Without underline</TextLink>
    </div>
  )
}
