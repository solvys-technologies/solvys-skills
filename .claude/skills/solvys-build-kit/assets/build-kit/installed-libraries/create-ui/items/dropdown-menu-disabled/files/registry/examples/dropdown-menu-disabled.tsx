"use client"

import {
  RiDeleteBin6Line,
  RiFileCopyLine,
  RiPencilLine,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuDisabled() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Actions
      </Button>
      <Dropdown.Popover className="w-56">
        <Dropdown.Menu aria-label="Actions" disabledKeys={["duplicate"]}>
          <Dropdown.Item id="rename" leading={<RiPencilLine />}>
            Rename
          </Dropdown.Item>
          <Dropdown.Item id="duplicate" leading={<RiFileCopyLine />}>
            Duplicate
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item
            id="delete"
            variant="danger"
            leading={<RiDeleteBin6Line />}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
