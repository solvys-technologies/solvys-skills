"use client"

import * as React from "react"
import { RiArrowDownSLine, RiFolder5Line } from "@create-ui/assets/icons"
import { type VariantProps } from "class-variance-authority"

import { SectionFrame } from "@/registry/components/example"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbSeparator,
  type breadcrumbItemVariants,
  type breadcrumbSeparatorVariants,
} from "@/registry/pro/ui/breadcrumb"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Dropdown } from "@/registry/ui/dropdown-menu"

const hiddenSegments = ["Projects", "Settings", "Members"] as const

function HiddenSegmentsMenu() {
  return (
    <>
      {hiddenSegments.map((label) => (
        <Dropdown.Item key={label} id={label} textValue={label} href="#">
          <Dropdown.ItemContainer>
            <Dropdown.ItemLabel>{label}</Dropdown.ItemLabel>
          </Dropdown.ItemContainer>
        </Dropdown.Item>
      ))}
    </>
  )
}

type BreadcrumbVariant = NonNullable<
  VariantProps<typeof breadcrumbItemVariants>["variant"]
>
type BreadcrumbAppearance = NonNullable<
  VariantProps<typeof breadcrumbItemVariants>["appearance"]
>
type BreadcrumbSize = NonNullable<
  VariantProps<typeof breadcrumbItemVariants>["size"]
>
type BreadcrumbSeparatorVariant = NonNullable<
  VariantProps<typeof breadcrumbSeparatorVariants>["variant"]
>

const variants = [
  "primary",
  "neutral",
] as const satisfies readonly BreadcrumbVariant[]
const appearances = [
  "ghost",
  "outline",
  "solid",
] as const satisfies readonly BreadcrumbAppearance[]
const sizes = ["md", "sm", "xs"] as const satisfies readonly BreadcrumbSize[]

const HEADING_VARIANT =
  "text-strongest text-[11px] font-semibold tracking-wider uppercase"
const HEADING_APPEARANCE =
  "text-body text-[10px] font-semibold tracking-wider uppercase"
const HEADING_MICRO = "text-disabled text-[9px] font-medium uppercase"

function VariantsSection() {
  return (
    <SectionFrame title="Variants">
      <div className="space-y-10">
        {variants.map((v) => (
          <div key={v} className="space-y-6">
            <p className={HEADING_VARIANT}>{v}</p>
            {appearances.map((a) => (
              <div key={a} className="space-y-2">
                <p className={HEADING_APPEARANCE}>{a}</p>
                <div className="flex flex-wrap items-end gap-6">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span className={HEADING_MICRO}>{size}</span>
                      <BreadcrumbItem
                        variant={v}
                        appearance={a}
                        size={size}
                        href="#"
                        leading={<RiFolder5Line />}
                        trailing={<RiArrowDownSLine />}
                      >
                        Label
                      </BreadcrumbItem>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

function OverflowSection() {
  return (
    <SectionFrame title="Overflow">
      <div className="space-y-10">
        {variants.map((v) => (
          <div key={v} className="space-y-6">
            <p className={HEADING_VARIANT}>{v}</p>
            {appearances.map((a) => (
              <div key={a} className="space-y-2">
                <p className={HEADING_APPEARANCE}>{a}</p>
                <div className="flex flex-wrap items-end gap-6">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span className={HEADING_MICRO}>{size}</span>
                      <BreadcrumbEllipsis
                        variant={v}
                        appearance={a}
                        size={size}
                      >
                        <HiddenSegmentsMenu />
                      </BreadcrumbEllipsis>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

type GroupConfig = {
  variant: BreadcrumbVariant
  appearance: BreadcrumbAppearance
  separator: BreadcrumbSeparatorVariant
}

const groupConfigs = [
  { variant: "neutral", appearance: "ghost", separator: "slash" },
  { variant: "neutral", appearance: "outline", separator: "dot" },
  { variant: "neutral", appearance: "solid", separator: "chevron" },
] as const satisfies readonly GroupConfig[]

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

const configLabel = (c: GroupConfig) =>
  `${cap(c.variant)} × ${cap(c.appearance)} × ${cap(c.separator)}`

function GroupExample({
  variant,
  appearance,
  separator,
  size,
}: GroupConfig & { size: BreadcrumbSize }) {
  return (
    <Breadcrumb
      variant={variant}
      appearance={appearance}
      size={size}
      separator={separator}
    >
      <BreadcrumbItem href="#">Label</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Label</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbEllipsis>
        <HiddenSegmentsMenu />
      </BreadcrumbEllipsis>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" disabled>
        Label
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Label</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Label</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" current>
        Label
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

function GroupsSection() {
  return (
    <SectionFrame title="Group">
      <div className="space-y-10">
        {groupConfigs.map((cfg) => (
          <div key={configLabel(cfg)} className="space-y-6">
            <p className={HEADING_VARIANT}>{configLabel(cfg)}</p>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <p className={HEADING_APPEARANCE}>{size}</p>
                <GroupExample {...cfg} size={size} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

const avatarSizeForBreadcrumb: Record<BreadcrumbSize, "2xs" | "xs"> = {
  xs: "2xs",
  sm: "2xs",
  md: "xs",
}

const badgeSizeForBreadcrumb: Record<BreadcrumbSize, "xs" | "sm" | "md"> = {
  xs: "xs",
  sm: "sm",
  md: "md",
}

const composedConfigs = [
  { variant: "neutral", appearance: "ghost", separator: "slash" },
  { variant: "neutral", appearance: "outline", separator: "dot" },
  { variant: "neutral", appearance: "solid", separator: "chevron" },
  { variant: "primary", appearance: "ghost", separator: "slash" },
  { variant: "primary", appearance: "outline", separator: "dot" },
  { variant: "primary", appearance: "solid", separator: "chevron" },
] as const satisfies readonly GroupConfig[]

function ComposedGroupExample({
  variant,
  appearance,
  separator,
  size,
}: GroupConfig & { size: BreadcrumbSize }) {
  return (
    <Breadcrumb
      variant={variant}
      appearance={appearance}
      size={size}
      separator={separator}
    >
      <BreadcrumbItem href="#" leading={<RiFolder5Line />}>
        Workspace
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbEllipsis>
        <HiddenSegmentsMenu />
      </BreadcrumbEllipsis>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" trailing={<RiArrowDownSLine />}>
        <Avatar size={avatarSizeForBreadcrumb[size]}>
          <AvatarImage
            src="https://createui.co/images/breadcrumb-label-prefix-image-1.png"
            alt="Design Team"
          />
        </Avatar>
        Design Team
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">
        <Badge
          variant="info"
          appearance="soft"
          size={badgeSizeForBreadcrumb[size]}
        >
          1.2.2
        </Badge>
        Mobile App
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Components</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#" current>
        Breadcrumb
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

function ComposedGroupSection() {
  return (
    <SectionFrame title="Composed Group with Mixed Prefixes">
      <div className="space-y-10">
        {composedConfigs.map((cfg) => (
          <div key={configLabel(cfg)} className="space-y-3">
            <p className={HEADING_VARIANT}>{configLabel(cfg)}</p>
            <ComposedGroupExample {...cfg} size="md" />
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

export default function BreadcrumbExample() {
  return (
    <div className="flex flex-col gap-16">
      <VariantsSection />
      <OverflowSection />
      <GroupsSection />
      <ComposedGroupSection />
    </div>
  )
}
