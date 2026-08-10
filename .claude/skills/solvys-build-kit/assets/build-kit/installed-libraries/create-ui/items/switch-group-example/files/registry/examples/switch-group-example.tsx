"use client"

import { RiArrowRightSLine, RiNotification3Fill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Badge } from "@/registry/ui/badge"
import { FieldContent, FieldFooter } from "@/registry/ui/field"
import {
  Label,
  LabelBadgeSlot,
  LabelDescription,
  LabelIcon,
  LabelMain,
} from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"
import { SwitchGroup } from "@/registry/ui/switch-group"
import { TextLink } from "@/registry/ui/text-link"

export default function SwitchGroupExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <ShowcaseDemo />
      <PlacementRightDemo />

      <SizeXsDemo />
      <SizeSmDemo />
      <SizeMdDemo />

      <ShapePillDemo />
      <ShapeRoundedDemo />

      <ThumbShortDemo />
      <ThumbLongDemo />

      <IOTriggerDemo />

      <PrimaryCheckedDemo />
      <PrimaryUncheckedDemo />

      <InfoDemo />
      <NeutralDemo />
      <SemanticDemo />

      <DisabledOnDemo />
      <DisabledOffDemo />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Showcase — 1:1 Figma "Notification Preferences" sample (node 3652:7691)
// ---------------------------------------------------------------------------

function ShowcaseDemo() {
  return (
    <SectionFrame title="Showcase · Notification Preferences">
      <SwitchGroup className="w-[370px]">
        <Switch id="sw-showcase" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-showcase">
              <LabelIcon>
                <RiNotification3Fill />
              </LabelIcon>
              Notification Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="neutral"
                  appearance="solid"
                  size="sm"
                  shape="pill"
                >
                  BETA
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Manage how and when you receive updates from Create UI.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>
            <TextLink
              href="https://createui.co"
              target="_blank"
              rel="noreferrer"
              size="md"
              trailing={<RiArrowRightSLine />}
            >
              Explore all content types
            </TextLink>
          </FieldFooter>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function PlacementRightDemo() {
  return (
    <SectionFrame title="Placement · Right">
      <SwitchGroup placement="right" className="w-[370px]">
        <Switch id="sw-placement-right" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-placement-right">
              <LabelIcon>
                <RiNotification3Fill />
              </LabelIcon>
              Notification Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="neutral"
                  appearance="solid"
                  size="sm"
                  shape="pill"
                >
                  BETA
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Manage how and when you receive updates from Create UI.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>
            <TextLink
              href="https://createui.co"
              target="_blank"
              rel="noreferrer"
              size="md"
              trailing={<RiArrowRightSLine />}
            >
              Explore all content types
            </TextLink>
          </FieldFooter>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Sizes — Figma nodes 3652:7777 (xs), 3652:7752 (sm), 3652:7691 (md)
// ---------------------------------------------------------------------------

function SizeXsDemo() {
  return (
    <SectionFrame title="Size · xs">
      <SwitchGroup size="xs" className="w-[250px]">
        <Switch id="sw-size-xs" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-size-xs">
              <LabelIcon>
                <RiNotification3Fill />
              </LabelIcon>
              Notification Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="neutral"
                  appearance="solid"
                  size="xs"
                  shape="pill"
                >
                  BETA
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Manage how and when you receive updates from Create UI.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>
            <TextLink
              href="https://createui.co"
              target="_blank"
              rel="noreferrer"
              size="xs"
              trailing={<RiArrowRightSLine />}
            >
              Explore all content types
            </TextLink>
          </FieldFooter>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function SizeSmDemo() {
  return (
    <SectionFrame title="Size · sm">
      <SwitchGroup size="sm" className="w-[300px]">
        <Switch id="sw-size-sm" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-size-sm">
              <LabelIcon>
                <RiNotification3Fill />
              </LabelIcon>
              Notification Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="neutral"
                  appearance="solid"
                  size="xs"
                  shape="pill"
                >
                  BETA
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Manage how and when you receive updates from Create UI.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>
            <TextLink
              href="https://createui.co"
              target="_blank"
              rel="noreferrer"
              size="sm"
              trailing={<RiArrowRightSLine />}
            >
              Explore all content types
            </TextLink>
          </FieldFooter>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function SizeMdDemo() {
  return (
    <SectionFrame title="Size · md">
      <SwitchGroup size="md" className="w-[370px]">
        <Switch id="sw-size-md" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-size-md">
              <LabelIcon>
                <RiNotification3Fill />
              </LabelIcon>
              Notification Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="neutral"
                  appearance="solid"
                  size="sm"
                  shape="pill"
                >
                  BETA
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Manage how and when you receive updates from Create UI.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>
            <TextLink
              href="https://createui.co"
              target="_blank"
              rel="noreferrer"
              size="md"
              trailing={<RiArrowRightSLine />}
            >
              Explore all content types
            </TextLink>
          </FieldFooter>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

function ShapePillDemo() {
  return (
    <SectionFrame title="Shape · Pill">
      <SwitchGroup shape="pill" className="w-[360px]">
        <Switch id="sw-shape-pill" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-shape-pill">Pill</Label>
            <LabelDescription>Fully rounded track and thumb.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function ShapeRoundedDemo() {
  return (
    <SectionFrame title="Shape · Rounded">
      <SwitchGroup shape="rounded" className="w-[360px]">
        <Switch id="sw-shape-rounded" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-shape-rounded">Rounded</Label>
            <LabelDescription>
              Soft square corners on track and thumb.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Thumb Types
// ---------------------------------------------------------------------------

function ThumbShortDemo() {
  return (
    <SectionFrame title="Thumb · Short">
      <SwitchGroup thumbType="short" className="w-[360px]">
        <Switch id="sw-thumb-short" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-thumb-short">Short thumb</Label>
            <LabelDescription>Standard square thumb.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function ThumbLongDemo() {
  return (
    <SectionFrame title="Thumb · Long">
      <SwitchGroup thumbType="long" className="w-[360px]">
        <Switch id="sw-thumb-long" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-thumb-long">Long thumb</Label>
            <LabelDescription>
              Wider thumb for a more tactile feel.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// I/O Trigger
// ---------------------------------------------------------------------------

function IOTriggerDemo() {
  return (
    <SectionFrame title="I/O Trigger">
      <SwitchGroup ioTrigger className="w-[360px]">
        <Switch id="sw-io-trigger" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-io-trigger">Power</Label>
            <LabelDescription>
              Renders an &quot;I&quot;/&quot;O&quot; indicator inside the track.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

function PrimaryCheckedDemo() {
  return (
    <SectionFrame title="Primary · Checked">
      <SwitchGroup variant="primary" className="w-[360px]">
        <Switch
          id="sw-primary-checked"
          checked
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-primary-checked">Push Notifications</Label>
            <LabelDescription>
              Get notified about important updates and activity on your account.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function PrimaryUncheckedDemo() {
  return (
    <SectionFrame title="Primary · Unchecked">
      <SwitchGroup variant="primary" className="w-[360px]">
        <Switch
          id="sw-primary-unchecked"
          checked={false}
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-primary-unchecked">Push Notifications</Label>
            <LabelDescription>
              Get notified about important updates and activity on your account.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function InfoDemo() {
  return (
    <SectionFrame title="Info">
      <SwitchGroup variant="info" className="w-[360px]">
        <Switch id="sw-info" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-info">Beta features</Label>
            <LabelDescription>
              Try features we&apos;re still polishing.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function NeutralDemo() {
  return (
    <SectionFrame title="Neutral">
      <SwitchGroup variant="neutral" className="w-[360px]">
        <Switch id="sw-neutral" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-neutral">Analytics</Label>
            <LabelDescription>
              Share anonymous usage data to help us improve.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function SemanticDemo() {
  return (
    <SectionFrame title="Semantic">
      <SwitchGroup variant="semantic" className="w-[360px]">
        <Switch id="sw-semantic" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-semantic">Live status</Label>
            <LabelDescription>
              Green when on, red when off — for production-critical toggles.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Disabled — 1:1 Figma "Notification Preferences · Disabled" (node 3652:7973)
// ---------------------------------------------------------------------------

function DisabledOnDemo() {
  return (
    <SectionFrame title="Disabled · On">
      <SwitchGroup disabled className="w-[370px]">
        <Switch id="sw-disabled-on" checked disabled />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-disabled-on">
              <LabelIcon>
                <RiNotification3Fill />
              </LabelIcon>
              Notification Preferences
              <LabelBadgeSlot>
                <Badge disabled appearance="solid" size="md" shape="pill">
                  BETA
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Manage how and when you receive updates from Create UI.
            </LabelDescription>
          </LabelMain>
          <FieldFooter>
            <TextLink
              href="https://createui.co"
              target="_blank"
              rel="noreferrer"
              size="md"
              disabled
              trailing={<RiArrowRightSLine />}
            >
              Explore all content types
            </TextLink>
          </FieldFooter>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}

function DisabledOffDemo() {
  return (
    <SectionFrame title="Disabled · Off">
      <SwitchGroup disabled className="w-[360px]">
        <Switch id="sw-disabled-off" checked={false} disabled />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="sw-disabled-off">Push Notifications</Label>
            <LabelDescription>
              Disabled state cascades to label and description.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </SwitchGroup>
    </SectionFrame>
  )
}
