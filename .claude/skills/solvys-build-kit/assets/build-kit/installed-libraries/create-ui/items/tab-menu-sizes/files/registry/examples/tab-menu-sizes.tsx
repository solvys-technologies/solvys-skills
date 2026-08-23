import {
  RiBankCardLine,
  RiInboxLine,
  RiInformationLine,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/ui/tab-menu"

export default function TabMenuSizes() {
  return (
    <div className="flex flex-col gap-10">
      <TabMenu
        variant="horizontal-line"
        indicator="bottom"
        size="sm"
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

      <TabMenu
        variant="horizontal-line"
        indicator="bottom"
        size="md"
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

      <TabMenu
        variant="horizontal-line"
        indicator="bottom"
        size="lg"
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
    </div>
  )
}
