import { RiFolder5Line } from "@create-ui/assets/icons"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb variant="primary" appearance="ghost" separator="slash">
      <BreadcrumbItem href="#" leading={<RiFolder5Line />}>
        Workspace
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" current>
        Members
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
