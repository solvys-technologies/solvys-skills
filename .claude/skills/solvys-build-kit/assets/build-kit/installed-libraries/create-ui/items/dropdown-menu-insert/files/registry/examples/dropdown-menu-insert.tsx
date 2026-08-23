"use client"

import {
  RiEmotionLine,
  RiFigmaFill,
  RiFileWord2Line,
  RiImageLine,
  RiLock2Line,
  RiSparkling2Line,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

export default function DropdownMenuInsert() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Insert
      </Button>
      <Dropdown.Popover className="w-80">
        <Dropdown.Menu aria-label="Insert block">
          <Dropdown.Section>
            <Dropdown.Header>Insert</Dropdown.Header>
            <Dropdown.Item id="word" leading={<RiFileWord2Line />}>
              Word Document
            </Dropdown.Item>
            <Dropdown.Item id="image" leading={<RiImageLine />}>
              Image
            </Dropdown.Item>
            <Dropdown.Item id="figma" leading={<RiFigmaFill />}>
              Embed from Figma
            </Dropdown.Item>
            <Dropdown.Item id="emoji" leading={<RiEmotionLine />}>
              Emoji
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Item
            id="ai"
            leading={<RiSparkling2Line />}
            trailing={
              <Badge
                variant="primary"
                appearance="soft"
                size="xs"
                leading={<RiLock2Line />}
              >
                Pro
              </Badge>
            }
          >
            AI Block
          </Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Footer>
          <span className="px-component-sm flex flex-1 items-center">
            <Badge
              variant="primary"
              appearance="soft"
              size="xs"
              leading={<RiLock2Line />}
            >
              Unlock with Pro
            </Badge>
          </span>
          <Button variant="neutral-solid" appearance="solid" size="md">
            Upgrade
          </Button>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
