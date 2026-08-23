import { Slider } from "@/registry/ui/slider"

export default function SliderSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider defaultValue={[50]} size="md" />
      <Slider defaultValue={[50]} size="sm" />
      <Slider defaultValue={[50]} size="xs" />
    </div>
  )
}
