import { Avatar, AvatarIcon } from "@/registry/ui/avatar"

export default function AvatarIconExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* red/weak bg + red/base icon */}
      <Avatar size="2xl" variant="weak-red">
        <AvatarIcon variant="base-red" />
      </Avatar>

      {/* red/strong bg + red/weak icon */}
      <Avatar size="2xl" variant="strong-red">
        <AvatarIcon variant="weak-red" />
      </Avatar>

      {/* red/alpha bg + red/strong icon */}
      <Avatar size="2xl" variant="alpha-red">
        <AvatarIcon variant="strong-red" />
      </Avatar>

      {/* heavy bg + white icon */}
      <Avatar size="2xl" variant="base-neutral">
        <AvatarIcon variant="base-neutral" />
      </Avatar>

      {/* medium bg + black icon */}
      <Avatar size="2xl" variant="base-inverse">
        <AvatarIcon variant="base-inverse" />
      </Avatar>

      {/* black/alpha bg + weak icon */}
      <Avatar size="2xl" variant="alpha-neutral">
        <AvatarIcon variant="weak-neutral" />
      </Avatar>
    </div>
  )
}
