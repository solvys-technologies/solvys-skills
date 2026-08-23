"use client"

import { UnitedKingdom } from "@create-ui/assets/flags"
import {
  RiCheckboxCircleFill,
  RiProhibitedLine,
  RiSparklingFill,
} from "@create-ui/assets/icons"

import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Chip } from "@/registry/ui/chip"

export default function ChipDemo() {
  return (
    <div className="flex flex-col flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-4">
        <Chip shape="rounded" variant="success" appearance="soft">
          Live
        </Chip>
        <Chip shape="rounded" variant="info">
          In Review
        </Chip>
        <Chip shape="rounded" appearance="soft" closable onClose={() => {}}>
          <RiSparklingFill />
          Featured
        </Chip>
        <Chip shape="pill">Draft</Chip>
      </div>
      <div className="flex flex-wrap gap-4">
        <Chip shape="pill" variant="neutral" appearance="outline">
          <Avatar size="2xs" stroke={false}>
            <AvatarImage src="https://i.pravatar.cc/39" alt="Avatar" />
          </Avatar>
          Avatar
        </Chip>
        <Chip shape="pill" variant="neutral" appearance="soft">
          <UnitedKingdom />
          United Kingdom
        </Chip>
        <Chip shape="pill" variant="danger" appearance="soft">
          <RiProhibitedLine />
          Sync Error
        </Chip>
        <Chip shape="pill" variant="info" appearance="soft" selected>
          <RiCheckboxCircleFill />
          Approved
        </Chip>
      </div>
    </div>
  )
}
