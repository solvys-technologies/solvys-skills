import {
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="overview" leading={<RiInformationLine />}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity" leading={<RiInboxLine />}>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" leading={<RiSettings6Line />}>
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Overview</h3>
          <p className="text-paragraph-sm text-body">
            Recent activity, open tasks, and where each project stands this
            week, all in one place.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Activity</h3>
          <p className="text-paragraph-sm text-body">
            Every change across your workspace in one timeline, from new
            comments to the latest deploys.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Settings</h3>
          <p className="text-paragraph-sm text-body">
            Tune preferences, manage members, and connect the tools your team
            already works in.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
