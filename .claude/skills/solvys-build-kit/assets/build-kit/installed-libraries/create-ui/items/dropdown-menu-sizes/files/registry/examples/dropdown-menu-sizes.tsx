"use client"

import {
  RiLogoutBoxLine,
  RiSettingsLine,
  RiUserLine,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown, type DropdownSize } from "@/registry/ui/dropdown-menu"

function SizeMenu({ size, width }: { size: DropdownSize; width: string }) {
  return (
    <Dropdown size={size}>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        {size}
      </Button>
      <Dropdown.Popover className={width}>
        <Dropdown.Menu aria-label={`Account (${size})`}>
          <Dropdown.Item id="profile" leading={<RiUserLine />}>
            Profile
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

export default function DropdownMenuSizes() {
  return (
    <div className="flex flex-wrap gap-4">
      <SizeMenu size="xs" width="w-48" />
      <SizeMenu size="sm" width="w-52" />
      <SizeMenu size="md" width="w-56" />
    </div>
  )
}
