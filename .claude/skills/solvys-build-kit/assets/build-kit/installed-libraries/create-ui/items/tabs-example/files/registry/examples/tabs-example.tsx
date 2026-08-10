import {
  RiArrowRightSLine,
  RiInboxLine,
  RiInformationLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/pro/ui/tabs"

export default function TabsExample() {
  return (
    <div className="flex flex-col gap-16">
      {/* Variants × indicators */}
      <VerticalButtonDemo />
      <VerticalButtonLeftDemo />
      <VerticalLineTopDemo />
      <VerticalLineBottomDemo />
      <HorizontalLineTopDemo />
      <HorizontalLineBottomDemo />
      <HorizontalButtonDemo />

      {/* Sizes */}
      <SizeSmallDemo />
      <SizeMediumDemo />
      <SizeLargeDemo />

      {/* Disabled */}
      <DisabledDemo />
    </div>
  )
}

// ============================================================
// Vertical Button (sliding pill) — leading + trailing icon
// ============================================================

function VerticalButtonDemo() {
  return (
    <SectionFrame title="Vertical Button">
      <Tabs
        variant="vertical-button"
        defaultValue="overview"
        className="w-[520px]"
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
          Your key metrics and recent project activity at a glance.
        </TabsContent>
        <TabsContent value="activity" className="text-paragraph-sm text-body">
          A timeline of everything that happened across your workspace.
        </TabsContent>
        <TabsContent value="settings" className="text-paragraph-sm text-body">
          Manage preferences, members, and billing for this workspace.
        </TabsContent>
      </Tabs>
    </SectionFrame>
  )
}

function VerticalButtonLeftDemo() {
  return (
    <SectionFrame title="Vertical Button — Left Indicator">
      <Tabs
        variant="vertical-button"
        indicator="left"
        defaultValue="overview"
        className="w-[520px]"
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
          Your key metrics and recent project activity at a glance.
        </TabsContent>
        <TabsContent value="activity" className="text-paragraph-sm text-body">
          A timeline of everything that happened across your workspace.
        </TabsContent>
        <TabsContent value="settings" className="text-paragraph-sm text-body">
          Manage preferences, members, and billing for this workspace.
        </TabsContent>
      </Tabs>
    </SectionFrame>
  )
}

// ============================================================
// Vertical Line (icon over label)
// ============================================================

function VerticalLineTopDemo() {
  return (
    <SectionFrame title="Vertical Line — Top Indicator">
      <Tabs
        variant="vertical-line"
        indicator="top"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

function VerticalLineBottomDemo() {
  return (
    <SectionFrame title="Vertical Line — Bottom Indicator">
      <Tabs
        variant="vertical-line"
        indicator="bottom"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

// ============================================================
// Horizontal Line
// ============================================================

function HorizontalLineTopDemo() {
  return (
    <SectionFrame title="Horizontal Line — Top Indicator">
      <Tabs
        variant="horizontal-line"
        indicator="top"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

function HorizontalLineBottomDemo() {
  return (
    <SectionFrame title="Horizontal Line — Bottom Indicator">
      <Tabs
        variant="horizontal-line"
        indicator="bottom"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

// ============================================================
// Horizontal Button (sliding pill)
// ============================================================

function HorizontalButtonDemo() {
  return (
    <SectionFrame title="Horizontal Button">
      <Tabs
        variant="horizontal-button"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

// ============================================================
// Sizes — horizontal-line + bottom at sm / md / lg
// ============================================================

function SizeSmallDemo() {
  return (
    <SectionFrame title="Size — Small">
      <Tabs
        variant="horizontal-line"
        indicator="bottom"
        size="sm"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

function SizeMediumDemo() {
  return (
    <SectionFrame title="Size — Medium">
      <Tabs
        variant="horizontal-line"
        indicator="bottom"
        size="md"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

function SizeLargeDemo() {
  return (
    <SectionFrame title="Size — Large">
      <Tabs
        variant="horizontal-line"
        indicator="bottom"
        size="lg"
        defaultValue="overview"
        className="w-[440px]"
      >
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
    </SectionFrame>
  )
}

// ============================================================
// Disabled tab
// ============================================================

function DisabledDemo() {
  return (
    <SectionFrame title="Disabled Tab">
      <Tabs
        variant="horizontal-line"
        indicator="bottom"
        defaultValue="overview"
        className="w-[440px]"
      >
        <TabsList>
          <TabsTrigger value="overview" leading={<RiInformationLine />}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" leading={<RiInboxLine />}>
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings" leading={<RiSettings6Line />} disabled>
            Settings
          </TabsTrigger>
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
    </SectionFrame>
  )
}
