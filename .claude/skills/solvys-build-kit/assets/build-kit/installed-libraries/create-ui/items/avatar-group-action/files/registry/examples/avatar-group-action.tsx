import { RiAddLine } from "@create-ui/assets/icons"

import {
  Avatar,
  AvatarGroup,
  AvatarGroupAction,
  AvatarImage,
} from "@/registry/ui/avatar"

const people = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
  { src: "https://createui.co/avatars/yuki-tanaka.webp", name: "Yuki Tanaka" },
  { src: "https://createui.co/avatars/sofia-reis.webp", name: "Sofia Reis" },
] as const

export default function AvatarGroupActionExample() {
  return (
    <div className="flex flex-col gap-6">
      <AvatarGroup>
        {people.map((person) => (
          <Avatar key={person.name}>
            <AvatarImage src={person.src} alt={person.name} />
          </Avatar>
        ))}
        <AvatarGroupAction>+7</AvatarGroupAction>
      </AvatarGroup>
      <AvatarGroup size="lg">
        {people.slice(0, 3).map((person) => (
          <Avatar key={person.name}>
            <AvatarImage src={person.src} alt={person.name} />
          </Avatar>
        ))}
        <AvatarGroupAction>
          <RiAddLine />
        </AvatarGroupAction>
      </AvatarGroup>
    </div>
  )
}
