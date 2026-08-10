"use client"

import Link from "next/link"
import {
  RiCodeSSlashLine,
  RiInformationLine,
  RiKeyboardLine,
  RiSparklingLine,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/ui/tab-menu"

export default function TabMenuAsLink() {
  return (
    <TabMenu
      variant="horizontal-line"
      indicator="bottom"
      size="md"
      defaultValue="examples"
    >
      <TabMenuItem asChild value="description" leading={<RiInformationLine />}>
        <Link href="#description">Description</Link>
      </TabMenuItem>
      <TabMenuItem asChild value="examples" leading={<RiSparklingLine />}>
        <Link href="#examples">Examples</Link>
      </TabMenuItem>
      <TabMenuItem asChild value="accessibility" leading={<RiKeyboardLine />}>
        <Link href="#accessibility">Accessibility</Link>
      </TabMenuItem>
      <TabMenuItem asChild value="api-reference" leading={<RiCodeSSlashLine />}>
        <Link href="#api-reference">API Reference</Link>
      </TabMenuItem>
    </TabMenu>
  )
}
