import {
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/pro/ui/tabs"
import { Badge } from "@/registry/ui/badge"

export default function TabsDemoPro() {
  return (
    <Tabs
      variant="vertical-button"
      defaultValue="overview"
      className="w-full max-w-xl"
    >
      <TabsList className="w-[150px] lg:w-[220px]">
        <TabsTrigger value="overview" leading={<RiInformationLine />}>
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          leading={<RiInboxLine />}
          trailing={
            <Badge variant="info" appearance="soft" size="sm">
              12
            </Badge>
          }
        >
          Activity
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          leading={<RiSettings6Line />}
          trailing={
            <Badge variant="success" appearance="soft" size="sm">
              New
            </Badge>
          }
        >
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Overview</h3>
          <p className="text-paragraph-sm text-body">
            Recent activity, open tasks, and where each project stands this
            week.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Activity</h3>
          <p className="text-paragraph-sm text-body">
            Twelve new updates across your workspace since you last checked in.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Settings</h3>
          <p className="text-paragraph-sm text-body">
            Tune preferences, manage members, and connect your tools.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
