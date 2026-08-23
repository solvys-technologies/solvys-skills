import {
  Avatar,
  AvatarBadge,
  AvatarBadgeStatus,
  AvatarImage,
  type AvatarBadgeStatusVariant,
} from "@/registry/ui/avatar"

const variants: AvatarBadgeStatusVariant[] = [
  "online",
  "busy",
  "away",
  "offline",
  "do-not-disturb",
  "recording",
  "typing",
  "invisible",
]

const portraits = [
  "https://createui.co/avatars/ayla-karagoz.webp",
  "https://createui.co/avatars/luca-moretti.webp",
  "https://createui.co/avatars/yuki-tanaka.webp",
  "https://createui.co/avatars/sofia-reis.webp",
  "https://createui.co/avatars/marcus-okafor.webp",
  "https://createui.co/avatars/priya-sharma.webp",
  "https://createui.co/avatars/dimitri-volkov.webp",
  "https://createui.co/avatars/mei-lin-chen.webp",
]

export default function AvatarBadgeStatusExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((variant, i) => (
        <Avatar key={variant} size="lg">
          <AvatarImage src={portraits[i]} alt="User" />
          <AvatarBadge>
            <AvatarBadgeStatus variant={variant} />
          </AvatarBadge>
        </Avatar>
      ))}
    </div>
  )
}
