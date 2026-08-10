import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowUpLine,
} from "@create-ui/assets/icons"

import { Separator } from "@/registry/pro/ui/separator"
import {
  Avatar,
  AvatarGroup,
  AvatarGroupAction,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

const groupPeople = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
] as const

export default function SeparatorDemo() {
  return (
    <div className="flex gap-6">
      <Separator direction="vertical" variant="dashed" />
      <div className="flex w-75 flex-col justify-between gap-8">
        <Separator variant="dashed" align="center">
          <RiAddLine />
        </Separator>
        <Separator variant="dashed">
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
        <Separator variant="dashed">
          <AvatarGroup size="sm">
            {groupPeople.map((person) => (
              <Avatar key={person.name}>
                <AvatarImage src={person.src} alt={person.name} />
              </Avatar>
            ))}
            <AvatarGroupAction>+7</AvatarGroupAction>
          </AvatarGroup>
        </Separator>
        <Separator variant="dashed">
          <Button variant="neutral-solid" appearance="soft" size="sm">
            Button
          </Button>
        </Separator>
      </div>
      <Separator variant="dashed" direction="vertical" />
    </div>
  )
}
