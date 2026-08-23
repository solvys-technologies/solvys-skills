import { Germany } from "@create-ui/assets/flags"
import {
  RiCalendarFill,
  RiCheckLine,
  RiLockFill,
  RiPushpinFill,
} from "@create-ui/assets/icons"

import {
  Avatar,
  AvatarBadge,
  AvatarBadgeFlag,
  AvatarBadgeIcon,
  AvatarBadgePolygon,
  AvatarBadgeStatus,
  AvatarBadgeText,
  AvatarImage,
  AvatarRing,
  AvatarText,
} from "@/registry/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar size="2xl" variant="weak-orange">
        <AvatarImage
          src="/avatars/diego-fernandez.webp"
          alt="Diego Fernández"
        />
        <AvatarRing variant="progress" color="info" value={72} />
        <AvatarBadge position="bottom">
          <AvatarBadgeStatus variant="typing" />
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" variant="alpha-sky">
        <AvatarImage src="/avatars/kwame-mensah.webp" alt="Kwame Mensah" />
        <AvatarRing variant="progress" color="info" value={72} />
        <AvatarBadge position="top">
          <AvatarBadgePolygon color="sky">
            <RiCheckLine />
          </AvatarBadgePolygon>
        </AvatarBadge>
        <AvatarBadge position="bottom">
          <AvatarBadgeStatus variant="online" />
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" variant="weak-orange">
        <AvatarImage src="/avatars/jae-park.webp" alt="Jae Park" />
        <AvatarRing color="error" />
        <AvatarBadge position="top">
          <AvatarBadgeText color="rose">9</AvatarBadgeText>
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" shape="rounded" variant="weak-orange">
        <AvatarImage src="/avatars/ronan-kelly.webp" alt="Ronan Kelly" />
        <AvatarBadge position="bottom">
          <AvatarBadgeStatus variant="do-not-disturb" shape="rounded" />
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" shape="rounded" variant="weak-green">
        <AvatarImage src="/avatars/haruki-mori.webp" alt="Haruki Mori" />
        <AvatarBadge position="top">
          <AvatarBadgeIcon color="blue">
            <RiPushpinFill />
          </AvatarBadgeIcon>
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" variant="weak-orange">
        <AvatarImage src="/avatars/lucas-meyer.webp" alt="Lucas Meyer" />
        <AvatarBadge position="top">
          <AvatarBadgeIcon color="violet">
            <RiLockFill />
          </AvatarBadgeIcon>
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" variant="base-orange">
        <AvatarText>CK</AvatarText>
        <AvatarBadge position="top">
          <AvatarBadgePolygon color="yellow">
            <RiCheckLine />
          </AvatarBadgePolygon>
        </AvatarBadge>
      </Avatar>

      <Avatar size="2xl" variant="weak-sky">
        <AvatarImage src="/avatars/sena-yilmaz.webp" alt="Sena Yılmaz" />
        <AvatarRing color="linear-2" />
        <AvatarBadge position="top">
          <AvatarBadgeFlag>
            <Germany />
          </AvatarBadgeFlag>
        </AvatarBadge>
        <AvatarBadge position="bottom">
          <AvatarBadgeIcon color="violet">
            <RiCalendarFill />
          </AvatarBadgeIcon>
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
