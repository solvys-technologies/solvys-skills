import { Avatar, AvatarText } from "@/registry/ui/avatar"

const fills = ["gradient", "strong", "base", "weak", "alpha"] as const

const colors = ["red", "orange", "green", "blue", "indigo", "fuchsia"] as const

export default function AvatarVariantExample() {
  return (
    <div className="flex flex-col gap-3">
      {fills.map((fill) => (
        <div key={fill} className="flex flex-wrap items-center gap-3">
          {colors.map((color) => (
            <Avatar key={color} variant={`${fill}-${color}`} stroke={false}>
              <AvatarText>AK</AvatarText>
            </Avatar>
          ))}
        </div>
      ))}
    </div>
  )
}
