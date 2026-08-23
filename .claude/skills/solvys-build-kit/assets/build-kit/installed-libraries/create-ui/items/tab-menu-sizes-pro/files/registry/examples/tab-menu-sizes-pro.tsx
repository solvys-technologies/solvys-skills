import {
  RiBankCardLine,
  RiInboxLine,
  RiInformationLine,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"

export default function TabMenuSizesPro() {
  return (
    <div className="flex flex-col items-center gap-10">
      <TabMenu
        className="w-[240px]"
        variant="vertical-button"
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
        className="w-[240px]"
        variant="vertical-button"
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
        className="w-[240px]"
        variant="vertical-button"
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
