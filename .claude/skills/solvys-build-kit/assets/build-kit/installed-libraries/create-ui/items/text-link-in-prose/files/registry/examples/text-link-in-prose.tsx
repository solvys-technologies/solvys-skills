import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkInProse() {
  return (
    <p className="text-paragraph-xs text-body max-w-prose">
      Create UI ships components as source files you copy into your project.
      Start with the{" "}
      <TextLink href="#" underline>
        installation guide
      </TextLink>{" "}
      to scaffold a new app, then browse the{" "}
      <TextLink href="#">component reference</TextLink> to see every primitive
      in one place.
    </p>
  )
}
