"use client"

import * as React from "react"
import type { Selection } from "react-aria-components"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

function MultiSelectMenu() {
  const [selected, setSelected] = React.useState<Selection>(
    new Set(["comments"])
  )

  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Notifications
      </Button>
      <Dropdown.Popover className="w-56">
        <Dropdown.Menu
          aria-label="Notifications"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Dropdown.Item id="comments">Comments</Dropdown.Item>
          <Dropdown.Item id="mentions">Mentions</Dropdown.Item>
          <Dropdown.Item id="updates">Updates</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function SingleSelectMenu() {
  const [selected, setSelected] = React.useState<Selection>(new Set(["medium"]))

  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Density
      </Button>
      <Dropdown.Popover className="w-52">
        <Dropdown.Menu
          aria-label="Density"
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          disallowEmptySelection
        >
          <Dropdown.Item id="compact">Compact</Dropdown.Item>
          <Dropdown.Item id="medium">Medium</Dropdown.Item>
          <Dropdown.Item id="comfortable">Comfortable</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default function DropdownMenuSelection() {
  return (
    <div className="flex flex-wrap gap-4">
      <MultiSelectMenu />
      <SingleSelectMenu />
    </div>
  )
}
