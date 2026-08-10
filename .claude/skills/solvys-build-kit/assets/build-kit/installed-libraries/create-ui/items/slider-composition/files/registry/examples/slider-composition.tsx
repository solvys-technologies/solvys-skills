"use client"

import { RiInformation2Fill, RiSparklingFill } from "@create-ui/assets/icons"

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

export default function SliderComposition() {
  return (
    <div className="gap-component-md flex w-96 flex-col">
      <LabelBlock size="sm">
        <LabelMain>
          <Label>
            <LabelIcon>
              <RiSparklingFill />
            </LabelIcon>
            Opacity
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
  )
}
