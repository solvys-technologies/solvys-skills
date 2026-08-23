import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/pro/ui/tabs"

export default function TabsIndicatorTop() {
  return (
    <Tabs
      variant="horizontal-line"
      indicator="top"
      defaultValue="overview"
      className="w-full max-w-md"
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
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
