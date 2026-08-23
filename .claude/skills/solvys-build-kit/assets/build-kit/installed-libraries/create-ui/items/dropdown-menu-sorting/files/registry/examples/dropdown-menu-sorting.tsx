"use client"

import * as React from "react"
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCornerDownLeftLine,
} from "@create-ui/assets/icons"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import type { Selection } from "react-aria-components"

import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"
import { Radio } from "@/registry/ui/radio"

function MenuRadio({ value }: { value: string }) {
  return <Radio value={value} tabIndex={-1} className="pointer-events-none" />
}

export default function DropdownMenuSorting() {
  const [selected, setSelected] = React.useState<Selection>(new Set(["oldest"]))
  const selectedKey =
    selected === "all" ? "" : ((Array.from(selected)[0] as string) ?? "")

  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Sort
      </Button>
      <Dropdown.Popover className="w-80">
        <RadioGroupPrimitive.Root value={selectedKey} className="contents">
          <Dropdown.Menu
            aria-label="Sort by"
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            disallowEmptySelection
          >
            <Dropdown.Section>
              <Dropdown.Header>Sort by</Dropdown.Header>
              <Dropdown.Item id="newest" textValue="Newest First">
                <MenuRadio value="newest" />
                <Dropdown.ItemContainer>
                  <Dropdown.ItemLabel>Newest First</Dropdown.ItemLabel>
                </Dropdown.ItemContainer>
              </Dropdown.Item>
              <Dropdown.Item id="oldest" textValue="Oldest first">
                <MenuRadio value="oldest" />
                <Dropdown.ItemContainer>
                  <Dropdown.ItemLabel>Oldest first</Dropdown.ItemLabel>
                </Dropdown.ItemContainer>
              </Dropdown.Item>
              <Dropdown.Item id="name" textValue="Name A-Z">
                <MenuRadio value="name" />
                <Dropdown.ItemContainer>
                  <Dropdown.ItemLabel>Name A-Z</Dropdown.ItemLabel>
                </Dropdown.ItemContainer>
              </Dropdown.Item>
              <Dropdown.Item id="updated" textValue="Recently updated">
                <MenuRadio value="updated" />
                <Dropdown.ItemContainer>
                  <Dropdown.ItemLabel>Recently updated</Dropdown.ItemLabel>
                </Dropdown.ItemContainer>
              </Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </RadioGroupPrimitive.Root>
        <Dropdown.Footer>
          <div className="text-ui-control-lg text-body flex flex-1 items-center gap-2 px-4">
            <span className="flex flex-1 items-center gap-2">
              <span>Navigate</span>
              <span className="flex items-center gap-1">
                <Badge variant="neutral" appearance="soft" size="sm" iconOnly>
                  <RiArrowUpLine />
                </Badge>
                <Badge variant="neutral" appearance="soft" size="sm" iconOnly>
                  <RiArrowDownLine />
                </Badge>
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span>Select</span>
              <Badge variant="neutral" appearance="soft" size="sm" iconOnly>
                <RiCornerDownLeftLine />
              </Badge>
            </span>
          </div>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
