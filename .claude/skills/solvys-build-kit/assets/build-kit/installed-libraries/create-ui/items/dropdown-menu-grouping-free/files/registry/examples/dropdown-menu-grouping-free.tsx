"use client"

import {
  RiLifebuoyLine,
  RiSettingsLine,
  RiUserLine,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuGroupingFree() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Workspace
      </Button>
      <Dropdown.Popover className="w-56">
        <Dropdown.Menu aria-label="Workspace">
          <Dropdown.Item id="settings" leading={<RiSettingsLine />}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item id="members" leading={<RiUserLine />}>
            Members
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item id="help" leading={<RiLifebuoyLine />}>
            Help center
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
