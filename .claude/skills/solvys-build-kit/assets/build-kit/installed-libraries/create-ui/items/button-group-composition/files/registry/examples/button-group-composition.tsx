"use client"

import { RiExternalLinkLine } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupComposition() {
  return (
    <ButtonGroup>
      <ButtonGroupItem>
        Inbox
        <Badge variant="neutral" appearance="soft" size="xs" numberOnly>
          7
        </Badge>
      </ButtonGroupItem>
      <ButtonGroupItem active>
        Drafts
        <Badge variant="primary" appearance="soft" size="xs" numberOnly>
          2
        </Badge>
      </ButtonGroupItem>
      <ButtonGroupItem asChild trailing={<RiExternalLinkLine />}>
        <a href="#archive">Archive</a>
      </ButtonGroupItem>
    </ButtonGroup>
  )
}
