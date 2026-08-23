"use client"

import { RiInformation2Fill, RiSparklingFill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Slider } from "@/registry/pro/ui/slider"
import { Badge } from "@/registry/ui/badge"
import {
  Label,
  LabelBlock,
  LabelCount,
  LabelIcon,
  LabelInfoSlot,
  LabelMain,
  LabelOptional,
} from "@/registry/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const MARKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export default function SliderExample() {
  return (
    <div className="flex flex-col items-start gap-16">
      <FullComposition />
      <SliderOnly />
      <WithBadges />
      <WithMarks />
      <SteppedMarks />
      <RailTrack />
      <Range />
      <MultipleThumbs />
      <Neutral />
      <LongThumb />
      <PillShape />
      <SizeSm />
      <SizeXs />
      <WithTooltips />
      <Disabled />
    </div>
  )
}

function FullComposition() {
  return (
    <SectionFrame title="Full composition — md · Primary · Rounded · Single · Bar">
      <div className="gap-component-md flex w-96 flex-col">
        <LabelBlock size="sm">
          <LabelMain>
            <Label>
              <LabelIcon>
                <RiSparklingFill />
              </LabelIcon>
              Label
              <LabelOptional />
              <LabelInfoSlot>
                <Tooltip>
                  <TooltipTrigger>
                    <RiInformation2Fill />
                  </TooltipTrigger>
                  <TooltipContent side="top" variant="neutral" showArrow>
                    Drag to set a value between 0 and 100.
                  </TooltipContent>
                </Tooltip>
              </LabelInfoSlot>
            </Label>
          </LabelMain>
          <LabelCount>Action</LabelCount>
        </LabelBlock>
        <div className="gap-component-md flex items-center pb-10">
          <Badge variant="neutral" appearance="soft" size="md">
            0%
          </Badge>
          <Slider
            defaultValue={[42]}
            marks={MARKS}
            tooltip="top"
            formatTooltip={(value) => `${value}%`}
          />
          <Badge variant="neutral" appearance="soft" size="md">
            100%
          </Badge>
        </div>
      </div>
    </SectionFrame>
  )
}

function SliderOnly() {
  return (
    <SectionFrame title="Slider only">
      <div className="w-96">
        <Slider defaultValue={[42]} />
      </div>
    </SectionFrame>
  )
}

function WithBadges() {
  return (
    <SectionFrame title="With min / max badges">
      <div className="gap-component-md flex w-96 items-center">
        <Badge variant="neutral" appearance="soft" size="md">
          0%
        </Badge>
        <Slider defaultValue={[60]} />
        <Badge variant="neutral" appearance="soft" size="md">
          100%
        </Badge>
      </div>
    </SectionFrame>
  )
}

function WithMarks() {
  return (
    <SectionFrame title="With value marks">
      <div className="w-96 pb-10">
        <Slider defaultValue={[40]} marks={MARKS} />
      </div>
    </SectionFrame>
  )
}

function SteppedMarks() {
  return (
    <SectionFrame title="Stepped — step 10, snaps to marks">
      <div className="w-96 pb-10">
        <Slider defaultValue={[40]} marks={MARKS} step={10} />
      </div>
    </SectionFrame>
  )
}

function RailTrack() {
  return (
    <SectionFrame title="Track — rail">
      <div className="w-96">
        <Slider
          defaultValue={[42]}
          track="rail"
          tooltip="top"
          formatTooltip={(value) => `${value}%`}
        />
      </div>
    </SectionFrame>
  )
}

function Range() {
  return (
    <SectionFrame title="Range — bar · rail">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[20, 60]} />
        <Slider defaultValue={[20, 60]} track="rail" />
      </div>
    </SectionFrame>
  )
}

function MultipleThumbs() {
  return (
    <SectionFrame title="Multiple thumbs">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[15, 45, 80]} />
        <Slider defaultValue={[15, 45, 80]} track="rail" />
      </div>
    </SectionFrame>
  )
}

function Neutral() {
  return (
    <SectionFrame title="Neutral — bar · rail">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[42]} variant="neutral" />
        <Slider defaultValue={[20, 60]} variant="neutral" />
        <Slider defaultValue={[42]} variant="neutral" track="rail" />
        <Slider defaultValue={[20, 60]} variant="neutral" track="rail" />
      </div>
    </SectionFrame>
  )
}

function LongThumb() {
  return (
    <SectionFrame title="Type long — bar · rail · range · neutral">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[42]} thumbType="long" />
        <Slider defaultValue={[20, 60]} thumbType="long" />
        <Slider defaultValue={[42]} thumbType="long" track="rail" />
        <Slider defaultValue={[20, 60]} thumbType="long" track="rail" />
        <Slider defaultValue={[42]} thumbType="long" variant="neutral" />
        <Slider defaultValue={[20, 60]} thumbType="long" variant="neutral" />
        <Slider
          defaultValue={[42]}
          thumbType="long"
          variant="neutral"
          track="rail"
        />
        <Slider
          defaultValue={[20, 60]}
          thumbType="long"
          variant="neutral"
          track="rail"
        />
      </div>
    </SectionFrame>
  )
}

function PillShape() {
  return (
    <SectionFrame title="Shape pill — short · long · range · neutral">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[42]} shape="pill" />
        <Slider defaultValue={[42]} shape="pill" track="rail" />
        <Slider defaultValue={[42]} shape="pill" thumbType="long" />
        <Slider
          defaultValue={[42]}
          shape="pill"
          thumbType="long"
          track="rail"
        />
        <Slider defaultValue={[20, 60]} shape="pill" />
        <Slider defaultValue={[20, 60]} shape="pill" track="rail" />
        <Slider defaultValue={[20, 60]} shape="pill" variant="neutral" />
        <Slider
          defaultValue={[20, 60]}
          shape="pill"
          variant="neutral"
          track="rail"
        />
      </div>
    </SectionFrame>
  )
}

function SizeSm() {
  return (
    <SectionFrame title="Size sm — bar · rail · rounded · pill">
      <div className="flex w-96 flex-col gap-8 pb-10">
        <Slider defaultValue={[42]} size="sm" />
        <Slider defaultValue={[42]} size="sm" thumbType="long" />
        <Slider defaultValue={[42]} size="sm" shape="pill" />
        <Slider defaultValue={[42]} size="sm" shape="pill" thumbType="long" />
        <Slider defaultValue={[42]} size="sm" track="rail" />
        <Slider defaultValue={[42]} size="sm" track="rail" thumbType="long" />
        <Slider defaultValue={[42]} size="sm" track="rail" shape="pill" />
        <Slider
          defaultValue={[42]}
          size="sm"
          track="rail"
          shape="pill"
          thumbType="long"
        />
        <Slider defaultValue={[42]} size="sm" marks={MARKS} />
      </div>
    </SectionFrame>
  )
}

function SizeXs() {
  return (
    <SectionFrame title="Size xs — bar · rail · rounded · pill">
      <div className="flex w-96 flex-col gap-8 pb-10">
        <Slider defaultValue={[42]} size="xs" />
        <Slider defaultValue={[42]} size="xs" thumbType="long" />
        <Slider defaultValue={[42]} size="xs" shape="pill" />
        <Slider defaultValue={[42]} size="xs" shape="pill" thumbType="long" />
        <Slider defaultValue={[42]} size="xs" track="rail" />
        <Slider defaultValue={[42]} size="xs" track="rail" thumbType="long" />
        <Slider defaultValue={[42]} size="xs" track="rail" shape="pill" />
        <Slider
          defaultValue={[42]}
          size="xs"
          track="rail"
          shape="pill"
          thumbType="long"
        />
        <Slider defaultValue={[42]} size="xs" marks={MARKS} />
      </div>
    </SectionFrame>
  )
}

function WithTooltips() {
  return (
    <SectionFrame title="Value tooltip — top · bottom">
      <div className="flex w-96 flex-col gap-10">
        <Slider
          defaultValue={[42]}
          tooltip="top"
          formatTooltip={(value) => `${value}%`}
        />
        <Slider
          defaultValue={[42]}
          tooltip="bottom"
          formatTooltip={(value) => `${value}%`}
        />
      </div>
    </SectionFrame>
  )
}

function Disabled() {
  return (
    <SectionFrame title="Disabled">
      <div className="w-96">
        <Slider defaultValue={[42]} disabled />
      </div>
    </SectionFrame>
  )
}
