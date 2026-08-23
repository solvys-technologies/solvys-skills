import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="archived" disabled>
          Archived
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Overview</h3>
          <p className="text-paragraph-sm text-body">
            Your key metrics and recent project activity at a glance.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Activity</h3>
          <p className="text-paragraph-sm text-body">
            A timeline of everything that happened across your workspace.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
