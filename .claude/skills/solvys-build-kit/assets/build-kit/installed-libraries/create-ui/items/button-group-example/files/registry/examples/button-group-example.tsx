"use client"

import Link from "next/link"
import { RiArrowRightSLine, RiSettings6Fill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { ButtonGroup, ButtonGroupItem } from "@/registry/pro/ui/button-group"
import { Badge } from "@/registry/ui/badge"

type ItemSize = "xs" | "sm" | "md" | "lg" | "xl"
type ItemVariant = "primary" | "neutral" | "soft"
type StateKey = "default" | "active" | "loading" | "disabled"

export default function ButtonGroupExample() {
  return (
    <div className="flex flex-col gap-16">
      <SoftRoundedDemo />
      <SoftPillDemo />
      <SoftSquareDemo />
      <SoftVerticalRoundedDemo />
      <SoftVerticalPillDemo />
      <SoftVerticalSquareDemo />
      <XlVariantsStatesDemo />
      <LgVariantsStatesDemo />
      <MdVariantsStatesDemo />
      <SmVariantsStatesDemo />
      <XsVariantsStatesDemo />
      <AsChildDemo />
    </div>
  )
}

function SoftRoundedDemo() {
  return (
    <SectionFrame title="Soft — Horizontal × Rounded">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            xl
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="xl">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="rounded" size="xl">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            lg
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="lg">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="rounded" size="lg">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            md
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="md">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="rounded" size="md">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            sm
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="sm">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="rounded" size="sm">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            xs
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="xs">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="rounded" size="xs">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
    </SectionFrame>
  )
}

function SoftPillDemo() {
  return (
    <SectionFrame title="Soft — Horizontal × Pill">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            xl
          </div>
          <ButtonGroup variant="soft" shape="pill" size="xl">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="pill" size="xl">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            lg
          </div>
          <ButtonGroup variant="soft" shape="pill" size="lg">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="pill" size="lg">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            md
          </div>
          <ButtonGroup variant="soft" shape="pill" size="md">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="pill" size="md">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            sm
          </div>
          <ButtonGroup variant="soft" shape="pill" size="sm">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="pill" size="sm">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            xs
          </div>
          <ButtonGroup variant="soft" shape="pill" size="xs">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="pill" size="xs">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
    </SectionFrame>
  )
}

function SoftSquareDemo() {
  return (
    <SectionFrame title="Soft — Horizontal × Square">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            xl
          </div>
          <ButtonGroup variant="soft" shape="square" size="xl">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="square" size="xl">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            lg
          </div>
          <ButtonGroup variant="soft" shape="square" size="lg">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="square" size="lg">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            md
          </div>
          <ButtonGroup variant="soft" shape="square" size="md">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="square" size="md">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            sm
          </div>
          <ButtonGroup variant="soft" shape="square" size="sm">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="square" size="sm">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            xs
          </div>
          <ButtonGroup variant="soft" shape="square" size="xs">
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupItem>Button</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup variant="soft" shape="square" size="xs">
            <ButtonGroupItem iconOnly aria-label="Option 1">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 2">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 3">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 4">
              <RiSettings6Fill />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Option 5">
              <RiSettings6Fill />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
    </SectionFrame>
  )
}

const verticalSizes: ItemSize[] = ["xl", "lg", "md", "sm", "xs"]

function SoftVerticalDemo({
  shape,
  title,
}: {
  shape: "rounded" | "pill" | "square"
  title: string
}) {
  return (
    <SectionFrame title={title}>
      <div className="flex flex-row flex-wrap items-start gap-8">
        {verticalSizes.map((size) => (
          <div key={size} className="flex flex-col gap-3">
            <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
              {size}
            </div>
            <div className="flex flex-row items-start gap-4">
              <ButtonGroup
                variant="soft"
                orientation="vertical"
                shape={shape}
                size={size}
              >
                <ButtonGroupItem leading={<RiSettings6Fill />}>
                  Button
                </ButtonGroupItem>
                <ButtonGroupItem leading={<RiSettings6Fill />} active>
                  Button
                </ButtonGroupItem>
                <ButtonGroupItem leading={<RiSettings6Fill />}>
                  Button
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup
                variant="soft"
                orientation="vertical"
                shape={shape}
                size={size}
              >
                <ButtonGroupItem iconOnly aria-label="Option 1">
                  <RiSettings6Fill />
                </ButtonGroupItem>
                <ButtonGroupItem iconOnly aria-label="Option 2">
                  <RiSettings6Fill />
                </ButtonGroupItem>
                <ButtonGroupItem iconOnly aria-label="Option 3">
                  <RiSettings6Fill />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

function SoftVerticalRoundedDemo() {
  return <SoftVerticalDemo shape="rounded" title="Soft — Vertical × Rounded" />
}

function SoftVerticalPillDemo() {
  return <SoftVerticalDemo shape="pill" title="Soft — Vertical × Pill" />
}

function SoftVerticalSquareDemo() {
  return <SoftVerticalDemo shape="square" title="Soft — Vertical × Square" />
}

function XlVariantsStatesDemo() {
  return (
    <SectionFrame title="XL — Variants × States">
      <div className="flex flex-row flex-wrap items-start gap-x-12 gap-y-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Primary
          </div>
          <StateMatrix size="xl" variant="primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Neutral
          </div>
          <StateMatrix size="xl" variant="neutral" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Soft
          </div>
          <StateMatrix size="xl" variant="soft" />
        </div>
      </div>
    </SectionFrame>
  )
}

function LgVariantsStatesDemo() {
  return (
    <SectionFrame title="LG — Variants × States">
      <div className="flex flex-row flex-wrap items-start gap-x-12 gap-y-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Primary
          </div>
          <StateMatrix size="lg" variant="primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Neutral
          </div>
          <StateMatrix size="lg" variant="neutral" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Soft
          </div>
          <StateMatrix size="lg" variant="soft" />
        </div>
      </div>
    </SectionFrame>
  )
}

function MdVariantsStatesDemo() {
  return (
    <SectionFrame title="MD — Variants × States">
      <div className="flex flex-row flex-wrap items-start gap-x-12 gap-y-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Primary
          </div>
          <StateMatrix size="md" variant="primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Neutral
          </div>
          <StateMatrix size="md" variant="neutral" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Soft
          </div>
          <StateMatrix size="md" variant="soft" />
        </div>
      </div>
    </SectionFrame>
  )
}

function SmVariantsStatesDemo() {
  return (
    <SectionFrame title="SM — Variants × States">
      <div className="flex flex-row flex-wrap items-start gap-x-12 gap-y-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Primary
          </div>
          <StateMatrix size="sm" variant="primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Neutral
          </div>
          <StateMatrix size="sm" variant="neutral" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Soft
          </div>
          <StateMatrix size="sm" variant="soft" />
        </div>
      </div>
    </SectionFrame>
  )
}

function XsVariantsStatesDemo() {
  return (
    <SectionFrame title="XS — Variants × States">
      <div className="flex flex-row flex-wrap items-start gap-x-12 gap-y-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Primary
          </div>
          <StateMatrix size="xs" variant="primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Neutral
          </div>
          <StateMatrix size="xs" variant="neutral" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Soft
          </div>
          <StateMatrix size="xs" variant="soft" />
        </div>
      </div>
    </SectionFrame>
  )
}

function AsChildDemo() {
  return (
    <SectionFrame title="asChild — slot anchor / Link">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Anchor items
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="md">
            <ButtonGroupItem asChild>
              <Link href="#overview">Overviews</Link>
            </ButtonGroupItem>
            <ButtonGroupItem asChild active>
              <a href="#docs">Docs</a>
            </ButtonGroupItem>
            <ButtonGroupItem asChild>
              <a href="#api">API</a>
            </ButtonGroupItem>
            <ButtonGroupItem asChild>
              <a href="#changelog">Changelog</a>
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Anchor items with icons
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="md">
            <ButtonGroupItem asChild leading={<RiSettings6Fill />}>
              <a href="#settings">Settings</a>
            </ButtonGroupItem>
            <ButtonGroupItem
              asChild
              leading={<RiSettings6Fill />}
              trailing={<RiArrowRightSLine />}
            >
              <a href="#profile">Profile</a>
            </ButtonGroupItem>
            <ButtonGroupItem asChild iconOnly>
              <a href="#options" aria-label="Options">
                <RiSettings6Fill />
              </a>
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Mixed (button + anchor)
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="md">
            <ButtonGroupItem leading={<RiSettings6Fill />}>
              Action
            </ButtonGroupItem>
            <ButtonGroupItem asChild>
              <a href="#detail">Detail</a>
            </ButtonGroupItem>
            <ButtonGroupItem asChild iconOnly>
              <a href="#next" aria-label="Next">
                <RiArrowRightSLine />
              </a>
            </ButtonGroupItem>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Disabled (aria-disabled on anchor)
          </div>
          <ButtonGroup variant="soft" shape="rounded" size="md">
            <ButtonGroupItem asChild>
              <a href="#one">Enabled</a>
            </ButtonGroupItem>
            <ButtonGroupItem asChild disabled>
              <a href="#two">Disabled</a>
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
    </SectionFrame>
  )
}

const states = [
  { key: "default", label: "Default", props: {} },
  { key: "active", label: "Active", props: { active: true } },
  { key: "loading", label: "Loading", props: { loading: true } },
  { key: "disabled", label: "Disabled", props: { disabled: true } },
] as const

const itemTypes = [
  { key: "with-content", label: "Icon + Text + Badge" },
  { key: "icon-only", label: "Icon only" },
] as const

const itemSizeToBadgeSize: Record<ItemSize, "xs" | "sm" | "md"> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
}

function getBadgeProps(
  state: StateKey,
  variant: ItemVariant,
  size: ItemSize
): {
  variant: "neutral" | "inverse-static" | "inverse"
  appearance: "soft" | "outline"
  size: "xs" | "sm" | "md"
  disabled?: boolean
} {
  const badgeSize = itemSizeToBadgeSize[size]
  if (state === "active" && variant !== "soft") {
    return {
      variant: variant === "primary" ? "inverse-static" : "inverse",
      appearance: "outline",
      size: badgeSize,
    }
  }
  if (state === "loading" || state === "disabled") {
    return {
      variant: "neutral",
      appearance: "soft",
      size: badgeSize,
      disabled: true,
    }
  }
  return { variant: "neutral", appearance: "soft", size: badgeSize }
}

function StateMatrix({
  size,
  variant,
}: {
  size: ItemSize
  variant: ItemVariant
}) {
  return (
    <table className="border-separate border-spacing-x-6 border-spacing-y-0">
      <thead>
        <tr>
          <th />
          {itemTypes.map((t) => (
            <th
              key={t.key}
              className="text-body px-4 pt-4 pb-3 text-center text-[10px] font-semibold tracking-wider uppercase"
            >
              {t.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {states.map((s, si) => {
          const badgeProps = getBadgeProps(s.key, variant, size)
          return (
            <tr key={s.key}>
              <td
                className={cn(
                  "text-strongest pr-6 text-right align-middle text-[11px] font-semibold uppercase",
                  si > 0 && "pt-6"
                )}
              >
                {s.label}
              </td>
              {itemTypes.map((t) => (
                <td
                  key={t.key}
                  className={cn("px-4 py-1.5 text-center", si > 0 && "pt-6")}
                >
                  <div className="flex items-center justify-center gap-4">
                    {t.key === "icon-only" ? (
                      <ButtonGroupItem
                        variant={variant}
                        size={size}
                        iconOnly
                        aria-label="Settings"
                        {...(s.props as object)}
                      >
                        <RiSettings6Fill />
                      </ButtonGroupItem>
                    ) : (
                      <ButtonGroupItem
                        variant={variant}
                        size={size}
                        leading={<RiSettings6Fill />}
                        trailing={<RiArrowRightSLine />}
                        {...(s.props as object)}
                      >
                        Button
                        <Badge {...badgeProps} numberOnly>
                          7
                        </Badge>
                      </ButtonGroupItem>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
