import { RiCheckFill } from "@create-ui/assets/icons"

import {
  Avatar,
  AvatarBadge,
  AvatarBadgeFlag,
  AvatarBadgeIcon,
  AvatarBadgeLogo,
  AvatarBadgePolygon,
  AvatarBadgeText,
  AvatarImage,
} from "@/registry/ui/avatar"

export default function AvatarBadgeContent() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="lg">
        <AvatarImage
          src="https://createui.co/avatars/luca-moretti.webp"
          alt="Luca Moretti"
        />
        <AvatarBadge>
          <AvatarBadgeText>3</AvatarBadgeText>
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://createui.co/avatars/sofia-reis.webp"
          alt="Sofia Reis"
        />
        <AvatarBadge>
          <AvatarBadgeIcon color="green">
            <RiCheckFill />
          </AvatarBadgeIcon>
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://createui.co/avatars/yuki-tanaka.webp"
          alt="Yuki Tanaka"
        />
        <AvatarBadge>
          <AvatarBadgeFlag>
            <img src="https://createui.co/images/avatar-flag.svg" alt="Flag" />
          </AvatarBadgeFlag>
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://createui.co/avatars/marcus-okafor.webp"
          alt="Marcus Okafor"
        />
        <AvatarBadge>
          <AvatarBadgeLogo>
            <img src="https://createui.co/images/avatar-logo.svg" alt="Logo" />
          </AvatarBadgeLogo>
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://createui.co/avatars/priya-sharma.webp"
          alt="Priya Sharma"
        />
        <AvatarBadge>
          <AvatarBadgePolygon color="sky">
            <RiCheckFill />
          </AvatarBadgePolygon>
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
