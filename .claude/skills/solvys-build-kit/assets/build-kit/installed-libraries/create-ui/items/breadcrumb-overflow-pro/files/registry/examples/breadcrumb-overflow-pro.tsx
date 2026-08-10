"use client"

import { RiArrowDownSLine, RiFolder5Line } from "@create-ui/assets/icons"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/registry/pro/ui/breadcrumb"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Dropdown } from "@/registry/ui/dropdown-menu"

const hiddenSegments = ["Projects", "Settings", "Members"]

function HiddenSegmentsMenu() {
  return (
    <>
      {hiddenSegments.map((label) => (
        <Dropdown.Item key={label} id={label} textValue={label} href="#">
          <Dropdown.ItemContainer>
            <Dropdown.ItemLabel>{label}</Dropdown.ItemLabel>
          </Dropdown.ItemContainer>
        </Dropdown.Item>
      ))}
    </>
  )
}

export default function BreadcrumbOverflowPro() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="#" leading={<RiFolder5Line />}>
        Workspace
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbEllipsis>
        <HiddenSegmentsMenu />
      </BreadcrumbEllipsis>
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
