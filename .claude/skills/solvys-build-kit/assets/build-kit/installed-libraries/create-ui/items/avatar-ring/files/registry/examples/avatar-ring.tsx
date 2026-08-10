import { Avatar, AvatarImage, AvatarRing } from "@/registry/ui/avatar"

const portraits = [
  "https://createui.co/avatars/ayla-karagoz.webp",
  "https://createui.co/avatars/luca-moretti.webp",
  "https://createui.co/avatars/yuki-tanaka.webp",
]

export default function AvatarRingExample() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-6">
        {(["info", "success", "linear-1"] as const).map((color, i) => (
          <Avatar key={color} size="lg" stroke={false}>
            <AvatarRing color={color} />
            <AvatarImage src={portraits[i]} alt="User" />
          </Avatar>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        {[35, 65, 90].map((value, i) => (
          <Avatar key={value} size="lg" stroke={false}>
            <AvatarRing variant="progress" value={value} color="info" />
            <AvatarImage src={portraits[i]} alt="User" />
          </Avatar>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        {portraits.map((src) => (
          <Avatar key={src} size="lg" stroke={false}>
            <AvatarRing variant="loading" color="info" />
            <AvatarImage src={src} alt="User" />
          </Avatar>
        ))}
      </div>
    </div>
  )
}
