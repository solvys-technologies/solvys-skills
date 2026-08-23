import { Google } from "@create-ui/assets/brands"
import { UnitedKingdom } from "@create-ui/assets/flags"

import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Chip } from "@/registry/ui/chip"

export default function ChipWithMedia() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip>
        <Avatar shape="rounded" size="2xs" stroke={false}>
          <AvatarImage src="https://i.pravatar.cc/40" alt="Avatar" />
        </Avatar>
        Avatar
      </Chip>
      <Chip>
        <UnitedKingdom />
        United Kingdom
      </Chip>
      <Chip>
        <Google />
        Google
      </Chip>
    </div>
  )
}
