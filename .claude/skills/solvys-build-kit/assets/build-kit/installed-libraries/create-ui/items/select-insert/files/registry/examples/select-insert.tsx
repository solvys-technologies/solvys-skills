"use client"

import * as React from "react"
import {
  RiCheckboxCircleFill,
  RiEmotionLine,
  RiFigmaFill,
  RiFileWord2Line,
  RiImageLine,
  RiLock2Line,
  RiSparkling2Line,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Select } from "@/registry/ui/select"

const INSERT_ITEMS = [
  { id: "word", label: "Word Document", icon: <RiFileWord2Line /> },
  { id: "image", label: "Image", icon: <RiImageLine /> },
  { id: "figma", label: "Embed from Figma", icon: <RiFigmaFill /> },
  { id: "emoji", label: "Emoji", icon: <RiEmotionLine /> },
]

export default function SelectInsert() {
  const [value, setValue] = React.useState<string | null>(null)
  const selected = [
    ...INSERT_ITEMS,
    { id: "ai", label: "AI Block", icon: <RiSparkling2Line /> },
  ].find((item) => item.id === value)

  return (
    <div className="w-full max-w-xs">
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger>
          {selected?.icon}
          <Select.Value placeholder="Insert block">
            {selected ? selected.label : null}
          </Select.Value>
        </Select.Trigger>
        <Select.Popover
          className="w-[330px]"
          footer={
            <>
              <span className="px-component-sm flex flex-1 items-center">
                <Badge
                  variant="primary"
                  appearance="soft"
                  size="sm"
                  leading={<RiLock2Line />}
                >
                  Unlock with Pro
                </Badge>
              </span>
              <Button variant="neutral-solid" appearance="solid" size="sm">
                Upgrade
              </Button>
            </>
          }
        >
          <Select.Group>
            <Select.Label>Insert</Select.Label>
            {INSERT_ITEMS.map((item) => (
              <Select.Item
                key={item.id}
                value={item.id}
                leading={item.icon}
                indicator={<RiCheckboxCircleFill />}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Group>
          <Select.Separator />
          <Select.Item
            value="ai"
            leading={<RiSparkling2Line />}
            indicator={<RiCheckboxCircleFill />}
          >
            AI Block
          </Select.Item>
        </Select.Popover>
      </Select>
    </div>
  )
}
