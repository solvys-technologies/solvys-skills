"use client"

import { SectionFrame } from "@/registry/components/example"
import { Slider } from "@/registry/ui/slider"

export default function SliderFreeExample() {
  return (
    <div className="flex flex-col items-start gap-16">
      <Primary />
      <Neutral />
    </div>
  )
}

function Primary() {
  return (
    <SectionFrame title="Primary — md · sm · xs">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[42]} />
        <Slider defaultValue={[42]} size="sm" />
        <Slider defaultValue={[42]} size="xs" />
      </div>
    </SectionFrame>
  )
}

function Neutral() {
  return (
    <SectionFrame title="Neutral — md · sm · xs">
      <div className="flex w-96 flex-col gap-8">
        <Slider defaultValue={[42]} variant="neutral" />
        <Slider defaultValue={[42]} variant="neutral" size="sm" />
        <Slider defaultValue={[42]} variant="neutral" size="xs" />
      </div>
    </SectionFrame>
  )
}
