"use client"

import {
  RiBankCardLine,
  RiSettingsLine,
  RiUserAddLine,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuItems() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Account
      </Button>
      <Dropdown.Popover className="w-80">
        <Dropdown.Menu aria-label="Account">
          <Dropdown.Item
            id="settings"
            leading={<RiSettingsLine />}
            description="Customize your account information."
          >
            Account settings
          </Dropdown.Item>
          <Dropdown.Item
            id="billing"
            textValue="Billing & plans"
            leading={<RiBankCardLine />}
            description="Manage your billing."
            trailing={
              <Badge variant="primary" appearance="soft" size="sm">
                Pro
              </Badge>
            }
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
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
