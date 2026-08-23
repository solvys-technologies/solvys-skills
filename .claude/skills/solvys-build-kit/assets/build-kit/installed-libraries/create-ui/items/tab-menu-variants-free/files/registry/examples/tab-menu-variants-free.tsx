import {
  RiBankCardLine,
  RiInboxLine,
  RiInformationLine,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/ui/tab-menu"

export default function TabMenuVariantsFree() {
  return (
    <TabMenu
      variant="horizontal-line"
      indicator="bottom"
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
        value="billing"
        leading={<RiBankCardLine />}
        label="Billing"
      />
    </TabMenu>
  )
}
