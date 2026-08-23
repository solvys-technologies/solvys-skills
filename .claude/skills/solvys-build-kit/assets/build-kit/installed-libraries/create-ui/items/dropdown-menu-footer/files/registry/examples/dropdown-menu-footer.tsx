"use client"

import {
  RiBankCardLine,
  RiSettingsLine,
  RiUserLine,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuFooter() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Account
      </Button>
      <Dropdown.Popover className="w-64">
        <Dropdown.Menu aria-label="Account">
          <Dropdown.Item id="profile" leading={<RiUserLine />}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item id="billing" leading={<RiBankCardLine />}>
            Billing
          </Dropdown.Item>
          <Dropdown.Item id="settings" leading={<RiSettingsLine />}>
            Settings
          </Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Footer>
          <span className="text-placeholder text-ui-control-sm px-component-sm flex-1">
            App Version
          </span>
          <span className="text-placeholder text-ui-control-sm">v4.21.99</span>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
