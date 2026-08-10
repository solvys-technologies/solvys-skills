"use client"

import {
  RiBankCardLine,
  RiLogoutBoxLine,
  RiMoonLine,
  RiSettingsLine,
  RiUserAddLine,
} from "@create-ui/assets/icons"

import {
  Avatar,
  AvatarBadge,
  AvatarBadgeFlag,
  AvatarImage,
  AvatarText,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"
import { Switch } from "@/registry/ui/switch"

export default function DropdownMenuProfile() {
  return (
    <Dropdown size="sm">
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Account
      </Button>
      <Dropdown.Popover className="w-80 md:w-100" placement="bottom start">
        <Dropdown.Menu aria-label="Account">
          <Dropdown.Section>
            <Dropdown.Item
              id="account"
              textValue="Ayla Karagöz"
              leading={
                <Avatar size="lg">
                  <AvatarImage
                    src="https://createui.co/avatars/ayla-karagoz.webp"
                    alt="Ayla Karagöz"
                  />
                  <AvatarText>AK</AvatarText>
                  <AvatarBadge>
                    <AvatarBadgeFlag>🇹🇷</AvatarBadgeFlag>
                  </AvatarBadge>
                </Avatar>
              }
              description="ayla@createui.co"
              trailing={
                <Badge variant="primary" appearance="soft" size="sm">
                  Ultra
                </Badge>
              }
            >
              Ayla Karagöz
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item
              id="settings"
              leading={<RiSettingsLine />}
              description="Customize your account informations."
            >
              Account settings
            </Dropdown.Item>
            <Dropdown.Item
              id="billing"
              textValue="Billing & plans"
              leading={<RiBankCardLine />}
              description="Manage your billing."
            >
              Billing &amp; plans
            </Dropdown.Item>
            <Dropdown.Item
              id="invite"
              leading={<RiUserAddLine />}
              description="Work with your teammates."
            >
              Invite team
            </Dropdown.Item>
            <Dropdown.Item
              id="theme"
              leading={<RiMoonLine />}
              description="Change your appearance settings."
              // Toggling the switch shouldn't dismiss the menu.
              shouldCloseOnSelect={false}
              trailing={
                <Switch
                  size="md"
                  shape="rounded"
                  thumbType="long"
                  ioTrigger
                  aria-label="Dark mode"
                  tabIndex={-1}
                />
              }
            >
              Dark mode
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Item id="logout" leading={<RiLogoutBoxLine />}>
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Footer className="px-component-xl">
          <span className="text-placeholder text-ui-control-lg flex-1">
            App Version
          </span>
          <span className="text-placeholder text-ui-control-lg">v4.21.99</span>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
