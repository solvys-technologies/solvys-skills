import { RiInboxLine, RiInformationLine } from "@create-ui/assets/icons"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/pro/ui/tabs"

export default function TabsSizesPro() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Tabs variant="vertical-button" size="sm" defaultValue="overview">
        <TabsList className="w-[180px]">
          <TabsTrigger value="overview" leading={<RiInformationLine />}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" leading={<RiInboxLine />}>
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-paragraph-sm text-body">
          A compact bar for dense side panels.
        </TabsContent>
        <TabsContent value="activity" className="text-paragraph-sm text-body">
          Recent changes across your workspace.
        </TabsContent>
      </Tabs>

      <Tabs variant="vertical-button" size="md" defaultValue="overview">
        <TabsList className="w-[180px]">
          <TabsTrigger value="overview" leading={<RiInformationLine />}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" leading={<RiInboxLine />}>
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-paragraph-sm text-body">
          The default size for most tab groups.
        </TabsContent>
        <TabsContent value="activity" className="text-paragraph-sm text-body">
          Recent changes across your workspace.
        </TabsContent>
      </Tabs>

      <Tabs variant="vertical-button" size="lg" defaultValue="overview">
        <TabsList className="w-[180px]">
          <TabsTrigger value="overview" leading={<RiInformationLine />}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" leading={<RiInboxLine />}>
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-paragraph-sm text-body">
          A roomy bar for top-level page sections.
        </TabsContent>
        <TabsContent value="activity" className="text-paragraph-sm text-body">
          Recent changes across your workspace.
        </TabsContent>
      </Tabs>
    </div>
  )
}
