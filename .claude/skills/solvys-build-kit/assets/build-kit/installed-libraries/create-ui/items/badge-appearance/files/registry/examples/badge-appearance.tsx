import { Badge } from "@/registry/ui/badge"

export default function BadgeAppearance() {
  return (
    <div className="flex flex-col [&>div]:p-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="primary" appearance="solid">
          Solid
        </Badge>
        <Badge variant="primary" appearance="outline">
          Outline
        </Badge>
        <Badge variant="primary" appearance="soft">
          Soft
        </Badge>
        <Badge variant="primary" appearance="ghost">
          Ghost
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="danger" appearance="solid">
          Solid
        </Badge>
        <Badge variant="danger" appearance="outline">
          Outline
        </Badge>
        <Badge variant="danger" appearance="soft">
          Soft
        </Badge>
        <Badge variant="danger" appearance="ghost">
          Ghost
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-white">
        <Badge variant="neutral-static" appearance="solid">
          Solid
        </Badge>
        <Badge variant="neutral-static" appearance="outline">
          Outline
        </Badge>
        <Badge variant="neutral-static" appearance="soft">
          Soft
        </Badge>
        <Badge variant="neutral-static" appearance="ghost">
          Ghost
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-black">
        <Badge variant="inverse-static" appearance="solid">
          Solid
        </Badge>
        <Badge variant="inverse-static" appearance="outline">
          Outline
        </Badge>
        <Badge variant="inverse-static" appearance="soft">
          Soft
        </Badge>
        <Badge variant="inverse-static" appearance="ghost">
          Ghost
        </Badge>
      </div>
    </div>
  )
}
