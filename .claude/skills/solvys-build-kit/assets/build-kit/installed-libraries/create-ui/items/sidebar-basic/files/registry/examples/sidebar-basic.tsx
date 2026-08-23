"use client"

import {
  RiDashboard2Line,
  RiFolder3Line,
  RiSidebarFoldLine,
  RiSidebarUnfoldLine,
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

export default function SidebarBasic() {
  return (
    <div className="h-[520px]">
      <Sidebar>
        <SidebarHeader>
          <SidebarBrand
            logo={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect width="24" height="24" rx="7" fill="#2B7FFF" />
              </svg>
            }
            title="Acme"
            subtitle="Workspace"
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
                  value="projects"
                  tooltip="Projects"
                  leading={<RiFolder3Line />}
                  label="Projects"
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  value="members"
                  tooltip="Members"
                  leading={<RiUser3Line />}
                  label="Members"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="text-ui-control-xs text-placeholder">
          v1.0.0
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
