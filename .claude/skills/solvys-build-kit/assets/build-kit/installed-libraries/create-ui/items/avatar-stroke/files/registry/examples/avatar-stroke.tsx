import { Avatar, AvatarImage } from "@/registry/ui/avatar"

const sizes = ["xs", "sm", "md", "lg", "xl"] as const

const images = [
  "https://createui.co/avatars/sofia-reis.webp",
  "https://createui.co/avatars/luca-moretti.webp",
  "https://createui.co/avatars/ayla-karagoz.webp",
  "https://createui.co/avatars/yuki-tanaka.webp",
  "https://createui.co/avatars/marcus-okafor.webp",
]

export default function AvatarStrokeExample() {
  return (
    <div className="flex flex-col gap-6">
      {([true, false] as const).map((stroke) => (
        <div key={String(stroke)} className="space-y-1">
          <p className="text-placeholder text-center text-[9px] font-medium uppercase">
            {stroke ? "stroke (default)" : "stroke={false}"}
          </p>
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((size, i) => (
              <Avatar
                key={size}
                size={size}
                stroke={stroke}
                variant="weak-orange"
              >
                <AvatarImage src={images[i]} alt="User" />
              </Avatar>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
