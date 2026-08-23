"use client"

import {
  RiBankCardLine,
  RiSettingsLine,
  RiUserAddLine,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuItemsFree() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Account
      </Button>
      <Dropdown.Popover className="w-64">
        <Dropdown.Menu aria-label="Account">
          <Dropdown.Item id="settings" leading={<RiSettingsLine />}>
            Account settings
          </Dropdown.Item>
          <Dropdown.Item id="billing" leading={<RiBankCardLine />}>
            Billing &amp; plans
          </Dropdown.Item>
          <Dropdown.Item id="invite" leading={<RiUserAddLine />}>
            Invite team
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
