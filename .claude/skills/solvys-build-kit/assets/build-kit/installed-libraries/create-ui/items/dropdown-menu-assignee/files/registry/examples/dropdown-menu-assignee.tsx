"use client"

import * as React from "react"
import type { Selection } from "react-aria-components"

import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dropdown } from "@/registry/ui/dropdown-menu"

type Member = { id: string; name: string; initials: string; src: string }

const MEMBERS: Member[] = [
  {
    id: "ayla",
    name: "Ayla Karagöz",
    initials: "AK",
    src: "https://createui.co/avatars/ayla-karagoz.webp",
  },
  {
    id: "luca",
    name: "Luca Moretti",
    initials: "LM",
    src: "https://createui.co/avatars/luca-moretti.webp",
  },
  {
    id: "liam",
    name: "Liam O’Brien",
    initials: "LO",
    src: "https://createui.co/avatars/liam-obrien.webp",
  },
  {
    id: "yuki",
    name: "Yuki Tanaka",
    initials: "YT",
    src: "https://createui.co/avatars/yuki-tanaka.webp",
  },
  {
    id: "marcus",
    name: "Marcus Okafor",
    initials: "MO",
    src: "https://createui.co/avatars/marcus-okafor.webp",
  },
  {
    id: "sofia",
    name: "Sofia Reis",
    initials: "SR",
    src: "https://createui.co/avatars/sofia-reis.webp",
  },
]

export default function DropdownMenuAssignee() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Selection>(new Set(["luca"]))
  const selectedCount = selected === "all" ? MEMBERS.length : selected.size

  return (
    <Dropdown isOpen={open} onOpenChange={setOpen}>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Assignees
      </Button>
      <Dropdown.Popover
        className="w-80 md:w-100"
        header={<Dropdown.Search placeholder="Search members.." />}
      >
        <Dropdown.Menu
          aria-label="Members"
          autoFocus={false}
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          items={MEMBERS}
          className="max-h-[296px]"
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No members found
            </p>
          )}
        >
          {(member) => (
            <Dropdown.Item id={member.id} textValue={member.name}>
              {({ isSelected }) => (
                <>
                  <Checkbox
                    checked={isSelected}
                    size="sm"
                    tabIndex={-1}
                    className="pointer-events-none"
                  />
                  <Dropdown.ItemContainer>
                    <Avatar size="xs">
                      <AvatarImage src={member.src} alt={member.name} />
                      <AvatarText>{member.initials}</AvatarText>
                    </Avatar>
                    <Dropdown.ItemLabel>{member.name}</Dropdown.ItemLabel>
                  </Dropdown.ItemContainer>
                </>
              )}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>

        <Dropdown.Footer>
          <span className="text-ui-control-sm flex flex-1 items-center gap-1 px-4">
            <span className="text-body">{selectedCount}</span>
            <span className="text-placeholder">of</span>
            <span className="text-body">{MEMBERS.length}</span>
            <span className="text-placeholder">selected</span>
          </span>
          <Button
            variant="neutral-light"
            appearance="soft"
            size="sm"
            onClick={() => setSelected(new Set())}
          >
            Clear
          </Button>
          <Button
            variant="primary"
            appearance="solid"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Apply
          </Button>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
