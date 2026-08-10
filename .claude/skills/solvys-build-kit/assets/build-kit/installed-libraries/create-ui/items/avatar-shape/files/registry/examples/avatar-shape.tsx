import { Avatar, AvatarImage } from "@/registry/ui/avatar"

const sizes = ["sm", "md", "lg", "xl"] as const

export default function AvatarShape() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        {sizes.map((size) => (
          <Avatar key={size} size={size} shape="circle" stroke={false}>
            <AvatarImage
              src="https://createui.co/avatars/luca-moretti.webp"
              alt="Luca Moretti"
            />
          </Avatar>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {sizes.map((size) => (
          <Avatar key={size} size={size} shape="rounded" stroke={false}>
            <AvatarImage
              src="https://createui.co/avatars/luca-moretti.webp"
              alt="Luca Moretti"
            />
          </Avatar>
        ))}
      </div>
    </div>
  )
}
