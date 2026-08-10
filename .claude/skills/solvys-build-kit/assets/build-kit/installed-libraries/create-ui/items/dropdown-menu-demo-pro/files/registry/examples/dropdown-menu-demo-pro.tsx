"use client"

import { RiCheckDoubleLine, RiNotification3Line } from "@create-ui/assets/icons"

import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"
import { TextLink } from "@/registry/ui/text-link"

export default function DropdownMenuDemoPro() {
  return (
    <Dropdown>
      <Button
        iconOnly
        variant="neutral-light"
        appearance="ghost"
        shape="pill"
        size="md"
        aria-label="Notifications"
        className="relative overflow-visible"
      >
        <RiNotification3Line />
        <Badge
          numberOnly
          variant="danger"
          appearance="solid"
          size="xs"
          shape="pill"
          className="pointer-events-none absolute -top-0.5 -right-0.5"
        >
          7
        </Badge>
      </Button>
      <Dropdown.Popover className="w-70" placement="bottom start">
        <Dropdown.Menu aria-label="Notifications">
          <Dropdown.Section>
            <Dropdown.Header>Notifications</Dropdown.Header>
            <Dropdown.Item
              id="luca"
              textValue="Luca Moretti"
              leading={
                <Avatar size="md">
                  <AvatarImage
                    src="https://createui.co/avatars/luca-moretti.webp"
                    alt="Luca Moretti"
                  />
                  <AvatarText>LM</AvatarText>
                </Avatar>
              }
              description="Commented on Design System"
              trailing={
                <span className="text-placeholder text-ui-control-sm">2m</span>
              }
            >
              Luca Moretti
            </Dropdown.Item>
            <Dropdown.Item
              id="ayla"
              textValue="Ayla Karagöz"
              leading={
                <Avatar size="md">
                  <AvatarImage
                    src="https://createui.co/avatars/ayla-karagoz.webp"
                    alt="Ayla Karagöz"
                  />
                  <AvatarText>AK</AvatarText>
                </Avatar>
              }
              description="Assigned you to Onboarding flow"
              trailing={
                <span className="text-placeholder text-ui-control-sm">1h</span>
              }
            >
              Ayla Karagöz
            </Dropdown.Item>
            <Dropdown.Item
              id="yuki"
              textValue="Yuki Tanaka"
              leading={
                <Avatar size="md">
                  <AvatarImage
                    src="https://createui.co/avatars/yuki-tanaka.webp"
                    alt="Yuki Tanaka"
                  />
                  <AvatarText>YT</AvatarText>
                </Avatar>
              }
              description="Approved your pull request"
              trailing={
                <span className="text-placeholder text-ui-control-sm">3h</span>
              }
            >
              Yuki Tanaka
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
        <Dropdown.Footer>
          <div className="px-component-sm flex flex-1">
            <Button variant="neutral-light" appearance="soft" size="sm">
              <RiCheckDoubleLine />
              <ButtonLabel>Mark all as read</ButtonLabel>
            </Button>
          </div>
          <TextLink size="xs" underline>
            View all
          </TextLink>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
