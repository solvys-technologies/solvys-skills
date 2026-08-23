import {
  RiBankCardLine,
  RiInboxLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/ui/tab-menu"

export default function TabMenuWithIconFree() {
  return (
    <TabMenu
      variant="horizontal-line"
      indicator="bottom"
      size="md"
      defaultValue="activity"
    >
      <TabMenuItem
        value="activity"
        leading={<RiInboxLine />}
        label="Activity"
      />
      <TabMenuItem
        value="billing"
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
