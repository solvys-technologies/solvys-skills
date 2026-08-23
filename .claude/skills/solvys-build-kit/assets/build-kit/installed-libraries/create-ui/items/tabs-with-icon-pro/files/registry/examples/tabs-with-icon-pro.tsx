import {
  RiArrowRightSLine,
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

export default function TabsWithIconPro() {
  return (
    <Tabs
      variant="vertical-button"
      defaultValue="activity"
      className="w-full max-w-xl"
    >
      <TabsList className="w-[220px]">
        <TabsTrigger
          value="overview"
          leading={<RiInformationLine />}
          trailing={<RiArrowRightSLine />}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          leading={<RiInboxLine />}
          trailing={<RiArrowRightSLine />}
        >
          Activity
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-paragraph-sm text-body">
        Key metrics and recent project activity at a glance.
      </TabsContent>
      <TabsContent value="activity" className="text-paragraph-sm text-body">
        A timeline of everything that happened across your workspace.
      </TabsContent>
      <TabsContent value="settings" className="text-paragraph-sm text-body">
        Manage preferences, members, and billing for this workspace.
      </TabsContent>
    </Tabs>
  )
}
