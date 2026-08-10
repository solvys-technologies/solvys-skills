"use client"

import {
  RiBarChart2Line,
  RiBuilding2Line,
  RiCalendarLine,
  RiCheckboxLine,
  RiDashboard2Line,
  RiFileList3Line,
  RiPieChartLine,
  RiSettings3Line,
  RiShakeHandsLine,
  RiSidebarFoldLine,
  RiSidebarUnfoldLine,
  RiTimeLine,
  RiUser3Line,
} from "@create-ui/assets/icons"

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
} from "@/registry/pro/ui/sidebar"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"

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

function DemoSidebar({ className }: { className?: string }) {
  return (
    <Sidebar className={className}>
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu defaultValue="dashboard">
            <SidebarMenuItem>
              <SidebarMenuButton
                value="dashboard"
                tooltip="Dashboard"
                leading={<RiDashboard2Line />}
                label="Dashboard"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="contacts"
                tooltip="Contacts"
                leading={<RiUser3Line />}
                label="Contacts"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="companies"
                tooltip="Companies"
                leading={<RiBuilding2Line />}
                label="Companies"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="deals"
                tooltip="Deals"
                leading={<RiShakeHandsLine />}
                label="Deals"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="activities"
                tooltip="Activities"
                leading={<RiTimeLine />}
                label="Activities"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="reports"
                tooltip="Reports"
                leading={<RiBarChart2Line />}
                label="Reports"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="tasks"
                tooltip="Tasks"
                leading={<RiCheckboxLine />}
                label="Tasks"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="calendar"
                tooltip="Calendar"
                leading={<RiCalendarLine />}
                label="Calendar"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="documents"
                tooltip="Documents"
                leading={<RiFileList3Line />}
                label="Documents"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="analytics"
                tooltip="Analytics"
                leading={<RiPieChartLine />}
                label="Analytics"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                value="settings"
                tooltip="Settings"
                leading={<RiSettings3Line />}
                label="Settings"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

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
          </Avatar>
          <div className="min-w-0 flex-1 overflow-hidden text-left transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0">
            <div className="text-ui-control-md text-body truncate font-semibold">
              Ayla Karagöz
            </div>
            <div className="text-ui-control-xs text-placeholder truncate">
              ayla@createui.co
            </div>
          </div>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}

function PageContent() {
  return (
    <div className="h-full flex-1 space-y-4 overflow-hidden p-6">
      <div className="bg-weak h-14 rounded-xl" />
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-weak h-28 rounded-xl" />
        <div className="bg-weak h-28 rounded-xl" />
        <div className="bg-weak h-28 rounded-xl" />
      </div>
      <div className="bg-weak h-40 rounded-xl" />
    </div>
  )
}

export default function SidebarBorderless() {
  return (
    <div className="bg-static border-light rounded-component-2xl flex h-[460px] w-full overflow-hidden border">
      <DemoSidebar className="rounded-none border-0" />
      <PageContent />
    </div>
  )
}
