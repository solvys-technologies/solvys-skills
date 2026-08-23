import { RiArrowRightUpLine, RiTimeLine } from "@create-ui/assets/icons"

import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { TextLink } from "@/registry/ui/text-link"

export default function AspectRatioCard() {
  return (
    <article className="border-light bg-static shadow-neutral-xs w-full max-w-[360px] overflow-hidden rounded-2xl border">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://createui.co/images/create-banner.png"
          alt="Insights dashboard cover"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col gap-3 p-5">
        <Badge variant="info" appearance="soft" size="sm" shape="pill">
          Product
        </Badge>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-heading-h6 text-strongest">
            Designing calmer dashboards with room to breathe
          </h3>
          <p className="text-body-sm text-body truncate">
            How spacing, contrast, and rhythm turn dense analytics into
            something people enjoy reading.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm">
              <AvatarImage
                src="https://createui.co/avatars/ayla-karagoz.webp"
                alt="Ayla Karagöz"
              />
              <AvatarText>AK</AvatarText>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-body-sm text-strongest font-medium">
                Ayla Karagöz
              </span>
              <span className="text-body-xs text-placeholder inline-flex items-center gap-1">
                <RiTimeLine className="size-3.5" />5 min read
              </span>
            </div>
          </div>
          <TextLink href="#" size="sm" trailing={<RiArrowRightUpLine />}>
            Read more
          </TextLink>
        </div>
      </div>
    </article>
  )
}
