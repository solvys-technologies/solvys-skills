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

export default function TabsVariantVerticalButton() {
  return (
    <Tabs
      variant="vertical-button"
      defaultValue="overview"
      className="w-full max-w-xl"
    >
      <TabsList className="w-[200px]">
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
      <TabsContent value="overview" className="text-paragraph-sm text-body">
        Key metrics and recent project activity at a glance.
      </TabsContent>
      <TabsContent value="activity" className="text-paragraph-sm text-body">
        A timeline of everything across your workspace.
      </TabsContent>
      <TabsContent value="settings" className="text-paragraph-sm text-body">
        Manage preferences, members, and billing.
      </TabsContent>
    </Tabs>
  )
}
