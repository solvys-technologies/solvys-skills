"use client"

import * as React from "react"
import {
  RiBankCardLine,
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { TabMenu, TabMenuItem } from "@/registry/ui/tab-menu"

export default function TabMenuControlled() {
  const [value, setValue] = React.useState("activity")

  return (
    <div className="flex flex-col gap-3">
      <TabMenu
        variant="horizontal-line"
        indicator="bottom"
        size="md"
        value={value}
        onValueChange={setValue}
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
        <TabMenuItem
          value="settings"
          leading={<RiSettings6Line />}
          label="Settings"
        />
      </TabMenu>
      <p className="text-ui-control-sm text-body">
        Section: <span className="text-strongest font-semibold">{value}</span>
      </p>
    </div>
  )
}
