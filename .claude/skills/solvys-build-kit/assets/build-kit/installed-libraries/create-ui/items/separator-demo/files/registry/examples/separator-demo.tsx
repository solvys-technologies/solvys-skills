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
import { Button } from "@/registry/ui/button"
import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"
import { Separator } from "@/registry/ui/separator"

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
      <div className="flex w-75 flex-col justify-between gap-8">
        <Separator>OR</Separator>
        <Separator />
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
      </div>
    </div>
  )
}
