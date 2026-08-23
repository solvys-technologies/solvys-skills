"use client"

import { RiArrowRightSLine, RiToolsFill } from "@create-ui/assets/icons"

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
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"
import { TextLink } from "@/registry/ui/text-link"

export default function RadioGroupExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <ShowcaseDemo />
      <PlacementRightDemo />

      <SizeXsDemo />
      <SizeSmDemo />
      <SizeMdDemo />

      <PrimaryDemo />
      <NeutralDemo />
      <ErrorDemo />

      <DisabledPrimaryDemo />
      <DisabledNeutralDemo />
      <DisabledErrorDemo />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Showcase — 1:1 Figma "Preferred Tool" sample (node 3659:51302)
// ---------------------------------------------------------------------------

function ShowcaseDemo() {
  return (
    <SectionFrame title="Showcase · Preferred Tool">
      <RadioGroup
        defaultValue="rg-showcase-a"
        className="w-[370px]"
        fieldClassName="flex-col items-stretch gap-4"
      >
        <div className="flex items-start gap-2">
          <Radio id="rg-showcase-a" value="rg-showcase-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-showcase-a">
                <LabelIcon>
                  <RiToolsFill />
                </LabelIcon>
                Create UI
                <LabelBadgeSlot>
                  <Badge
                    variant="danger"
                    appearance="soft"
                    size="sm"
                    shape="rounded"
                  >
                    REQUIRED
                  </Badge>
                </LabelBadgeSlot>
              </Label>
              <LabelDescription>
                Select the primary tool you use to build with Create UI.
              </LabelDescription>
            </LabelMain>
            <FieldFooter>
              <TextLink
                href="https://createui.co"
                target="_blank"
                rel="noreferrer"
                trailing={<RiArrowRightSLine />}
                underline
              >
                Explore all content types
              </TextLink>
            </FieldFooter>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio id="rg-showcase-b" value="rg-showcase-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-showcase-b">
                <LabelIcon>
                  <RiToolsFill />
                </LabelIcon>
                createui
              </Label>
              <LabelDescription>
                Use the createui-style component library instead.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function PlacementRightDemo() {
  return (
    <SectionFrame title="Placement · Right">
      <RadioGroup
        defaultValue="rg-placement-right-a"
        className="w-[370px]"
        fieldClassName="flex-col items-stretch gap-4"
      >
        <div className="flex flex-row-reverse items-start gap-2">
          <Radio id="rg-placement-right-a" value="rg-placement-right-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-placement-right-a">
                <LabelIcon>
                  <RiToolsFill />
                </LabelIcon>
                Create UI
                <LabelBadgeSlot>
                  <Badge
                    variant="danger"
                    appearance="soft"
                    size="sm"
                    shape="rounded"
                  >
                    REQUIRED
                  </Badge>
                </LabelBadgeSlot>
              </Label>
              <LabelDescription>
                Select the primary tool you use to build with Create UI.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex flex-row-reverse items-start gap-2">
          <Radio id="rg-placement-right-b" value="rg-placement-right-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-placement-right-b">
                <LabelIcon>
                  <RiToolsFill />
                </LabelIcon>
                createui
              </Label>
              <LabelDescription>
                Use the createui-style component library instead.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Sizes — Label, LabelDescription size'ları Field context'ten okur
// ---------------------------------------------------------------------------

function SizeXsDemo() {
  return (
    <SectionFrame title="Size · xs">
      <RadioGroup
        size="xs"
        defaultValue="rg-size-xs-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-1">
          <Radio id="rg-size-xs-a" value="rg-size-xs-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-size-xs-a">Create UI</Label>
              <LabelDescription>Primary component library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-1">
          <Radio id="rg-size-xs-b" value="rg-size-xs-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-size-xs-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function SizeSmDemo() {
  return (
    <SectionFrame title="Size · sm">
      <RadioGroup
        size="sm"
        defaultValue="rg-size-sm-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-1.5">
          <Radio id="rg-size-sm-a" value="rg-size-sm-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-size-sm-a">Create UI</Label>
              <LabelDescription>Primary component library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-1.5">
          <Radio id="rg-size-sm-b" value="rg-size-sm-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-size-sm-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function SizeMdDemo() {
  return (
    <SectionFrame title="Size · md">
      <RadioGroup
        size="md"
        defaultValue="rg-size-md-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-4"
      >
        <div className="flex items-start gap-2">
          <Radio id="rg-size-md-a" value="rg-size-md-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-size-md-a">Create UI</Label>
              <LabelDescription>Primary component library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio id="rg-size-md-b" value="rg-size-md-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-size-md-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

function PrimaryDemo() {
  return (
    <SectionFrame title="Variant · Primary">
      <RadioGroup
        variant="primary"
        defaultValue="rg-primary-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio id="rg-primary-a" value="rg-primary-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-primary-a">Create UI</Label>
              <LabelDescription>Primary component library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio id="rg-primary-b" value="rg-primary-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-primary-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function NeutralDemo() {
  return (
    <SectionFrame title="Variant · Neutral">
      <RadioGroup
        variant="neutral"
        defaultValue="rg-neutral-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio id="rg-neutral-a" value="rg-neutral-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-neutral-a">Create UI</Label>
              <LabelDescription>Primary component library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio id="rg-neutral-b" value="rg-neutral-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-neutral-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function ErrorDemo() {
  return (
    <SectionFrame title="Variant · danger">
      <RadioGroup
        variant="danger"
        defaultValue="rg-error-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio id="rg-error-a" value="rg-error-a" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-error-a">Create UI</Label>
              <LabelDescription>Primary component library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio id="rg-error-b" value="rg-error-b" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-error-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

function DisabledPrimaryDemo() {
  return (
    <SectionFrame title="Disabled · Primary">
      <RadioGroup
        variant="primary"
        disabled
        defaultValue="rg-disabled-primary-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio
            id="rg-disabled-primary-a"
            value="rg-disabled-primary-a"
            disabled
          />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-disabled-primary-a">Create UI</Label>
              <LabelDescription>
                Disabled state cascades to label and description.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio
            id="rg-disabled-primary-b"
            value="rg-disabled-primary-b"
            disabled
          />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-disabled-primary-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function DisabledNeutralDemo() {
  return (
    <SectionFrame title="Disabled · Neutral">
      <RadioGroup
        variant="neutral"
        disabled
        defaultValue="rg-disabled-neutral-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio
            id="rg-disabled-neutral-a"
            value="rg-disabled-neutral-a"
            disabled
          />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-disabled-neutral-a">Create UI</Label>
              <LabelDescription>
                Disabled state cascades to label and description.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio
            id="rg-disabled-neutral-b"
            value="rg-disabled-neutral-b"
            disabled
          />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-disabled-neutral-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}

function DisabledErrorDemo() {
  return (
    <SectionFrame title="Disabled · Error">
      <RadioGroup
        variant="danger"
        disabled
        defaultValue="rg-disabled-error-a"
        className="w-[340px]"
        fieldClassName="flex-col items-stretch gap-3"
      >
        <div className="flex items-start gap-2">
          <Radio
            id="rg-disabled-error-a"
            value="rg-disabled-error-a"
            disabled
          />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-disabled-error-a">Create UI</Label>
              <LabelDescription>
                Disabled state cascades to label and description.
              </LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
        <div className="flex items-start gap-2">
          <Radio
            id="rg-disabled-error-b"
            value="rg-disabled-error-b"
            disabled
          />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="rg-disabled-error-b">createui</Label>
              <LabelDescription>Alternative library.</LabelDescription>
            </LabelMain>
          </FieldContent>
        </div>
      </RadioGroup>
    </SectionFrame>
  )
}
