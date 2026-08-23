import {
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"

export default function TabMenuVariantVerticalButton() {
  return (
    <TabMenu
      className="w-[260px]"
      variant="vertical-button"
      defaultValue="activity"
    >
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
