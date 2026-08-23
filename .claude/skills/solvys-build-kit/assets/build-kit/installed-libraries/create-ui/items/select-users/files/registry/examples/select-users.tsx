"use client"

import * as React from "react"
import { RiErrorWarningFill } from "@create-ui/assets/icons"

import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Chip } from "@/registry/ui/chip"
import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Select } from "@/registry/ui/select"

type UserRow = { id: string; name: string; initials: string; src: string }

const USERS: UserRow[] = [
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

const MAX_CHIPS = 3

export default function SelectUsers() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([
    "ayla",
    "liam",
    "yuki",
  ])

  const visible = selected.slice(0, MAX_CHIPS)
  const overflow = selected.length - visible.length
  const firstName = (id: string) =>
    USERS.find((user) => user.id === id)?.name.split(" ")[0] ?? id

  return (
    <Field className="w-[350px] max-w-full">
      <FieldLabel>Select Users</FieldLabel>
      <Select
        isOpen={open}
        onOpenChange={setOpen}
        selectionMode="multiple"
        value={selected}
        onChange={(keys) => setSelected([...keys].map(String))}
      >
        <Select.Trigger>
          {selected.length > 0 ? (
            <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
              {visible.map((id) => (
                <Chip
                  key={id}
                  size="sm"
                  appearance="soft"
                  variant="neutral"
                  shape="rounded"
                  onClose={() =>
                    setSelected((prev) => prev.filter((value) => value !== id))
                  }
                >
                  {firstName(id)}
                </Chip>
              ))}
              {overflow > 0 && (
                <span className="text-ui-control-xs text-placeholder shrink-0 whitespace-nowrap">
                  +{overflow} more
                </span>
              )}
            </div>
          ) : (
            <Select.Value placeholder="Select users..." />
          )}
        </Select.Trigger>
        <Select.Popover
          className="w-[350px]"
          footer={
            <>
              <Button
                variant="neutral-light"
                appearance="soft"
                size="md"
                className="flex-1"
                onClick={() => setSelected([])}
              >
                Clear
              </Button>
              <Button
                variant="neutral-solid"
                appearance="solid"
                size="md"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Apply
              </Button>
            </>
          }
        >
          {USERS.map((user) => (
            <Select.Item key={user.id} value={user.id} textValue={user.name}>
              {({ isSelected }) => (
                <>
                  <Checkbox
                    checked={isSelected}
                    size="xs"
                    tabIndex={-1}
                    className="pointer-events-none"
                  />
                  <Select.ItemContainer>
                    <Avatar size="2xs">
                      <AvatarImage src={user.src} alt={user.name} />
                      <AvatarText>{user.initials}</AvatarText>
                    </Avatar>
                    <Select.ItemLabel>{user.name}</Select.ItemLabel>
                  </Select.ItemContainer>
                </>
              )}
            </Select.Item>
          ))}
        </Select.Popover>
      </Select>
      <FieldHelper icon={<RiErrorWarningFill />}>
        This selection affects access and permissions
      </FieldHelper>
    </Field>
  )
}
