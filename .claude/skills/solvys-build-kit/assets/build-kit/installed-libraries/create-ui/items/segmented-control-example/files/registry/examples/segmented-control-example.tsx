import {
  RiArrowRightSLine,
  RiInbox2Line,
  RiSettings6Fill,
  RiUser3Line,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Badge } from "@/registry/ui/badge"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"

export default function SegmentedControlExample() {
  return (
    <div className="flex flex-col gap-16">
      <SimpleDemo />
      <WithLeadingIconDemo />
      <WithTrailingIconDemo />
      <WithBothIconsDemo />
      <FullCompositionDemo />
      <PrimaryStateVariationsDemo />
      <NeutralStateVariationsDemo />
      <ShapesDemo />
      <SizesDemo />
      <GroupedDemo />
      <GroupedIconOnlyDemo />
      <GroupedSizesDemo />
      <NeutralGroupedDemo />
      <NeutralGroupedIconOnlyDemo />
      <PrimaryPillGroupedDemo />
      <PrimaryPillGroupedIconOnlyDemo />
      <NeutralPillGroupedDemo />
      <NeutralPillGroupedIconOnlyDemo />
    </div>
  )
}

function SimpleDemo() {
  return (
    <SectionFrame title="Simple">
      <SegmentedControl>
        <SegmentedControlItem size="xl">Settings</SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function WithLeadingIconDemo() {
  return (
    <SectionFrame title="With leading icon">
      <SegmentedControl>
        <SegmentedControlItem size="xl" leading={<RiInbox2Line />}>
          Inbox
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function WithTrailingIconDemo() {
  return (
    <SectionFrame title="With trailing icon">
      <SegmentedControl>
        <SegmentedControlItem size="xl" trailing={<RiArrowRightSLine />}>
          Continue
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function WithBothIconsDemo() {
  return (
    <SectionFrame title="With both icons + text + count badge">
      <SegmentedControl>
        <SegmentedControlItem
          size="xl"
          leading={<RiUser3Line />}
          trailing={<RiArrowRightSLine />}
        >
          Profile
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            3
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function FullCompositionDemo() {
  return (
    <SectionFrame title="Full composition (XL · Default)">
      <SegmentedControl>
        <SegmentedControlItem
          size="xl"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function PrimaryStateVariationsDemo() {
  return (
    <SectionFrame title="Primary — Default · Selected · Disabled (XL)">
      <SegmentedControl className="gap-4">
        <SegmentedControlItem
          size="xl"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="xl"
          selected
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="white" size="md" />
          <Badge
            variant="inverse-static"
            appearance="outline"
            size="md"
            numberOnly
          >
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="xl"
          disabled
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" className="opacity-20" />
          <Badge disabled appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function NeutralStateVariationsDemo() {
  return (
    <SectionFrame title="Neutral — Default · Selected · Disabled (XL)">
      <SegmentedControl className="gap-4">
        <SegmentedControlItem
          variant="neutral"
          size="xl"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          variant="neutral"
          size="xl"
          selected
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          variant="neutral"
          size="xl"
          disabled
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" className="opacity-20" />
          <Badge disabled appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function ShapesDemo() {
  return (
    <SectionFrame title="Shapes — Rounded · Pill (XL Default)">
      <SegmentedControl className="gap-4">
        <SegmentedControlItem
          size="xl"
          shape="rounded"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="xl"
          shape="pill"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function SizesDemo() {
  return (
    <SectionFrame title="Sizes — XL · LG · MD · SM · XS (Default)">
      <SegmentedControl className="gap-4">
        <SegmentedControlItem
          size="xl"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="md" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="lg"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="info" size="md" />
          <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="md"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="primary" size="sm" />
          <Badge variant="neutral" appearance="soft" size="sm" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="sm"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="primary" size="sm" />
          <Badge variant="neutral" appearance="soft" size="xs" numberOnly>
            7
          </Badge>
        </SegmentedControlItem>

        <SegmentedControlItem
          size="xs"
          leading={<RiSettings6Fill />}
          trailing={<RiArrowRightSLine />}
        >
          Button
          <StatusBadge variant="primary" size="xs" />
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function GroupedDemo() {
  return (
    <SectionFrame title="Grouped — Primary · Rounded · XL">
      <SegmentedControl size="xl" appearance="grouped" defaultValue="opt-1">
        <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-4">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-5">Button</SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function GroupedIconOnlyDemo() {
  return (
    <SectionFrame title="Grouped · Icon Only — Primary · Rounded · XL">
      <SegmentedControl size="xl" appearance="grouped" defaultValue="opt-1">
        <SegmentedControlItem value="opt-1" iconOnly aria-label="Option 1">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-2" iconOnly aria-label="Option 2">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-3" iconOnly aria-label="Option 3">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-4" iconOnly aria-label="Option 4">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-5" iconOnly aria-label="Option 5">
          <RiSettings6Fill />
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function GroupedSizesDemo() {
  return (
    <SectionFrame title="Grouped — Sizes (XL · LG · MD · SM · XS)">
      <div className="flex flex-col items-start gap-4">
        <SegmentedControl size="xl" appearance="grouped" defaultValue="opt-1">
          <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        </SegmentedControl>

        <SegmentedControl size="lg" appearance="grouped" defaultValue="opt-1">
          <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        </SegmentedControl>

        <SegmentedControl size="md" appearance="grouped" defaultValue="opt-1">
          <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        </SegmentedControl>

        <SegmentedControl size="sm" appearance="grouped" defaultValue="opt-1">
          <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        </SegmentedControl>

        <SegmentedControl size="xs" appearance="grouped" defaultValue="opt-1">
          <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
          <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        </SegmentedControl>
      </div>
    </SectionFrame>
  )
}

function NeutralGroupedDemo() {
  return (
    <SectionFrame title="Grouped — Neutral · Rounded · XL">
      <SegmentedControl
        variant="neutral"
        size="xl"
        appearance="grouped"
        defaultValue="opt-1"
      >
        <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-4">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-5">Button</SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function NeutralGroupedIconOnlyDemo() {
  return (
    <SectionFrame title="Grouped · Icon Only — Neutral · Rounded · XL">
      <SegmentedControl
        variant="neutral"
        size="xl"
        appearance="grouped"
        defaultValue="opt-1"
      >
        <SegmentedControlItem value="opt-1" iconOnly aria-label="Option 1">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-2" iconOnly aria-label="Option 2">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-3" iconOnly aria-label="Option 3">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-4" iconOnly aria-label="Option 4">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-5" iconOnly aria-label="Option 5">
          <RiSettings6Fill />
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function PrimaryPillGroupedDemo() {
  return (
    <SectionFrame title="Grouped — Primary · Pill · XL">
      <SegmentedControl
        size="xl"
        shape="pill"
        appearance="grouped"
        defaultValue="opt-1"
      >
        <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-4">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-5">Button</SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function PrimaryPillGroupedIconOnlyDemo() {
  return (
    <SectionFrame title="Grouped · Icon Only — Primary · Pill · XL">
      <SegmentedControl
        size="xl"
        shape="pill"
        appearance="grouped"
        defaultValue="opt-1"
      >
        <SegmentedControlItem value="opt-1" iconOnly aria-label="Option 1">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-2" iconOnly aria-label="Option 2">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-3" iconOnly aria-label="Option 3">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-4" iconOnly aria-label="Option 4">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-5" iconOnly aria-label="Option 5">
          <RiSettings6Fill />
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function NeutralPillGroupedDemo() {
  return (
    <SectionFrame title="Grouped — Neutral · Pill · XL">
      <SegmentedControl
        variant="neutral"
        size="xl"
        shape="pill"
        appearance="grouped"
        defaultValue="opt-1"
      >
        <SegmentedControlItem value="opt-1">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-2">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-3">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-4">Button</SegmentedControlItem>
        <SegmentedControlItem value="opt-5">Button</SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}

function NeutralPillGroupedIconOnlyDemo() {
  return (
    <SectionFrame title="Grouped · Icon Only — Neutral · Pill · XL">
      <SegmentedControl
        variant="neutral"
        size="xl"
        shape="pill"
        appearance="grouped"
        defaultValue="opt-1"
      >
        <SegmentedControlItem value="opt-1" iconOnly aria-label="Option 1">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-2" iconOnly aria-label="Option 2">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-3" iconOnly aria-label="Option 3">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-4" iconOnly aria-label="Option 4">
          <RiSettings6Fill />
        </SegmentedControlItem>
        <SegmentedControlItem value="opt-5" iconOnly aria-label="Option 5">
          <RiSettings6Fill />
        </SegmentedControlItem>
      </SegmentedControl>
    </SectionFrame>
  )
}
