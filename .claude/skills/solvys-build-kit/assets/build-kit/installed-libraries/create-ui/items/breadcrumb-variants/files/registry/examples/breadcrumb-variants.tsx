import { RiArrowDownSLine, RiFolder5Line } from "@create-ui/assets/icons"

import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"

export default function BreadcrumbVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb variant="primary">
        <BreadcrumbItem href="#" leading={<RiFolder5Line />}>
          Workspace
        </BreadcrumbItem>
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
      <Breadcrumb variant="neutral">
        <BreadcrumbItem href="#" leading={<RiFolder5Line />}>
          Workspace
        </BreadcrumbItem>
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
    </div>
  )
}
