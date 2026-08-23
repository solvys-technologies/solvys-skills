import { Avatar, AvatarText } from "@/registry/ui/avatar"

const initials = [
  { text: "AK", variant: "weak-blue" as const },
  { text: "LM", variant: "weak-indigo" as const },
  { text: "YT", variant: "weak-fuchsia" as const },
  { text: "SR", variant: "weak-green" as const },
  { text: "MO", variant: "weak-orange" as const },
]

export default function AvatarTextExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {initials.map(({ text, variant }) => (
        <Avatar key={text} variant={variant} stroke={false}>
          <AvatarText>{text}</AvatarText>
        </Avatar>
      ))}
    </div>
  )
}
