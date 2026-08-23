import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowUpLine,
} from "@create-ui/assets/icons"

import {
  Avatar,
  AvatarGroup,
  AvatarGroupAction,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"
import { Separator } from "@/registry/ui/separator"

const people = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
] as const

export default function SeparatorContent() {
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-6">
      <Separator>
        <RiAddLine />
      </Separator>
      <Separator>
        <Badge variant="neutral" appearance="soft" size="md" shape="pill">
          NEW
        </Badge>
      </Separator>
      <Separator>
        <Button variant="neutral-solid" appearance="soft" size="sm">
          Button
        </Button>
      </Separator>
      <Separator>
        <ButtonGroup size="sm">
          <ButtonGroupItem iconOnly aria-label="Move down">
            <RiArrowDownLine />
          </ButtonGroupItem>
          <ButtonGroupItem iconOnly aria-label="Add">
            <RiAddLine />
          </ButtonGroupItem>
          <ButtonGroupItem iconOnly aria-label="Move up">
            <RiArrowUpLine />
          </ButtonGroupItem>
        </ButtonGroup>
      </Separator>
      <Separator>
        <AvatarGroup size="sm">
          {people.map((person) => (
            <Avatar key={person.name}>
              <AvatarImage src={person.src} alt={person.name} />
            </Avatar>
          ))}
          <AvatarGroupAction>+7</AvatarGroupAction>
        </AvatarGroup>
      </Separator>
    </div>
  )
}
