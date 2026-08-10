"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function TabsControlled() {
  const [value, setValue] = React.useState("overview")

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-paragraph-sm text-body">
          Your key metrics and recent project activity at a glance.
        </TabsContent>
        <TabsContent value="activity" className="text-paragraph-sm text-body">
          A timeline of everything that happened across your workspace.
        </TabsContent>
        <TabsContent value="settings" className="text-paragraph-sm text-body">
          Manage preferences, members, and billing for this workspace.
        </TabsContent>
      </Tabs>
      <p className="text-ui-control-sm text-body">
        Active: <span className="text-strongest font-semibold">{value}</span>
      </p>
    </div>
  )
}
