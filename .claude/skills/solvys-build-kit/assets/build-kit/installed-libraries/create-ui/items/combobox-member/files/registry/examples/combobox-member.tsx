"use client"

import * as React from "react"
import { Collection } from "react-aria-components"

import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Combobox } from "@/registry/ui/combobox"

type Member = {
  id: string
  name: string
  email: string
  initials: string
  src: string
}
type Group = { id: string; name: string; children: Member[] }

const GROUPS: Group[] = [
  {
    id: "suggested",
    name: "Suggested",
    children: [
      {
        id: "ayla",
        name: "Ayla Karagöz",
        email: "ayla@createui.co",
        initials: "AK",
        src: "https://createui.co/avatars/ayla-karagoz.webp",
      },
      {
        id: "luca",
        name: "Luca Moretti",
        email: "luca@createui.co",
        initials: "LM",
        src: "https://createui.co/avatars/luca-moretti.webp",
      },
    ],
  },
  {
    id: "all",
    name: "All members",
    children: [
      {
        id: "yuki",
        name: "Yuki Tanaka",
        email: "yuki@createui.co",
        initials: "YT",
        src: "https://createui.co/avatars/yuki-tanaka.webp",
      },
      {
        id: "marcus",
        name: "Marcus Okafor",
        email: "marcus@createui.co",
        initials: "MO",
        src: "https://createui.co/avatars/marcus-okafor.webp",
      },
    ],
  },
]

const MEMBERS = GROUPS.flatMap((group) => group.children)

function MemberAvatar({ member }: { member: Member }) {
  return (
    <Avatar size="xs">
      <AvatarImage src={member.src} alt={member.name} />
      <AvatarText>{member.initials}</AvatarText>
    </Avatar>
  )
}

export default function ComboboxMember() {
  const [value, setValue] = React.useState<string | null>("luca")
  const selected = MEMBERS.find((member) => member.id === value)
  const [inputValue, setInputValue] = React.useState(selected?.name ?? "")

  const query =
    inputValue === (selected?.name ?? "") ? "" : inputValue.trim().toLowerCase()
  const groups = GROUPS.map((group) => ({
    ...group,
    children: group.children.filter((member) =>
      member.name.toLowerCase().includes(query)
    ),
  })).filter((group) => group.children.length > 0)

  return (
    <div className="w-full max-w-[360px]">
      <Combobox
        aria-label="Assignee"
        menuTrigger="focus"
        allowsEmptyCollection
        items={groups}
        inputValue={inputValue}
        onInputChange={(text) => {
          setInputValue(text)
          if (text === "") setValue(null)
        }}
        value={value}
        onChange={(key) => {
          const member = MEMBERS.find((item) => item.id === key)
          setValue(member ? member.id : null)
          setInputValue(member ? member.name : "")
        }}
      >
        <Combobox.Input
          placeholder="Assign to..."
          startContent={
            selected ? <MemberAvatar member={selected} /> : undefined
          }
        />
        <Combobox.Popover
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No member found
            </p>
          )}
        >
          {(group: Group) => (
            <Combobox.Section id={group.id}>
              <Combobox.Label>{group.name}</Combobox.Label>
              <Collection items={group.children}>
                {(member: Member) => (
                  <Combobox.Item
                    id={member.id}
                    textValue={member.name}
                    leading={<MemberAvatar member={member} />}
                    description={member.email}
                  >
                    {member.name}
                  </Combobox.Item>
                )}
              </Collection>
            </Combobox.Section>
          )}
        </Combobox.Popover>
      </Combobox>
    </div>
  )
}
