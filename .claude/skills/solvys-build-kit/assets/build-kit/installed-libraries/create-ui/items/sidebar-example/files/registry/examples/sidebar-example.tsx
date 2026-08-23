"use client"

import * as React from "react"
import {
  RiArrowRightSLine,
  RiBarChart2Line,
  RiBuilding2Line,
  RiCalendarLine,
  RiCheckboxLine,
  RiDashboard2Line,
  RiExpandUpDownLine,
  RiFileList3Line,
  RiPieChartLine,
  RiSearch2Line,
  RiSettings3Line,
  RiShakeHandsLine,
  RiSidebarFoldLine,
  RiSidebarUnfoldLine,
  RiTimeLine,
  RiUser3Line,
} from "@create-ui/assets/icons"
import { Figma, LemonSqueezy, Slack } from "@create-ui/assets/social"

import { cn } from "@/registry/lib/utils"
import {
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/registry/pro/ui/sidebar"
import {
  Avatar,
  AvatarBadge,
  AvatarBadgeStatus,
  AvatarGroup,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CloseButton } from "@/registry/ui/close-button"
import { Field } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupControl,
  InputGroupKbd,
  InputGroupSlot,
} from "@/registry/ui/input-group"
import { Progress } from "@/registry/ui/progress"

function BrightpathLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3334 7.01118C14.3467 6.3519 13.1867 6 12 6V0C14.3734 0 16.6934 0.703788 18.6668 2.02237C20.6402 3.34094 22.1783 5.21509 23.0866 7.40778C23.9948 9.60048 24.2324 12.0133 23.7694 14.3411C23.3064 16.6688 22.1635 18.8071 20.4853 20.4853C18.8071 22.1635 16.6688 23.3064 14.3411 23.7694C12.0133 24.2324 9.60048 23.9948 7.40778 23.0866C5.21508 22.1783 3.34094 20.6402 2.02237 18.6668C0.703788 16.6934 0 14.3734 0 12H6C6 13.1867 6.3519 14.3467 7.01118 15.3334C7.67046 16.3201 8.60754 17.0891 9.70392 17.5433C10.8002 17.9974 12.0067 18.1162 13.1705 17.8847C14.3344 17.6532 15.4035 17.0818 16.2427 16.2427C17.0818 15.4035 17.6532 14.3344 17.8847 13.1705C18.1162 12.0067 17.9974 10.8002 17.5433 9.70392C17.0891 8.60754 16.3201 7.67046 15.3334 7.01118Z"
        fill="#2B7FFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3.17096e-06C6 0.787934 5.84481 1.56815 5.54328 2.29611C5.24175 3.02406 4.79979 3.68549 4.24264 4.24264C3.68549 4.7998 3.02406 5.24175 2.2961 5.54328C1.56814 5.84481 0.787929 6 2.62266e-07 6L0 12C1.57586 12 3.13629 11.6896 4.59221 11.0866C6.04812 10.4835 7.371 9.59958 8.48526 8.48526C9.59958 7.371 10.4835 6.04812 11.0866 4.5922C11.6896 3.13629 12 1.57586 12 0L6 3.17096e-06Z"
        fill="#2B7FFF"
      />
    </svg>
  )
}

function SidebarSearch() {
  const { collapsed } = useSidebar()

  return (
    <div className="p-component-md group-data-[state=collapsed]/sidebar:px-component-sm transition-[padding] duration-300 ease-out">
      <div className="group-data-[state=collapsed]/sidebar:hidden">
        <Field size="sm">
          <InputGroup>
            <InputGroupSlot>
              <RiSearch2Line />
              <InputGroupControl placeholder="Search contacts.." />
              <InputGroupKbd>K</InputGroupKbd>
            </InputGroupSlot>
          </InputGroup>
        </Field>
      </div>
      {collapsed && (
        <Button
          iconOnly
          variant="neutral-light"
          appearance="soft"
          size="lg"
          aria-label="Search contacts"
        >
          <RiSearch2Line />
        </Button>
      )}
    </div>
  )
}

function DemoSidebar({ className }: { className?: string }) {
  return (
    <Sidebar className={className} keyboardShortcut={false}>
      <SidebarHeader>
        <SidebarBrand
          logo={<BrightpathLogo />}
          title="Brightpath"
          subtitle="CRM Dashboard"
        />
        <SidebarTrigger>
          <RiSidebarFoldLine className="group-data-[state=collapsed]/sidebar:hidden" />
          <RiSidebarUnfoldLine className="hidden group-data-[state=collapsed]/sidebar:block" />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarSearch />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu defaultValue="dashboard">
            <SidebarMenuItem>
              <SidebarMenuButton
                value="dashboard"
                tooltip="Dashboard"
                leading={<RiDashboard2Line />}
                trailing={<RiArrowRightSLine />}
                label="Dashboard"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="contacts"
                tooltip="Contacts"
                leading={<RiUser3Line />}
                trailing={<RiArrowRightSLine />}
                label="Contacts"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="companies"
                tooltip="Companies"
                leading={<RiBuilding2Line />}
                trailing={<RiArrowRightSLine />}
                label="Companies"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="deals"
                tooltip="Deals"
                leading={<RiShakeHandsLine />}
                trailing={<RiArrowRightSLine />}
                label="Deals"
              >
                <Badge variant="info" appearance="soft" size="xs" numberOnly>
                  6
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="activities"
                tooltip="Activities"
                leading={<RiTimeLine />}
                trailing={<RiArrowRightSLine />}
                label="Activities"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="reports"
                tooltip="Reports"
                leading={<RiBarChart2Line />}
                trailing={<RiArrowRightSLine />}
                label="Reports"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="tasks"
                tooltip="Tasks"
                leading={<RiCheckboxLine />}
                trailing={<RiArrowRightSLine />}
                label="Tasks"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="calendar"
                tooltip="Calendar"
                leading={<RiCalendarLine />}
                trailing={<RiArrowRightSLine />}
                label="Calendar"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="documents"
                tooltip="Documents"
                leading={<RiFileList3Line />}
                trailing={<RiArrowRightSLine />}
                label="Documents"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="analytics"
                tooltip="Analytics"
                leading={<RiPieChartLine />}
                trailing={<RiArrowRightSLine />}
                label="Analytics"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="settings"
                tooltip="Settings"
                leading={<RiSettings3Line />}
                trailing={<RiArrowRightSLine />}
                label="Settings"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Apps</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Slack"
                leading={<Slack />}
                label="Slack"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Figma"
                leading={<Figma />}
                label="Figma"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Lemon Squeezy"
                leading={<LemonSqueezy />}
                label="Lemon Squeezy"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <div className="px-component-md py-section-xs group-data-[state=collapsed]/sidebar:hidden">
        <div className="bg-light border-light rounded-component-xl border">
          <div className="gap-component-md p-component-md bg-static rounded-component-xl shadow-neutral-lg relative flex flex-col">
            <CloseButton
              appearance="soft"
              shape="pill"
              size="sm"
              aria-label="Dismiss"
              className="absolute top-3 right-3"
            />
            <div className="gap-component-sm flex flex-col">
              <AvatarGroup size="2xs">
                <Avatar>
                  <AvatarImage
                    src="/avatars/ayla-karagoz/ayla-karagoz-studio-doll-3d.webp"
                    alt="Ayla Karagöz"
                  />
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="/avatars/liam-o-brien/liam-o-brien-dreamy-3d-character.webp"
                    alt="Liam O'Brien"
                  />
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="/avatars/sofia-reis/sofia-reis-studio-doll-3d.webp"
                    alt="Sofia Reis"
                  />
                </Avatar>
              </AvatarGroup>
              <div>
                <div className="text-ui-control-md text-body font-semibold">
                  Invite your team
                </div>
                <div className="text-ui-control-md text-placeholder">
                  Earn 1 month free per signup.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Progress value={40} size="lg" shape="round" />
              <div className="text-paragraph-xs text-placeholder">
                2 of 5 invited
              </div>
            </div>
          </div>
        </div>
      </div>

      <SidebarFooter className="p-0">
        <button
          type="button"
          className="gap-component-sm hover:bg-weak focus-visible:outline-strong p-component-md group-data-[state=collapsed]/sidebar:px-component-sm flex cursor-pointer items-center outline-none [transition:padding_300ms_ease-out,background-color_150ms_ease-out] focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <Avatar
            size="md"
            variant="weak-orange"
            className="shrink-0"
            stroke={false}
          >
            <AvatarImage
              src="https://createui.co/avatars/ayla-karagoz/ayla-karagoz-studio-doll-3d.webp"
              alt="Ayla Karagöz"
            />
            <AvatarBadge>
              <AvatarBadgeStatus variant="online" />
            </AvatarBadge>
          </Avatar>
          <div className="gap-component-xs flex min-w-0 flex-1 flex-col overflow-hidden text-left transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0">
            <div className="text-ui-control-md text-body truncate font-semibold">
              Ayla Karagöz
            </div>
            <div className="text-ui-control-xs text-placeholder truncate">
              ayla@createui.co
            </div>
          </div>
          <RiExpandUpDownLine className="text-placeholder size-5 shrink-0 transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0" />
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}

function ExampleShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-ui-control-lg text-strongest font-semibold">
          {title}
        </div>
        <div className="text-ui-control-sm text-placeholder">{description}</div>
      </div>
      <div className="bg-weak border-light rounded-component-2xl relative h-svh overflow-hidden border">
        {children}
      </div>
    </div>
  )
}

function PushExample({
  title,
  description,
  sidebarClassName,
  floating,
}: {
  title: string
  description: string
  sidebarClassName?: string
  floating?: boolean
}) {
  return (
    <ExampleShell title={title} description={description}>
      <div className={cn("flex h-full", floating && "gap-3 p-3")}>
        <DemoSidebar className={sidebarClassName} />
        <div className="flex-1" />
      </div>
    </ExampleShell>
  )
}

function OverlayExample() {
  return (
    <ExampleShell
      title="Overlay"
      description="Positioned over the content instead of pushing it. The rail floats above the page with position absolute."
    >
      <div className="absolute inset-y-0 left-0 z-40 p-3">
        <DemoSidebar />
      </div>
    </ExampleShell>
  )
}

export default function SidebarExample() {
  return (
    <div className="flex flex-col gap-10">
      <PushExample
        title="Floating"
        description="The default — bordered and rounded, inset from the edges, pushing the content beside it."
        floating
      />
      <PushExample
        title="Flush"
        description='Docked to the edge: override with className="rounded-none border-y-0 border-l-0" so only the right border remains.'
        sidebarClassName="rounded-none border-y-0 border-l-0"
      />
      <PushExample
        title="Borderless"
        description='No border, no rounding: className="rounded-none border-0".'
        sidebarClassName="rounded-none border-0"
      />
      <OverlayExample />
    </div>
  )
}
