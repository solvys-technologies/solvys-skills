import { RiArrowDownSLine, RiFolder5Line } from "@create-ui/assets/icons"

import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"

export default function BreadcrumbOverflow() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="#" leading={<RiFolder5Line />}>
        Workspace
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbEllipsis />
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" trailing={<RiArrowDownSLine />}>
        <Avatar size="2xs">
          <AvatarImage
            src="https://createui.co/images/breadcrumb-label-prefix-image-1.png"
            alt="Design Team"
          />
        </Avatar>
        Design Team
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">
        <Badge variant="info" appearance="soft" size="sm">
          1.2.2
        </Badge>
        Mobile App
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" current>
        Breadcrumb
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
