import {
  RiArrowRightSLine,
  RiBankCardLine,
  RiInboxLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"

export default function TabMenuWithIcon() {
  return (
    <TabMenu
      className="w-[260px]"
      variant="vertical-button"
      defaultValue="activity"
    >
      <TabMenuItem
        value="activity"
        leading={<RiInboxLine />}
        trailing={<RiArrowRightSLine />}
        label="Activity"
      />
      <TabMenuItem
        value="billing"
        leading={<RiBankCardLine />}
        trailing={<RiArrowRightSLine />}
        label="Billing"
      />
      <TabMenuItem
        value="settings"
        leading={<RiSettings6Line />}
        trailing={<RiArrowRightSLine />}
        label="Settings"
      />
    </TabMenu>
  )
}
