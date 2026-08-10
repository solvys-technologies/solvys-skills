"use client"

import { RiArrowRightSLine, RiListCheck3 } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { FieldContent, FieldFooter } from "@/registry/ui/field"
import {
  Label,
  LabelBadgeSlot,
  LabelDescription,
  LabelIcon,
  LabelMain,
} from "@/registry/ui/label"
import { TextLink } from "@/registry/ui/text-link"

export default function CheckboxGroupExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <ShowcaseDemo />
      <PlacementRightDemo />

      <SizeXsDemo />
      <SizeSmDemo />
      <SizeMdDemo />

      <ShapeRoundedDemo />
      <ShapePillDemo />
      <ShapeSquareDemo />

      <PrimaryUncheckedDemo />
      <PrimaryCheckedDemo />
      <PrimaryIndeterminateDemo />

      <ErrorUncheckedDemo />
      <ErrorCheckedDemo />
      <ErrorIndeterminateDemo />

      <DisabledPrimaryDemo />
      <DisabledErrorDemo />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Showcase — 1:1 Figma "Content Preferences" sample (node 3654:22576)
// ---------------------------------------------------------------------------

function ShowcaseDemo() {
  return (
    <SectionFrame title="Showcase · Content Preferences">
      <CheckboxGroup className="w-[370px]">
        <Checkbox id="cb-showcase" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-showcase">
              <LabelIcon>
                <RiListCheck3 />
              </LabelIcon>
              Content Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="info"
                  appearance="outline"
                  size="md"
                  shape="pill"
                >
                  UPDATED
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
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
      </CheckboxGroup>
    </SectionFrame>
  )
}

function PlacementRightDemo() {
  return (
    <SectionFrame title="Placement · Right">
      <CheckboxGroup placement="right" className="w-[370px]">
        <Checkbox id="cb-placement-right" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-placement-right">
              <LabelIcon>
                <RiListCheck3 />
              </LabelIcon>
              Content Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="info"
                  appearance="outline"
                  size="sm"
                  shape="pill"
                >
                  UPDATED
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
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
      </CheckboxGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Sizes — Label, LabelIcon, LabelDescription size'ları Field context'ten okur
// ---------------------------------------------------------------------------

function SizeXsDemo() {
  return (
    <SectionFrame title="Size · xs">
      <CheckboxGroup size="xs" className="w-[340px]">
        <Checkbox id="cb-size-xs" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-size-xs">
              <LabelIcon>
                <RiListCheck3 />
              </LabelIcon>
              Content Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="info"
                  appearance="outline"
                  size="xs"
                  shape="pill"
                >
                  UPDATED
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
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
      </CheckboxGroup>
    </SectionFrame>
  )
}

function SizeSmDemo() {
  return (
    <SectionFrame title="Size · sm">
      <CheckboxGroup size="sm" className="w-[340px]">
        <Checkbox id="cb-size-sm" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-size-sm">
              <LabelIcon>
                <RiListCheck3 />
              </LabelIcon>
              Content Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="info"
                  appearance="outline"
                  size="xs"
                  shape="pill"
                >
                  UPDATED
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
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
      </CheckboxGroup>
    </SectionFrame>
  )
}

function SizeMdDemo() {
  return (
    <SectionFrame title="Size · md">
      <CheckboxGroup size="md" className="w-[340px]">
        <Checkbox id="cb-size-md" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-size-md">
              <LabelIcon>
                <RiListCheck3 />
              </LabelIcon>
              Content Preferences
              <LabelBadgeSlot>
                <Badge
                  variant="info"
                  appearance="outline"
                  size="sm"
                  shape="pill"
                >
                  UPDATED
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
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
      </CheckboxGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

function ShapeRoundedDemo() {
  return (
    <SectionFrame title="Shape · Rounded">
      <CheckboxGroup shape="rounded" className="w-[340px]">
        <Checkbox id="cb-shape-rounded" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-shape-rounded">Rounded</Label>
            <LabelDescription>
              Default square corners with a soft radius.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function ShapePillDemo() {
  return (
    <SectionFrame title="Shape · Pill">
      <CheckboxGroup shape="pill" className="w-[340px]">
        <Checkbox id="cb-shape-pill" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-shape-pill">Pill</Label>
            <LabelDescription>Fully circular checkbox.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function ShapeSquareDemo() {
  return (
    <SectionFrame title="Shape · Square">
      <CheckboxGroup shape="square" className="w-[340px]">
        <Checkbox id="cb-shape-square" defaultChecked />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-shape-square">Square</Label>
            <LabelDescription>Hard 0px corners.</LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Variant · Primary
// ---------------------------------------------------------------------------

function PrimaryUncheckedDemo() {
  return (
    <SectionFrame title="Primary · Unchecked">
      <CheckboxGroup variant="primary" className="w-[340px]">
        <Checkbox
          id="cb-primary-unchecked"
          checked={false}
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-primary-unchecked">Content Preferences</Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function PrimaryCheckedDemo() {
  return (
    <SectionFrame title="Primary · Checked">
      <CheckboxGroup variant="primary" className="w-[340px]">
        <Checkbox
          id="cb-primary-checked"
          checked
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-primary-checked">Content Preferences</Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function PrimaryIndeterminateDemo() {
  return (
    <SectionFrame title="Primary · Indeterminate">
      <CheckboxGroup variant="primary" className="w-[340px]">
        <Checkbox
          id="cb-primary-indeterminate"
          checked="indeterminate"
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-primary-indeterminate">
              Content Preferences
            </Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Variant · Error
// ---------------------------------------------------------------------------

function ErrorUncheckedDemo() {
  return (
    <SectionFrame title="danger · Unchecked">
      <CheckboxGroup variant="danger" className="w-[340px]">
        <Checkbox
          id="cb-error-unchecked"
          checked={false}
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-error-unchecked">Content Preferences</Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function ErrorCheckedDemo() {
  return (
    <SectionFrame title="danger · Checked">
      <CheckboxGroup variant="danger" className="w-[340px]">
        <Checkbox
          id="cb-error-checked"
          checked
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-error-checked">Content Preferences</Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function ErrorIndeterminateDemo() {
  return (
    <SectionFrame title="danger · Indeterminate">
      <CheckboxGroup variant="danger" className="w-[340px]">
        <Checkbox
          id="cb-error-indeterminate"
          checked="indeterminate"
          onCheckedChange={() => undefined}
        />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-error-indeterminate">Content Preferences</Label>
            <LabelDescription>
              Choose the type of content you&apos;d like to see across Create
              UI.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

function DisabledPrimaryDemo() {
  return (
    <SectionFrame title="Disabled · Primary">
      <CheckboxGroup variant="primary" disabled className="w-[340px]">
        <Checkbox id="cb-disabled-primary" checked disabled />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-disabled-primary">Content Preferences</Label>
            <LabelDescription>
              Disabled state cascades to label and description.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}

function DisabledErrorDemo() {
  return (
    <SectionFrame title="Disabled · Error">
      <CheckboxGroup variant="danger" disabled className="w-[340px]">
        <Checkbox id="cb-disabled-error" checked disabled />
        <FieldContent>
          <LabelMain>
            <Label htmlFor="cb-disabled-error">Content Preferences</Label>
            <LabelDescription>
              Disabled state cascades to label and description.
            </LabelDescription>
          </LabelMain>
        </FieldContent>
      </CheckboxGroup>
    </SectionFrame>
  )
}
