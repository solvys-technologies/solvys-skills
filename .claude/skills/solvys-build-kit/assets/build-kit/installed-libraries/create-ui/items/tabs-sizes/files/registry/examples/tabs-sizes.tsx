import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function TabsSizes() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <Tabs defaultValue="overview" size="sm">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="border-light bg-static text-paragraph-sm text-body rounded-xl border p-4"
        >
          A compact bar for dense toolbars and side panels.
        </TabsContent>
        <TabsContent
          value="activity"
          className="border-light bg-static text-paragraph-sm text-body rounded-xl border p-4"
        >
          Recent changes across your workspace.
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="overview" size="md">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="border-light bg-static text-paragraph-sm text-body rounded-xl border p-4"
        >
          The default size for most in-page tab groups.
        </TabsContent>
        <TabsContent
          value="activity"
          className="border-light bg-static text-paragraph-sm text-body rounded-xl border p-4"
        >
          Recent changes across your workspace.
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="overview" size="lg">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="border-light bg-static text-paragraph-sm text-body rounded-xl border p-4"
        >
          A roomy bar for top-level page sections.
        </TabsContent>
        <TabsContent
          value="activity"
          className="border-light bg-static text-paragraph-sm text-body rounded-xl border p-4"
        >
          Recent changes across your workspace.
        </TabsContent>
      </Tabs>
    </div>
  )
}
