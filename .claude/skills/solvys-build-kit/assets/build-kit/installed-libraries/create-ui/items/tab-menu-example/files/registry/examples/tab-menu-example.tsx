"use client"

import Link from "next/link"
import {
  RiArrowRightLine,
  RiArrowRightSLine,
  RiSettings6Line,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { TabMenu, TabMenuItem } from "@/registry/pro/ui/tab-menu"
import { Badge } from "@/registry/ui/badge"
import { StatusBadge } from "@/registry/ui/status-badge"

export default function TabMenuExample() {
  return (
    <div className="flex flex-col gap-16">
      {/* 1. Vertical Button */}
      <VerticalButtonDefaultDemo />
      <VerticalButtonActiveDemo />
      <VerticalButtonDisabledDemo />

      {/* 2. Vertical Button + Left Indicator */}
      <VerticalButtonLeftDefaultDemo />
      <VerticalButtonLeftActiveDemo />
      <VerticalButtonLeftDisabledDemo />

      {/* 3. Vertical Line + Bottom Indicator */}
      <VerticalLineBottomDefaultDemo />
      <VerticalLineBottomActiveDemo />
      <VerticalLineBottomDisabledDemo />

      {/* 4. Vertical Line + Top Indicator */}
      <VerticalLineTopDefaultDemo />
      <VerticalLineTopActiveDemo />
      <VerticalLineTopDisabledDemo />

      {/* 5. Horizontal Line + Top Indicator */}
      <HorizontalLineTopDefaultDemo />
      <HorizontalLineTopActiveDemo />
      <HorizontalLineTopDisabledDemo />

      {/* 6. Horizontal Line + Bottom Indicator */}
      <HorizontalLineBottomDefaultDemo />
      <HorizontalLineBottomActiveDemo />
      <HorizontalLineBottomDisabledDemo />

      {/* 7. Horizontal Button */}
      <HorizontalButtonDefaultDemo />
      <HorizontalButtonActiveDemo />
      <HorizontalButtonDisabledDemo />

      {/* Groups */}
      <HorizontalButtonGroupDemo />
      <HorizontalLineBottomGroupDemo />
      <HorizontalLineTopGroupDemo />
      <VerticalLineBottomGroupDemo />
      <VerticalLineTopGroupDemo />
      <VerticalButtonLeftGroupDemo />
      <VerticalButtonGroupDemo />

      {/* Links */}
      <HorizontalLineBottomLinkGroupDemo />
    </div>
  )
}

// ============================================================
// 1. Vertical Button (no indicator)
// ============================================================

function VerticalButtonDefaultDemo() {
  return (
    <SectionFrame title="Vertical Button — Default">
      <TabMenu className="w-[300px]" variant="vertical-button" size="lg">
        <TabMenuItem
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
          label="Menu Item"
        >
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
          <StatusBadge variant="primary" size="md" />
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalButtonActiveDemo() {
  return (
    <SectionFrame title="Vertical Button — Active">
      <TabMenu className="w-[300px]" variant="vertical-button" size="lg">
        <TabMenuItem
          selected
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
          label="Menu Item"
        >
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
          <StatusBadge variant="primary" size="md" />
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalButtonDisabledDemo() {
  return (
    <SectionFrame title="Vertical Button — Disabled">
      <TabMenu className="w-[300px]" variant="vertical-button" size="lg">
        <TabMenuItem
          disabled
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
          label="Menu Item"
        >
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
          <StatusBadge variant="primary" size="md" className="opacity-20" />
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// 2. Vertical Button + Left Indicator
// ============================================================

function VerticalButtonLeftDefaultDemo() {
  return (
    <SectionFrame title="Vertical Button — Left Indicator · Default">
      <TabMenu
        className="w-[324px]"
        variant="vertical-button"
        indicator="left"
        size="lg"
      >
        <TabMenuItem
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
          label="Menu Item"
        >
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
          <StatusBadge variant="primary" size="md" />
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalButtonLeftActiveDemo() {
  return (
    <SectionFrame title="Vertical Button — Left Indicator · Active">
      <TabMenu
        className="w-[324px]"
        variant="vertical-button"
        indicator="left"
        size="lg"
      >
        <TabMenuItem
          selected
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
          label="Menu Item"
        >
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
          <StatusBadge variant="primary" size="md" />
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalButtonLeftDisabledDemo() {
  return (
    <SectionFrame title="Vertical Button — Left Indicator · Disabled">
      <TabMenu
        className="w-[324px]"
        variant="vertical-button"
        indicator="left"
        size="lg"
      >
        <TabMenuItem
          disabled
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightSLine />}
          label="Menu Item"
        >
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
          <StatusBadge variant="primary" size="md" className="opacity-20" />
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// 3. Vertical Line + Bottom Indicator
// ============================================================

function VerticalLineBottomDefaultDemo() {
  return (
    <SectionFrame title="Vertical Line — Bottom Indicator · Default">
      <TabMenu variant="vertical-line" indicator="bottom" size="lg">
        <TabMenuItem leading={<RiSettings6Line />} label="Menu Item">
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalLineBottomActiveDemo() {
  return (
    <SectionFrame title="Vertical Line — Bottom Indicator · Active">
      <TabMenu variant="vertical-line" indicator="bottom" size="lg">
        <TabMenuItem selected leading={<RiSettings6Line />} label="Menu Item">
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalLineBottomDisabledDemo() {
  return (
    <SectionFrame title="Vertical Line — Bottom Indicator · Disabled">
      <TabMenu variant="vertical-line" indicator="bottom" size="lg">
        <TabMenuItem disabled leading={<RiSettings6Line />} label="Menu Item">
          <StatusBadge variant="primary" size="md" className="opacity-20" />
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// 4. Vertical Line + Top Indicator
// ============================================================

function VerticalLineTopDefaultDemo() {
  return (
    <SectionFrame title="Vertical Line — Top Indicator · Default">
      <TabMenu variant="vertical-line" indicator="top" size="lg">
        <TabMenuItem leading={<RiSettings6Line />} label="Menu Item">
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalLineTopActiveDemo() {
  return (
    <SectionFrame title="Vertical Line — Top Indicator · Active">
      <TabMenu variant="vertical-line" indicator="top" size="lg">
        <TabMenuItem selected leading={<RiSettings6Line />} label="Menu Item">
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalLineTopDisabledDemo() {
  return (
    <SectionFrame title="Vertical Line — Top Indicator · Disabled">
      <TabMenu variant="vertical-line" indicator="top" size="lg">
        <TabMenuItem disabled leading={<RiSettings6Line />} label="Menu Item">
          <StatusBadge variant="primary" size="md" className="opacity-20" />
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// 5. Horizontal Line + Top Indicator
// ============================================================

function HorizontalLineTopDefaultDemo() {
  return (
    <SectionFrame title="Horizontal Line — Top Indicator · Default">
      <TabMenu variant="horizontal-line" indicator="top" size="lg">
        <TabMenuItem
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalLineTopActiveDemo() {
  return (
    <SectionFrame title="Horizontal Line — Top Indicator · Active">
      <TabMenu variant="horizontal-line" indicator="top" size="lg">
        <TabMenuItem
          selected
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalLineTopDisabledDemo() {
  return (
    <SectionFrame title="Horizontal Line — Top Indicator · Disabled">
      <TabMenu variant="horizontal-line" indicator="top" size="lg">
        <TabMenuItem
          disabled
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" className="opacity-20" />
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// 6. Horizontal Line + Bottom Indicator
// ============================================================

function HorizontalLineBottomDefaultDemo() {
  return (
    <SectionFrame title="Horizontal Line — Bottom Indicator · Default">
      <TabMenu variant="horizontal-line" indicator="bottom" size="lg">
        <TabMenuItem
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalLineBottomActiveDemo() {
  return (
    <SectionFrame title="Horizontal Line — Bottom Indicator · Active">
      <TabMenu variant="horizontal-line" indicator="bottom" size="lg">
        <TabMenuItem
          selected
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalLineBottomDisabledDemo() {
  return (
    <SectionFrame title="Horizontal Line — Bottom Indicator · Disabled">
      <TabMenu variant="horizontal-line" indicator="bottom" size="lg">
        <TabMenuItem
          disabled
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" className="opacity-20" />
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// 7. Horizontal Button (no indicator)
// ============================================================

function HorizontalButtonDefaultDemo() {
  return (
    <SectionFrame title="Horizontal Button — Default">
      <TabMenu variant="horizontal-button" size="lg">
        <TabMenuItem
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalButtonActiveDemo() {
  return (
    <SectionFrame title="Horizontal Button — Active">
      <TabMenu variant="horizontal-button" size="lg">
        <TabMenuItem
          selected
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" />
          <Badge variant="info" appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalButtonDisabledDemo() {
  return (
    <SectionFrame title="Horizontal Button — Disabled">
      <TabMenu variant="horizontal-button" size="lg">
        <TabMenuItem
          disabled
          leading={<RiSettings6Line />}
          trailing={<RiArrowRightLine />}
          label="Menu Item"
        >
          <StatusBadge variant="primary" size="md" className="opacity-20" />
          <Badge disabled appearance="outline" size="sm">
            New
          </Badge>
        </TabMenuItem>
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// Groups
// ============================================================

const GROUP_ITEMS = Array.from({ length: 7 }, (_, i) => `menu-${i + 1}`)

function HorizontalButtonGroupDemo() {
  return (
    <SectionFrame title="Group — Horizontal Button">
      <TabMenu variant="horizontal-button" size="lg" defaultValue="menu-2">
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            trailing={<RiArrowRightLine />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalLineBottomGroupDemo() {
  return (
    <SectionFrame title="Group — Horizontal Line · Bottom Indicator">
      <TabMenu
        variant="horizontal-line"
        indicator="bottom"
        size="lg"
        defaultValue="menu-2"
      >
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            trailing={<RiArrowRightLine />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

function HorizontalLineTopGroupDemo() {
  return (
    <SectionFrame title="Group — Horizontal Line · Top Indicator">
      <TabMenu
        variant="horizontal-line"
        indicator="top"
        size="lg"
        defaultValue="menu-2"
      >
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            trailing={<RiArrowRightLine />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalLineBottomGroupDemo() {
  return (
    <SectionFrame title="Group — Vertical Line · Bottom Indicator">
      <TabMenu
        variant="vertical-line"
        indicator="bottom"
        size="lg"
        defaultValue="menu-2"
      >
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalLineTopGroupDemo() {
  return (
    <SectionFrame title="Group — Vertical Line · Top Indicator">
      <TabMenu
        variant="vertical-line"
        indicator="top"
        size="lg"
        defaultValue="menu-2"
      >
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalButtonLeftGroupDemo() {
  return (
    <SectionFrame title="Group — Vertical Button · Left Indicator">
      <TabMenu
        className="w-[324px]"
        variant="vertical-button"
        indicator="left"
        size="lg"
        defaultValue="menu-2"
      >
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            trailing={<RiArrowRightSLine />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

function VerticalButtonGroupDemo() {
  return (
    <SectionFrame title="Group — Vertical Button">
      <TabMenu
        className="w-[300px]"
        variant="vertical-button"
        size="lg"
        defaultValue="menu-2"
      >
        {GROUP_ITEMS.map((value) => (
          <TabMenuItem
            key={value}
            value={value}
            leading={<RiSettings6Line />}
            trailing={<RiArrowRightSLine />}
            label="Menu Item"
          />
        ))}
      </TabMenu>
    </SectionFrame>
  )
}

// ============================================================
// Links — render items as <a> via asChild
// ============================================================

const LINK_GROUP_ITEMS = [
  { value: "overview", label: "Overview", href: "#overview" },
  { value: "features", label: "Features", href: "#features" },
  { value: "pricing", label: "Pricing", href: "#pricing" },
  { value: "docs", label: "Docs", href: "#docs" },
]

function HorizontalLineBottomLinkGroupDemo() {
  return (
    <SectionFrame title="Group — Horizontal Line · Bottom Indicator (Links)">
      <TabMenu
        variant="horizontal-line"
        indicator="bottom"
        size="lg"
        defaultValue="overview"
      >
        {LINK_GROUP_ITEMS.map((item) => (
          <TabMenuItem
            key={item.value}
            asChild
            value={item.value}
            leading={<RiSettings6Line />}
            trailing={<RiArrowRightLine />}
          >
            <Link href={item.href}>{item.label}</Link>
          </TabMenuItem>
        ))}
      </TabMenu>
    </SectionFrame>
  )
}
