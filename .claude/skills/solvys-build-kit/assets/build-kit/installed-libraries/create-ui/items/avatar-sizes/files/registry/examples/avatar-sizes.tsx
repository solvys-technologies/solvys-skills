import { Avatar, AvatarImage } from "@/registry/ui/avatar"

const sizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size} stroke={false}>
          <AvatarImage
            src="https://createui.co/avatars/ayla-karagoz.webp"
            alt="Ayla Karagöz"
          />
        </Avatar>
      ))}
    </div>
  )
}
