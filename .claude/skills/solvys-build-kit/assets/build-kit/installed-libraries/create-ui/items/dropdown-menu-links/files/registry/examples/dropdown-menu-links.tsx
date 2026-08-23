"use client"

import { RiExternalLinkLine } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuLinks() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Resources
      </Button>
      <Dropdown.Popover className="w-56">
        <Dropdown.Menu aria-label="Resources">
          <Dropdown.Item
            id="docs"
            href="https://createui.co/docs"
            target="_blank"
            leading={<RiExternalLinkLine />}
          >
            Documentation
          </Dropdown.Item>
          <Dropdown.Item
            id="github"
            href="https://github.com"
            target="_blank"
            leading={<RiExternalLinkLine />}
          >
            GitHub
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
