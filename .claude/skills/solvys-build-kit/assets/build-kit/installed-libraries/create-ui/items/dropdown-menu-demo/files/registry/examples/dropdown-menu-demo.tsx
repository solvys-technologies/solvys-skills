"use client"

import {
  RiBankCardLine,
  RiLogoutBoxLine,
  RiSettingsLine,
  RiUserLine,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuDemo() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Open
      </Button>
      <Dropdown.Popover className="w-56">
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
          <Dropdown.Separator />
          <Dropdown.Item id="logout" leading={<RiLogoutBoxLine />}>
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
