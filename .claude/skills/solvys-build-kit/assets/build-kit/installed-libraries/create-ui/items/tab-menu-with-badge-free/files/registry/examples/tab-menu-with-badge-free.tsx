import {
  RiBankCardLine,
  RiInboxLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { StatusBadge } from "@/registry/ui/status-badge"
import { TabMenu, TabMenuItem } from "@/registry/ui/tab-menu"

export default function TabMenuWithBadgeFree() {
  return (
    <TabMenu
      variant="horizontal-line"
      indicator="bottom"
      size="md"
      defaultValue="activity"
    >
      <TabMenuItem value="activity" leading={<RiInboxLine />} label="Activity">
        <Badge variant="info" appearance="soft" size="sm">
          12
        </Badge>
      </TabMenuItem>
      <TabMenuItem value="billing" leading={<RiBankCardLine />} label="Billing">
        <Badge variant="success" appearance="soft" size="sm">
          New
        </Badge>
      </TabMenuItem>
      <TabMenuItem
        value="settings"
        leading={<RiSettings6Line />}
        label="Settings"
      >
        <StatusBadge variant="primary" size="md" />
      </TabMenuItem>
    </TabMenu>
  )
}
