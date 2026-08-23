import * as React from "react"
import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowUpLine,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Separator } from "@/registry/pro/ui/separator"
import {
  Avatar,
  AvatarGroup,
  AvatarGroupAction,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

type SeparatorVariant = "solid" | "dashed"

const sectionTitle = (title: string, variant: SeparatorVariant) =>
  variant === "dashed" ? `${title} · Dashed` : title

// ---------------------------------------------------------------------------

const PlainSection = React.memo(function PlainSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("Plain", variant)}>
      <div className="w-[450px]">
        <Separator variant={variant} />
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const TextSection = React.memo(function TextSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("With text", variant)}>
      <div className="flex w-[450px] flex-col gap-6">
        <Separator variant={variant} align="center">
          OR
        </Separator>
        <Separator variant={variant} align="start">
          OR
        </Separator>
        <Separator variant={variant} align="end">
          OR
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const IconSection = React.memo(function IconSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("With icon", variant)}>
      <div className="flex w-[450px] flex-col gap-6">
        <Separator variant={variant} align="center">
          <RiAddLine />
        </Separator>
        <Separator variant={variant} align="start">
          <RiAddLine />
        </Separator>
        <Separator variant={variant} align="end">
          <RiAddLine />
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const ButtonSection = React.memo(function ButtonSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("With button", variant)}>
      <div className="flex w-[450px] flex-col gap-6">
        <Separator variant={variant} align="center">
          <Button variant="neutral-solid" appearance="soft" size="sm">
            Button
          </Button>
        </Separator>
        <Separator variant={variant} align="start">
          <Button variant="neutral-solid" appearance="soft" size="sm">
            Button
          </Button>
        </Separator>
        <Separator variant={variant} align="end">
          <Button variant="neutral-solid" appearance="soft" size="sm">
            Button
          </Button>
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const ButtonGroupSection = React.memo(function ButtonGroupSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("With button group", variant)}>
      <div className="flex w-[450px] flex-col gap-6">
        <Separator variant={variant} align="center">
          <ButtonGroup size="sm">
            <ButtonGroupItem iconOnly aria-label="Move down">
              <RiArrowDownLine />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Add">
              <RiAddLine />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Move up">
              <RiArrowUpLine />
            </ButtonGroupItem>
          </ButtonGroup>
        </Separator>
        <Separator variant={variant} align="start">
          <ButtonGroup size="sm">
            <ButtonGroupItem iconOnly aria-label="Move down">
              <RiArrowDownLine />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Add">
              <RiAddLine />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Move up">
              <RiArrowUpLine />
            </ButtonGroupItem>
          </ButtonGroup>
        </Separator>
        <Separator variant={variant} align="end">
          <ButtonGroup size="sm">
            <ButtonGroupItem iconOnly aria-label="Move down">
              <RiArrowDownLine />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Add">
              <RiAddLine />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Move up">
              <RiArrowUpLine />
            </ButtonGroupItem>
          </ButtonGroup>
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const BadgeSection = React.memo(function BadgeSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("With badge", variant)}>
      <div className="flex w-[450px] flex-col gap-6">
        <Separator variant={variant} align="center">
          <Badge variant="neutral" appearance="soft" size="md" shape="pill">
            NEW
          </Badge>
        </Separator>
        <Separator variant={variant} align="start">
          <Badge variant="neutral" appearance="soft" size="md" shape="pill">
            NEW
          </Badge>
        </Separator>
        <Separator variant={variant} align="end">
          <Badge variant="neutral" appearance="soft" size="md" shape="pill">
            NEW
          </Badge>
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const groupPeople = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
] as const

const AvatarGroupSection = React.memo(function AvatarGroupSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("With avatar group", variant)}>
      <div className="flex w-[450px] flex-col gap-6">
        <Separator variant={variant} align="center">
          <AvatarGroup size="sm">
            {groupPeople.map((person) => (
              <Avatar key={person.name}>
                <AvatarImage src={person.src} alt={person.name} />
              </Avatar>
            ))}
            <AvatarGroupAction>+7</AvatarGroupAction>
          </AvatarGroup>
        </Separator>
        <Separator variant={variant} align="start">
          <AvatarGroup size="sm">
            {groupPeople.map((person) => (
              <Avatar key={person.name}>
                <AvatarImage src={person.src} alt={person.name} />
              </Avatar>
            ))}
            <AvatarGroupAction>+7</AvatarGroupAction>
          </AvatarGroup>
        </Separator>
        <Separator variant={variant} align="end">
          <AvatarGroup size="sm">
            {groupPeople.map((person) => (
              <Avatar key={person.name}>
                <AvatarImage src={person.src} alt={person.name} />
              </Avatar>
            ))}
            <AvatarGroupAction>+7</AvatarGroupAction>
          </AvatarGroup>
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const PlainVerticalSection = React.memo(function PlainVerticalSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("Vertical · Plain", variant)}>
      <div className="h-40">
        <Separator variant={variant} direction="vertical" />
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const TextVerticalSection = React.memo(function TextVerticalSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("Vertical · With text", variant)}>
      <div className="flex h-40 gap-16">
        <Separator variant={variant} direction="vertical" align="center">
          OR
        </Separator>
        <Separator variant={variant} direction="vertical" align="start">
          OR
        </Separator>
        <Separator variant={variant} direction="vertical" align="end">
          OR
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

const IconVerticalSection = React.memo(function IconVerticalSection({
  variant = "solid",
}: {
  variant?: SeparatorVariant
}) {
  return (
    <SectionFrame title={sectionTitle("Vertical · With icon", variant)}>
      <div className="flex h-40 gap-16">
        <Separator variant={variant} direction="vertical" align="center">
          <RiAddLine />
        </Separator>
        <Separator variant={variant} direction="vertical" align="start">
          <RiAddLine />
        </Separator>
        <Separator variant={variant} direction="vertical" align="end">
          <RiAddLine />
        </Separator>
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------

export default function SeparatorExample() {
  return (
    <div className="flex flex-col gap-8">
      <PlainSection />
      <TextSection />
      <IconSection />
      <ButtonSection />
      <ButtonGroupSection />
      <BadgeSection />
      <AvatarGroupSection />

      <PlainSection variant="dashed" />
      <TextSection variant="dashed" />
      <IconSection variant="dashed" />
      <ButtonSection variant="dashed" />
      <ButtonGroupSection variant="dashed" />
      <BadgeSection variant="dashed" />
      <AvatarGroupSection variant="dashed" />

      <PlainVerticalSection />
      <TextVerticalSection />
      <IconVerticalSection />

      <PlainVerticalSection variant="dashed" />
      <TextVerticalSection variant="dashed" />
      <IconVerticalSection variant="dashed" />
    </div>
  )
}
