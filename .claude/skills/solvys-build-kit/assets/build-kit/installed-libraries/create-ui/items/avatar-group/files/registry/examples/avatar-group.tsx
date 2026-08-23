import { Avatar, AvatarGroup, AvatarImage } from "@/registry/ui/avatar"

const people = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
  { src: "https://createui.co/avatars/yuki-tanaka.webp", name: "Yuki Tanaka" },
  { src: "https://createui.co/avatars/sofia-reis.webp", name: "Sofia Reis" },
]

const sizes = ["sm", "md", "lg"] as const

export default function AvatarGroupExample() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <AvatarGroup key={size} size={size}>
          {people.map((person) => (
            <Avatar key={person.name}>
              <AvatarImage src={person.src} alt={person.name} />
            </Avatar>
          ))}
        </AvatarGroup>
      ))}
    </div>
  )
}
