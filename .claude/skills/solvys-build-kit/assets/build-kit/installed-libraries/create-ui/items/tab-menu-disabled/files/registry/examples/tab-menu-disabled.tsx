import {
  RiBankCardLine,
  RiInboxLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"

export default function TabMenuDisabled() {
  return (
    <TabMenu
      className="w-[260px]"
      variant="vertical-button"
      defaultValue="activity"
    >
      <TabMenuItem
        value="activity"
        leading={<RiInboxLine />}
        label="Activity"
      />
      <TabMenuItem
        value="billing"
        disabled
        leading={<RiBankCardLine />}
        label="Billing"
      />
      <TabMenuItem
        value="settings"
        leading={<RiSettings6Line />}
        label="Settings"
      />
    </TabMenu>
  )
}
