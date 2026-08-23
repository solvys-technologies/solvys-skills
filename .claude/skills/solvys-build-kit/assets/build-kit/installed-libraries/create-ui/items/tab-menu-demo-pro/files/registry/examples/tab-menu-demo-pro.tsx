import {
  RiBankCardLine,
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"
import { Badge } from "@/registry/ui/badge"

export default function TabMenuDemoPro() {
  return (
    <TabMenu
      className="w-[280px]"
      variant="vertical-button"
      defaultValue="activity"
    >
      <TabMenuItem
        value="overview"
        leading={<RiInformationLine />}
        label="Overview"
      />
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
      />
    </TabMenu>
  )
}
