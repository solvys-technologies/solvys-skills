import {
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"

export default function TabMenuVariantVerticalLine() {
  return (
    <TabMenu variant="vertical-line" indicator="top" defaultValue="activity">
      <TabMenuItem
        value="overview"
        leading={<RiInformationLine />}
        label="Overview"
      />
      <TabMenuItem
        value="activity"
        leading={<RiInboxLine />}
        label="Activity"
      />
      <TabMenuItem
        value="settings"
        leading={<RiSettings6Line />}
        label="Settings"
      />
    </TabMenu>
  )
}
