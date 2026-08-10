import {
  RiArchiveLine,
  RiInboxLine,
  RiListCheck3,
} from "@create-ui/assets/icons"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function TabsWithIcon() {
  return (
    <Tabs defaultValue="inbox" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="inbox" leading={<RiInboxLine />}>
          Inbox
        </TabsTrigger>
        <TabsTrigger value="tasks" leading={<RiListCheck3 />}>
          Tasks
        </TabsTrigger>
        <TabsTrigger value="archived" trailing={<RiArchiveLine />}>
          Archived
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inbox">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Inbox</h3>
          <p className="text-paragraph-sm text-body">
            Messages waiting for your reply, newest first.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="tasks">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Tasks</h3>
          <p className="text-paragraph-sm text-body">
            Everything assigned to you across projects, in one list.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="archived">
        <div className="border-light bg-static shadow-neutral-2xs p-component-lg flex flex-col gap-2 rounded-2xl border">
          <h3 className="text-heading-h6 text-strongest">Archived</h3>
          <p className="text-paragraph-sm text-body">
            Items you have closed out and filed away for later.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
